import React from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <>
      {/* Hero */}
      <div className="hero-section d-flex flex-column align-items-center justify-content-center text-center text-white">
        <h1 className="fw-bold display-2 mb-3 animate-fade-in">
          Bienvenido a <span className="text-gradient">EduSmart AI</span>
        </h1>
        <p className="fs-4 mb-4">
          Plataforma de cursos virtuales con inteligencia artificial
        </p>
        <Button
          as={Link}
          to="/courses"
          className="custom-btn btn-reset"
        >
          🚀 Explorar Cursos
        </Button>
      </div>

      {/* Sección Características */}
      <Container className="py-5 text-center">
        <h2 className="fw-bold mb-4">¿Por qué elegir EduSmart AI?</h2>
        <Row>
          <Col md={4} className="mb-4">
            <i className="bi bi-speedometer feature-icon text-primary"></i>
            <h5 className="mt-3">Aprendizaje Personalizado</h5>
            <p>IA que adapta los contenidos a tu ritmo y estilo de aprendizaje.</p>
          </Col>
          <Col md={4} className="mb-4">
            <i className="bi bi-laptop feature-icon text-success"></i>
            <h5 className="mt-3">Ejercicios Inteligentes</h5>
            <p>
              Generación automática de prácticas y retroalimentación instantánea.
            </p>
          </Col>
          <Col md={4} className="mb-4">
            <i className="bi bi-easel2 feature-icon text-warning"></i>
            <h5 className="mt-3">Explicaciones Visuales</h5>
            <p>Clases con gráficos, ejemplos y explicaciones paso a paso.</p>
          </Col>
        </Row>
      </Container>

      {/* Cursos Destacados */}
      <Container className="py-5">
        <h2 className="fw-bold text-center mb-4">Cursos Populares</h2>
        <Row>
          {[
            {
              title: "Introducción a la IA",
              text: "Aprende los fundamentos de la inteligencia artificial.",
              img: "https://source.unsplash.com/400x200/?ai,education",
              link: "/courses/ia",
            },
            {
              title: "Programación en Python",
              text: "Desde cero hasta avanzado con ejemplos prácticos.",
              img: "https://source.unsplash.com/400x200/?programming,coding",
              link: "/courses/python",
            },
            {
              title: "Cloud Computing",
              text: "Domina AWS, Azure y despliegue en la nube.",
              img: "https://source.unsplash.com/400x200/?cloud,technology",
              link: "/courses/cloud",
            },

          ].map((course, idx) => (
            <Col md={4} key={idx} className="mb-4">
              <Card className="shadow-sm custom-card">
                <Card.Img variant="top" src={course.img} />
                <Card.Body className="d-flex flex-column align-items-center">
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Text>{course.text}</Card.Text>
                  <Button
                    as={Link}
                    to={course.link}
                    className="custom-btn btn-reset "
                  >
                    Inscribirme
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Cómo funciona */}
      <Container fluid className="how-it-works py-5">
        <Container>
          <h2 className="fw-bold text-center mb-4">Cómo Funciona</h2>
          <Row className="text-center">
            <Col md={4}>
              <h4>1. Regístrate</h4>
              <p>Crea tu cuenta en segundos y accede a cursos ilimitados.</p>
            </Col>
            <Col md={4}>
              <h4>2. Aprende</h4>
              <p>
                Explora lecciones con IA, ejercicios dinámicos y explicaciones
                claras.
              </p>
            </Col>
            <Col md={4}>
              <h4>3. Mejora</h4>
              <p>Recibe retroalimentación y avanza a tu propio ritmo.</p>
            </Col>
          </Row>
        </Container>
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4">
        <p>© 2025 EduSmart AI | Todos los derechos reservados</p>
      </footer>
    </>
  );
}

export default Home;
