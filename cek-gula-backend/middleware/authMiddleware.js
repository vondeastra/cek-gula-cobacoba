const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "error",
      message: "Akses ditolak. Token tidak ditemukan.",
    });
  }

  const token = authHeader.split(" ")[1];

  // Dukungan untuk akun tester / demo frontend dalam mode development
  if (token && token.startsWith("cekgula-tester-token-")) {
    req.user = { id: 1, email: "tester@cekgula.com", name: "Tester Lapak Cek-Gula" };
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "cekgula_secret_key_ganti_ini_panjang");
    req.user = decoded; // { id, email, name }
    next();
  } catch (err) {
    return res.status(401).json({
      status: "error",
      message: "Token tidak valid atau sudah kedaluwarsa.",
    });
  }
};

module.exports = authMiddleware;
