const pool = require("../config/db");

// Helper untuk menghasilkan tanggal lokal (YYYY-MM-DD) yang akurat sesuai zona waktu lokal
const getLocalDateString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Helper untuk menghasilkan jam lokal (HH:mm)
const getLocalTimeString = () => {
  const d = new Date();
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

// GET /api/diary?date=YYYY-MM-DD
const getDiary = async (req, res) => {
  try {
    const tanggal = req.query.date || getLocalDateString();

    const result = await pool.query(
      `SELECT id,
              nama_makanan                    AS food_name,
              kadar_gula                      AS sugar,
              kalori                          AS calories,
              status                          AS category,
              to_char(time_eaten, 'HH24:MI')  AS time,
              diary_date
       FROM food_diary
       WHERE user_id = $1 AND diary_date = $2
       ORDER BY time_eaten ASC`,
      [req.user.id, tanggal]
    );

    const totalCalories = result.rows.reduce((s, r) => s + (parseFloat(r.calories) || 0), 0);
    const totalSugar    = result.rows.reduce((s, r) => s + (parseFloat(r.sugar)    || 0), 0);

    res.json({
      status: "success",
      date: tanggal,
      summary: {
        totalCalories: parseFloat(totalCalories.toFixed(1)),
        totalSugar:    parseFloat(totalSugar.toFixed(1)),
      },
      data: result.rows,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// POST /api/diary
const addDiary = async (req, res) => {
  try {
    const { scan_id, nama_makanan, kadar_gula, kalori, status, time_eaten, diary_date } = req.body;
    const cleanFoodName = (nama_makanan || "").trim();

    if (!cleanFoodName)
      return res.status(400).json({ status: "error", message: "Nama makanan wajib diisi." });

    const result = await pool.query(
      `INSERT INTO food_diary
         (user_id, scan_id, nama_makanan, kadar_gula, kalori, status, time_eaten, diary_date)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING *`,
      [
        req.user.id,
        scan_id    || null,
        cleanFoodName,
        parseFloat(kadar_gula) || 0,
        parseFloat(kalori)     || 0,
        status     || "Normal",
        time_eaten || getLocalTimeString(),
        diary_date || getLocalDateString(),
      ]
    );

    res.status(201).json({ status: "success", message: "Diary ditambahkan.", data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// DELETE /api/diary/:id
const deleteDiary = async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM food_diary WHERE id = $1 AND user_id = $2 RETURNING id",
      [req.params.id, req.user.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ status: "error", message: "Entri tidak ditemukan." });

    res.json({ status: "success", message: "Entri dihapus." });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

module.exports = { getDiary, addDiary, deleteDiary };
