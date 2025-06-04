import { Card, ListGroup, Button, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LeftBar = () => {
  const profile = useSelector((state) => state.user.profile);

  return (
    <aside>
      <Card className="mb-2 shadow-sm">
        <Card.Body className="text-center">
          <div className="mb-2">
            <Image
              src={profile?.image}
              roundedCircle
              width={70}
              height={70}
              style={{ objectFit: "cover" }}
              alt="profile"
            />
          </div>
          <Card.Title className="mb-0 fs-5">
            {profile ? `${profile.name} ${profile.surname}` : "Nome Cognome"}
          </Card.Title>
          <Card.Text className="text-muted mb-1" style={{ fontSize: "0.95em" }}>
            {profile?.title || "Titolo professionale"}
          </Card.Text>
          <Card.Text className="text-muted" style={{ fontSize: "0.9em" }}>
            {profile?.area || "Area"}
          </Card.Text>
          <Button
            as={Link}
            to="/profile"
            variant="outline-primary"
            size="sm"
            className="rounded-pill mt-2 w-100"
          >
            Visualizza profilo
          </Button>
        </Card.Body>
      </Card>

      <Card className="mb-2 shadow-sm">
        <ListGroup variant="flush">
          <ListGroup.Item>
            <span className="fw-bold">Collegamenti</span>
            <div className="text-muted small">Espandi la tua rete</div>
          </ListGroup.Item>
        </ListGroup>
      </Card>

      <Card className="mb-2 shadow-sm">
        <ListGroup variant="flush">
          <ListGroup.Item>
            <span className="fw-bold">Gruppi</span>
            <div className="text-muted small">I tuoi gruppi LinkedIn</div>
          </ListGroup.Item>
        </ListGroup>
      </Card>

      <Card className="mb-2 shadow-sm">
        <ListGroup variant="flush">
          <ListGroup.Item>
            <span className="fw-bold">Hashtag seguiti</span>
            <div className="text-muted small">#react #javascript</div>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </aside>
  );
};

export default LeftBar;
