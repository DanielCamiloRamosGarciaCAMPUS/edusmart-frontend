import React from "react";
import { Navbar, Nav } from "react-bootstrap";

function EduNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="px-4">
      <Navbar.Brand href="/">EduSmart AI</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="/">Inicio</Nav.Link>
          <Nav.Link href="/courses">Cursos</Nav.Link>
          <Nav.Link href="/about">Sobre Nosotros</Nav.Link>
          <Nav.Link href="/login">Iniciar Sesión</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default EduNavbar;
