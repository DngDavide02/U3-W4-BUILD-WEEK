import { Card, Button, ListGroup } from "react-bootstrap";

const MySideBar = () => (
  <aside className="sidebar-linkedin">
    <Card className="mb-2">
      <ListGroup variant="flush">
        <ListGroup.Item action href="#" className="sidebar-link">
          <span className="fw-bold">Gruppi</span>
        </ListGroup.Item>
        <ListGroup.Item action href="#" className="sidebar-link">
          <span className="fw-bold">Eventi</span>
          <Button
            variant="link"
            size="sm"
            style={{ float: "right", color: "#0a66c2", textDecoration: "none" }}
          >
            +
          </Button>
        </ListGroup.Item>
        <ListGroup.Item action href="#" className="sidebar-link">
          <span className="fw-bold">Hashtag seguiti</span>
        </ListGroup.Item>
      </ListGroup>
      <Card.Body className="p-2">
        <Button
          variant="light"
          className="w-100 text-secondary"
          style={{ fontWeight: 500, fontSize: "0.95rem" }}
        >
          Scopri di più
        </Button>
      </Card.Body>
    </Card>
    <Card>
      <ListGroup variant="flush">
        <ListGroup.Item
          action
          href="#"
          className="sidebar-link text-center text-primary"
        >
          Scopri di più su LinkedIn
        </ListGroup.Item>
      </ListGroup>
    </Card>
  </aside>
);

export default MySideBar;
