const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conexión a MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // 👈 cámbialo si tu usuario es diferente
  password: "", // 👈 pon tu password si tienes
  database: "edusmart_ai"
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error conectando a MySQL:", err);
    return;
  }
  console.log("✅ Conectado a MySQL");
});

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor backend funcionando 🚀");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});



//Register.jsx
// Ruta para registrar usuarios
app.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  try {
    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar en MySQL
    db.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
      [firstName, lastName, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.error("❌ Error en la base de datos:", err);
          return res.status(500).json({ error: "Error en el servidor" });
        }
        res.json({ message: "✅ Usuario registrado correctamente!" });
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});



//Login.jsx 
const jwt = require("jsonwebtoken"); // asegúrate de tenerlo instalado
const JWT_SECRET = "secreto_super_seguro"; // ⚠️ en producción usa .env

// Ruta de login
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  // Buscar usuario por email
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) {
      console.error("❌ Error en DB:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const user = results[0];

    // Comparar contraseñas
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Generar token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      message: "✅ Login exitoso",
      token,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.role,
      },
    });
  });
});


//Verificacion Dashboard 
// Middleware para verificar token
function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "Token requerido" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Token inválido" });
    req.user = user;
    next();
  });
}

// Ruta protegida Dashboard con nombre real
app.get("/api/dashboard", authMiddleware, (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT first_name, last_name, email, role FROM users WHERE id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error en la base de datos" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const user = results[0];
      res.json({
        user: {
          id: userId,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          role: user.role || "student",
        },
      });
    }
  );
});


//Courses.jsx
// Ruta para obtener todos los cursos con info de inscripción del usuario
app.get("/api/courses", authMiddleware, (req, res) => {
  const userId = req.user.id;

  const query = `
    SELECT c.*, 
           IF(e.user_id IS NULL, 0, 1) AS enrolled
    FROM courses c
    LEFT JOIN enrollments e
      ON c.id = e.course_id AND e.user_id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("❌ Error obteniendo cursos:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.json({ courses: results });
  });
});

//Inscripcion Curso 
// POST /api/courses/:id/enroll
app.post("/api/courses/:id/enroll", authMiddleware, (req, res) => {
  const courseId = req.params.id;
  const userId = req.user.id;

  const query = "INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)";

  db.query(query, [userId, courseId], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ error: "Ya estás inscrito en este curso" });
      }
      console.error("❌ Error al inscribirse:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.json({ message: "✅ Inscripción exitosa" });
  });
});



//MyCourses.jsx
// RUTA: Obtener cursos del usuario con progreso
app.get("/api/my-courses", authMiddleware, (req, res) => {
  const userId = req.user.id;

  const query = `
    SELECT c.id, c.title, c.description, c.thumbnail, c.category, IFNULL(e.progress, 0) AS progress
    FROM courses c
    JOIN enrollments e ON c.id = e.course_id
    WHERE e.user_id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("❌ Error obteniendo cursos del usuario:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.json({ courses: results });
  });
});

// Cursos públicos (sin login)
app.get("/api/public-courses", (req, res) => {
  const query = `
    SELECT id, title, description, thumbnail, category, level
    FROM courses
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error obteniendo cursos públicos:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.json({ courses: results });
  });
});

// Verificar inscripción de un curso
app.get("/api/courses/:id/check-enroll", authMiddleware, (req, res) => {
  const courseId = req.params.id;
  const userId = req.user.id;

  db.query(
    "SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?",
    [userId, courseId],
    (err, results) => {
      if (err) {
        console.error("❌ Error verificando inscripción:", err);
        return res.status(500).json({ error: "Error en el servidor" });
      }
      if (results.length > 0) {
        res.json({ enrolled: true });
      } else {
        res.json({ enrolled: false });
      }
    }
  );
});
