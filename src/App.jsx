import "./App.css";
import { Col, Container, Row } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

import MyNavBar from "./components/MyNavBar";
import LeftBar from "./components/Homepage/LeftBar";
import MainContent from "./components/Homepage/MainContentHome";
import RightSide from "./components/RightSide";

import ProfileHeader from "./components/ProfileHeader";
import MainContentSections from "./components/MainContent/MainContentSections";
import MySidebar from "./components/MySidebar";
import Footer from "./components/Footer";

import JobSearchPage from "./components/JobPage/JobSearchPage";

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

        <Route
          path="/jobs"
          element={
            <>
              <MyNavBar />
              <JobSearchPage />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
