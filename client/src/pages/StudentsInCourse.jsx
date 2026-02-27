import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_COURSES, STUDENTS_IN_COURSE } from "../graphql/operations";
import { Container, Form, Button, Table } from "react-bootstrap";

export default function StudentsInCourse() {
  const [courseId, setCourseId] = useState("");

  const { data: courses } = useQuery(GET_COURSES);

  const { data, refetch } = useQuery(STUDENTS_IN_COURSE, {
    variables: { courseId },
    skip: !courseId,
  });

  return (
    <Container style={{ marginTop: 40 }}>
      <h3>Students in Course</h3>

      <Form.Select
        className="mb-3"
        onChange={(e) => setCourseId(e.target.value)}
      >
        <option value="">Select Course</option>
        {courses?.courses.map((c) => (
          <option key={c.id} value={c.id}>
            {c.code} - {c.name}
          </option>
        ))}
      </Form.Select>

      <Button onClick={() => refetch()}>Load Students</Button>

      <Table bordered className="mt-3">
        <thead>
          <tr>
            <th>Student #</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {data?.studentsInCourse.map((s) => (
            <tr key={s.id}>
              <td>{s.studentNumber}</td>
              <td>{s.firstName} {s.lastName}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}