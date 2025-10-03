import { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    // Borrar token de localStorage y sessionStorage
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    // Redirigir al login
    window.location.href = "/login";
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Cerrando sesión...</h2>
    </div>
  );
}
