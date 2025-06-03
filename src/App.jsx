import "./App.css";
import AboutSection from "./components/MainContent/AboutSection";
import ActivitySection from "./components/MainContent/ActivitySection";
import AnalyticsSection from "./components/MainContent/AnalyticsSection";
import EducationSection from "./components/MainContent/EducationSection";
import ExperienceSection from "./components/MainContent/ExperienceSection";
import InterestSection from "./components/MainContent/InterestsSection";
import MyNavBar from "./components/MyNavBar";
import MySidebar from "./components/MySidebar";
import ProfileHeader from "./components/ProfileHeader";

function App() {
  return (
    <>
      <MyNavBar />
      <div className="app-main-container">
        <main className="flex-grow-1 app-main-content">
          <ProfileHeader />
          <AnalyticsSection />
          <AboutSection />
          <ActivitySection />
          <ExperienceSection />
          <EducationSection />
          <InterestSection />
        </main>
        <aside className="ms-4 d-none d-lg-block app-sidebar">
          <MySidebar />
        </aside>
      </div>
    </>
  );
}

export default App;
