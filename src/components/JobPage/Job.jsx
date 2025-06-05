import { Card, Badge } from "react-bootstrap";

const Job = ({ job }) => {
  return (
    <Card className="mb-4 shadow-sm rounded-4 border-0 overflow-hidden">
      <Card.Body className="p-4">
        <Card.Title className="fs-4 fw-bold">{job.title}</Card.Title>
        <Card.Subtitle className="mb-3 text-muted">{job.company_name}</Card.Subtitle>

        <hr />

        <Card.Text className="mb-2">
          <strong>Categoria:</strong>{" "}
          <Badge bg="secondary" className="ms-1">
            {job.category}
          </Badge>
        </Card.Text>

        <Card.Text className="mb-2">
          <strong>Tipo:</strong> {job.job_type}
        </Card.Text>

        <Card.Text>
          <strong>Sede:</strong> {job.candidate_required_location}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Job;
