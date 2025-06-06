import { useState } from "react";
import { Card, Button, Form, Spinner, Container } from "react-bootstrap";
import { useSelector } from "react-redux";

// Componente CreatePostCard per creare un nuovo post con testo e immagine opzionale
const CreatePostCard = ({ onPostSuccess }) => {
  // Stato per il contenuto testuale del post
  const [postContent, setPostContent] = useState("");
  // Stato per l'immagine selezionata (file)
  const [selectedImage, setSelectedImage] = useState(null);
  // Stato per indicare se è in corso il caricamento
  const [loading, setLoading] = useState(false);
  // Stato per gestire eventuali messaggi di errore
  const [error, setError] = useState("");
  // Stato per gestire messaggi di successo
  const [successMessage, setSuccessMessage] = useState("");

  // Token preso dalle variabili ambiente (Vite)
  const token = import.meta.env.VITE_TOKEN;
  // Profilo utente preso dallo store Redux
  const userProfile = useSelector((state) => state.user.profile);

  // Funzione per gestire la creazione del post
  const handleCreatePost = async () => {
    // Se non c'è né testo né immagine, mostro errore e esco
    if (!postContent.trim() && !selectedImage) {
      setError("Scrivi qualcosa o carica un'immagine prima di pubblicare.");
      return;
    }

    setLoading(true); // inizio caricamento
    setError(""); // reset errore
    setSuccessMessage(""); // reset messaggio successo

    try {
      // Prima creo il post con solo testo (o testo di default se vuoto)
      const response = await fetch("https://striveschool-api.herokuapp.com/api/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // token di autorizzazione
        },
        body: JSON.stringify({ text: postContent || "Post senza testo" }),
      });

      // Se la creazione del post fallisce, lancio errore
      if (!response.ok) throw new Error("Errore nella creazione del post");
      const createdPost = await response.json(); // ottengo i dati del post creato
      const postId = createdPost._id; // id del post creato

      // Se è stata selezionata un'immagine, la carico separatamente
      if (selectedImage) {
        const formData = new FormData();
        formData.append("post", selectedImage); // aggiungo l'immagine al form data

        // Invio immagine con una chiamata POST specifica per l'upload
        const imageResponse = await fetch(`https://striveschool-api.herokuapp.com/api/posts/${postId}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // token di autorizzazione
          },
          body: formData,
        });

        // Se il caricamento immagine fallisce, lancio errore
        if (!imageResponse.ok) throw new Error("Post creato, ma caricamento immagine fallito.");
      }

      // Richiedo i dati completi del post creato per avere info aggiornate
      const fullPostResponse = await fetch(`https://striveschool-api.herokuapp.com/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // token di autorizzazione
        },
      });

      // Se non riesco a prendere i dati completi, lancio errore
      if (!fullPostResponse.ok) throw new Error("Post creato, ma impossibile recuperare i dati completi.");

      const fullPost = await fullPostResponse.json();

      // Se i dati dell'utente non sono presenti o sono una stringa (invece che oggetto), assegno il profilo locale
      if (!fullPost.user || typeof fullPost.user === "string") {
        fullPost.user = userProfile;
      }

      // Mostro messaggio di successo, resetto contenuti e immagine selezionata
      setSuccessMessage("Post pubblicato con successo!");
      setPostContent("");
      setSelectedImage(null);

      // Se fornita, chiamo callback per comunicare al genitore il nuovo post
      if (onPostSuccess) onPostSuccess(fullPost);
    } catch (err) {
      // Gestisco gli errori mostrando il messaggio
      setError(err.message || "Errore durante la pubblicazione del post");
    } finally {
      // Finito caricamento
      setLoading(false);
    }
  };

  return (
    <Card className="p-3 shadow-sm">
      <Card.Body>
        {/* Mostro messaggi di errore o successo */}
        {error && <div className="text-danger mb-2 fw-semibold">{error}</div>}
        {successMessage && <div className="text-success mb-2 fw-semibold">{successMessage}</div>}

        {/* Textarea per il contenuto del post */}
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={1}
            placeholder="Crea un Post"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)} // aggiorno stato al cambio testo
            className="rounded-3 shadow-sm"
          />
        </Form.Group>

        <div className="d-flex justify-content-between align-items-center">
          {/* Input file per selezionare immagine */}
          <Form.Group controlId="formFileSm" className="mb-0">
            <Form.Control
              type="file"
              accept="image/*"
              size="sm"
              onChange={(e) => setSelectedImage(e.target.files[0])} // aggiorno stato immagine selezionata
              className="rounded-pill shadow-sm"
              style={{ maxWidth: "200px", fontSize: "0.85rem", padding: "0.25rem 0.5rem" }}
            />
          </Form.Group>

          {/* Bottone per pubblicare il post, disabilitato se in caricamento */}
          <Button variant="primary" onClick={handleCreatePost} disabled={loading} className="px-4 py-2 rounded-pill shadow-sm fw-semibold">
            {/* Mostro spinner se loading, altrimenti testo "Pubblica" */}
            {loading ? <Spinner animation="border" size="sm" /> : "Pubblica"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CreatePostCard;
