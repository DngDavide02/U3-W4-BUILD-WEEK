import React, { useEffect, useState, useRef } from "react";
import "./ProfileHeader.css";
import { Container, Row, Col, Card, Button, Image, Spinner, Alert, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../redux/store";

function MyProfileCard() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    title: "",
    area: "",
  });

  const fileInputRef = useRef(null);
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
      dispatch(setProfile(data));
      setFormData({
        name: data.name || "",
        surname: data.surname || "",
        title: data.title || "",
        area: data.area || "",
      });
    } catch (err) {
      setError(err.message || "Errore sconosciuto");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Errore durante il salvataggio");
      }

      const updatedProfile = await response.json();
      dispatch(setProfile(updatedProfile));
      setShowModal(false);
    } catch (err) {
      console.error("Errore salvataggio:", err);
      alert("Impossibile salvare le modifiche. Riprova.");
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profile", file);

    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/profile/me/picture", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Errore upload: ${response.status} - ${errorText}`);
      }

      console.log("Upload completato con successo");
      fetchProfile();
    } catch (err) {
      console.error("Errore durante l'upload:", err);
      alert("Errore durante il caricamento dell'immagine:\n" + err.message);
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (error) return <Alert variant="danger">{error}</Alert>;

  if (!profile) return null;

  return (
    <>
      <Container className="mb-2">
        <Card className="shadow-sm rounded position-relative">
          <div
            className="card-header-image"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            }}
          ></div>

          <Button variant="light" className="position-absolute top-0 end-0 m-2 p-2 shadow-sm d-flex align-items-center justify-content-center camera-button">
            <i className="bi bi-camera-fill text-primary fs-5"></i>
          </Button>

          <Card.Body className="pt-5 px-3 px-md-4">
            <Row>
              <Col xs={12} className="text-center text-md-start pb-3 d-flex justify-content-center justify-content-md-start">
                <div style={{ marginTop: "-150px", position: "relative", width: "160px", height: "160px" }}>
                  <Image
                    src={profile.image}
                    roundedCircle
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />

                  <Button
                    variant="light"
                    className="position-absolute d-flex align-items-center justify-content-center rounded-circle shadow profile-plus-button"
                    style={{
                      width: "50px",
                      height: "50px",
                      fontSize: "30px",
                      bottom: "0px",
                      right: "0px",
                    }}
                    onClick={() => fileInputRef.current.click()}
                  >
                    +
                  </Button>

                  <input type="file" accept="image/*" style={{ display: "none" }} ref={fileInputRef} onChange={handleImageUpload} />
                </div>
              </Col>

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

              <Col xs={12} md={2} className="d-flex justify-content-end align-items-start mt-3 mt-md-0">
                <Button variant="outline-secondary" size="sm" className="edit-button" onClick={() => setShowModal(true)}>
                  <i className="bi bi-pencil fs-5"></i>
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title className="mb-3">Modifica Profilo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cognome</Form.Label>
              <Form.Control type="text" name="surname" value={formData.surname} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Titolo</Form.Label>
              <Form.Control type="text" name="title" value={formData.title} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Area</Form.Label>
              <Form.Control type="text" name="area" value={formData.area} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="rounded-pill" variant="secondary" onClick={() => setShowModal(false)}>
            Annulla
          </Button>
          <Button className="rounded-pill" variant="primary" onClick={handleSave}>
            Salva
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyProfileCard;
