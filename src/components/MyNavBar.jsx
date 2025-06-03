import { Navbar, Nav, Form, FormControl, Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const MyNavBar = () => {
  const profile = useSelector((state) => state.user.profile);

  return (
    <Navbar
      bg="light"
      expand="lg"
      className="shadow-sm py-0 navbar-linkedin sticky-top"
    >
      <Container>
        <Navbar.Brand href="#">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
            width="40"
            height="40"
            alt="LinkedIn"
          />
        </Navbar.Brand>
        <Form className="d-flex me-4">
          <FormControl
            type="search"
            placeholder="Cerca"
            className="me-4 navbar-search-fixed"
            aria-label="Search"
          />
        </Form>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto align-items-center">
            <Nav.Link href="#">
              <i className="bi bi-house-door-fill"></i>
              <div className="nav-link-label">Home</div>
            </Nav.Link>
            <Nav.Link href="#">
              <i className="bi bi-people-fill"></i>
              <div className="nav-link-label">Rete</div>
            </Nav.Link>
            <Nav.Link href="#">
              <i className="bi bi-briefcase-fill"></i>
              <div className="nav-link-label">Lavoro</div>
            </Nav.Link>
            <Nav.Link href="#">
              <i className="bi bi-chat-dots-fill"></i>
              <div className="nav-link-label">Messaggistica</div>
            </Nav.Link>
            <Nav.Link href="#">
              <i className="bi bi-bell-fill"></i>
              <div className="nav-link-label">Notifiche</div>
            </Nav.Link>
            <Nav.Link href="#">
              <img
                src={profile?.image}
                alt="profile"
                width="28"
                height="28"
                className="rounded-circle"
              />
              <div className="nav-link-label">
                {profile ? `${profile.name} ${profile.surname}` : "Tu"}{" "}
                <i className="bi bi-caret-down-fill"></i>
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavBar;
