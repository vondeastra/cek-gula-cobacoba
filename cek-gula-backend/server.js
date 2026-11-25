const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const cors    = require("cors");
const fs      = require("fs");

const authRoutes    = require("./routes/authRoutes");
const gulaRoutes    = require("./routes/gulaRoutes");
const diaryRoutes   = require("./routes/diaryRoutes");
const nutrisiRoutes = require("./routes/nutrisiRoutes");

const app  = express();
const PORT = process.env.PORT || 3000;

// Buat folder uploads jika belum ada
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// Konfigurasi CORS yang fleksibel
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "https://cek-gula.vercel.app",
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Izinkan permintaan tanpa origin (seperti Postman, mobile app, atau curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith(".vercel.app")) {
      return callback(null, true);
    }
    return callback(null, true); // Toleran untuk development
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth",    authRoutes);
app.use("/api/gula",    gulaRoutes);
app.use("/api/diary",   diaryRoutes);
app.use("/api/nutrisi", nutrisiRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "🍃 Cek-Gula Backend berjalan!" });
});

// 404
app.use((req, res) => {
  res.status(404).json({ status: "error", message: `Route ${req.path} tidak ditemukan.` });
});

app.listen(PORT, () => console.log(`🚀 Server: http://localhost:${PORT}`));
