import { useEffect, useState } from "react";
import { Form, InputGroup, Button, Modal } from "react-bootstrap";

function ExperienceModal({ experience, show, onHide, onSave }) {
  // Stato per i dati del form, inizializzati dall'eventuale esperienza passata
  const [formData, setFormData] = useState({
    role: experience?.role || "",
    company: experience?.company || "",
    startMonth: experience?.startDate ? experience.startDate.split("-")[1] : "",
    startYear: experience?.startDate ? experience.startDate.split("-")[0] : "",
    endMonth: experience?.endDate ? experience.endDate.split("-")[1] : "",
    endYear: experience?.endDate ? experience.endDate.split("-")[0] : "",
    description: experience?.description || "",
    area: experience?.area || "",
    image: experience?.image || null,
  });

  // Aggiorna lo stato quando cambia la props experience
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
        image: experience.image || null,
      });
    }
  }, [experience]);

  // Gestisce il cambio dei campi testo e select generici
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Gestisce in modo specifico la data, costruendo startDate e endDate
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      if (updatedData.startMonth && updatedData.startYear) {
        updatedData.startDate = `${updatedData.startYear}-${updatedData.startMonth}`;
      }
      if (updatedData.endMonth && updatedData.endYear) {
        updatedData.endDate = `${updatedData.endYear}-${updatedData.endMonth}`;
      }
      return updatedData;
    });
  };

  // Salva dati, con validazione base su campi obbligatori
  const handleSave = () => {
    const { role, company, area, description, startMonth, startYear } = formData;
    if (!role || !company || !area || !description || !startMonth || !startYear) {
      alert("Tutti i campi obbligatori devono essere compilati.");
      return;
    }

    const dataPayload = {
      role: formData.role,
      company: formData.company,
      startDate: formData.startDate,
      endDate: formData.endDate,
      description: formData.description,
      area: formData.area,
    };

    if (experience?._id) {
      dataPayload._id = experience._id;
    }

    onSave(dataPayload);
    onHide();
  };

  return (
    <Modal size="lg" show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{experience ? "Modifica esperienza" : "Aggiungi esperienza"}</Modal.Title>
      </Modal.Header>

      <Form>
        {/* Sezione per informazioni alla rete (switch non collegato a stato) */}
        <div style={{ backgroundColor: "#edf3f8", padding: "16px" }} className="d-flex align-items-center">
          <div className="mt-2">
            <h6>Informa la rete</h6>
            <p>
              Attiva l'opzione per informare la tua rete delle principali modifiche al profilo...
              <a
                href="https://www.linkedin.com/help/linkedin/answer/a529062"
                target="_blank"
                rel="noopener noreferrer"
                className="fw-semibold text-decoration-none"
              >
                condivisione delle modifiche del profilo
              </a>
              .
            </p>
          </div>
          <Form.Check type="switch" id="custom-switch" label="No" className="fs-3" />
        </div>

        <Modal.Body className="px-4">
          <small className="text-muted">* Indica che è obbligatorio</small>

          {/* Input Qualifica */}
          <Form.Group className="my-3">
            <Form.Label className="text-muted">Qualifica*</Form.Label>
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

          {/* Tipo di impiego (non collegato a stato) */}
          <Form.Label className="text-muted">Tipo di impiego</Form.Label>
          <Form.Select size="sm" className="mb-3">
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

          {/* Azienda */}
          <Form.Group className="mb-4">
            <Form.Label className="text-muted">Azienda o organizzazione*</Form.Label>
            <Form.Control size="sm" type="text" placeholder="Esempio: Microsoft" name="company" value={formData.company} onChange={handleChange} required />
          </Form.Group>

          {/* Checkbox ruolo attuale (non gestito) */}
          <Form.Check type="checkbox" label="Attualmente ricopro questo ruolo" className="mb-3" />

          {/* Data inizio */}
          <Form.Label className="text-muted">Data di inizio*</Form.Label>
          <InputGroup className="mb-3">
            <Form.Select size="sm" name="startMonth" value={formData.startMonth} onChange={handleDateChange} required className="me-1">
              <option value="">Mese</option>
              {[...Array(12)].map((_, i) => {
                const m = (i + 1).toString().padStart(2, "0");
                const months = [
                  "Gennaio",
                  "Febbraio",
                  "Marzo",
                  "Aprile",
                  "Maggio",
                  "Giugno",
                  "Luglio",
                  "Agosto",
                  "Settembre",
                  "Ottobre",
                  "Novembre",
                  "Dicembre",
                ];
                return (
                  <option key={m} value={m}>
                    {months[i]}
                  </option>
                );
              })}
            </Form.Select>
            <Form.Select size="sm" name="startYear" value={formData.startYear} onChange={handleDateChange} required className="ms-1">
              <option value="">Anno</option>
              {["2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018"].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </Form.Select>
          </InputGroup>

          {/* Data fine */}
          <Form.Label className="text-muted">Data di fine*</Form.Label>
          <InputGroup className="mb-3">
            <Form.Select size="sm" name="endMonth" value={formData.endMonth} onChange={handleDateChange} className="me-1">
              <option value="">Mese</option>
              {[...Array(12)].map((_, i) => {
                const m = (i + 1).toString().padStart(2, "0");
                const months = [
                  "Gennaio",
                  "Febbraio",
                  "Marzo",
                  "Aprile",
                  "Maggio",
                  "Giugno",
                  "Luglio",
                  "Agosto",
                  "Settembre",
                  "Ottobre",
                  "Novembre",
                  "Dicembre",
                ];
                return (
                  <option key={m} value={m}>
                    {months[i]}
                  </option>
                );
              })}
            </Form.Select>
            <Form.Select size="sm" name="endYear" value={formData.endYear} onChange={handleDateChange} className="ms-1">
              <option value="">Anno</option>
              {["2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018"].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </Form.Select>
          </InputGroup>

          {/* Località */}
          <Form.Group className="mb-3">
            <Form.Label className="text-muted">Località*</Form.Label>
            <Form.Control size="sm" type="text" placeholder="Esempio: Milano, Italia" name="area" value={formData.area} onChange={handleChange} required />
          </Form.Group>

          {/* Tipo di località (non gestito) */}
          <Form.Label className="text-muted">Tipo di località</Form.Label>
          <Form.Select size="sm" className="mb-3">
            <option>Seleziona</option>
            <option value="1">In sede</option>
            <option value="2">Ibrida</option>
            <option value="3">Da remoto</option>
          </Form.Select>

          {/* Descrizione */}
          <Form.Group className="mb-3">
            <Form.Label className="text-muted">Descrizione*</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} required />
          </Form.Group>

          {/* Media e competenze sono solo accennati, senza logica */}
          <div className="mt-4">
            <h5>Competenze</h5>
            <p>Ti consigliamo di aggiungere le 5 competenze più utilizzate in questo ruolo.</p>
            <Button variant="outline-primary" className="rounded-pill">
              + Aggiungi competenza
            </Button>
          </div>
          <div className="mt-4">
            <h5>Media</h5>
            <p>
              Aggiungi contenuti multimediali come immagini, documenti, siti o presentazioni.
              <a href="https://www.linkedin.com/help/linkedin/answer/a1516731" target="_blank" rel="noopener noreferrer" className="text-primary fw-semibold">
                {" "}
                tipi di file multimediali supportati
              </a>
              .
            </p>
            <Button variant="outline-primary" className="rounded-pill">
              + Aggiungi media
            </Button>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary rounded-pill" onClick={handleSave}>
            Salva
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ExperienceModal;
