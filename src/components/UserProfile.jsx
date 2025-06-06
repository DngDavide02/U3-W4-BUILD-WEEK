import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Alert, Image, Button, ListGroup } from "react-bootstrap";

const UserProfile = () => {
  // Prendo userId dai parametri URL
  const { userId } = useParams();

  // Stato per profilo, esperienze, educazione, loading e errori
  const [profile, setProfile] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Effetto per caricare dati profilo, esperienze ed educazione all'avvio o cambio userId
  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Chiamata API profilo
        const resp = await fetch(`https://striveschool-api.herokuapp.com/api/profile/${userId}`, {
          headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` },
        });
        if (!resp.ok) throw new Error("Errore nel caricamento del profilo");
        const data = await resp.json();
        setProfile(data);

        // Chiamata API esperienze
        const expResp = await fetch(`https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences`, {
          headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` },
        });
        if (expResp.ok) {
          const expData = await expResp.json();
          setExperiences(expData);
        }

        // Chiamata API educazione
        const eduResp = await fetch(`https://striveschool-api.herokuapp.com/api/profile/${userId}/education`, {
          headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` },
        });
        if (eduResp.ok) {
          const eduData = await eduResp.json();
          setEducation(eduData);
        }
      } catch (err) {
        setError(err.message || "Errore sconosciuto");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [userId]);

  // Mostro spinner durante il caricamento
  if (loading)
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  // Mostro errore se presente
  if (error) return <Alert variant="danger">{error}</Alert>;

  // Se nessun profilo, non mostro nulla
  if (!profile) return null;

  return (
    <Container className="mb-2">
      {/* Card con header immagine e info profilo */}
      <Card className="shadow-sm rounded position-relative mb-3">
        <div
          className="card-header-image"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          }}
        ></div>

        {/* Bottone camera disabilitato */}
        <Button
          variant="light"
          className="position-absolute top-0 end-0 m-2 p-2 shadow-sm d-flex align-items-center justify-content-center camera-button"
          disabled
        >
          <i className="bi bi-camera-fill text-primary fs-5"></i>
        </Button>

        <Card.Body className="pt-5 px-3 px-md-4">
          <Row>
            {/* Foto profilo */}
            <Col xs={12} className="text-center text-md-start pb-3 d-flex justify-content-center justify-content-md-start">
              <div
                style={{
                  marginTop: "-150px",
                  position: "relative",
                  width: "160px",
                  height: "160px",
                }}
              >
                <Image src={profile.image} roundedCircle style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                {/* Bottone "+" disabilitato */}
                <Button
                  variant="light"
                  className="position-absolute d-flex align-items-center justify-content-center rounded-circle shadow profile-plus-button"
                  style={{ width: "50px", height: "50px", fontSize: "30px", bottom: "0", right: "0" }}
                  disabled
                >
                  +
                </Button>
              </div>
            </Col>

            {/* Dati testuali profilo */}
            <Col xs={12} md={10} className="text-center text-md-start mt-3 mt-md-0">
              <h5 className="mb-1 fs-3">
                {profile.name} {profile.surname}
              </h5>
              <p className="text-muted mb-1">{profile.title}</p>
              <p className="text-muted mb-2">
                {profile.area} -{" "}
                <a href="#" className="text-primary link-no-underline fw-semibold">
                  Informazioni di contatto
                </a>
              </p>

              {/* Bottoni azione */}
              <div className="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-md-start gap-1 overflow-auto">
                <Button variant="outline-primary" size="sm" className="rounded-pill px-2">
                  Disponibile per
                </Button>
                <Button variant="outline-primary" size="sm" className="rounded-pill px-2">
                  Aggiungi sezione del profilo
                </Button>
                <Button variant="outline-primary" size="sm" className="rounded-pill px-2">
                  Migliora profilo
                </Button>
                <Button variant="outline-secondary" size="sm" className="rounded-pill px-2">
                  Risorse
                </Button>
              </div>
            </Col>

            {/* Bottone modifica disabilitato */}
            <Col xs={12} md={2} className="d-flex justify-content-end align-items-start mt-3 mt-md-0">
              <Button variant="outline-secondary" size="sm" className="edit-button" disabled>
                <i className="bi bi-pencil fs-5"></i>
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Card bio */}
      <Card className="mb-3">
        <Card.Header>
          <strong>Informazioni</strong>
        </Card.Header>
        <Card.Body>
          <p>{profile.bio || "Nessuna informazione disponibile."}</p>
        </Card.Body>
      </Card>

      {/* Card esperienze */}
      <Card className="mb-3">
        <Card.Header>
          <strong>Esperienze</strong>
        </Card.Header>
        <ListGroup variant="flush">
          {experiences.length === 0 && <ListGroup.Item>Nessuna esperienza disponibile.</ListGroup.Item>}
          {experiences.map((exp) => (
            <ListGroup.Item key={exp._id}>
              <div className="d-flex align-items-center">
                {exp.image && <Image src={exp.image} rounded width={48} height={48} className="me-3" alt={exp.role} />}
                <div>
                  <div className="fw-bold">{exp.role}</div>
                  <div>{exp.company}</div>
                  <div className="text-muted" style={{ fontSize: "0.9em" }}>
                    {exp.startDate?.slice(0, 10)} - {exp.endDate ? exp.endDate.slice(0, 10) : "Attuale"}
                  </div>
                  <div className="text-muted" style={{ fontSize: "0.9em" }}>
                    {exp.area}
                  </div>
                  <div>{exp.description}</div>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>

      {/* Card educazione */}
      <Card className="mb-3">
        <Card.Header>
          <strong>Educazione</strong>
        </Card.Header>
        <ListGroup variant="flush">
          {education.length === 0 && <ListGroup.Item>Nessuna educazione disponibile.</ListGroup.Item>}
          {education.map((edu) => (
            <ListGroup.Item key={edu._id}>
              <div className="fw-bold">{edu.school}</div>
              <div>{edu.degree}</div>
              <div className="text-muted" style={{ fontSize: "0.9em" }}>
                {edu.startDate?.slice(0, 10)} - {edu.endDate ? edu.endDate.slice(0, 10) : "Attuale"}
              </div>
              <div>{edu.fieldOfStudy}</div>
              <div>{edu.description}</div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
};

export default UserProfile;
