import "./App.css";
import MyNavBar from "./components/MyNavBar";
import MySidebar from "./components/MySidebar";

function App() {
  return (
    <>
      <MyNavBar />
      <div className="app-main-container">
        <main className="flex-grow-1 app-main-content">
          {/* Corpo principale */}
        </main>
        <aside className="ms-4 d-none d-md-block app-sidebar">
          <MySidebar />
        </aside>
      </div>
    </>
  );
}

export default App;
