import { useQuery, useMutation } from "@apollo/client/react";
import {
  GET_COURSES,
  MY_COURSES,
  ADD_COURSE,
  DROP_COURSE,
  UPDATE_COURSE,
} from "../graphql/operations";
import { Container, Table, Button } from "react-bootstrap";

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
      <h3>Dashboard</h3>

      <Button variant="secondary" className="mb-4" onClick={logout}>
        Logout
      </Button>

      <h5>All Courses</h5>
      <Table bordered>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Section</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allCourses?.courses.map((c) => (
            <tr key={c.id}>
              <td>{c.code}</td>
              <td>{c.name}</td>
              <td>{c.section}</td>
              <td>
                <Button size="sm" onClick={() => handleAdd(c.id)}>
                  Add
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h5>My Courses</h5>
      <Table bordered>
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
                <Button size="sm" className="me-2"
                  onClick={() => handleUpdate(c.id)}>
                  Update
                </Button>

                <Button size="sm" variant="danger"
                  onClick={() => handleDrop(c.id)}>
                  Drop
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}