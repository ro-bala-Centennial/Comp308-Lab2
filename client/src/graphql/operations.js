import { gql } from "@apollo/client";

/* ================= AUTH ================= */

export const SIGNUP = gql`
  mutation Signup($input: StudentSignupInput!) {
    signup(input: $input) {
      token
      student {
        id
        studentNumber
        firstName
        lastName
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($studentNumber: String!, $password: String!) {
    login(studentNumber: $studentNumber, password: $password) {
      token
      student {
        id
        studentNumber
        firstName
        lastName
      }
    }
  }
`;

/* ================= QUERIES ================= */

export const GET_COURSES = gql`
  query Courses {
    courses {
      id
      code
      name
      section
      semester
    }
  }
`;

export const GET_STUDENTS = gql`
  query Students {
    students {
      id
      studentNumber
      firstName
      lastName
      program
    }
  }
`;

export const MY_COURSES = gql`
  query MyCourses {
    myCourses {
      id
      code
      name
      section
      semester
    }
  }
`;

export const STUDENTS_IN_COURSE = gql`
  query StudentsInCourse($courseId: ID!) {
    studentsInCourse(courseId: $courseId) {
      id
      studentNumber
      firstName
      lastName
    }
  }
`;

/* ================= MUTATIONS ================= */

export const CREATE_COURSE = gql`
  mutation CreateCourse($input: CourseInput!) {
    createCourse(input: $input) {
      id
      code
      name
      section
      semester
    }
  }
`;

export const ADD_COURSE = gql`
  mutation AddCourse($courseId: ID!) {
    addCourse(courseId: $courseId) {
      id
    }
  }
`;

export const DROP_COURSE = gql`
  mutation DropCourse($courseId: ID!) {
    dropCourse(courseId: $courseId) {
      id
    }
  }
`;

export const UPDATE_COURSE = gql`
  mutation UpdateCourse($courseId: ID!, $section: String!) {
    updateCourse(courseId: $courseId, section: $section) {
      id
      code
      section
    }
  }
`;