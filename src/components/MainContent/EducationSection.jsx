import { Button, Card, Col, Container, Row, Image } from "react-bootstrap";
import { ArrowRight, Pencil, Plus } from "react-bootstrap-icons";
import epicodeLogo from "/images/epicode-logo.jpeg";

const EducationSection = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Card className="mb-2">
            <Card.Body>
              <div className="d-flex justify-content-between mb-1">
                <div>
                  <Card.Title as="h2" className="h5 fw-bold mb-0 px-2">
                    Formazione
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
              <div className="d-flex align-items-center">
                <Image
                  src={epicodeLogo}
                  style={{
                    width: "50px",
                    height: "50px"
                  }}
                />
                <p className="fw-semibold mb-0 ms-2">EPICODE Institute of Technology</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EducationSection;
