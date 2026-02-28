import { Container, Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
      {/* Top Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand style={{ fontWeight: "bold" }}>
            Student Course System
          </Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse>
            <Nav className="me-auto">

              {!token && (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/signup">
                    <Nav.Link>Sign Up</Nav.Link>
                  </LinkContainer>
                </>
              )}

              {token && (
                <>
                  <LinkContainer to="/dashboard">
                    <Nav.Link>Dashboard</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/create-course">
                    <Nav.Link>Create Course</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/students">
                    <Nav.Link>Students</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/students-in-course">
                    <Nav.Link>Students In Course</Nav.Link>
                  </LinkContainer>

                  <Nav.Link onClick={logout}>
                    Logout
                  </Nav.Link>
                </>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Page Content */}
      <Container style={{ marginTop: "30px" }}>
        <Outlet />
      </Container>
    </>
  );
}