import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { SIGNUP } from "../graphql/operations";

import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    studentNumber: "",
    password: "",
    firstName: "",
    lastName: "",
    program: "",
  });

  const [error, setError] = useState("");

  const [signup] = useMutation(SIGNUP);

  const handleSubmit = async (e) => {

    e.preventDefault();

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

    <Container style={{ maxWidth: 500, marginTop: 80 }}>

      {/* TITLE */}
      <h2 style={{ textAlign: "center" }}>Student Course System</h2>
      <h3 style={{ textAlign: "center" }}>Signup Page</h3>

      {/* DESCRIPTION */}
      <Alert variant="info">
        Create a new student account to enroll in courses,
        manage your schedule, and access your dashboard.
      </Alert>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>

        <Form.Control
          className="mb-3"
          placeholder="Student Number"
          onChange={(e) => setForm({...form, studentNumber: e.target.value})}
        />

        <Form.Control
          type="password"
          className="mb-3"
          placeholder="Password"
          onChange={(e) => setForm({...form, password: e.target.value})}
        />

        <Form.Control
          className="mb-3"
          placeholder="First Name"
          onChange={(e) => setForm({...form, firstName: e.target.value})}
        />

        <Form.Control
          className="mb-3"
          placeholder="Last Name"
          onChange={(e) => setForm({...form, lastName: e.target.value})}
        />

        <Form.Control
          className="mb-3"
          placeholder="Program"
          onChange={(e) => setForm({...form, program: e.target.value})}
        />

        <Button type="submit" className="w-100 mb-3">
          Sign Up
        </Button>

      </Form>

      {/* NAVIGATION LINK */}
      <div style={{ textAlign: "center" }}>
        Already have an account? <Link to="/login">Login here</Link>
      </div>

    </Container>
  );
}