import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import "../styles/Courses.css";


//Estos son daots simulados, necesitamos ponerle BACKEND :p
//EL QUE LO LEA ES GAY
const allCourses = [
  {
    id: 1,
    title: "Introducción a la IA",
    description: "Aprende los fundamentos de la inteligencia artificial.",
    category: "Inteligencia Artificial",
    image: "https://source.unsplash.com/400x200/?artificial,intelligence",
  },
  {
    id: 2,
    title: "Programación en Python",
    description: "Desde cero hasta avanzado con ejemplos prácticos.",
    category: "Programación",
    image: "https://source.unsplash.com/400x200/?python,programming",
  },
  {
    id: 3,
    title: "Cloud Computing",
    description: "Domina AWS, Azure y despliegue en la nube.",
    category: "Computación en la Nube",
    image: "https://source.unsplash.com/400x200/?cloud,technology",
  },
  {
    id: 4,
    title: "Desarrollo Web con React",
    description: "Construye aplicaciones web modernas y escalables.",
    category: "Programación",
    image: "https://source.unsplash.com/400x200/?react,javascript",
  },
  {
    id: 5,
    title: "Machine Learning Avanzado",
    description: "Modelos supervisados, no supervisados y deep learning.",
    category: "Inteligencia Artificial",
    image: "https://source.unsplash.com/400x200/?machine,learning",
  },
];

function Courses() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");

  // Filtrar cursos
  const filteredCourses = allCourses.filter((course) => {
    const matchCategory = category === "Todos" || course.category === category;
    const matchSearch = course.title.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <Container className="py-5 courses-container">
      <h1 className="fw-bold text-center mb-4">Nuestros Cursos</h1>

      {/* Filtros */}
      <Row className="mb-4">
        <Col md={6} className="mb-2">
          <Form.Control
            type="text"
            placeholder="🔍 Buscar curso..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={6} className="mb-2">
          <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Todos</option>
            <option>Inteligencia Artificial</option>
            <option>Programación</option>
            <option>Computación en la Nube</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Grid de cursos */}
      <Row>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <Col key={course.id} md={4} sm={6} xs={12} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Img
                  variant="top"
                  src={course.image}
                  alt={course.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Text className="text-muted">{course.description}</Card.Text>
                  <div className="mt-auto">
                    <span className="badge bg-primary mb-2">{course.category}</span>
                    <Button variant="success" className="w-100">
                      Inscribirme
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">😢 No se encontraron cursos con esos filtros.</p>
        )}
      </Row>
    </Container>
  );
}

export default Courses;
