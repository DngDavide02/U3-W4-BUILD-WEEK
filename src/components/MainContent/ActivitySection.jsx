import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { ArrowRight, Pencil } from "react-bootstrap-icons";

const ActivitySection = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Card className="mb-2 px-2">
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <div>
                  <Card.Title as="h2" className="h5 fw-bold mb-0">
                    Attività
                  </Card.Title>
                  <small className="text-primary fw-semibold">62 follower</small>
                </div>

                <div>
                  <Button variant="outline-primary rounded-pill p-1 px-3 me-3">Crea un post</Button>
                  <a href="#" className="text-dark" aria-label="Modifica la sezione Attività">
                    <Pencil size={20} />
                  </a>
                </div>
              </div>
              <p className="mb-0 fw-semibold">Non hai ancora pubblicato nulla</p>
              <small>I post che condividi apparariranno qui</small>
            </Card.Body>
            <Card.Footer className="text-center border-top py-2 card-footer">
              <a href="#" className="text-decoration-none fw-semibold text-dark">
                Mostra tutte le attività <ArrowRight size={16} />
              </a>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ActivitySection;
