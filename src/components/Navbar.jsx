import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/icons/EduSmartLogo.png";
import "./Navbar.css";

function EduNavbar() {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [isLogged, setIsLogged] = useState(false);

  // Verificar si hay token
  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    setIsLogged(!!token);
  }, [location]);

  // Cierra el navbar cuando cambia la ruta
  useEffect(() => {
    setExpanded(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setIsLogged(false);
    navigate("/home");
  };

  return (
    <Navbar
      expand="lg"
      sticky="top"
      expanded={expanded}
      className="custom-navbar d-flex justify-content-between align-items-center px-4"
    >
      <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
        EduSmart AI
      </Navbar.Brand>

      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        onClick={() => setExpanded(expanded ? false : "expanded")}
      />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/" end>
            Inicio
          </Nav.Link>
          <Nav.Link as={NavLink} to="/courses">
            Cursos
          </Nav.Link>
          <Nav.Link as={NavLink} to="/about">
            Sobre Nosotros
          </Nav.Link>

          {/* Mostrar opciones según el estado de login */}
          {!isLogged ? (
            <Nav.Link as={NavLink} to="/login">
              Iniciar Sesión
            </Nav.Link>
          ) : (
            <>
              <Nav.Link as={NavLink} to="/dashboard">
                Dashboard
              </Nav.Link>
              <Nav.Link onClick={handleLogout}>Salir</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default EduNavbar;
