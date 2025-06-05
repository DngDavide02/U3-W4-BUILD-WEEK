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
import RightSide from "./components/RightSide";
import CreatePostCard from "./components/Homepage/CreatePostCard";
import MainContentSections from "./components/MainContent/MainContentSections";

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
                  <Col xs={2} className="px-1 d-none d-lg-block">
                    <LeftBar />
                  </Col>
                  <Col xs={12} lg={6} className="px-1">
                    <MainContent />
                  </Col>
                  <Col xs={4} className="px-1 d-none d-lg-block">
                    <RightSide />
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
                  <Col xs={12} lg={8}>
                    <ProfileHeader />
                    <MainContentSections />
                  </Col>
                  <Col lg={4} className="d-none d-lg-block">
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
