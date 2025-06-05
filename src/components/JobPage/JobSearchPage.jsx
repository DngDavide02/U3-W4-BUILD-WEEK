import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Card, ListGroup, Image, InputGroup, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { setProfile } from "../../redux/actions/userAction";

const JobSearchPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const profile = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  const token = import.meta.env.VITE_TOKEN;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("https://striveschool-api.herokuapp.com/api/profile/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Errore caricamento profilo");

        const data = await response.json();
        dispatch(setProfile(data));
      } catch (error) {
        console.error("Errore fetch profilo:", error);
      }
    };

    if (!profile) {
      fetchProfile();
    }
  }, [dispatch, profile, token]);

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
        <Col xs={3} className="mb-4">
          <Card className="mb-2 shadow-sm">
            <Card.Body className="text-center">
              <div className="mb-2">
                <Image src={profile?.image} roundedCircle width={70} height={70} style={{ objectFit: "cover" }} alt="profile" />
              </div>
              <Card.Title className="mb-0 fs-5">{profile ? `${profile.name} ${profile.surname}` : "Nome Cognome"}</Card.Title>
              <Card.Text className="text-muted mb-1" style={{ fontSize: "0.95em" }}>
                {profile?.title || "Titolo professionale"}
              </Card.Text>
              <Card.Text className="text-muted" style={{ fontSize: "0.9em" }}>
                {profile?.area || "Area"}
              </Card.Text>
              <InputGroup>
                <Form.Control placeholder="+ Aggiungi esperienza" aria-label="Username" aria-describedby="basic-addon1" />
              </InputGroup>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title className="text-dark fw-semibold  mb-3 p-1" style={{ fontSize: "1.1rem" }}>
                <i className="bi bi-list-ul"></i> Preferenze
              </Card.Title>
              <Card.Title className="text-dark fw-semibold  mb-4 p-1" style={{ fontSize: "1.1rem" }}>
                <i className="bi bi-bookmark-fill"></i>Le mie offerte di lavoro
              </Card.Title>
              <hr />
              <Card.Title className="text-dark fw-semibold  mb-3 p-1">
                <a href="" style={{ fontSize: "1.1rem", textDecoration: "none" }}>
                  <i className="bi bi-pencil-square"></i> Pubblica offerta gratuita
                </a>
              </Card.Title>
            </Card.Body>
          </Card>
          <footer className=" small  py-2  mb-2 text-center">
            <ul className="list-unstyled footer-spaced-links text-muted">
              <li>
                <a href="#" className="footer-home">
                  Informazioni
                </a>
                <a href="#" className="footer-home">
                  Accessibilità
                </a>
              </li>
              <li>
                <a href="#" className="footer-home">
                  Centro assistenza
                </a>
                <a href="#" className="footer-home">
                  Privacy e condizioni <i className="bi bi-caret-down-fill"></i>
                </a>
              </li>
              <li>
                <a href="#" className="footer-home">
                  Opzioni per gli annunci pubblicitari
                </a>
              </li>
              <li>
                <a href="#" className="footer-home">
                  Pubblicità
                </a>
                <a href="#" className="footer-home">
                  Servizi alle aziende <i className="bi bi-caret-down-fill"></i>
                </a>
              </li>
              <li>
                <a href="#" className="footer-home">
                  Scarica l’app LinkedIn
                </a>
                <a href="#" className="footer-home">
                  Altro
                </a>
              </li>
            </ul>
            <div className="text-center text-muted small mt-3">
              <img src="src\assets\linkedin.png" alt="logo" className="m-2" />
              LinkedIn Corporation © {new Date().getFullYear()}
            </div>
          </footer>
          {/* Fine Cose fatte */}
        </Col>
        <Col xs={9}>
          {loading && <Spinner animation="border" />}

          {!loading && jobs.length > 0 && (
            <Card className="mb-2 shadow-sm rounded-2">
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
