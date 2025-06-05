import { useEffect, useState } from "react";
import ExperienceModal from "./ExperienceModal";
import { fetchExperiences, createExperience, editExperience, deleteExperience } from "../../redux/actions/experienceAction";
import { Alert, Button, Card, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { Pencil, Plus, XLg } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../redux/reducers/experienceSlice";
import epicodeLogo from "/images/epicode-logo.jpeg";

const ExperienceSection = () => {
  const user = useSelector((state) => state.user.profile);
  const userId = user?._id;
  console.log("User Profile from Redux:", user);

  const [experienceToEdit, setExperienceToEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const { experiences, loading, error } = useSelector((state) => state.experience);

  useEffect(() => {
    if (userId) {
      dispatch(fetchExperiences(userId));
    }
  }, [dispatch, userId]);

  const handleSave = (experienceData) => {
    console.log("Dati salvati:", experienceData);

    dispatch(createExperience(userId, experienceData));
  };

  const handleEditSave = async (experienceDataFromModal) => {
    console.log("Dati ricevuti:", experienceDataFromModal);

    const expIdToEdit = experienceDataFromModal._id;

    if (userId && expIdToEdit) {
      const updatedExperience = await dispatch(editExperience(userId, expIdToEdit, experienceDataFromModal));

      console.log("Modifica completata con successo:", updatedExperience);
      handleCloseModal();
      dispatch(editExperience(userId, expIdToEdit, experienceDataFromModal));
    } else {
      dispatch(setError("Dati utente o esperienza mancanti per la modifica."));
    }
  };

  const handleDelete = (expId) => {
    if (window.confirm("Sei sicuro di voler eliminare questa esperienza?")) {
      dispatch(deleteExperience(userId, expId));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return "Data non specificata";
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return dateString;
    }

    const options = { year: "numeric", month: "short" };

    return date.toLocaleDateString("it-IT", options);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">Errore: {error}</Alert>;

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

                <Button
                  variant="link"
                  className="p-0 bg-transparent border-0 text-dark"
                  onClick={() => {
                    setExperienceToEdit(null);
                    handleShowModal();
                  }}
                >
                  <Plus size={34} />
                </Button>
              </div>
              {experiences && experiences.length > 0 ? (
                experiences.map((exp, idx) => (
                  <div key={exp._id} className={`py-3 ${idx < experiences.length - 1 ? "border-bottom" : ""}`}>
                    <Row>
                      <Col xs="auto" className="p-0">
                        <Image src={epicodeLogo} width="70" />
                      </Col>
                      <Col>
                        <div className="fw-semibold">{exp.role}</div>
                        <div>{exp.company}</div>
                        <div className="text-muted small">
                          {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Presente"}
                        </div>
                        <div className="mt-1">{exp.description}</div>
                        <div className="text-muted small mt-1">{exp.area}</div>
                      </Col>
                      <Col xs={2} className="d-flex flex-column align-items-end">
                        <Button variant="link" className="p-0 text-danger mb-2" onClick={() => handleDelete(exp._id)}>
                          <XLg size={18} />
                        </Button>
                        <Button
                          variant="link"
                          className="p-0 text-dark"
                          aria-label="Modifica la sezione Esperienza"
                          onClick={() => {
                            setExperienceToEdit(exp);
                            handleShowModal();
                          }}
                        >
                          <Pencil size={18} />
                        </Button>
                      </Col>
                    </Row>
                  </div>
                ))
              ) : (
                <>
                  <p className="mb-0 fw-semibold">Non hai ancora aggiunto nulla su Esperienza</p>
                  <small>Le tue esperienze apparariranno qui</small>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ExperienceModal show={showModal} onHide={handleCloseModal} experience={experienceToEdit} onSave={experienceToEdit ? handleEditSave : handleSave} />
    </Container>
  );
};

export default ExperienceSection;
