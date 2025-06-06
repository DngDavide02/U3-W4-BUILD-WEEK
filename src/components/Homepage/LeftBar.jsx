import { Card, ListGroup, Button, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { setProfile } from "../../redux/actions/userAction";

// Componente LeftBar che mostra informazioni profilo e collegamenti laterali
const LeftBar = () => {
  // Prendo il profilo utente dallo store Redux
  const profile = useSelector((state) => state.user.profile);
  // Dispatch per inviare azioni Redux
  const dispatch = useDispatch();
  // Token preso dalle variabili ambiente (Vite)
  const token = import.meta.env.VITE_TOKEN;

  // useEffect per caricare il profilo al montaggio se non presente nello store
  useEffect(() => {
    // Funzione asincrona per fetch del profilo
    const fetchProfile = async () => {
      try {
        // Chiamata API per ottenere il profilo dell'utente autenticato
        const response = await fetch("https://striveschool-api.herokuapp.com/api/profile/me", {
          headers: {
            Authorization: `Bearer ${token}`, // header con token Bearer
          },
        });

        // Se risposta non OK lancio errore
        if (!response.ok) throw new Error("Errore caricamento profilo");

        // Converto la risposta in json
        const data = await response.json();
        // Aggiorno lo store con i dati del profilo
        dispatch(setProfile(data));
      } catch (error) {
        // Loggo eventuali errori
        console.error("Errore fetch profilo:", error);
      }
    };

    // Se il profilo non è ancora caricato, lo richiedo
    if (!profile) {
      fetchProfile();
    }
  }, [dispatch, profile]); // effetto dipende da dispatch e profile

  return (
    <aside>
      {/* Card con info profilo */}
      <Card className="mb-2 shadow-sm">
        <Card.Body className="text-center">
          <div className="mb-2">
            {/* Immagine profilo rotonda */}
            <Image src={profile?.image} roundedCircle width={70} height={70} style={{ objectFit: "cover" }} alt="profile" />
          </div>
          {/* Nome e cognome o placeholder */}
          <Card.Title className="mb-0 fs-5">{profile ? `${profile.name} ${profile.surname}` : "Nome Cognome"}</Card.Title>
          {/* Titolo professionale o placeholder */}
          <Card.Text className="text-muted mb-1" style={{ fontSize: "0.95em" }}>
            {profile?.title || "Titolo professionale"}
          </Card.Text>
          {/* Area geografica o placeholder */}
          <Card.Text className="text-muted" style={{ fontSize: "0.9em" }}>
            {profile?.area || "Area"}
          </Card.Text>
          {/* Bottone che porta alla pagina profilo */}
          <Button as={Link} to="/profile" variant="outline-primary" size="sm" className="rounded-pill mt-2 w-100">
            Visualizza profilo
          </Button>
        </Card.Body>
      </Card>

      {/* Card con collegamenti */}
      <Card className="mb-2 shadow-sm">
        <ListGroup variant="flush">
          <ListGroup.Item>
            <span className="fw-bold small">Collegamenti</span>
            <div className="text-muted small">Espandi la tua rete</div>
          </ListGroup.Item>
        </ListGroup>
      </Card>

      {/* Card per promozione premium */}
      <Card className="mb-2 shadow-sm">
        <ListGroup variant="flush">
          <ListGroup.Item>
            <span className="text-muted small">Fai crescere la tua carriera con premium</span>
            <div className="fw-semibold small">🟨Prova un mese a 0EUR</div>
          </ListGroup.Item>
        </ListGroup>
      </Card>

      {/* Card con collegamenti rapidi a elementi salvati, gruppi, newsletter, eventi */}
      <Card className="mb-2 shadow-sm">
        <ListGroup variant="flush">
          <ListGroup.Item>
            <p className="fw-semibold small">
              <i className="bi bi-bookmark-fill"></i> Elementi salvati
            </p>
            <p className="fw-semibold small">
              <i className="bi bi-people-fill"></i> Gruppi
            </p>
            <p className="fw-semibold small">
              <i className="bi bi-newspaper"></i> Newsletter
            </p>
            <p className="fw-semibold small">
              <i className="bi bi-calendar-event"></i> Eventi
            </p>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </aside>
  );
};

export default LeftBar;
