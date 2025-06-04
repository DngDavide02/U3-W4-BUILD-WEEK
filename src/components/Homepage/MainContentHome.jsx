import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";

const MainContent = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = import.meta.env.VITE_TOKEN;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://striveschool-api.herokuapp.com/api/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Errore nel recupero dei post");

        const data = await response.json();
        setPosts(data.reverse().slice(0, 10));
      } catch (err) {
        console.error(err);
        setError("Impossibile caricare i post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={12}>
          {loading && (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          )}

          {error && <p className="text-danger">{error}</p>}

          {!loading &&
            !error &&
            posts.map((post) => (
              <Card className="mb-3" key={post._id}>
                <Card.Body>
                  <div className="d-flex align-items-center mb-2">
                    <img src={post.user.image} alt={post.user.username} width={40} height={40} className="rounded-circle me-2" />
                    <div>
                      <strong>
                        {post.user.name} {post.user.surname}
                      </strong>
                      <br />
                      <small className="text-muted">@{post.user.username}</small>
                    </div>
                  </div>

                  <Card.Text>{post.text}</Card.Text>

                  {post.image && (
                    <div className="text-center mt-3">
                      <img src={post.image} alt="media" style={{ maxWidth: "100%", borderRadius: "8px" }} />
                    </div>
                  )}
                </Card.Body>

                <Card.Footer className="text-muted small">Pubblicato il {new Date(post.createdAt).toLocaleString()}</Card.Footer>
              </Card>
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default MainContent;
