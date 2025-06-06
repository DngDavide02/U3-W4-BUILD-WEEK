import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Card, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { setProfile } from "../../redux/actions/userAction";

// Componente pagina ricerca lavoro con elenco offerte e profilo utente
const JobSearchPage = () => {
  // Stato per memorizzare le offerte di lavoro
  const [jobs, setJobs] = useState([]);
  // Stato per indicare il caricamento
  const [loading, setLoading] = useState(true);

  // Profilo utente dal Redux store
  const profile = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  // Token dalle variabili ambiente
  const token = import.meta.env.VITE_TOKEN;

  // useEffect per fetch profilo utente all'avvio o se profile non è presente
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Chiamata API per il profilo corrente
        const response = await fetch("https://striveschool-api.herokuapp.com/api/profile/me", {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization header
          },
        });

        if (!response.ok) throw new Error("Errore caricamento profilo");

        const data = await response.json();
        // Aggiorna il profilo nel Redux store
        dispatch(setProfile(data));
      } catch (error) {
        console.error("Errore fetch profilo:", error);
      }
    };

    // Se non c'è profilo, lo carico
    if (!profile) {
      fetchProfile();
    }
  }, [dispatch, profile, token]);

  // useEffect per caricare le offerte di lavoro una sola volta all'avvio
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Chiamata API per offerte di lavoro categoria "writing"
        const response = await fetch("https://strive-benchmark.herokuapp.com/api/jobs?category=writing&limit=20");
        const data = await response.json();
        // Salvo i lavori nello stato
        setJobs(data.data);
      } catch (error) {
        console.error("Errore durante il fetch dei lavori:", error);
      } finally {
        // Disabilito loading
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <Container>
      <Row>
        <Col xs={12}>
          {/* Spinner di caricamento */}
          {loading && <Spinner animation="border" />}

          {/* Lista offerte di lavoro se caricate */}
          {!loading && jobs.length > 0 && (
            <Card className="mb-2 shadow-sm rounded-2">
              <Card.Body>
                <Card.Title className="text-dark fw-bold fs-4 mb-2">Altre offerte di lavoro per te</Card.Title>
                <Card.Text className="text-muted ">In base al tuo profilo, alle tue preferenze e ad attività come candidature, ricerche e salvataggi</Card.Text>

                {/* Lista delle offerte */}
                <ListGroup variant="flush" className="text-start">
                  {jobs.map((job) => (
                    <ListGroup.Item key={job._id} className="py-3 px-2 border-bottom border-light list-job-item" style={{ transition: "background 0.2s" }}>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          {/* Titolo lavoro */}
                          <div className="fw-semibold text-primary fs-5 mb-1">{job.title}</div>
                          {/* Nome azienda */}
                          <div className="text-muted mb-1">{job.company_name}</div>
                          {/* Descrizione valutazione attività candidature */}
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

      {/* Stile per effetto hover sugli elementi della lista */}
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
