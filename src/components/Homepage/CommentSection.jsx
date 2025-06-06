import { useEffect, useState } from "react";
import { Button, Form, ListGroup, Spinner } from "react-bootstrap";

// Componente CommentsSection che riceve postId e token come props
const CommentsSection = ({ postId, token }) => {
  // Stato per la lista dei commenti
  const [comments, setComments] = useState([]);
  // Stato per indicare se i commenti stanno caricando
  const [loading, setLoading] = useState(true);
  // Stato per il testo del commento da inviare
  const [commentText, setCommentText] = useState("");

  // Funzione asincrona per recuperare i commenti dal server
  const fetchComments = async () => {
    setLoading(true); // imposto loading a true prima della fetch
    try {
      // Chiamata API per prendere i commenti relativi al postId
      const res = await fetch(`https://striveschool-api.herokuapp.com/api/comments?elementId=${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // autenticazione con token
        },
      });
      if (res.ok) {
        let data = await res.json(); // converto la risposta in JSON
        data = data.filter((c) => c.elementId === postId); // filtro per sicurezza i commenti con elementId uguale a postId
        // ordino i commenti per data di creazione più recente prima
        const sortedComments = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setComments(sortedComments); // aggiorno lo stato con i commenti ordinati
      }
    } catch (err) {
      setComments([]); // in caso di errore resetto la lista dei commenti
      console.log(err); // stampo l'errore in console
    } finally {
      setLoading(false); // indipendentemente dal risultato, setto loading a false
    }
  };

  // useEffect che si attiva quando cambia postId
  useEffect(() => {
    setComments([]); // resetto i commenti quando cambia postId
    setLoading(true); // imposto loading a true per il nuovo caricamento
    fetchComments(); // chiamo la funzione per caricare i commenti
  }, [postId]);

  // Funzione per gestire l'invio di un nuovo commento
  const handleAddComment = async (e) => {
    e.preventDefault(); // prevengo il comportamento di default del form
    try {
      // chiamata POST per inviare un nuovo commento
      const res = await fetch("https://striveschool-api.herokuapp.com/api/comments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // specifico il tipo di contenuto
          Authorization: `Bearer ${token}`, // autorizzazione con token
        },
        body: JSON.stringify({
          comment: commentText, // testo del commento preso dallo stato
          rate: 5, // voto fisso 5 (non modificabile nel form)
          elementId: postId, // id del post a cui è associato il commento
        }),
      });
      if (res.ok) {
        setCommentText(""); // resetto il campo testo commento
        fetchComments(); // ricarico i commenti per aggiornare la lista
      }
    } catch (err) {
      console.log(err); // loggo eventuali errori
    }
  };

  // Render del componente
  return (
    <div className="p-3 border-top">
      <h6>Commenti</h6>

      {loading ? (
        // Mostro spinner se i commenti stanno caricando
        <Spinner animation="border" size="sm" />
      ) : (
        <>
          {comments.length > 0 ? (
            // Se ci sono commenti, ne mostro al massimo 3 in una lista
            <ListGroup className="mb-2">
              {comments.slice(0, 3).map((c) => (
                <ListGroup.Item key={c._id}>
                  <strong>{c.author}</strong>: {c.comment}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            // Se non ci sono commenti, mostro messaggio di assenza
            <p className="text-muted">Nessun commento</p>
          )}
        </>
      )}

      {/* Form per aggiungere un nuovo commento */}
      <Form onSubmit={handleAddComment}>
        <Form.Group controlId={`comment-${postId}`}>
          <Form.Control
            type="text"
            placeholder="Aggiungi un commento..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)} // aggiorno stato al cambiamento del testo
            required
          />
        </Form.Group>
        <Button type="submit" className="mt-2 rounded-pill px-3" size="sm">
          Invia
        </Button>
      </Form>
    </div>
  );
};

export default CommentsSection;
