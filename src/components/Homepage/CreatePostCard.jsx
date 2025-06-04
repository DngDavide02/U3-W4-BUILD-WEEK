import { useState } from "react";
import { Card, Button, Form, Spinner, Container } from "react-bootstrap";

const CreatePostCard = ({ token, onPostSuccess }) => {
  const [postContent, setPostContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleCreatePost = async () => {
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
      setPostContent("");
      setSelectedImage(null);

      if (onPostSuccess) onPostSuccess(createdPost);
    } catch (err) {
      console.error(err);
      setError(err.message || "Errore durante la pubblicazione del post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card className="mb-4 p-3 shadow-sm ">
        <Card.Body>
          {error && <div className="text-danger mb-2 fw-semibold">{error}</div>}
          {successMessage && <div className="text-success mb-2 fw-semibold">{successMessage}</div>}

          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={1}
              placeholder="Crea un Post"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="rounded-3 shadow-sm"
            />
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center">
            <Form.Group controlId="formFileSm" className="mb-0">
              <Form.Control
                type="file"
                accept="image/*"
                size="sm"
                onChange={(e) => setSelectedImage(e.target.files[0])}
                className="rounded-pill shadow-sm"
                style={{ maxWidth: "200px", fontSize: "0.85rem", padding: "0.25rem 0.5rem" }}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleCreatePost} disabled={loading} className="px-4 py-2 rounded-pill shadow-sm fw-semibold">
              {loading ? <Spinner animation="border" size="sm" /> : "Pubblica"}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreatePostCard;
