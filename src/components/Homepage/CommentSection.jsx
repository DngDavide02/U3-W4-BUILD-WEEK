import { useEffect, useState } from "react";
import { Button, Form, ListGroup, Spinner } from "react-bootstrap";

const CommentsSection = ({ postId, token }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://striveschool-api.herokuapp.com/api/comments?elementId=${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        let data = await res.json();
        data = data.filter((c) => c.elementId === postId);
        const sortedComments = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setComments(sortedComments);
      }
    } catch (err) {
      setComments([]);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setComments([]);
    setLoading(true);
    fetchComments();
  }, [postId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://striveschool-api.herokuapp.com/api/comments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          comment: commentText,
          rate: 5,
          elementId: postId,
        }),
      });
      if (res.ok) {
        setCommentText("");
        fetchComments();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-3 border-top">
      <h6>Commenti</h6>

      {loading ? (
        <Spinner animation="border" size="sm" />
      ) : (
        <>
          {comments.length > 0 ? (
            <ListGroup className="mb-2">
              {comments.slice(0, 3).map((c) => (
                <ListGroup.Item key={c._id}>
                  <strong>{c.author}</strong>: {c.comment}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p className="text-muted">Nessun commento</p>
          )}
        </>
      )}

      <Form onSubmit={handleAddComment}>
        <Form.Group controlId={`comment-${postId}`}>
          <Form.Control type="text" placeholder="Aggiungi un commento..." value={commentText} onChange={(e) => setCommentText(e.target.value)} required />
        </Form.Group>
        <Button type="submit" className="mt-2 rounded-pill px-3" size="sm">
          Invia
        </Button>
      </Form>
    </div>
  );
};

export default CommentsSection;
