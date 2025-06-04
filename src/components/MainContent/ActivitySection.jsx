import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Form, Modal } from "react-bootstrap";
import { ArrowRight, Pencil } from "react-bootstrap-icons";

const ActivitySection = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [lastExperience, setLastExperience] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [postContent, setPostContent] = useState("");

  const token = import.meta.env.VITE_TOKEN;

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch("https://striveschool-api.herokuapp.com/api/profile/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Errore nel recupero del profilo");
        }

        const profile = await response.json();
        setUserId(profile._id);
      } catch (err) {
        console.error("Errore nel fetch del profilo:", err);
        setError("Impossibile ottenere l'ID utente.");
      }
    };

    fetchUserId();
  }, [token]);

  useEffect(() => {
    const fetchLastExperience = async () => {
      if (!userId) return;

      try {
        const res = await fetch(`https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error("Errore nel recupero delle esperienze");
        }

        const data = await res.json();
        const latest = data[data.length - 1];
        setLastExperience(latest);
      } catch (err) {
        console.error("Errore nel recupero del post:", err);
      }
    };

    fetchLastExperience();
  }, [userId]);

  const handleCreatePost = async () => {
    if (!userId) {
      setError("ID utente non disponibile.");
      return;
    }

    if (!postContent.trim() && !selectedImage) {
      setError("Scrivi qualcosa o carica un'immagine prima di pubblicare.");
      return;
    }

    const newExperience = {
      role: postContent || "Post senza testo",
      company: "Post personale",
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      description: postContent || "Nessuna descrizione",
      area: "Italia",
    };

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newExperience),
      });

      if (!response.ok) {
        throw new Error("Errore nella creazione del post");
      }

      const createdExp = await response.json();
      const expId = createdExp._id;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("experience", selectedImage);

        const imageResponse = await fetch(`https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences/${expId}/picture`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!imageResponse.ok) {
          throw new Error("Esperienza creata, ma caricamento immagine fallito.");
        }
      }

      const experiencesRes = await fetch(`https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!experiencesRes.ok) {
        throw new Error("Esperienza creata, ma non è stato possibile recuperare i dettagli.");
      }

      const experiences = await experiencesRes.json();
      const latest = experiences[experiences.length - 1];
      setLastExperience(latest);

      setSuccessMessage("Esperienza e immagine caricate con successo!");
      setSelectedImage(null);
      setPostContent("");
      setShowModal(false);
    } catch (err) {
      console.error(err);
      setError(err.message || "Errore durante la creazione del post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card className="mb-2 px-2">
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <div>
                  <Card.Title as="h2" className="h5 fw-bold mb-0">
                    Attività
                  </Card.Title>
                  <small className="text-primary fw-semibold">62 follower</small>
                </div>

                <div>
                  <Button variant="outline-primary rounded-pill p-1 px-3 me-3" onClick={() => setShowModal(true)} disabled={!userId}>
                    Crea un post
                  </Button>
                  <a href="#" className="text-dark" aria-label="Modifica la sezione Attività">
                    <Pencil size={20} />
                  </a>
                </div>
              </div>

              {error && <div className="text-danger mb-2">{error}</div>}
              {successMessage && <div className="text-success mb-2">{successMessage}</div>}

              {!lastExperience && (
                <>
                  <p className="mb-0 fw-semibold">Non hai ancora pubblicato nulla</p>
                  <small>I post che condividi appariranno qui</small>
                </>
              )}
            </Card.Body>

            <Card.Footer className="text-center border-top py-2 card-footer">
              <a href="#" className="text-decoration-none fw-semibold text-dark">
                Mostra tutte le attività <ArrowRight size={16} />
              </a>
            </Card.Footer>
          </Card>

          {lastExperience && (
            <Card className="mb-2">
              <Card.Body>
                <Card.Text>
                  <strong>Contenuto:</strong> {lastExperience.description}
                </Card.Text>
                <Card.Text>
                  <strong>Data:</strong> {lastExperience.startDate.slice(0, 10)}
                </Card.Text>
                {lastExperience.image && (
                  <div className="mt-2">
                    <img src={lastExperience.image} alt="Esperienza" style={{ maxWidth: "100%", borderRadius: "8px" }} />
                  </div>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Nuovo post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Contenuto del post</Form.Label>
            <Form.Control as="textarea" rows={3} value={postContent} onChange={(e) => setPostContent(e.target.value)} placeholder="Scrivi il tuo post qui..." />
          </Form.Group>
          <Form.Group>
            <Form.Label>Carica un'immagine</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={(e) => setSelectedImage(e.target.files[0])} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)} disabled={loading}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={handleCreatePost} disabled={loading}>
            {loading ? "Pubblicazione..." : "Pubblica"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ActivitySection;
