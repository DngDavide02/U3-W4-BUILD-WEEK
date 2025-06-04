import { useState } from "react";
import ExperienceModal from "./ExperienceModal";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Pencil, Plus } from "react-bootstrap-icons";

const ExperienceSection = () => {
  const [showModal, setShowModal] = useState(false);
  /*   const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [experienceToEdit, setExperienceToEdit] = useState(null); */
  /* 
const fetchExperience = () => {
  setIsLoading(true);
  setError(null);
  try {
    const resp = await fetch()
  }
} */

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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
                  <Button variant="link" className="p-0 me-3 bg-transparent border-0 text-dark" onClick={handleShowModal}>
                    <Plus size={34} />
                  </Button>
                  <Button variant="link" className="p-0 text-dark" onClick={handleShowModal} aria-label="Modifica la sezione Esperienza">
                    <Pencil size={20} />
                  </Button>
                </div>
              </div>
              <p className="mb-0 fw-semibold">Non hai ancora aggiunto nulla su Esperienza</p>
              <small>Le tue esperienze apparariranno qui</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ExperienceModal
        show={showModal}
        handleClose={handleCloseModal}
        // experienceToEdit={experienceToEdit} // to add later
        // onExperienceSaved={handleExperienceSaved} // to add later
      />
    </Container>
  );
};

export default ExperienceSection;
