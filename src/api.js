// src/api.js
export async function apiFetch(url, options = {}) {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch("http://localhost:5000" + url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let errorMsg = "Error en la petición";
    try {
      const errData = await res.json();
      errorMsg = errData.error || errorMsg;
    } catch (_) {}
    throw new Error(errorMsg);
  }

  return res.json();
}
