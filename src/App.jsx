import "./App.css";
import LeftBar from "./components/Homepage/LeftBar";
import MyNavBar from "./components/MyNavBar";
import MySidebar from "./components/MySidebar";
import ProfileHeader from "./components/ProfileHeader";
import Footer from "./components/Footer";
import AboutSection from "./components/MainContent/AboutSection";
import ActivitySection from "./components/MainContent/ActivitySection";
import AnalyticsSection from "./components/MainContent/AnalyticsSection";
import { Col, Container, Row } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import MainContent from "./components/Homepage/MainContentHome";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <MyNavBar />
              <Container className="mt-4 container">
                <Row>
                  <Col xs={3} className="px-2">
                    <LeftBar />
                  </Col>
                  <Col xs={7} className="px-2">
                    <MainContent />
                  </Col>
                </Row>
              </Container>
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <MyNavBar />
              <Container className="mt-4 container">
                <Row>
                  <Col xs={8}>
                    <ProfileHeader />
                    <AnalyticsSection />
                    <ActivitySection />
                    <AboutSection />
                  </Col>
                  <Col xs={4}>
                    <MySidebar />
                  </Col>
                </Row>
              </Container>
              <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
