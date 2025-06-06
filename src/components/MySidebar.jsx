import { Card, ListGroup, Spinner, Alert, Image } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MySidebar = () => {
  // --- Stato per profili suggeriti ---
  const [profiles, setProfiles] = useState([]);

  // --- Stato per mostrare tutti o solo pochi profili ---
  const [showAll, setShowAll] = useState(false);

  // --- Stato per il caricamento dati ---
  const [loading, setLoading] = useState(true);

  // --- Stato per eventuali errori ---
  const [error, setError] = useState("");

  // --- Effetto per caricare i profili al montaggio del componente ---
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const resp = await fetch("https://striveschool-api.herokuapp.com/api/profile/", {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`, // usa token da env
          },
        });
        if (!resp.ok) throw new Error("Errore nel caricamento dei profili");
        const data = await resp.json();
        setProfiles(data.slice(0, 10)); // salvo massimo 10 profili
      } catch (err) {
        setError(err.message || "Errore sconosciuto");
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  return (
    <aside>
      {/* --- Card con link generali del profilo --- */}
      <Card className="mb-2 sidebar-card">
        <ListGroup variant="flush">
          <ListGroup.Item className="sidebar-link d-flex justify-content-between align-items-center">
            <span className="fw-bold">Lingua del Profilo</span>
            <i className="bi bi-pencil" style={{ cursor: "pointer" }}></i>
          </ListGroup.Item>

          <ListGroup.Item className="sidebar-link sidebar-link-eventi d-flex justify-content-between align-items-center">
            <span className="fw-bold">Profilo pubblico e URL</span>
            <div className="d-flex align-items-center">
              <i className="bi bi-pencil ms-2" style={{ cursor: "pointer" }}></i>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card>

      {/* --- Card con lista persone suggerite --- */}
      <Card className="mb-1 sidebar-card">
        <ListGroup variant="flush">
          {/* Titolo lista */}
          <ListGroup.Item className="sidebar-link">
            <span className="fw-bold">Persone che potresti conoscere</span>
          </ListGroup.Item>

          {/* Loader mentre carico */}
          {loading && (
            <ListGroup.Item>
              <Spinner animation="border" size="sm" />
            </ListGroup.Item>
          )}

          {/* Messaggio di errore */}
          {error && (
            <ListGroup.Item>
              <Alert variant="danger">{error}</Alert>
            </ListGroup.Item>
          )}

          {/* Lista profili se non sto caricando e non c'è errore */}
          {!loading &&
            !error &&
            (showAll ? profiles : profiles.slice(0, 3)).map((profile) => (
              <ListGroup.Item
                key={profile._id}
                className="sidebar-link suggested-profile-item d-flex align-items-center"
                as={Link}
                to={`/profile/${profile._id}`}
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <Image
                  src={profile.image}
                  roundedCircle
                  width={35}
                  height={35}
                  className="suggested-profile-img me-2"
                  alt={`${profile.name} ${profile.surname}`}
                />
                <div>
                  <div className="fw-bold">
                    {profile.name} {profile.surname}
                  </div>
                  <div className="text-muted" style={{ fontSize: "0.85em" }}>
                    {profile.title}
                  </div>
                  <div className="text-muted" style={{ fontSize: "0.85em" }}>
                    {profile.area}
                  </div>
                </div>
              </ListGroup.Item>
            ))}

          {/* Bottone per mostrare più o meno profili */}
          <ListGroup.Item
            as="div"
            className="sidebar-link text-center text-primary"
            style={{ userSelect: "none", cursor: "pointer" }}
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Mostra meno" : "Mostra tutto"}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </aside>
  );
};

export default MySidebar;
