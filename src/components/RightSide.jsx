import { Card, Button } from "react-bootstrap";
import "./RightSide.css";
const RightSide = () => {
  return (
    <>
      <Card className="mb-3 sidebar-card col-md-6 offset-md-8" style={{ maxWidth: " 300px", fontSize: "0.9rem" }}>
        <Card.Body>
          <Card.Title>
            <h1 style={{ display: "inline-block", marginRight: "70px" }}>LinkedIn Notizie</h1>
            <i class="bi bi-info-square-fill"></i>
          </Card.Title>

          <Card.Subtitle className="mb-2 text-muted">Storie principali</Card.Subtitle>
          <div className="cardDiv">
            <Card.Title className="card-title my-0">Dazi per acciaio e alluminio</Card.Title>
            <Card.Text className="small">3 ore fa - 426 lettori</Card.Text>
          </div>
          <div className="cardDiv">
            <Card.Title className="card-title my-0">Voci del pride month</Card.Title>
            <Card.Text className="small">19 ore fa - 131 lettori</Card.Text>
          </div>
          <div className="cardDiv">
            <Card.Title className="card-title my-0">Neuralink chiude un round da 650 milioni</Card.Title>
            <Card.Text className="small">19 ore fa 126 lettori</Card.Text>
          </div>
          <div className="cardDiv">
            <Card.Title className="card-title my-0">Occupazione stabile ad aprile</Card.Title>
            <Card.Text className="small">19 ore fa</Card.Text>
          </div>
          <div className="cardDiv">
            <Card.Title className="card-title my-0">Multato un cartello del food delivery</Card.Title>
            <Card.Text className="small">1 giorno fa 760 lettori</Card.Text>
          </div>
          <Button variant="link" className="text-muted p-0 mt-2" style={{ fontSize: "0.9rem" }}>
            Mostra di più <i class="bi bi-chevron-compact-down"></i>
          </Button>
          <div className="rompicapo-row">
            <img src="https://static.licdn.com/aero-v1/sc/h/3nbta1n5ale6ewdbbwf38ki6d" alt="Rompicapo di oggi" style={{ width: "64px" }} />
            <div>
              <span>
                <strong>Zip-un rompicapo veloce</strong>
              </span>
              <br />
              <span className="text-muted small">Risolvilo in 60 secondi o meno!</span>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Card className="mb-3  p-0 col-md-6 offset-md-8" style={{ maxWidth: " 300px" }}>
        <Card.Img
          variant="top"
          src="https://media.licdn.com/media/AAYABATPAAgAAQAAAAAAAKwYrfHUPkoBQGmwnaG71Ps_5Q.png"
          style={{ width: "100%", paddingInline: "none" }}
        />
      </Card>
      <Card className="mb-3  p-0 col-md-6 offset-md-8" style={{ maxWidth: " 300px" }}>
        <div className="card-body d-flex  align-items-center">
          <div className="spanLLast">
            <span className="spanLLast text-muted"> SUGGERIMENTO </span>
          </div>
          <div className="text-center text-muted lastest">Prova LinkedIn sull'app per Windows </div>
        </div>
      </Card>
    </>
  );
};
export default RightSide;
