import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/icons/EduSmartLogo.png";
import "./Navbar.css";

function EduNavbar() {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  // Cierra el navbar cuando cambia la ruta
  useEffect(() => {
    setExpanded(false);
  }, [location]);

  return (
    <Navbar
      expand="lg"
      sticky="top"
      expanded={expanded}
      className="custom-navbar d-flex justify-content-between align-items-center px-4"
    >
      {/* Logo a la izquierda */}
      <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
        {/* <img src={logo} alt="EduSmart Logo" width="35" height="35" className="me-2" /> */}
        EduSmart AI
      </Navbar.Brand>

      {/* Toggle a la derecha */}
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(expanded ? false : "expanded")}

          />

      {/* Menú colapsable */}
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
          <Nav.Link as={NavLink} to="/login">
            Iniciar Sesión
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default EduNavbar;
