import { Navbar, Nav, Form, FormControl, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const MyNavBar = () => {
  // --- Prendo i dati del profilo dall'applicazione Redux ---
  const profile = useSelector((state) => state.user.profile);

  // --- Stato locale per la ricerca ---
  const [searchQuery, setSearchQuery] = useState("");

  // --- Hook per navigare programmaticamente ---
  const navigate = useNavigate();

  // --- Funzione gestore submit del form di ricerca ---
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Naviga alla pagina /search con query encoded
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm py-0 navbar-linkedin sticky-top">
      <Container>
        {/* --- Logo LinkedIn che rimanda alla home --- */}
        <Navbar.Brand as={Link} to="/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" width="40" height="40" alt="LinkedIn" />
        </Navbar.Brand>

        {/* --- Form di ricerca visibile da md in su --- */}
        <Form className="d-none d-md-flex position-relative align-items-center" onSubmit={handleSearchSubmit}>
          <i className="bi bi-search search-icon"></i>
          <FormControl
            type="search"
            placeholder="Cerca"
            className="navbar-search-input"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form>

        {/* --- Toggle menu mobile --- */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* --- Menu di navigazione principale --- */}
        <Navbar.Collapse id="basic-navbar-nav d-flex justify-content-end">
          <Nav className="align-items-center ms-auto text-center gap-3">
            {/* Home */}
            <Link to="/" className="nav-link d-flex flex-column align-items-center">
              <i className="bi bi-house-door-fill fs-5"></i>
              <div className="nav-link-label">
                <small>Home</small>
              </div>
            </Link>

            {/* Rete */}
            <Nav.Link href="#">
              <i className="bi bi-people-fill fs-5"></i>
              <div className="nav-link-label">
                <small>Rete</small>
              </div>
            </Nav.Link>

            {/* Lavoro */}
            <Link to="/jobs" className="nav-link d-flex flex-column align-items-center">
              <i className="bi bi-briefcase-fill fs-5"></i>
              <div className="nav-link-label">
                <small>Lavoro</small>
              </div>
            </Link>

            {/* Messaggistica */}
            <Nav.Link href="#">
              <i className="bi bi-chat-dots-fill fs-5"></i>
              <div className="nav-link-label">
                <small>Messaggistica</small>
              </div>
            </Nav.Link>

            {/* Notifiche */}
            <Nav.Link href="#">
              <i className="bi bi-bell-fill fs-5"></i>
              <div className="nav-link-label">
                <small>Notifiche</small>
              </div>
            </Nav.Link>

            {/* Profilo utente con immagine e nome */}
            <Link to="/profile" className="nav-link d-flex flex-column align-items-center">
              <img src={profile?.image} alt="profile" width="28" height="28" className="rounded-circle" />
              <div className="nav-link-label">
                <small>{profile ? `${profile.name} ${profile.surname}` : "Tu"}</small> <i className="bi bi-caret-down-fill"></i>
              </div>
            </Link>
          </Nav>

          {/* Separatore verticale visibile solo da lg in su */}
          <div className="vr mx-1 d-none d-lg-block nav-separator"></div>

          {/* Sezione aziendale e Premium */}
          <Nav className="align-items-center">
            {/* Dropdown per aziende */}
            <Nav.Link href="#" className="text-center d-none d-lg-flex flex-column align-items-center">
              <i className="bi bi-grid-3x3-gap-fill"></i>
              <div className="nav-link-label">
                <small>Per le aziende</small> <i className="bi bi-caret-down-fill"></i>
              </div>
            </Nav.Link>

            {/* Offerta Premium */}
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
