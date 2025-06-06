import React, { useEffect } from "react";
import { Card, Col, Form, Image, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../redux/actions/userAction";

const SidebarProfile = () => {
  const dispatch = useDispatch();

  // Prendo il profilo utente dal Redux store
  const profile = useSelector((state) => state.user.profile);

  // Alla prima render eseguo il fetch del profilo utente tramite azione Redux
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    // Colonna con posizione sticky per sidebar fissa durante lo scroll
    <Col xs={12} className="mb-4" style={{ position: "sticky", top: "65px", zIndex: 100 }}>
      {/* Card con info profilo */}
      <Card className="mb-2 shadow-sm">
        <Card.Body className="text-center">
          <div className="mb-2">
            {/* Immagine profilo rotonda */}
            <Image src={profile?.image} roundedCircle width={70} height={70} style={{ objectFit: "cover" }} alt="profile" />
          </div>
          {/* Nome e cognome, o placeholder */}
          <Card.Title className="mb-0 fs-5">{profile ? `${profile.name} ${profile.surname}` : "Nome Cognome"}</Card.Title>
          {/* Titolo professionale */}
          <Card.Text className="text-muted mb-1" style={{ fontSize: "0.95em" }}>
            {profile?.title || "Titolo professionale"}
          </Card.Text>
          {/* Area geografica */}
          <Card.Text className="text-muted" style={{ fontSize: "0.9em" }}>
            {profile?.area || "Area"}
          </Card.Text>
          {/* Input per aggiungere esperienza */}
          <InputGroup>
            <Form.Control placeholder="+ Aggiungi esperienza" aria-label="Aggiungi esperienza" />
          </InputGroup>
        </Card.Body>
      </Card>

      {/* Card con preferenze e link */}
      <Card>
        <Card.Body>
          <Card.Title className="text-dark fw-semibold mb-3 p-1" style={{ fontSize: "1.1rem" }}>
            <i className="bi bi-list-ul"></i> Preferenze
          </Card.Title>
          <Card.Title className="text-dark fw-semibold mb-4 p-1" style={{ fontSize: "1.1rem" }}>
            <i className="bi bi-bookmark-fill"></i> Le mie offerte di lavoro
          </Card.Title>
          <hr />
          <Card.Title className="text-dark fw-semibold mb-3 p-1">
            <a href="#" style={{ fontSize: "1.1rem", textDecoration: "none" }}>
              <i className="bi bi-pencil-square"></i> Pubblica offerta gratuita
            </a>
          </Card.Title>
        </Card.Body>
      </Card>

      {/* Footer con link informativi e copyright */}
      <footer className="small py-2 mb-2 text-center">
        <ul className="list-unstyled footer-spaced-links text-muted">
          <li>
            <a href="#" className="footer-home">
              Informazioni
            </a>
            <a href="#" className="footer-home">
              Accessibilità
            </a>
          </li>
          <li>
            <a href="#" className="footer-home">
              Centro assistenza
            </a>
            <a href="#" className="footer-home">
              Privacy e condizioni <i className="bi bi-caret-down-fill"></i>
            </a>
          </li>
          <li>
            <a href="#" className="footer-home">
              Opzioni per gli annunci pubblicitari
            </a>
          </li>
          <li>
            <a href="#" className="footer-home">
              Pubblicità
            </a>
            <a href="#" className="footer-home">
              Servizi alle aziende <i className="bi bi-caret-down-fill"></i>
            </a>
          </li>
          <li>
            <a href="#" className="footer-home">
              Scarica l’app LinkedIn
            </a>
            <a href="#" className="footer-home">
              Altro
            </a>
          </li>
        </ul>

        {/* Logo e copyright dinamico */}
        <div className="text-center text-muted small mt-3">
          <img src="src/assets/linkedin.png" alt="logo" className="m-2" />
          LinkedIn Corporation © {new Date().getFullYear()}
        </div>
      </footer>
    </Col>
  );
};

export default SidebarProfile;
