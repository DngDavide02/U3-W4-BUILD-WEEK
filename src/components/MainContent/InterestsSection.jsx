import { useState } from "react";
import { Button, Card, Col, Container, Image, Row, Tab, Tabs } from "react-bootstrap";
import { ArrowRight, CheckLg } from "react-bootstrap-icons";
import epicodeLogo from "/images/epicode-logo.jpeg";

const InterestSection = () => {
  const [activeKey, setActiveKey] = useState("Aziende"); // default state

  const aziende = [
    {
      id: 1,
      name: "IBM",
      followers: "18.328.030",
      logo: "https://media.licdn.com/dms/image/v2/D560BAQGiz5ecgpCtkA/company-logo_200_200/company-logo_200_200/0/1688684715866/ibm_logo?e=1754524800&v=beta&t=zMNZqMpWhOSucYySEgKVUvyyULcRcOX2_v8YQGYT98A"
    },
    {
      id: 2,
      name: "Accenture",
      followers: "13.293.208",
      logo: "https://media.licdn.com/dms/image/v2/D560BAQHBaq4KbfWSmQ/company-logo_200_200/B56Zcd2K6nGoAM-/0/1748552430276/accenture_logo?e=1754524800&v=beta&t=V0mc9oRZrWrp7U8Ep8KE5SCTchRggvJAjiClhz8yMrM"
    }
  ];

  const scuole = [{ id: 1, name: "EPICODE Institute of Technology", followers: "19.550", logo: epicodeLogo }];

  const newsletter = [{ id: 1, name: "Tech Weekly", followers: "50.000", logo: epicodeLogo }];

  const gruppi = [{ id: 1, name: "React Developers", members: "25.000", logo: epicodeLogo }];

  // function for the Card.Footer
  const getFooterLink = () => {
    switch (activeKey) {
      case "Aziende":
        return { text: "Mostra tutte le aziende", href: "#aziende" };
      case "Scuole o università":
        return { text: "Mostra tutte le scuole o università", href: "#scuole" };
      case "Newsletter":
        return { text: "Mostra tutte le newsletter", href: "#newsletter" };
      case "Gruppi":
        return null; // No footer per Gruppi
      default:
        return null;
    }
  };

  const footerLink = getFooterLink();

  // Componente riutilizzabile per un singolo item di interesse
  const InterestItem = ({ logo, name, followers, members }) => (
    <div className="d-flex align-items-start mb-3">
      <Image src={logo} alt={`${name} logo`} style={{ width: "48px", height: "48px", objectFit: "contain" }} className="me-3" />
      <div>
        <h6 className="fw-bold mb-0">{name}</h6>
        <p className="text-muted small mb-2">{followers ? `${followers} follower` : `${members} membri`}</p>
        <Button variant="outline-secondary" className="rounded-pill px-3 py-1">
          <CheckLg className="me-1" /> Già segui
        </Button>
      </div>
    </div>
  );

  return (
    <Container>
      <Row>
        <Col>
          <Card className="mb-2 px-2">
            <Card.Body className="pb-0">
              <Card.Title as="h2" className="h5 fw-bold mb-3">
                Interessi
              </Card.Title>
              <Tabs activeKey={activeKey} onSelect={(k) => setActiveKey(k)} id="interest-tabs" className="mb-3 custom-interest-tabs" transition={false}>
                <Tab eventKey="Aziende" title="Aziende">
                  <Row>
                    {aziende.map((item) => (
                      <Col md={6} key={item.id}>
                        <InterestItem {...item} />
                      </Col>
                    ))}
                  </Row>
                </Tab>
                <Tab eventKey="Gruppi" title="Gruppi">
                  <Row>
                    {gruppi.map((item) => (
                      <Col md={6} key={item.id}>
                        <InterestItem {...item} members={item.members} />
                      </Col>
                    ))}
                  </Row>
                </Tab>
                <Tab eventKey="Newsletter" title="Newsletter">
                  <Row>
                    {newsletter.map((item) => (
                      <Col md={6} key={item.id}>
                        <InterestItem {...item} />
                      </Col>
                    ))}
                  </Row>
                </Tab>
                <Tab eventKey="Scuole o università" title="Scuole o università">
                  <Row>
                    {scuole.map((item) => (
                      <Col md={6} key={item.id}>
                        <InterestItem {...item} />
                      </Col>
                    ))}
                  </Row>
                </Tab>
              </Tabs>
            </Card.Body>
            {footerLink && ( // Mostra il footer solo se footerLink non è null, quindi no footer per Gruppi
              <Card.Footer className="text-center card-footer border-top py-2">
                <a href={footerLink.href} className="text-decoration-none fw-semibold text-dark">
                  {footerLink.text} <ArrowRight size={16} className="align-middle" />
                </a>
              </Card.Footer>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default InterestSection;
