import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Card, ListGroup } from "react-bootstrap";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q");

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`https://strive-benchmark.herokuapp.com/api/jobs?search=${searchQuery}&limit=10`);
        const data = await response.json();
        setJobs(data.data);
      } catch (err) {
        setError("Errore durante il caricamento");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) fetchJobs();
  }, [searchQuery]);

  return (
    <Container>
      <Row>
        <Col xs={12}>
          {loading && <Spinner animation="border" />}

          {!loading && !error && jobs.length > 0 && (
            <Card className="mb-2 shadow-sm rounded-2">
              <Card.Body>
                <Card.Title className="text-dark fw-bold fs-4 mb-2">
                  Risultati per: <span className="text-primary">{searchQuery}</span>
                </Card.Title>
                <Card.Text className="text-muted">Offerte di lavoro trovate in base alla tua ricerca</Card.Text>

                <ListGroup variant="flush" className="text-start">
                  {jobs.map((job) => (
                    <ListGroup.Item
                      key={job._id}
                      className="py-3 px-2 border-bottom border-light list-job-item"
                      style={{ transition: "background 0.2s" }}
                      onClick={() => window.open(job.url, "_blank")}
                    >
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <div className="fw-semibold text-primary fs-5 mb-1">{job.title}</div>
                          <div className="text-muted mb-1">{job.company_name}</div>
                          <div className="small mt-1 text-secondary">
                            <i className="bi bi-arrow-clockwise text-success fw-bold me-1"></i>
                            Categoria: {job.category}
                          </div>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          )}

          {!loading && !error && jobs.length === 0 && (
            <p className="text-center mt-4">
              Nessun risultato trovato per: <strong>{searchQuery}</strong>
            </p>
          )}

          {error && <p className="text-danger">{error}</p>}
        </Col>
      </Row>

      <style>{`
        .list-job-item:hover {
          background-color: #f8f9fa;
          cursor: pointer;
        }
      `}</style>
    </Container>
  );
};

export default SearchResults;
