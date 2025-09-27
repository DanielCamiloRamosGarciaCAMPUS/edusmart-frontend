import React from "react";
import { Routes, Route } from "react-router-dom";
import EduNavbar from "./components/Navbar";


// Páginas
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      {/* Navbar siempre visible */}
      <EduNavbar />

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
