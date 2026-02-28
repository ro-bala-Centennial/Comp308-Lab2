import { useQuery, useMutation } from "@apollo/client/react";
import {
  GET_COURSES,
  MY_COURSES,
  ADD_COURSE,
  DROP_COURSE,
  UPDATE_COURSE,
} from "../graphql/operations";

import { Container, Table, Button, Alert } from "react-bootstrap";

import { Link } from "react-router-dom";

export default function Dashboard() {
  const { data: allCourses } = useQuery(GET_COURSES);
  const { data: myCourses, refetch } = useQuery(MY_COURSES);

  const [addCourse] = useMutation(ADD_COURSE);
  const [dropCourse] = useMutation(DROP_COURSE);
  const [updateCourse] = useMutation(UPDATE_COURSE);

  const handleAdd = async (id) => {
    await addCourse({ variables: { courseId: id } });
    refetch();
  };

  const handleDrop = async (id) => {
    await dropCourse({ variables: { courseId: id } });
    refetch();
  };

  const handleUpdate = async (id) => {
    const newSection = prompt("Enter new section:");
    if (!newSection) return;

    await updateCourse({
      variables: { courseId: id, section: newSection },
    });

    refetch();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <Container style={{ marginTop: 40 }}>

      {/* PAGE TITLE */}
      <h2>Student Dashboard</h2>

      {/* PAGE DESCRIPTION */}
      <Alert variant="info">
        This page allows you to view all available courses, enroll in courses,
        update course sections, and drop courses you are currently enrolled in.
      </Alert>

      <Button variant="secondary" className="mb-4" onClick={logout}>
        Logout
      </Button>

      {/* ALL COURSES */}
      <h4>Available Courses (Click Add to enroll)</h4>

      <Table bordered striped>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Section</th>
            <th>Semester</th>
            <th>Add Course</th>
          </tr>
        </thead>

        <tbody>
          {allCourses?.courses.map((c) => (
            <tr key={c.id}>
              <td>{c.code}</td>
              <td>{c.name}</td>
              <td>{c.section}</td>
              <td>{c.semester}</td>

              <td>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleAdd(c.id)}
                >
                  Add Course
                </Button>
              </td>

            </tr>
          ))}
        </tbody>
      </Table>

      {/* MY COURSES */}
      <h4 className="mt-5">My Enrolled Courses</h4>

      <Table bordered striped>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Section</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {myCourses?.myCourses.map((c) => (
            <tr key={c.id}>

              <td>{c.code}</td>
              <td>{c.name}</td>
              <td>{c.section}</td>

              <td>

                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleUpdate(c.id)}
                >
                  Update Section
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDrop(c.id)}
                >
                  Drop Course
                </Button>

              </td>

            </tr>
          ))}
        </tbody>
      </Table>

    </Container>
  );
}