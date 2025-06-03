import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { ArrowRight, Pencil, Plus } from "react-bootstrap-icons";

const ExperienceSection = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Card className="mb-2 px-2">
            <Card.Body>
              <div className="d-flex justify-content-between mb-1">
                <div>
                  <Card.Title as="h2" className="h5 fw-bold mb-0">
                    Esperienza
                  </Card.Title>
                </div>

                <div>
                  <Button className="p-0 me-3 bg-transparent border-0 text-dark">
                    <Plus size={34} />
                  </Button>
                  <a href="#" className="text-dark" aria-label="Modifica la sezione Attività">
                    <Pencil size={20} />
                  </a>
                </div>
              </div>
              <p className="mb-0 fw-semibold">Non hai ancora aggiunto nulla su Esperienza</p>
              <small>Le tue esperienze apparariranno qui</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ExperienceSection;
