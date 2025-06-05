import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Card, ListGroup, Badge } from "react-bootstrap";

const JobSearchPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("https://strive-benchmark.herokuapp.com/api/jobs?category=writing&limit=20");
        const data = await response.json();
        setJobs(data.data);
      } catch (error) {
        console.error("Errore durante il fetch dei lavori:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        <Col xs={12}>
          {loading && <Spinner animation="border" />}

          {!loading && jobs.length > 0 && (
            <Card className="mb-2 shadow-sm rounded-4">
              <Card.Body>
                <Card.Title className="text-dark fw-bold fs-4 mb-2">Altre offerte di lavoro per te</Card.Title>
                <Card.Text className="text-muted ">In base al tuo profilo, alle tue preferenze e ad attività come candidature, ricerche e salvataggi</Card.Text>

                <ListGroup variant="flush" className="text-start">
                  {jobs.map((job) => (
                    <ListGroup.Item key={job._id} className="py-3 px-2 border-bottom border-light list-job-item" style={{ transition: "background 0.2s" }}>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <div className="fw-semibold text-primary fs-5 mb-1">{job.title}</div>
                          <div className="text-muted mb-1">{job.company_name}</div>
                          <div className="small mt-1">
                            <span className="text-secondary">
                              <i className="bi bi-arrow-clockwise text-success fw-bold me-1"></i>
                              Valutazione attività delle candidature
                            </span>
                          </div>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          )}
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

export default JobSearchPage;
