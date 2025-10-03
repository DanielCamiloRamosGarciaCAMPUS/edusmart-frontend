import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { apiFetch } from "../api";
import "../styles/Courses.css";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [enrollCourseId, setEnrollCourseId] = useState(null); // Para inscripción automática

  // Cargar cursos
  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      try {
        const data = await apiFetch("/api/courses");
        setCourses(data.courses);
        setIsLogged(true);
      } catch {
        try {
          const res = await fetch("http://localhost:5000/api/public-courses");
          const data = await res.json();
          setCourses(data.courses);
        } catch (err) {
          console.error("Error cargando cursos públicos:", err);
        }
        setIsLogged(false);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  // Detectar si venimos del login con ?enroll=ID
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get("enroll");
    if (courseId) setEnrollCourseId(courseId);
  }, []);

  // Ejecutar inscripción automática después de login
  useEffect(() => {
    if (isLogged && enrollCourseId) {
      handleAutoEnroll(enrollCourseId);
      // Limpiar query param
      const url = new URL(window.location);
      url.searchParams.delete("enroll");
      window.history.replaceState({}, "", url);
    }
  }, [isLogged, enrollCourseId]);

  // Inscripción automática
  const handleAutoEnroll = async (courseId) => {
    try {
      const check = await apiFetch(`/api/courses/${courseId}/check-enroll`);
      if (check.enrolled) {
        // Ya está inscrito: solo efecto visual
        setCourses((prev) =>
          prev.map((c) =>
            c.id === parseInt(courseId)
              ? { ...c, enrolled: 1, justEnrolled: true }
              : c
          )
        );
      } else {
        await apiFetch(`/api/courses/${courseId}/enroll`, { method: "POST" });
        setCourses((prev) =>
          prev.map((c) =>
            c.id === parseInt(courseId)
              ? { ...c, enrolled: 1, justEnrolled: true }
              : c
          )
        );
      }
      setTimeout(() => {
        setCourses((prev) =>
          prev.map((c) =>
            c.id === parseInt(courseId) ? { ...c, justEnrolled: false } : c
          )
        );
      }, 2000);
    } catch (err) {
      console.error("Error inscripción automática:", err);
    }
  };

  // Inscripción manual
  const handleEnroll = async (courseId) => {
    if (!isLogged) {
      // Redirigir a login con parámetro
      window.location.href = `/login?enroll=${courseId}`;
      return;
    }

    try {
      const check = await apiFetch(`/api/courses/${courseId}/check-enroll`);
      if (check.enrolled) {
        alert("⚠️ Ya estás inscrito en este curso.");
        return;
      }
      await apiFetch(`/api/courses/${courseId}/enroll`, { method: "POST" });
      setCourses((prev) =>
        prev.map((c) =>
          c.id === courseId ? { ...c, enrolled: 1, justEnrolled: true } : c
        )
      );
      setTimeout(() => {
        setCourses((prev) =>
          prev.map((c) =>
            c.id === courseId ? { ...c, justEnrolled: false } : c
          )
        );
      }, 2000);
    } catch (err) {
      alert(err.message);
    }
  };

  // Filtrar cursos
  const filteredCourses = courses.filter(
    (c) =>
      (category === "Todos" || c.category === category) &&
      c.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="text-center mt-5">Cargando cursos...</div>;

  return (
    <Container className="py-5 courses-container">
      <h1 className="fw-bold text-center mb-4">Nuestros Cursos</h1>

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
            {Array.from(new Set(courses.map((c) => c.category))).map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      <Row>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <Col key={course.id} md={4} sm={6} xs={12} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Img
                  variant="top"
                  src={course.thumbnail}
                  alt={course.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Text className="text-muted">{course.description}</Card.Text>
                  <div className="mt-auto">
                    <span className="badge bg-primary mb-2">{course.category}</span>
                    <Button
                      variant={course.justEnrolled ? "warning" : "success"}
                      className={`w-100 ${course.justEnrolled ? "glow" : ""}`}
                      onClick={() => handleEnroll(course.id)}
                      disabled={course.enrolled}
                    >
                      {course.enrolled ? "✅ Inscrito" : "Inscribirme"}
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
