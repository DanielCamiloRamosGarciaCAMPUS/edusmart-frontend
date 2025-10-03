import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // 👈 agrega Navigate
import EduNavbar from "./components/Navbar";

// Páginas
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyCourses from "./pages/MyCourses"; 


// Componentes
import ProtectedRoute from "./components/ProtectedRoute"; // 👈 importa tu wrapper

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
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

         <Route
          path="/my-courses"
          element={
            <ProtectedRoute>
              <MyCourses />
            </ProtectedRoute>
          }
        />

        {/* Fallback: cualquier ruta no existente redirige al home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
