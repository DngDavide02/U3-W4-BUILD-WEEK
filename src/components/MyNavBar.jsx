import React from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";

const MyNavBar = () => (
  <Navbar bg="light" expand="lg" className="shadow-sm py-0 navbar-linkedin">
    <Container>
      <Navbar.Brand href="#">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
          width="40"
          height="40"
          alt="LinkedIn"
        />
      </Navbar.Brand>
      <Form className="d-flex me-3">
        <FormControl
          type="search"
          placeholder="Cerca"
          className="me-2"
          aria-label="Search"
          style={{ backgroundColor: "#eef3f8", borderRadius: "5px" }}
        />
      </Form>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto align-items-center">
          <Nav.Link href="#">
            <i className="bi bi-house-door-fill"></i>
            <div style={{ fontSize: "12px" }}>Home</div>
          </Nav.Link>
          <Nav.Link href="#">
            <i className="bi bi-people-fill"></i>
            <div style={{ fontSize: "12px" }}>Rete</div>
          </Nav.Link>
          <Nav.Link href="#">
            <i className="bi bi-briefcase-fill"></i>
            <div style={{ fontSize: "12px" }}>Lavoro</div>
          </Nav.Link>
          <Nav.Link href="#">
            <i className="bi bi-chat-dots-fill"></i>
            <div style={{ fontSize: "12px" }}>Messaggistica</div>
          </Nav.Link>
          <Nav.Link href="#">
            <i className="bi bi-bell-fill"></i>
            <div style={{ fontSize: "12px" }}>Notifiche</div>
          </Nav.Link>
          <Nav.Link href="#">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="profile"
              width="24"
              height="24"
              className="rounded-circle"
            />
            <div style={{ fontSize: "12px" }}>
              Tu <i className="bi bi-caret-down-fill"></i>
            </div>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default MyNavBar;
