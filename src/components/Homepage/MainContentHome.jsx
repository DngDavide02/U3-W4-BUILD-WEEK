import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import CreatePostCard from "../Homepage/CreatePostCard";
import CommentsSection from "../Homepage/CommentSection";

// Componente principale che mostra i post e la sezione per crearne di nuovi
const MainContent = () => {
  // Stato per i post caricati
  const [posts, setPosts] = useState([]);
  // Stato per indicare se il caricamento è in corso
  const [loading, setLoading] = useState(true);
  // Stato per eventuali errori di caricamento
  const [error, setError] = useState("");

  // Token preso dalle variabili ambiente
  const token = import.meta.env.VITE_TOKEN;

  // useEffect per caricare i post una volta al montaggio o se cambia il token
  useEffect(() => {
    // Funzione per fetch dei post
    const fetchPosts = async () => {
      try {
        // Chiamata API per ottenere i post
        const response = await fetch("https://striveschool-api.herokuapp.com/api/posts", {
          headers: {
            Authorization: `Bearer ${token}`, // Header con token Bearer
          },
        });

        // Se risposta non OK lancio errore
        if (!response.ok) throw new Error("Errore nel recupero dei post");

        // Converto la risposta in JSON
        const data = await response.json();
        // Inverto l'ordine e prendo i primi 10 post più recenti
        setPosts(data.reverse().slice(0, 10));
      } catch (err) {
        // Setto messaggio errore e loggo errore
        setError("Impossibile caricare i post.");
        console.log(err);
      } finally {
        // Disabilito loading
        setLoading(false);
      }
    };

    // Eseguo fetch
    fetchPosts();
  }, [token]);

  // Funzione chiamata quando viene creato un nuovo post (da CreatePostCard)
  const handleNewPost = (createdPost) => {
    // Aggiungo il nuovo post in cima alla lista
    setPosts((prev) => [createdPost, ...prev]);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={12}>
          {/* Componente per creare un nuovo post */}
          <CreatePostCard token={token} onPostSuccess={handleNewPost} />
        </Col>
      </Row>
      <hr />
      <Row className="justify-content-center mt-4">
        <Col md={12}>
          {/* Spinner di caricamento */}
          {loading && (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          )}

          {/* Messaggio di errore */}
          {error && <p className="text-danger">{error}</p>}

          {/* Lista post, se non sto caricando e non ci sono errori */}
          {!loading &&
            !error &&
            posts.map((post) => (
              <Card className="mb-3" key={post._id}>
                <Card.Body>
                  {/* Info utente autore post */}
                  <div className="d-flex align-items-center mb-2">
                    <img src={post.user?.image} alt={post.user?.username} width={40} height={40} className="rounded-circle me-2" />
                    <div>
                      <strong>
                        {post.user?.name} {post.user?.surname}
                      </strong>
                      <br />
                      <small className="text-muted">@{post.user?.username}</small>
                    </div>
                  </div>

                  {/* Testo del post */}
                  <Card.Text>{post.text}</Card.Text>

                  {/* Immagine se presente */}
                  {post.image && (
                    <div className="text-center mt-3">
                      <img src={post.image} alt="media" style={{ maxWidth: "100%", borderRadius: "8px" }} />
                    </div>
                  )}
                </Card.Body>

                {/* Data pubblicazione */}
                <Card.Footer className="text-muted small">Pubblicato il {new Date(post.createdAt).toLocaleString()}</Card.Footer>

                {/* Sezione commenti per il post */}
                <CommentsSection postId={post._id} token={token} />
              </Card>
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default MainContent;
