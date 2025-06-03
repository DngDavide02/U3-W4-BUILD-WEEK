import { Card, ListGroup } from "react-bootstrap";

const MySidebar = () => (
  <aside className="sidebar-linkedin">
    <Card className="mb-2 sidebar-card">
      <ListGroup variant="flush">
        <ListGroup.Item
          action
          href="#"
          className="sidebar-link d-flex justify-content-between align-items-center"
        >
          <span className="fw-bold">Lingua del Profilo</span>
          <i className="bi bi-pencil" style={{ cursor: "pointer" }}></i>
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="#"
          className="sidebar-link sidebar-link-eventi d-flex justify-content-between align-items-center"
        >
          <span className="fw-bold">Profilo pubblico e URL</span>
          <div className="d-flex align-items-center">
            <i className="bi bi-pencil ms-2" style={{ cursor: "pointer" }}></i>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Card>
    <Card className="mb-1 sidebar-card">
      <ListGroup variant="flush">
        <ListGroup.Item action href="#" className="sidebar-link">
          <span className="fw-bold">Hashtag seguiti</span>
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="#"
          className="sidebar-link text-center text-primary"
        >
          Mostra tutto
        </ListGroup.Item>
      </ListGroup>
    </Card>
  </aside>
);

export default MySidebar;
