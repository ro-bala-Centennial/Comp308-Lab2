import { useQuery } from "@apollo/client/react";
import { GET_STUDENTS } from "../graphql/operations";
import { Container, Table } from "react-bootstrap";

export default function Students() {
  const { data } = useQuery(GET_STUDENTS);

  return (
    <Container style={{ marginTop: 40 }}>
      <h3>All Students</h3>

      <Table bordered>
        <thead>
          <tr>
            <th>Student #</th>
            <th>Name</th>
            <th>Program</th>
          </tr>
        </thead>
        <tbody>
          {data?.students.map((s) => (
            <tr key={s.id}>
              <td>{s.studentNumber}</td>
              <td>{s.firstName} {s.lastName}</td>
              <td>{s.program}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}