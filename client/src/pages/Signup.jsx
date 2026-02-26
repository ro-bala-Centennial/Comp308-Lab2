import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { SIGNUP } from "../graphql/operations";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    studentNumber: "",
    password: "",
    firstName: "",
    lastName: "",
    program: "",
  });

  const [signup] = useMutation(SIGNUP);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await signup({
        variables: { input: form },
      });

      localStorage.setItem("token", data.signup.token);
      navigate("/");
      window.location.reload();
    } catch {
      setError("Signup failed");
    }
  };

  return (
    <Container style={{ maxWidth: 500, marginTop: 60 }}>
      <h3>Signup</h3>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Control className="mb-3" placeholder="Student Number"
          onChange={(e) => setForm({ ...form, studentNumber: e.target.value })} />

        <Form.Control type="password" className="mb-3" placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })} />

        <Form.Control className="mb-3" placeholder="First Name"
          onChange={(e) => setForm({ ...form, firstName: e.target.value })} />

        <Form.Control className="mb-3" placeholder="Last Name"
          onChange={(e) => setForm({ ...form, lastName: e.target.value })} />

        <Form.Control className="mb-3" placeholder="Program"
          onChange={(e) => setForm({ ...form, program: e.target.value })} />

        <Button type="submit" className="w-100">Signup</Button>
      </Form>
    </Container>
  );
}