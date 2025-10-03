import React, { useState } from "react";
import "../styles/Login.css";
import { apiFetch } from "../api"; // 👈 importamos helper

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validate = () => {
    if (!email) {
      setError("Ingresa tu correo electrónico");
      return false;
    }
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      setError("Formato de correo inválido");
      return false;
    }
    if (!password) {
      setError("Ingresa tu contraseña");
      return false;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  setLoading(true);
  setError(null);

  try {
    const data = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (data.token) {
      if (remember) {
        localStorage.setItem("token", data.token);
      } else {
        sessionStorage.setItem("token", data.token);
      }

      // Revisar si venimos de un curso
      const urlParams = new URLSearchParams(window.location.search);
      const enrollCourseId = urlParams.get("enroll");

      if (enrollCourseId) {
        // Redirigir a la misma página de cursos con el enroll param
        window.location.href = `/courses?enroll=${enrollCourseId}`;
      } else {
        // Redirigir normalmente al dashboard
        window.location.href = "/dashboard";
      }
    }
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  const handleGoogle = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="brand">
          <h2 className="brand-title">EduSmart AI</h2>
          <p className="brand-sub">Cursos virtuales con inteligencia artificial</p>
        </div>
        <br />

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="loginEmail">Correo</label>
            <input
              id="loginEmail"
              type="email"
              className="form-control"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="loginPassword">Contraseña</label>
            <div className="input-group">
              <input
                id="loginPassword"
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-btn"
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <br />
          <div className="form-options">
            <label>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Recordarme
            </label>
            {" "}
            <a href="/forgot-password" className="forgot-link">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {error && <div className="error-msg">{error}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <div className="or-separator"><span>o</span></div>

        <button className="google-btn" onClick={handleGoogle}>
          <span>Ingresar con Google</span>
        </button>

        <br />
        <div className="register-link">
          ¿No tienes cuenta? <a href="/register">Regístrate</a>
        </div>
      </div>
    </div>
  );
}
