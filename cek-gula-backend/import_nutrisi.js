const pool = require("./config/db");
const fs = require("fs");
const path = require("path");

const csvPath = path.join(__dirname, "../dataset_nutrisi_lengkap.csv");
if (!fs.existsSync(csvPath)) {
  console.error("❌ File CSV tidak ditemukan di:", csvPath);
  process.exit(1);
}

const lines = fs.readFileSync(csvPath, "utf8").split("\n");
lines.shift();

const inserts = lines.filter(l => l.trim()).map(line => {
  const cols = line.split(",");
  return pool.query(
    "INSERT INTO nutrisi (nama_makanan, kalori_kkal, lemak_g, karbohidrat_g, protein_g, gula_g, estimasi_indeks_glikemik, estimasi_glycemic_load) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
    [cols[0]?.trim(), cols[1]?.trim(), cols[2]?.trim(), cols[3]?.trim(), cols[4]?.trim(), cols[5]?.trim(), cols[6]?.trim(), parseFloat(cols[7]) || 0]
  );
});

Promise.all(inserts)
  .then(() => {
    console.log("✅ Import selesai! Total:", inserts.length);
    pool.end();
  })
  .catch(e => {
    console.error("❌ Import error:", e.message);
    pool.end();
  });
