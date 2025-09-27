import React from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";

function Home() {
  return (
    <>
      {/* Hero */}
      <div
        className="d-flex flex-column align-items-center justify-content-center text-center text-white"
        style={{
          width: "100vw",
          height: "100vh",
          background: "linear-gradient(135deg, #0d6efd, #6610f2)",
        }}
      >
        <h1 className="fw-bold display-2">Bienvenido a EduSmart AI</h1>
        <p className="fs-4">
          Plataforma de cursos virtuales con inteligencia artificial
        </p>
        <Button variant="light" size="lg" href="/courses">
          🚀 Explorar Cursos
        </Button>
      </div>

      {/* Sección Características */}
      <Container className="py-5 text-center">
        <h2 className="fw-bold mb-4">¿Por qué elegir EduSmart AI?</h2>
        <Row>
          <Col md={4}>
            <i
              className="bi bi-speedometer text-primary"
              style={{ fontSize: "3rem" }}
            ></i>
            <h5>Aprendizaje Personalizado</h5>
            <p>
              IA que adapta los contenidos a tu ritmo y estilo de aprendizaje.
            </p>
          </Col>
          <Col md={4}>
            <i
              className="bi bi-laptop text-success"
              style={{ fontSize: "3rem" }}
            ></i>
            <h5>Ejercicios Inteligentes</h5>
            <p>
              Generación automática de prácticas y retroalimentación instantánea.
            </p>
          </Col>
          <Col md={4}>
            <i
              className="bi bi-easel2 text-warning"
              style={{ fontSize: "3rem" }}
            ></i>
            <h5>Explicaciones Visuales</h5>
            <p>
              Clases con gráficos, ejemplos y explicaciones paso a paso.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Cursos Destacados */}
      <Container className="py-5">
        <h2 className="fw-bold text-center mb-4">Cursos Populares</h2>
        <Row>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Img
                variant="top"
                src="https://source.unsplash.com/400x200/?ai,education"
              />
              <Card.Body>
                <Card.Title>Introducción a la IA</Card.Title>
                <Card.Text>
                  Aprende los fundamentos de la inteligencia artificial.
                </Card.Text>
                <Button variant="primary">Inscribirme</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Img
                variant="top"
                src="https://source.unsplash.com/400x200/?programming,coding"
              />
              <Card.Body>
                <Card.Title>Programación en Python</Card.Title>
                <Card.Text>
                  Desde cero hasta avanzado con ejemplos prácticos.
                </Card.Text>
                <Button variant="primary">Inscribirme</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Img
                variant="top"
                src="https://source.unsplash.com/400x200/?cloud,technology"
              />
              <Card.Body>
                <Card.Title>Cloud Computing</Card.Title>
                <Card.Text>
                  Domina AWS, Azure y despliegue en la nube.
                </Card.Text>
                <Button variant="primary">Inscribirme</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Cómo funciona */}
      <Container fluid className="bg-light py-5">
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
//SANTIAGO ES GAY