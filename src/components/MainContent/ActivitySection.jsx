import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Form, Modal } from "react-bootstrap";
import { ArrowRight, Pencil, Trash } from "react-bootstrap-icons";

const ActivitySection = () => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [postContent, setPostContent] = useState("");

  const token = import.meta.env.VITE_TOKEN;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://striveschool-api.herokuapp.com/api/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Errore nel recupero del profilo");

        const profile = await response.json();
        setUserId(profile._id);
        setUserName(`${profile.name} ${profile.surname}`);
      } catch (err) {
        console.error(err);
        setError("Impossibile ottenere il profilo utente.");
      }
    };

    fetchUserData();
  }, [token]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch("https://striveschool-api.herokuapp.com/api/posts/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Errore nel recupero dei post");

        const posts = await response.json();
        const myPosts = posts.filter((p) => p.user._id === userId);
        setUserPosts(myPosts.reverse());
      } catch (err) {
        console.error(err);
      }
    };

    if (userId) fetchUserPosts();
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

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: postContent || "Post senza testo" }),
      });

      if (!response.ok) throw new Error("Errore nella creazione del post");

      const createdPost = await response.json();
      const postId = createdPost._id;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("post", selectedImage);

        const imageResponse = await fetch(`https://striveschool-api.herokuapp.com/api/posts/${postId}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!imageResponse.ok) throw new Error("Post creato, ma caricamento immagine fallito.");
      }

      setSuccessMessage("Post pubblicato con successo!");
      setSelectedImage(null);
      setPostContent("");
      setShowModal(false);

      const updatedPosts = await fetch("https://striveschool-api.herokuapp.com/api/posts/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const posts = await updatedPosts.json();
      const myPosts = posts.filter((p) => p.user._id === userId);
      setUserPosts(myPosts.reverse());
    } catch (err) {
      console.error(err);
      setError(err.message || "Errore durante la pubblicazione del post");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    const confirmDelete = window.confirm("Sei sicuro di voler eliminare questo post?");
    if (!confirmDelete) return;

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Errore durante l'eliminazione del post");

      setSuccessMessage("Post eliminato con successo.");
      setUserPosts((prevPosts) => prevPosts.filter((p) => p._id !== postId));
    } catch (err) {
      console.error(err);
      setError(err.message || "Errore durante l'eliminazione del post");
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
                  <a href="#" className="text-dark">
                    <Pencil size={20} />
                  </a>
                </div>
              </div>

              {error && <div className="text-danger mb-2">{error}</div>}
              {successMessage && <div className="text-success mb-2">{successMessage}</div>}

              {userPosts.length === 0 && (
                <>
                  <p className="mb-0 fw-semibold">Non hai ancora pubblicato nulla</p>
                  <small>I post che condividi appariranno qui</small>
                </>
              )}
            </Card.Body>

            <Card.Footer className="text-center border-top py-2">
              <a href="#" className="text-decoration-none fw-semibold text-dark">
                Mostra tutte le attività <ArrowRight size={16} />
              </a>
            </Card.Footer>
          </Card>

          {userPosts.map((post) => (
            <Card className="mb-2" key={post._id}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <span className="fw-semibold fs-4">{userName || "Nome non disponibile"}</span>
                  <div className="d-flex align-items-center gap-2">
                    <span className="text-muted small">{new Date(post.createdAt).toLocaleDateString()}</span>
                    <Button variant="outline-danger" size="sm" className="p-1" onClick={() => handleDeletePost(post._id)}>
                      <Trash size={16} />
                    </Button>
                  </div>
                </div>

                <div className="mt-2">
                  <Card.Text>{post.text}</Card.Text>
                </div>

                {post.image && (
                  <div className="mt-3 text-center">
                    <img src={post.image} alt="Post" style={{ maxWidth: "100%", borderRadius: "8px" }} />
                  </div>
                )}
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-semibold text-primary">Nuovo post</Modal.Title>
        </Modal.Header>

        <Modal.Body className="pt-2">
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Contenuto del post</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Scrivi il tuo post qui..."
              className="rounded-3 shadow-sm"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className="fw-semibold">Carica un'immagine</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={(e) => setSelectedImage(e.target.files[0])} className="rounded-3" />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer className="border-0 pt-0">
          <Button variant="outline-secondary" onClick={() => setShowModal(false)} className="rounded-pill px-4" disabled={loading}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={handleCreatePost} className="rounded-pill px-4" disabled={loading}>
            {loading ? "Pubblicazione..." : "Pubblica"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ActivitySection;
