// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    console.log("🔑 Verificando token:", token);

    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
    setChecking(false);
  }, []);

  if (checking) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}>🔄 Verificando sesión...</div>;
  }

  return isAuth ? children : <Navigate to="/login" replace />;
}
