import {
  Card,
  ListGroup,
  Spinner,
  Alert,
  Image,
  Button,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";

const MySidebar = () => {
  const [profiles, setProfiles] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const resp = await fetch(
          "https://striveschool-api.herokuapp.com/api/profile/",
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
            },
          }
        );
        if (!resp.ok) throw new Error("Errore nel caricamento dei profili");
        const data = await resp.json();
        setProfiles(data.slice(0, 10));
      } catch (err) {
        setError(err.message || "Errore sconosciuto");
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  return (
    <aside className="sidebar-linkedin">
      <Card className="mb-2 sidebar-card">
        <ListGroup variant="flush">
          <ListGroup.Item className="sidebar-link d-flex justify-content-between align-items-center">
            <span className="fw-bold">Lingua del Profilo</span>
            <i className="bi bi-pencil" style={{ cursor: "pointer" }}></i>
          </ListGroup.Item>
          <ListGroup.Item className="sidebar-link sidebar-link-eventi d-flex justify-content-between align-items-center">
            <span className="fw-bold">Profilo pubblico e URL</span>
            <div className="d-flex align-items-center">
              <i
                className="bi bi-pencil ms-2"
                style={{ cursor: "pointer" }}
              ></i>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card>
      <Card className="mb-1 sidebar-card">
        <ListGroup variant="flush">
          <ListGroup.Item className="sidebar-link">
            <span className="fw-bold">Persone che potresti conoscere</span>
          </ListGroup.Item>
          {loading && (
            <ListGroup.Item>
              <Spinner animation="border" size="sm" />
            </ListGroup.Item>
          )}
          {error && (
            <ListGroup.Item>
              <Alert variant="danger">{error}</Alert>
            </ListGroup.Item>
          )}
          {!loading &&
            !error &&
            (showAll ? profiles : profiles.slice(0, 3)).map((profile) => (
              <ListGroup.Item
                key={profile._id}
                className="sidebar-link suggested-profile-item d-flex align-items-center"
              >
                <Image
                  src={profile.image}
                  roundedCircle
                  width={35}
                  height={35}
                  className="suggested-profile-img me-2"
                  alt={profile.name}
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
