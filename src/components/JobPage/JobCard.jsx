import { Container, Row, Col, Card, Button } from "react-bootstrap";

const JobCard = () => {
  return (
    <Container className="mt-3">
      <Row>
        <Col xs={12}>
          <Card className="mb-2 shadow-sm rounded-2">
            <Card.Body>
              <Row className="align-items-center">
                <Col md={8} xs={12} className="text-md-start text-center">
                  <Card.Text className="mb-2 text-muted">Suggerimento per la ricerca di lavoro</Card.Text>

                  <Card.Title className="fw-bold text-dark mb-1 fs-5">Ricevi notifiche sulle offerte di lavoro che ti interessano</Card.Title>

                  <Card.Text className="mb-3 text-muted">Crea un avviso per una qualifica, un’azienda o delle parole chiave</Card.Text>

                  <Button variant="primary" className="px-4 rounded-pill">
                    Crea Avviso
                  </Button>
                </Col>

                <Col md={4} xs={12} className="text-center mt-4 mt-md-0">
                  <img src="../src/assets/cardimage.png" alt="Suggerimento avvisi" className="img-fluid" style={{ maxHeight: "120px" }} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default JobCard;
