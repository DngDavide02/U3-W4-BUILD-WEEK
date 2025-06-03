import React, { useEffect, useState } from "react";
import "./ProfileHeader.css";
import { Container, Row, Col, Card, Button, Image, Spinner, Alert } from "react-bootstrap";

function MyProfileCard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = import.meta.env.VITE_TOKEN;

  const fetchProfile = async () => {
    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/profile/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Errore nel recupero del profilo");
      }

      const data = await response.json();
      setProfile(data);
    } catch (err) {
      setError(err.message || "Errore sconosciuto");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container>
      <Card className="shadow-sm rounded position-relative">
        <div
          className="card-header-image"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1531746790731-6c087fecd65a?fit=crop&w=800&q=80')`,
          }}
        ></div>

        <Button variant="light" className="position-absolute top-0 end-0 m-2 p-2 shadow-sm d-flex align-items-center justify-content-center camera-button">
          <i className="bi bi-camera-fill text-primary fs-5"></i>
        </Button>

        <Card.Body className="pt-5 px-3 px-md-4">
          <Row>
            <Col xs={12} className="text-center text-md-start pb-3 d-flex justify-content-center justify-content-md-start">
              <div style={{ marginTop: "-150px" }}>
                <Image
                  src={profile.image}
                  roundedCircle
                  style={{
                    width: "160px",
                    height: "160px",
                    objectFit: "cover",
                  }}
                />
              </div>
            </Col>

            <Col xs={12} md={11} className="text-center text-md-start mt-3 mt-md-0">
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

            <Col xs={12} md={1} className="d-flex justify-content-end align-items-start mt-3 mt-md-0">
              <Button variant="outline-secondary" size="sm" className="edit-button">
                <i className="bi bi-pen fs-5"></i>
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default MyProfileCard;
