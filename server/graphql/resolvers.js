const Student = require("../models/Student");
const Course = require("../models/Course");
const { signToken } = require("../utils/jwt");

const resolvers = {
  Query: {
    students: async () => Student.find().populate("courses"),
    courses: async () => Course.find(),
    studentsInCourse: async (_, { courseId }) =>
      Student.find({ courses: courseId }).populate("courses"),

    me: async (_, __, { user }) => {
      if (!user) return null;
      return Student.findById(user.id).populate("courses");
    },

    myCourses: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      const st = await Student.findById(user.id).populate("courses");
      return st.courses;
    },
  },

  Mutation: {
    signup: async (_, { input }) => {
      const exists = await Student.findOne({ studentNumber: input.studentNumber });
      if (exists) throw new Error("Student number already exists");

      const student = await Student.create({ ...input, courses: [] });
      const token = signToken(student);
      return { token, student: await student.populate("courses") };
    },

    login: async (_, { studentNumber, password }) => {
      const student = await Student.findOne({ studentNumber });
      if (!student) throw new Error("Invalid credentials");

      const ok = await student.comparePassword(password);
      if (!ok) throw new Error("Invalid credentials");

      const token = signToken(student);
      return { token, student: await student.populate("courses") };
    },

    createCourse: async (_, { input }, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return Course.create(input);
    },

    updateCourse: async (_, { courseId, section }, { user }) => {
      if (!user) throw new Error("Not authenticated");
      const updated = await Course.findByIdAndUpdate(courseId, { section }, { new: true });
      if (!updated) throw new Error("Course not found");
      return updated;
    },

    deleteCourse: async (_, { courseId }, { user }) => {
      if (!user) throw new Error("Not authenticated");
      const deleted = await Course.findByIdAndDelete(courseId);
      return !!deleted;
    },

    addCourse: async (_, { courseId }, { user }) => {
      if (!user) throw new Error("Not authenticated");

      const course = await Course.findById(courseId);
      if (!course) throw new Error("Course not found");

      const student = await Student.findById(user.id);
      if (!student) throw new Error("Student not found");

      const already = student.courses.some((c) => String(c) === String(courseId));
      if (already) throw new Error("Already enrolled in this course");

      student.courses.push(courseId);
      await student.save();

      return student.populate("courses");
    },

    dropCourse: async (_, { courseId }, { user }) => {
      if (!user) throw new Error("Not authenticated");

      const student = await Student.findById(user.id);
      if (!student) throw new Error("Student not found");

      student.courses = student.courses.filter((c) => String(c) !== String(courseId));
      await student.save();

      return student.populate("courses");
    },
  },
};

module.exports = resolvers;