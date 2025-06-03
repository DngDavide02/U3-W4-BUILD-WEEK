import "./App.css";
import AboutSection from "./components/MainContent/AboutSection";
import AnalyticsSection from "./components/MainContent/AnalyticsSection";
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
        </main>
        <aside className="ms-4 d-none d-lg-block app-sidebar">
          <MySidebar />
        </aside>
      </div>
    </>
  );
}

export default App;
