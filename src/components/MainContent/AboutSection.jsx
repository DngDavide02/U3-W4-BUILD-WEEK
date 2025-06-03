import { Card, Col, Container, Row } from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";

const AboutSection = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <Card.Title as="h2" className="h5 fw-bold mb-0">
                  Informazioni
                </Card.Title>

                <a href="#" className="text-muted" aria-label="Modifica la sezione Informazioni">
                  <Pencil size={20} />
                </a>
              </div>
              <small className="mb-0">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste ad quas nam tenetur! Voluptate corporis accusamus quae expedita deserunt voluptas
                id doloremque, minus mollitia ratione in dolore ut omnis nobis.
              </small>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default AboutSection;
