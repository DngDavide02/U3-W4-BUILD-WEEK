import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Spinner, Alert, Image } from "react-bootstrap";

const UserProfile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const resp = await fetch(
          `https://striveschool-api.herokuapp.com/api/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
            },
          }
        );
        if (!resp.ok) throw new Error("Errore nel caricamento del profilo");
        const data = await resp.json();
        setProfile(data);
      } catch (err) {
        setError(err.message || "Errore sconosciuto");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  if (loading)
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!profile) return null;

  return (
    <Card className="shadow-sm rounded p-4">
      <div className="d-flex align-items-center">
        <Image
          src={profile.image}
          roundedCircle
          width={80}
          height={80}
          className="me-3"
        />
        <div>
          <h4>
            {profile.name} {profile.surname}
          </h4>
          <div className="text-muted">{profile.title}</div>
          <div className="text-muted">{profile.area}</div>
        </div>
      </div>
    </Card>
  );
};

export default UserProfile;
