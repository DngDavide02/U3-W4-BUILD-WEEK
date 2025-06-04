import { useEffect, useState } from "react";
import ExperienceModal from "./ExperienceModal";
import { fetchExperience } from "../../redux/actions/experienceAction";
import { addExperience, updateExperience } from "../../redux/reducers/experienceSlice";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Pencil, Plus } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";

const ExperienceSection = ({ userId }) => {
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [experienceToEdit, setExperienceToEdit] = useState(null);
  // const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const experiences = useSelector((state) => state.experience.experiences);

  useEffect(() => {
    if (userId) {
      dispatch(fetchExperience(userId)).finally(() => setIsLoading(false));
    }
  }, [dispatch, userId]);

  const handleSave = (data) => {
    console.log("Dati salvati:", data);

    dispatch(addExperience(data));
  };

  const handleEditSave = (data) => {
    console.log("Dati salvati:", data);

    dispatch(updateExperience(data));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isVisible) {
    return null;
  }

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
                  <Button
                    variant="link"
                    className="p-0 me-3 bg-transparent border-0 text-dark"
                    onClick={() => {
                      handleShowModal();
                      setExperienceToEdit(null);
                    }}
                  >
                    <Plus size={34} />
                  </Button>

                  <Button
                    variant="link"
                    className="p-0 text-dark"
                    onClick={handleShowModal}
                    aria-label="Modifica la sezione Esperienza"
                    onClickCapture={handleEditSave}
                  >
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
      <ExperienceModal show={showModal} onHide={handleCloseModal} experience={experienceToEdit} onSave={handleSave} />
    </Container>
  );
};

export default ExperienceSection;
