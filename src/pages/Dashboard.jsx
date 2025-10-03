import React, { useEffect, useState } from "react";
import { apiFetch } from "../api";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await apiFetch("/api/dashboard");
        setUser(data.user);
      } catch (err) {
        console.error("❌ Error en Dashboard:", err.message);
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  if (loading)
    return (
      <div className="dashboard">
        <p className="loading-text">Cargando...</p>
      </div>
    );

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">📚 EduSmart AI</h1>
        <div className="user-info">
          <p>
            Bienvenido, <b>{user.firstName} {user.lastName}</b>
          </p>
          <p>{user.email}</p>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="cards-container">
            <div className="custom-card" onClick={() => window.location.href="/my-courses"}>
  <h3>📖 Mis cursos</h3>
  <p>Visualiza todos los cursos en los que estás inscrito.</p>
</div>

          <div className="custom-card">
            <h3>📝 Mis cuestionarios</h3>
            <p>Revisa tus quizzes realizados y resultados con IA.</p>
          </div>
          <div className="custom-card">
            <h3>⚙️ Ajustes</h3>
            <p>Configura tu perfil y preferencias de aprendizaje.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
