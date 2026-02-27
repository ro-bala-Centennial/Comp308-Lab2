import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { CREATE_COURSE } from "../graphql/operations";
import { Container, Form, Button, Alert } from "react-bootstrap";

export default function CreateCourse() {
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
    code: "",
    name: "",
    section: "",
    semester: "",
  });

  const [createCourse] = useMutation(CREATE_COURSE);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createCourse({
      variables: { input: form },
    });

    setMsg("Course Created!");
  };

  return (
    <Container style={{ maxWidth: 500, marginTop: 60 }}>
      <h3>Create Course</h3>

      {msg && <Alert variant="success">{msg}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Control className="mb-3" placeholder="Course Code"
          onChange={(e) => setForm({ ...form, code: e.target.value })} />

        <Form.Control className="mb-3" placeholder="Course Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })} />

        <Form.Control className="mb-3" placeholder="Section"
          onChange={(e) => setForm({ ...form, section: e.target.value })} />

        <Form.Control className="mb-3" placeholder="Semester"
          onChange={(e) => setForm({ ...form, semester: e.target.value })} />

        <Button type="submit" className="w-100">
          Create Course
        </Button>
      </Form>
    </Container>
  );
}