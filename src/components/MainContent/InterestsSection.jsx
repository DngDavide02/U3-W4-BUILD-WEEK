import { Button, Card, Col, Container, Image, Row, Tab, Tabs } from "react-bootstrap";
import { ArrowRight, CheckLg, PlusLg } from "react-bootstrap-icons";
import epicodeLogo from "../../../public/images/epicode-logo.jpeg";

const InterestSection = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Card className="mb-2 px-2">
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <div>
                  <Card.Title as="h2" className="h5 fw-bold mb-2">
                    Attività
                  </Card.Title>
                </div>
              </div>
              <Tabs defaultActiveKey="Aziende" transition={false} id="noanim-tab-example" className="mb-3 custom-tabs">
                <Tab eventKey="Aziende" title="Aziende">
                  <Row className="p-0">
                    <Col>
                      <Row className="p-0">
                        <Col xs={2} className="p-0">
                          <Image src={epicodeLogo} className="w-100 ms-2" />
                        </Col>
                        <Col xs={10}>
                          <h4 className="m-0">EPICODE</h4>
                          <p className="m-0"> 19.550 follower</p>
                          <Button className="me-3 bg-transparent text-dark border border-dark rounded-pill">
                            <CheckLg className="me-2" />
                            Già segui
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <Row className="p-0">
                        <Col xs={2} className="p-0 ">
                          <Image src={epicodeLogo} className="w-100 ms-2" />
                        </Col>
                        <Col xs={10}>
                          <h4 className="m-0">EPICODE</h4>
                          <p className="m-0"> 19.550 follower</p>
                          <Button className="me-3 bg-transparent text-dark border border-dark rounded-pill">
                            <CheckLg className="me-2" />
                            Già segui
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Tab>
                <Tab eventKey="Scuole o università" title="Scuole o università" className="p-0">
                  <Row>
                    <Col>
                      <Row>
                        <Col xs={2} className="p-0 ">
                          <Image src={epicodeLogo} className="w-100 ms-2" />
                        </Col>
                        <Col xs={10}>
                          <h4 className="m-0">EPICODE</h4>
                          <p className="m-0"> 19.550 follower</p>
                          <Button className="me-3 bg-transparent text-dark border border-dark  rounded-pill">
                            <CheckLg className="me-2" />
                            Già segui
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <Row>
                        <Col xs={2} className="p-0 ">
                          <Image src={epicodeLogo} className="w-100 ms-2" />
                        </Col>
                        <Col xs={10}>
                          <h4 className="m-0">EPICODE</h4>
                          <p className="m-0"> 19.550 follower</p>
                          <Button className="me-3 bg-transparent text-dark border border-dark  rounded-pill">
                            <CheckLg className="me-2" />
                            Già segui
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Tab>
              </Tabs>
            </Card.Body>
            <Card.Footer className="text-center border-top py-2 card-footer">
              <a href="#" className="text-decoration-none fw-semibold text-dark">
                Mostra tutte le aziende <ArrowRight size={16} />
              </a>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default InterestSection;
