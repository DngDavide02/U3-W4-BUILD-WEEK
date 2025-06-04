import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Form } from "react-bootstrap";
import { ArrowRight, Pencil } from "react-bootstrap-icons";

const ActivitySection = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [lastExperience, setLastExperience] = useState(null);

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

  const handleCreatePost = async () => {
    if (!userId || !selectedImage) {
      setError("Seleziona un'immagine prima di creare il post.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    const newExperience = {
      role: "Frontend Developer",
      company: "OpenAI",
      startDate: "2023-01-01",
      endDate: "2024-01-01",
      description: "Ho lavorato alla creazione di interfacce utente avanzate.",
      area: "San Francisco",
    };

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
                  <Button variant="outline-primary rounded-pill p-1 px-3 me-3" onClick={handleCreatePost} disabled={loading || !userId}>
                    {loading ? "Caricamento..." : "Crea un post"}
                  </Button>
                  <a href="#" className="text-dark" aria-label="Modifica la sezione Attività">
                    <Pencil size={20} />
                  </a>
                </div>
              </div>

              <Form.Group controlId="formFile" className="mb-2">
                <Form.Label>Carica immagine post</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={(e) => setSelectedImage(e.target.files[0])} />
              </Form.Group>

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
                <Card.Title>
                  {lastExperience.role} @ {lastExperience.company}
                </Card.Title>
                <Card.Text>{lastExperience.description}</Card.Text>
                <Card.Text>
                  <strong>Periodo:</strong> {lastExperience.startDate.slice(0, 10)} - {lastExperience.endDate.slice(0, 10)}
                </Card.Text>
                <Card.Text>
                  <strong>Area:</strong> {lastExperience.area}
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
    </Container>
  );
};

export default ActivitySection;
