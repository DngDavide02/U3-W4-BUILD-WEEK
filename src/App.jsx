import "./App.css";
import MyNavBar from "./components/MyNavBar";
import MySidebar from "./components/MySidebar";

function App() {
  return (
    <>
      <MyNavBar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          background: "#f3f2ef",
          minHeight: "100vh",
          paddingTop: "32px",
        }}
      >
        <main style={{ flex: "1 1 600px", maxWidth: "600px" }}>
          {/* Corpo principale */}
        </main>
        <aside style={{ flex: "0 0 300px", marginLeft: "300px" }}>
          <MySidebar />
        </aside>
      </div>
    </>
  );
}

export default App;
