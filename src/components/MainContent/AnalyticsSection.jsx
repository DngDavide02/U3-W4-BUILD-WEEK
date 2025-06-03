// src/components/AnalyticsSection.jsx
import React from "react";
import { Card, Row, Col, Container } from "react-bootstrap";

import { EyeFill, PeopleFill, BarChartLineFill, Search, ArrowRight } from "react-bootstrap-icons";

const AnalyticsSection = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title as="h2" className="h5 fw-bold mb-0">
                Analytics
              </Card.Title>
              <p className="text-muted small mb-3">
                <EyeFill size={16} className="me-1 align-text-bottom" />
                Private to you
              </p>

              <Row>
                <Col xs={12} md={4}>
                  <div className="d-flex">
                    <PeopleFill size={24} className="text-muted me-2 mt-1" />
                    <div>
                      <p className="fw-bold mb-0">5 profile views</p>
                      <small className="d-block">Discover who's viewed your profile.</small>
                    </div>
                  </div>
                </Col>

                <Col xs={12} md={4}>
                  <div className="d-flex">
                    <BarChartLineFill size={24} className="text-muted me-2 mt-1" />
                    <div>
                      <p className="fw-bold mb-0">0 post impressions</p>
                      <small className="text-muted d-block">Start a post to increase engagement.</small>
                      <small className="text-muted d-block">Past 7 days</small>
                    </div>
                  </div>
                </Col>

                <Col xs={12} md={4}>
                  <div className="d-flex">
                    <Search size={24} className="text-muted me-2 mt-1" />
                    <div>
                      <p className="fw-bold mb-0">4 search appearances</p>
                      <small className="text-muted d-block">See how often you appear in search results.</small>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="text-center border-top py-2 card-footer">
              <a href="#" className="text-decoration-none fw-semibold text-dark">
                Show all analytics <ArrowRight size={16} className="align-middle" />
              </a>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AnalyticsSection;
