import "./App.css";
import MainContentSections from "./components/MainContent/MainContentSections";
import MyNavBar from "./components/MyNavBar";
import MySidebar from "./components/MySidebar";
import ProfileHeader from "./components/ProfileHeader";
import Footer from "./components/Footer";
import { Col, Container, Row } from "react-bootstrap";

function App() {
  return (
    <>
      <MyNavBar />
      <Container className="mt-4 container">
        <Row>
          <Col xs={9} className="px-0">
            <ProfileHeader />
            <MainContentSections />
          </Col>

          <Col xs={3} className="px-2">
            <MySidebar />
          </Col>

          <Footer />
        </Row>
      </Container>
    </>
  );
}

export default App;
