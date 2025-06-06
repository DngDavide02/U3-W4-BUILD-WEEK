import { useEffect, useState } from "react";
import ExperienceModal from "./ExperienceModal";
import { fetchExperiences, createExperience, editExperience, deleteExperience } from "../../redux/actions/experienceAction";
import { Alert, Button, Card, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { Pencil, Plus, XLg } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../redux/reducers/experienceSlice";
import epicodeLogo from "/images/epicode-logo.jpeg";

const ExperienceSection = () => {
  // --- Redux state e dispatch ---
  const user = useSelector((state) => state.user.profile);
  const userId = user?._id;
  const dispatch = useDispatch();
  const { experiences, loading, error } = useSelector((state) => state.experience);

  // --- State locali per la modale ---
  const [experienceToEdit, setExperienceToEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // --- Effetto per caricare esperienze al mount e quando cambia userId ---
  useEffect(() => {
    if (userId) dispatch(fetchExperiences(userId));
  }, [dispatch, userId]);

  // --- Funzione per aprire la modale ---
  const handleShowModal = () => setShowModal(true);
  // --- Funzione per chiudere la modale ---
  const handleCloseModal = () => setShowModal(false);

  // --- Gestione salvataggio nuova esperienza ---
  const handleSave = (experienceData) => {
    dispatch(createExperience(userId, experienceData));
    handleCloseModal();
  };

  // --- Gestione salvataggio modifica esperienza ---
  const handleEditSave = async (experienceDataFromModal) => {
    if (!userId || !experienceDataFromModal._id) {
      dispatch(setError("Dati utente o esperienza mancanti per la modifica."));
      return;
    }
    await dispatch(editExperience(userId, experienceDataFromModal._id, experienceDataFromModal));
    handleCloseModal();
  };

  // --- Gestione cancellazione esperienza ---
  const handleDelete = (expId) => {
    if (window.confirm("Sei sicuro di voler eliminare questa esperienza?")) {
      dispatch(deleteExperience(userId, expId));
    }
  };

  // --- Funzione helper per formattare la data in italiano ---
  const formatDate = (dateString) => {
    if (!dateString) return "Data non specificata";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("it-IT", { year: "numeric", month: "short" });
  };

  // --- Render loading o errore ---
  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">Errore: {error}</Alert>;

  return (
    <Container>
      <Row>
        <Col>
          <Card className="mb-2 px-2">
            <Card.Body>
              {/* Header sezione con titolo e bottone + */}
              <div className="d-flex justify-content-between mb-1">
                <Card.Title as="h2" className="h5 fw-bold mb-0">
                  Esperienza
                </Card.Title>
                <Button
                  variant="link"
                  className="p-0 bg-transparent border-0 text-dark"
                  onClick={() => {
                    setExperienceToEdit(null); // reset modal per nuova esperienza
                    handleShowModal();
                  }}
                >
                  <Plus size={34} />
                </Button>
              </div>

              {/* Lista esperienze o messaggio vuoto */}
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
                        {/* Bottone elimina */}
                        <Button variant="link" className="p-0 text-danger mb-2" onClick={() => handleDelete(exp._id)}>
                          <XLg size={18} />
                        </Button>
                        {/* Bottone modifica */}
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

      {/* Modale esperienza: differenzia salvataggio tra crea e modifica */}
      <ExperienceModal show={showModal} onHide={handleCloseModal} experience={experienceToEdit} onSave={experienceToEdit ? handleEditSave : handleSave} />
    </Container>
  );
};

export default ExperienceSection;
