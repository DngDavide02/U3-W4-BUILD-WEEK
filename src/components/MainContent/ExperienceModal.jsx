import { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ExperienceModal(props) {
  const { experience, show, onHide, onSave } = props;
  const [formData, setFormData] = useState({
    role: experience ? experience.role : "",
    company: experience ? experience.company : "",
    startMonth: experience?.startDate ? experience.startDate.split("-")[1] : "",
    startYear: experience?.startDate ? experience.startDate.split("-")[0] : "",
    endMonth: experience?.endDate ? experience.endDate.split("-")[1] : "",
    endYear: experience?.endDate ? experience.endDate.split("-")[0] : "",
    description: experience ? experience.description : "",
    area: experience ? experience.area : "",
    image: experience ? experience.image || null : null
  });

  useEffect(() => {
    if (experience) {
      const [startYear, startMonth] = experience.startDate ? experience.startDate.split("-") : ["", ""];
      const [endYear, endMonth] = experience.endDate ? experience.endDate.split("-") : ["", ""];

      setFormData({
        role: experience.role || "",
        company: experience.company || "",
        startMonth,
        startYear,
        endMonth,
        endYear,
        description: experience.description || "",
        area: experience.area || "",
        image: experience.image || null
      });
    }
  }, [experience]);

  // img to continue
  // const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      if (updatedData.startMonth && updatedData.startYear) {
        updatedData.startDate = `${updatedData.startYear}/${updatedData.startMonth}`;
      }
      if (updatedData.endMonth && updatedData.endYear) {
        updatedData.endDate = `${updatedData.endYear}/${updatedData.endMonth}`;
      }
      return updatedData;
    });
  };

  /*   const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setImageFile(imageUrl);
    }
  }; */

  /*   const handleSave = () => {
    console.log({ formData });
    if (!formData.role || !formData.company || !formData.area ) {
      alert("Tutti i campi obbligatori devono essere compilati.");
      return;
    }

    const updatedFormData = { ...formData, image: imageFile || formData.image };

    onSave(updatedFormData);
    onHide();
  }; */

  const handleSave = () => {
    if (!formData.role || !formData.company || !formData.area || !formData.description || !formData.startMonth || !formData.startYear) {
      alert("Tutti i campi obbligatori devono essere compilati.");
      return;
    }
    let dataPayload = {
      role: formData.role,
      company: formData.company,
      startDate: formData.startDate,
      endDate: formData.endDate,
      description: formData.description,
      area: formData.area
    };

    if (experience && experience._id) {
      dataPayload._id = experience._id;
    }

    onSave(dataPayload);
    onHide();
  };

  return (
    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{experience ? "Modifca esperienza" : "Aggiungi esperienza"}</Modal.Title>
      </Modal.Header>
      <Form>
        <div className="d-flex align-items-center " style={{ backgroundColor: " #edf3f8", padding: "16px" }}>
          <div>
            <h6>Informa la rete</h6>
            <p>
              Attiva l'opzione per informare la tua rete delle principali modifiche al profilo (ad esempio un nuovo lavoro) e degli anniversari lavorativi. Gli
              aggiornamenti possono richiedere fino a 2 ore. Scopri di più sulla&nbsp;
              <a
                href="https://www.linkedin.com/help/linkedin/answer/a529062/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_add_position%3BF0GRgfBiTMG9MjkwifelQQ%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                condivisione delle modifiche del profilo
              </a>
              .
            </p>
          </div>
          <Form.Check type="switch" id="custom-switch" label="No" className="fs-3" />
        </div>
        <Modal.Body>
          <p className="">* Indica che è obbligatorio</p>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Qualifica*</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Esempio: Retail Sales Manager"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Label>Tipo di impiego</Form.Label>
          <Form.Select aria-label="Default select example" size="sm" className="mb-3">
            <option>Seleziona</option>
            <option value="1">A tempo pieno</option>
            <option value="2">Part-time</option>
            <option value="3">Autonomo</option>
            <option value="4">Freelance</option>
            <option value="5">A contratto</option>
            <option value="6">Stage</option>
            <option value="7">Apprendistato</option>
            <option value="8">Stagionale</option>
          </Form.Select>
          <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
            <Form.Label>Azienda o organizzazione*</Form.Label>
            <Form.Control size="sm" type="text" placeholder="Esempio: Microsoft" name="company" value={formData.company} onChange={handleChange} required />
          </Form.Group>
          <Form.Check type="checkbox" id="default-checkbox" label="Attualmente ricopro questo ruolo" className="mb-3" />

          <Form.Label>Data di inizio*</Form.Label>
          <InputGroup className="mb-3">
            <Form.Select
              onChange={handleDateChange}
              aria-label="Default select example"
              size="sm"
              className="me-1"
              name="startMonth"
              value={formData.startMonth}
              required
            >
              <option value="">Mese</option>
              <option value="01">Gennaio</option>
              <option value="02">Febbraio</option>
              <option value="03">Marzo</option>
              <option value="04">Aprile</option>
              <option value="05">Maggio</option>
              <option value="06">Giugno</option>
              <option value="07">Luglio</option>
              <option value="08">Agosto</option>
              <option value="09">Settembre</option>
              <option value="10">Ottobre</option>
              <option value="11">Novembre</option>
              <option value="12">Dicembre</option>
            </Form.Select>
            <Form.Select
              aria-label="Default select example"
              size="sm"
              className="ms-1"
              name="startYear"
              value={formData.startYear}
              onChange={handleDateChange}
              required
            >
              <option value="">Anno</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
            </Form.Select>
          </InputGroup>
          <Form.Label>Data di fine*</Form.Label>
          <InputGroup className="mb-3">
            <Form.Select aria-label="Default select example" size="sm" className="me-1" name="endMonth" value={formData.endMonth} onChange={handleDateChange}>
              <option value="">Mese</option>
              <option value="01">Gennaio</option>
              <option value="02">Febbraio</option>
              <option value="03">Marzo</option>
              <option value="04">Aprile</option>
              <option value="05">Maggio</option>
              <option value="06">Giugno</option>
              <option value="07">Luglio</option>
              <option value="08">Agosto</option>
              <option value="09">Settembre</option>
              <option value="10">Ottobre</option>
              <option value="11">Novembre</option>
              <option value="12">Dicembre</option>
            </Form.Select>
            <Form.Select aria-label="Default select example" size="sm" className="ms-1" name="endYear" value={formData.endYear} onChange={handleDateChange}>
              <option value="">Anno</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
            </Form.Select>
          </InputGroup>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Località*</Form.Label>
            <Form.Control size="sm" type="text" placeholder="Esempio: Milano, Italia" name="area" value={formData.area} onChange={handleChange} required />
          </Form.Group>
          <Form.Label>Tipo di località</Form.Label>
          <Form.Select aria-label="Default select example" size="sm">
            <option>Seleziona</option>
            <option value="1">In sede</option>
            <option value="2">Ibrida</option>
            <option value="3">Da remoto</option>
          </Form.Select>
          <Form.Label className="mb-3">Scegli un tipo di località &#40;es. da remoto&#41;</Form.Label>
          <Form.Group className="mb-3" controlId="DescriptionTextarea1">
            <Form.Label>Descrizione*</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Sommario del profilo</Form.Label>
            <Form.Control size="sm" type="text" placeholder="Esempio: Retail Sales Manager" />
            <Form.Label>Compare sotto il tuo nome nella parte superiore del profilo</Form.Label>
          </Form.Group>
          <Form.Label>Dove hai trovato questa offerta di lavoro?</Form.Label>
          <Form.Select aria-label="Default select example" size="sm">
            <option>Seleziona</option>
            <option value="1">Linkedln</option>
            <option value="2">Sito web dell &apos;azienda</option>
            <option value="3">Indeed</option>
            <option value="4">Altri sitin di offerte di lavoro</option>
            <option value="5">Segnalazione</option>
            <option value="6">Contattati da recruiter</option>
            <option value="7">Agenzia di selezione del personale</option>
            <option value="8">Altro</option>
          </Form.Select>
          <Form.Label>Queste informazioni verranno usate per migliorare la ricerca di lavoro su LinkedIn.</Form.Label>
          <div className="mt-4">
            <h5>Competenze</h5>
            <p>Ti consigliamo di aggiungere le 5 competenze più utilizzate in questo ruolo. Appariranno anche nella sezione Competenze.</p>
            <Button variant="outline-primary" className="me-3 rounded-pill ">
              + Aggiungi competenza
            </Button>
          </div>
          <div className="mt-4">
            <h5>Media</h5>
            <p>
              Aggiungi contenuti multimediali come immagini, documenti, siti o presentazioni. Scopri di più sui{" "}
              <a
                href="https://www.linkedin.com/help/linkedin/answer/a1516731?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_add_position%3BF0GRgfBiTMG9MjkwifelQQ%3D%3D"
                target="_blank"
                className="text-primary"
              >
                tipi di file multimediali supportati
              </a>
              .
            </p>
            <Form.Group className="mb-3" controlId="image">
              <Button variant="outline-primary" className="me-3 rounded-pill ">
                + Aggiungi media
              </Button>
              {/* {formData.image && (
                <div>
                  <img src={formData.image} alt="Immagine caricata" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                </div>
              )}
              <Form.Control type="file" name="image" onChange={handleImageChange} /> */}
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary rounded-pill"
            onClick={() => {
              handleSave();
            }}
          >
            Salva
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ExperienceModal;
