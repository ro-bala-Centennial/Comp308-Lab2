import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../graphql/operations";

import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [studentNumber, setStudentNumber] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [login] = useMutation(LOGIN);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const { data } = await login({
        variables: { studentNumber, password },
      });

      localStorage.setItem("token", data.login.token);

      navigate("/");
      window.location.reload();

    } catch {
      setError("Invalid student number or password");
    }

  };

  return (

    <Container style={{ maxWidth: 500, marginTop: 80 }}>

      {/* TITLE */}
      <h2 style={{ textAlign: "center" }}>Student Course System </h2>
      <h3 style={{ textAlign: "center" }}>Login Page</h3>

      {/* DESCRIPTION */}
      <Alert variant="info">
        Login to access your student dashboard where you can enroll,
        update, and manage your courses.
      </Alert>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>

        <Form.Control
          className="mb-3"
          placeholder="Student Number"
          value={studentNumber}
          onChange={(e) => setStudentNumber(e.target.value)}
        />

        <Form.Control
          type="password"
          className="mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" className="w-100 mb-3">
          Login
        </Button>

      </Form>

      {/* NAVIGATION LINK */}
      <div style={{ textAlign: "center" }}>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </div>

    </Container>
  );
}