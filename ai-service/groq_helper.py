import os
from pathlib import Path
from dotenv import load_dotenv

# Tangani jika library groq belum terinstal di environment lokal
try:
    from groq import Groq
    GROQ_AVAILABLE = True
except ImportError:
    GROQ_AVAILABLE = False

# Pastikan file .env di folder ai-service terbaca dari direktori mana pun script dijalankan
env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)
load_dotenv()

_client = None

def get_groq_client():
    global _client
    if not GROQ_AVAILABLE:
        return None
    if _client is not None:
        return _client
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key or api_key.startswith("gsk_tempelkan"):
        return None
    try:
        _client = Groq(api_key=api_key)
        return _client
    except Exception as e:
        print(f"⚠️ Gagal inisialisasi Groq client: {e}")
        return None

def get_rekomendasi(
    prediksi_label,
    confidence,
    kondisi_pengguna=""
):
    # Normalisasi tingkat keyakinan (jika input berbentuk desimal 0.0 - 1.0, ubah ke persen 0 - 100)
    conf_pct = confidence * 100 if confidence <= 1.0 else confidence

    client = get_groq_client()
    if not client:
        return (
            f"Kudapan {prediksi_label} terdeteksi dengan tingkat keyakinan {conf_pct:.1f}%. "
            "Kandungan gula dan karbohidrat pada kudapan ini sebaiknya dinikmati dalam takaran wajar, "
            "serta diimbangi dengan asupan serat dan konsumsi air putih hangat yang cukup."
        )

    kondisi = (
        kondisi_pengguna
        if kondisi_pengguna
        else "orang dewasa umum yang menjaga kesehatan gula darah"
    )

    model_name = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")

    prompt = f"""
Kamu adalah asisten ahli gizi dan kesehatan terpercaya aplikasi Cek-Gula.

Model Machine Learning mendeteksi jajanan pasar:
Nama makanan: {prediksi_label}
Tingkat keyakinan: {conf_pct:.1f}%
Kondisi pengguna: {kondisi}

Berikan nasihat singkat yang ramah dan solutif:
1. Ringkasan karakteristik kudapan ini
2. Perkiraan risiko gula darah & beban glikemik
3. Tips porsi konsumsi yang bijak
4. Alternatif atau pendamping konsumsi yang lebih sehat

Syarat: Gunakan Bahasa Indonesia yang santun, lugas, dan padat (maksimal 120 kata).
"""

    try:
        response = client.chat.completions.create(
            model=model_name,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.6,
            max_tokens=250
        )
        return response.choices[0].message.content
    except Exception as e:
        return (
            f"Kudapan {prediksi_label} terdeteksi ({conf_pct:.1f}%). "
            f"Petuah sehat: Konsumsi dalam porsi wajar dan batasi jika memiliki riwayat gula darah tinggi. (Catatan AI: {str(e)})"
        )