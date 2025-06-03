import "./App.css";
import MainContentSections from "./components/MainContent/MainContentSections";
import MyNavBar from "./components/MyNavBar";
import MySidebar from "./components/MySidebar";
import ProfileHeader from "./components/ProfileHeader";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <MyNavBar />
      <div className="app-main-container">
        <main className="flex-grow-1 app-main-content">
          <ProfileHeader />
          <MainContentSections />
        </main>
        <aside className="ms-4 d-none d-lg-block app-sidebar">
          <MySidebar />
        </aside>
      </div>

      <Footer />
    </>
  );
}

export default App;
