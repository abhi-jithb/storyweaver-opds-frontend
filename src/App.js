import React from "react";
import OpdsAllBooks from "./OpdsAllBooks";
import "./App.css";

function App() {
  return (
    <div>
      <header style={{ background: "#1976d2", color: "white", padding: "1rem" }}>
        <h1>OPDS Book Showcase</h1>
      </header>
      <OpdsAllBooks />
    </div>
  );
}

export default App;
