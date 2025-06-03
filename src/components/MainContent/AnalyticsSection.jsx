import { Card, Row, Col, Container } from "react-bootstrap";

import { EyeFill, PeopleFill, BarChartLineFill, Search, ArrowRight } from "react-bootstrap-icons";

const AnalyticsSection = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Card className="mb-2 px-2">
            <Card.Body>
              <Card.Title as="h2" className="h5 fw-bold mb-0">
                Analisi
              </Card.Title>
              <p className="text-muted small mb-3">
                <EyeFill size={16} className="me-1 align-text-bottom" />
                Solo per te
              </p>

              <Row>
                <Col xs={12} md={4}>
                  <div className="d-flex">
                    <PeopleFill size={24} />
                    <div className="ms-2">
                      <p className="fw-bold mb-0">5 visualizzazioni del profilo</p>
                      <small className="d-block">Scopri chi ha visitato il tuo profilo.</small>
                    </div>
                  </div>
                </Col>

                <Col xs={12} md={4}>
                  <div className="d-flex">
                    <BarChartLineFill size={24} />
                    <div className="ms-2">
                      <p className="fw-bold mb-0">0 impressioni del post</p>
                      <small className="text-muted d-block">Crea un post per aumentare l'interesse.</small>
                      <small className="text-muted d-block">Ultimi 7 giorni</small>
                    </div>
                  </div>
                </Col>

                <Col xs={12} md={4}>
                  <div className="d-flex">
                    <Search size={24} />
                    <div className="ms-2">
                      <p className="fw-bold mb-0">4 comparse nei motori di ricerca</p>
                      <small className="text-muted d-block">Vedi quante volte compari nei risultati di ricerca.</small>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="text-center border-top py-2 card-footer">
              <a href="#" className="text-decoration-none fw-semibold text-dark">
                Mostra tutte le analisi <ArrowRight size={16} className="align-middle" />
              </a>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AnalyticsSection;
