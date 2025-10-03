// src/pages/MyCourses.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, ProgressBar, Button } from "react-bootstrap";
import { apiFetch } from "../api";
import "../styles/Courses.css"; // puedes usar tus estilos existentes

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMyCourses = async () => {
      try {
        const data = await apiFetch("/api/my-courses"); // nueva ruta backend
        setCourses(data.courses);
      } catch (err) {
        console.error("❌ Error cargando cursos:", err.message);
      } finally {
        setLoading(false);
      }
    };
    loadMyCourses();
  }, []);

  if (loading)
    return <div className="text-center mt-5">Cargando tus cursos...</div>;

  return (
    <Container className="py-5 courses-container">
      <h1 className="fw-bold text-center mb-4">📖 Mis Cursos</h1>

      <Row>
        {courses.length > 0 ? (
          courses.map((course) => (
            <Col key={course.id} md={4} sm={6} xs={12} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Img
                  variant="top"
                  src={course.thumbnail || "https://via.placeholder.com/400x200"}
                  alt={course.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Text className="text-muted">{course.description}</Card.Text>
                  <ProgressBar
                    now={course.progress || 0}
                    label={`${course.progress || 0}%`}
                    className="mb-2"
                  />
                  <Button
                    variant="primary"
                    className="mt-auto"
                    onClick={() => window.location.href = `/course/${course.id}`}
                  >
                    Entrar al curso
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">😢 No estás inscrito en ningún curso aún.</p>
        )}
      </Row>
    </Container>
  );
}
