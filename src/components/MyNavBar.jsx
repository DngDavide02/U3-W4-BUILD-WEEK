import { Navbar, Nav, Form, FormControl, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyNavBar = () => {
  const profile = useSelector((state) => state.user.profile);

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm py-0 navbar-linkedin sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" width="40" height="40" alt="LinkedIn" />
        </Navbar.Brand>
        <Form className="d-none d-md-flex position-relative align-items-center">
          <i className="bi bi-search search-icon"></i>
          <FormControl type="search" placeholder="Cerca" className="navbar-search-input" aria-label="Search" />
        </Form>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav d-flex justify-content-end">
          <Nav className="align-items-center ms-auto text-center gap-3">
            <Link to="/" className="nav-link d-flex flex-column align-items-center">
              <i className="bi bi-house-door-fill fs-5"></i>
              <div className="nav-link-label">
                <small>Home</small>
              </div>
            </Link>
            <Nav.Link href="#">
              <i className="bi bi-people-fill fs-5"></i>
              <div className="nav-link-label">
                <small>Rete</small>
              </div>
            </Nav.Link>
            <Link to="/jobs" className="nav-link d-flex flex-column align-items-center">
              <i className="bi bi-briefcase-fill fs-5"></i>
              <div className="nav-link-label">
                <small>Lavoro</small>
              </div>
            </Link>
            <Nav.Link href="#">
              <i className="bi bi-chat-dots-fill fs-5"></i>
              <div className="nav-link-label">
                <small>Messaggistica</small>
              </div>
            </Nav.Link>
            <Nav.Link href="#">
              <i className="bi bi-bell-fill fs-5"></i>
              <div className="nav-link-label">
                <small>Notifiche</small>
              </div>
            </Nav.Link>
            <Link to="/profile" className="nav-link d-flex flex-column align-items-center">
              <img src={profile?.image} alt="profile" width="28" height="28" className="rounded-circle" />
              <div className="nav-link-label ">
                <small>{profile ? `${profile.name} ${profile.surname}` : "Tu"}</small> <i className="bi bi-caret-down-fill"></i>
              </div>
            </Link>
          </Nav>
          <div className="vr mx-1 d-none d-lg-block nav-separator"></div>
          <Nav className="align-items-center">
            <Nav.Link href="#" className="text-center d-none d-lg-flex flex-column align-items-center">
              <i className="bi bi-grid-3x3-gap-fill"></i>
              <div className="nav-link-label">
                <small>Per le aziende</small> <i className="bi bi-caret-down-fill"></i>
              </div>
            </Nav.Link>
            <Nav.Item className="d-none d-lg-block ms-lg-2 text-center">
              <a href="#premium" className="nav-link-premium">
                Prova Premium per 0
                <br />
                EUR
              </a>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavBar;
