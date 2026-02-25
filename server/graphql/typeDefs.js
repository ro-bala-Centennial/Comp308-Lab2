const typeDefs = `#graphql
  type Student {
    id: ID!
    studentNumber: String!
    firstName: String!
    lastName: String!
    address: String
    city: String
    phoneNumber: String
    email: String
    program: String
    courses: [Course!]!
  }

  type Course {
    id: ID!
    code: String!
    name: String!
    section: String!
    semester: String!
  }

  type AuthPayload {
    token: String!
    student: Student!
  }

  type Query {
    students: [Student!]!
    courses: [Course!]!
    studentsInCourse(courseId: ID!): [Student!]!
    me: Student
    myCourses: [Course!]!
  }

  input StudentSignupInput {
    studentNumber: String!
    password: String!
    firstName: String!
    lastName: String!
    address: String
    city: String
    phoneNumber: String
    email: String
    program: String
  }

  input CourseInput {
    code: String!
    name: String!
    section: String!
    semester: String!
  }

  type Mutation {
    signup(input: StudentSignupInput!): AuthPayload!
    login(studentNumber: String!, password: String!): AuthPayload!

    createCourse(input: CourseInput!): Course!
    updateCourse(courseId: ID!, section: String!): Course!
    deleteCourse(courseId: ID!): Boolean!

    addCourse(courseId: ID!): Student!
    dropCourse(courseId: ID!): Student!
  }
`;
module.exports = typeDefs;