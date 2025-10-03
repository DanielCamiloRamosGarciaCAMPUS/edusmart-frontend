import React, { useState } from "react";
import "../styles/Login.css";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError(null);

    setTimeout(() => {
      setLoading(false);
      window.dispatchEvent(
        new CustomEvent("edusmart-login", {
          detail: { email, password, remember },
        })
      );
    }, 1500);
  };

  const handleGoogle = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="brand">
          <h2 className="brand-title ">EduSmart AI</h2>
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
  {showPassword ? (
    // Ojito tachado (ocultar contraseña)
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c.78 1.92 2.07 3.58 3.66 4.78L2 19.44 3.41 20.85 21.19 3.07 19.78 1.66 16.31 5.13C15.02 4.74 13.55 4.5 12 4.5zm0 3c1.02 0 1.99.25 2.84.68l-1.46 1.46A3.5 3.5 0 0 0 8.64 13l-1.45 1.45A6 6 0 0 1 12 7.5zm0 9c-1.02 0-1.99-.25-2.84-.68l1.46-1.46A3.5 3.5 0 0 0 15.36 11l1.45-1.45A6 6 0 0 1 12 16.5zM22.54 12c-1.59-3.91-5.86-7.02-10.54-7.02-.69 0-1.36.06-2.01.18l1.7 1.7a6.5 6.5 0 0 1 7.67 4.55 6.5 6.5 0 0 1-2.45 7.33l1.45 1.45C21.93 17.96 23.21 15.58 22.54 12z"/>
    </svg>
  ) : (
    // Ojito abierto (mostrar contraseña)
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12c-2.48 0-4.5-2.02-4.5-4.5S9.52 7.5 12 7.5s4.5 2.02 4.5 4.5S14.48 16.5 12 16.5zm0-7a2.5 2.5 0 1 0 .001 5.001A2.5 2.5 0 0 0 12 9.5z"/>
    </svg>
  )}
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
              {" "}
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
          <span className="google-logo">
            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4285F4" d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.55-2.46C13.89.9 11.69 0 9 0 5.48 0 2.44 1.92 1 4.77l2.95 2.29C4.6 5.1 6.57 3.48 9 3.48z"/>
              <path fill="#34A853" d="M17.64 9.2c0-.63-.06-1.25-.18-1.84H9v3.48h4.84c-.21 1.14-.85 2.09-1.81 2.73l2.92 2.27C16.89 14.9 17.64 12.23 17.64 9.2z"/>
              <path fill="#FBBC05" d="M3.95 10.06a5.4 5.4 0 0 1 0-2.12L1 5.65A9 9 0 0 0 0 9.2c0 1.45.34 2.82.95 4.05l2-3.19z"/>
              <path fill="#EA4335" d="M9 17.94c2.69 0 4.89-.89 6.52-2.42l-2.92-2.27c-.81.55-1.85.88-3.6.88-2.43 0-4.4-1.62-5.05-3.88L1 13.2C2.44 16.07 5.48 17.94 9 17.94z"/>
            </svg>
          </span>
          {" "}
          {" "}
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
