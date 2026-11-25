import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaFire, FaUtensilSpoon, FaClock, FaCheckCircle, FaExclamationTriangle, FaPlus } from 'react-icons/fa'
import { 
  MdStorefront, 
  MdMenuBook, 
  MdCameraAlt, 
  MdCheckCircle, 
  MdWarning, 
  MdError,
  MdArrowBack,
  MdBarChart
} from 'react-icons/md'
import { getDiary } from '../services/api'
import { KukusanLoadingSvg, DaunPisangCorner } from '../components/JajananArt'

function DiaryPage() {
  const navigate = useNavigate()
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('Semua')

  useEffect(() => {
    getDiary()
      .then(result => {
        if (result && result.data) {
          setEntries(result.data.map(item => ({
            id:        item.id,
            food_name: item.food_name,
            calories:  item.calories,
            sugar:     item.sugar,
            category:  item.category,
            time:      item.time,
          })))
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const getCategoryBadge = (category) => {
    if (category === 'Rendah') {
      return {
        className: 'bg-[#FEF5E7] text-[#7A4A21] border border-[#F2B134]',
        text: 'Aman (Rendah)',
        icon: <MdCheckCircle size={18} className="text-[#3D7033]" />,
      }
    }
    if (category === 'Normal' || category === 'Sedang') {
      return {
        className: 'bg-[#FEF6E4] text-[#B5451B] border border-[#F2B134]',
        text: 'Sedang (Normal)',
        icon: <MdWarning size={18} className="text-[#B5451B]" />,
      }
    }
    return {
      className: 'bg-[#FDEEE9] text-[#B5451B] border border-[#B5451B]',
      text: 'Tinggi (Manis)',
      icon: <MdError size={18} className="text-[#B5451B]" />,
    }
  }

  const totalCalories = entries.reduce((sum, e) => sum + (parseFloat(e.calories) || 0), 0)
  const totalSugar    = entries.reduce((sum, e) => sum + (parseFloat(e.sugar)    || 0), 0)
  const totalSendokTeh = totalSugar > 0 ? (totalSugar / 4.5).toFixed(1) : '0'
  const persenGulaHarian = Math.min(Math.round((totalSugar / 50) * 100), 200)
  const sisaGula = Math.max(0, 50 - totalSugar).toFixed(1)

  const filteredEntries = entries.filter(e => {
    if (filter === 'Semua') return true
    if (filter === 'Rendah') return e.category === 'Rendah'
    if (filter === 'Sedang') return e.category === 'Sedang' || e.category === 'Normal'
    if (filter === 'Tinggi') return e.category === 'Tinggi'
    return true
  })

  return (
    <div className="min-h-screen font-body text-[#3B2A1A] flex flex-col justify-between">
      <div>
        {/* Kanopi Tenda Lapak */}
        <div className="canopy-stripes h-2.5 w-full border-b border-[#5E2A0B]"></div>

        {/* Navbar Lapak (Format Website Penuh) */}
        <nav className="bg-[#FFFDF9] border-b-2 border-[#E8D9C5] px-4 sm:px-6 lg:px-8 py-3.5 sticky top-0 z-50 shadow-sm backdrop-blur-md">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="p-2 sm:px-3 sm:py-2 rounded-xl text-[#8C4318] hover:bg-[#FFF3DD] border border-[#E8D9C5] transition flex items-center gap-1.5 cursor-pointer min-h-[44px] text-xs font-display font-bold shadow-xs"
                aria-label="Kembali"
                title="Kembali ke halaman sebelumnya"
              >
                <MdArrowBack size={18} />
                <span className="hidden sm:inline">Kembali</span>
              </button>

              <div 
                onClick={() => navigate('/')} 
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#8C4318] text-white flex items-center justify-center text-xl shadow-sm group-hover:scale-105 transition-transform">
                  <MdStorefront size={22} />
                </div>
                <div>
                  <span className="font-display font-bold text-xl text-[#8C4318] block leading-tight">
                    Cek-Gula
                  </span>
                  <span className="text-[10px] font-semibold text-[#B5451B] block">
                    Buku Kas Konsumsi Harian
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 font-display font-semibold text-xs sm:text-sm">
              <button
                onClick={() => navigate('/scan')}
                className="btn-pasar-primary px-4 py-2 text-xs sm:text-sm font-bold shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <FaPlus size={12} />
                <span>Tilik Jajanan Baru</span>
              </button>
              
              <a 
                href="https://dashboard-cek-gula.streamlit.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#7A4A21] hover:bg-[#FFF3DD] px-3.5 py-2 rounded-xl transition hidden md:flex items-center gap-1.5 border border-[#E8D9C5]"
              >
                <MdBarChart size={16} />
                <span>Dashboard Data</span>
              </a>

              <button
                onClick={handleLogout}
                className="text-[#B5451B] hover:bg-[#FDEEE9] px-3 py-1.5 rounded-xl font-display font-semibold text-xs transition cursor-pointer"
              >
                Keluar
              </button>
            </div>

          </div>
        </nav>

        {/* Konten Utama Format Website Dashboard (Lebar max-w-6xl) */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          
          {/* Header Sub-Halaman */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-dashed border-[#E8D9C5] pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#FEF6E4] border border-[#F2B134] text-[#B5451B] text-xs font-display font-bold px-3 py-1 rounded-full mb-2.5 shadow-sm">
                <MdMenuBook size={14} />
                <span>Buku Kas Kudapan Pasar</span>
              </div>
              <h1 className="font-display font-black text-2xl sm:text-4xl text-[#3B2A1A] tracking-tight">
                Catatan Jajananmu Hari Ini
              </h1>
              <p className="text-xs sm:text-base text-[#745F4B] mt-1 max-w-2xl leading-relaxed">
                Pantau total kalori, gram gula terkonsumsi, dan sisa kuota manis harian agar tubuh tetap sehat dan bugar.
              </p>
            </div>

            <button
              onClick={() => navigate('/scan')}
              className="btn-pasar-primary px-5 py-3 text-xs sm:text-sm font-bold shadow-md flex items-center gap-2 cursor-pointer self-start md:self-auto"
            >
              <MdCameraAlt size={18} />
              <span>Foto Kudapan Baru</span>
            </button>
          </div>

          {/* Grid 4 Kartu Metrik Utama di Atas (Desktop Format) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
            
            {/* 1. Total Kalori */}
            <div className="daun-card p-5 text-center relative overflow-hidden bg-[#FFFDF9] border border-[#E8D9C5] shadow-sm">
              <DaunPisangCorner position="top-right" />
              <div className="w-10 h-10 rounded-xl bg-[#FEF5E7] text-[#8C4318] flex items-center justify-center mx-auto mb-2">
                <FaFire size={18} />
              </div>
              <p className="text-xs font-semibold text-[#745F4B] uppercase tracking-wide">
                Total Kalori Masuk
              </p>
              <p className="font-display font-black text-3xl sm:text-4xl text-[#7A4A21] my-1">
                {totalCalories.toFixed(0)}
              </p>
              <p className="text-[11px] text-[#A89582] font-semibold">
                kkal energi harian
              </p>
            </div>

            {/* 2. Total Gula */}
            <div className="daun-card p-5 text-center relative overflow-hidden bg-[#FFFDF9] border border-[#E8D9C5] shadow-sm">
              <DaunPisangCorner position="top-right" />
              <div className="w-10 h-10 rounded-xl bg-[#FEF6E4] text-[#B5451B] flex items-center justify-center mx-auto mb-2">
                <FaUtensilSpoon size={18} />
              </div>
              <p className="text-xs font-semibold text-[#745F4B] uppercase tracking-wide">
                Total Gula Terkonsumsi
              </p>
              <p className="font-display font-black text-3xl sm:text-4xl text-[#8C4318] my-1">
                {totalSugar.toFixed(1)}
              </p>
              <p className="text-[11px] text-[#A89582] font-semibold">
                gram (±{totalSendokTeh} sdt)
              </p>
            </div>

            {/* 3. Batas Aman Kemenkes */}
            <div className="daun-card p-5 text-center relative overflow-hidden bg-[#FFFDF9] border border-[#E8D9C5] shadow-sm">
              <DaunPisangCorner position="top-right" />
              <div className="w-10 h-10 rounded-xl bg-[#FEF5E7] text-[#3D7033] flex items-center justify-center mx-auto mb-2">
                {totalSugar <= 50 ? <FaCheckCircle size={18} /> : <FaExclamationTriangle size={18} className="text-[#B5451B]" />}
              </div>
              <p className="text-xs font-semibold text-[#745F4B] uppercase tracking-wide">
                Sisa Batas Aman (50g)
              </p>
              <p className={`font-display font-black text-3xl sm:text-4xl my-1 ${totalSugar > 50 ? 'text-[#B5451B]' : 'text-[#3D7033]'}`}>
                {sisaGula}
              </p>
              <p className="text-[11px] text-[#A89582] font-semibold">
                {totalSugar > 50 ? 'Melebihi batas!' : 'gram kuota tersisa'}
              </p>
            </div>

            {/* 4. Total Kudapan */}
            <div className="daun-card p-5 text-center relative overflow-hidden bg-[#FFFDF9] border border-[#E8D9C5] shadow-sm">
              <DaunPisangCorner position="top-right" />
              <div className="w-10 h-10 rounded-xl bg-[#FEF5E7] text-[#8C4318] flex items-center justify-center mx-auto mb-2">
                <MdStorefront size={20} />
              </div>
              <p className="text-xs font-semibold text-[#745F4B] uppercase tracking-wide">
                Kudapan Tercatat
              </p>
              <p className="font-display font-black text-3xl sm:text-4xl text-[#3B2A1A] my-1">
                {entries.length}
              </p>
              <p className="text-[11px] text-[#A89582] font-semibold">
                jenis kue hari ini
              </p>
            </div>

          </div>

          {/* Grid Utama Dashboard: 12 Kolom */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Kolom Kiri (8 Kolom): Riwayat Catatan Kudapan & Filter */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Filter Tabs Bar */}
              <div className="bg-[#FFFDF9] border border-[#E8D9C5] p-3 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {['Semua', 'Rendah', 'Sedang', 'Tinggi'].map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFilter(cat)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-display font-bold transition cursor-pointer ${
                        filter === cat
                          ? 'bg-[#8C4318] text-white shadow-xs'
                          : 'text-[#745F4B] hover:bg-[#FFF3DD] hover:text-[#8C4318]'
                      }`}
                    >
                      {cat === 'Semua' ? 'Semua Kudapan' : `Manis ${cat}`}
                    </button>
                  ))}
                </div>

                <span className="text-xs text-[#A89582] font-semibold">
                  Menampilkan {filteredEntries.length} dari {entries.length} catatan
                </span>
              </div>

              {/* Status Loading */}
              {loading ? (
                <div className="daun-card text-center py-16 bg-[#FFFDF9] shadow-sm">
                  <KukusanLoadingSvg className="mx-auto mb-4" />
                  <p className="font-display font-bold text-base text-[#7A4A21]">
                    Membuka lembaran buku kas lapak...
                  </p>
                  <p className="text-xs text-[#A89582] mt-1">
                    Mohon tunggu sejenak ya.
                  </p>
                </div>
              ) : filteredEntries.length === 0 ? (
                /* State Kosong (Empty State) */
                <div className="daun-card p-10 text-center bg-[#FFFDF9] border border-[#E8D9C5] shadow-sm">
                  <div className="w-20 h-20 rounded-full bg-[#FFF8EC] border-2 border-[#E8D9C5] flex items-center justify-center mx-auto mb-4 text-[#8C4318]">
                    <MdStorefront size={38} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#7A4A21] mb-2">
                    Lapak Catatan Masih Kosong
                  </h3>
                  <p className="text-xs sm:text-sm text-[#745F4B] max-w-sm mx-auto mb-6 leading-relaxed">
                    Belum ada jajanan dengan kategori ini yang dicatat hari ini. Yuk jepret foto jajanan pasarmu dan masukkan ke catatan!
                  </p>
                  <button
                    onClick={() => navigate('/scan')}
                    className="btn-pasar-primary px-8 py-3 text-sm font-bold inline-flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <MdCameraAlt size={18} />
                    <span>Mulai Tilik Jajanan</span>
                  </button>
                </div>
              ) : (
                /* Daftar Kartu Kudapan */
                <div className="space-y-3">
                  {filteredEntries.map(entry => {
                    const badge = getCategoryBadge(entry.category)
                    return (
                      <div 
                        key={entry.id} 
                        className="daun-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FFFDF9] hover-jajan transition border border-[#E8D9C5] shadow-xs"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-2xl bg-[#FFF8EC] border border-[#E8D9C5] flex items-center justify-center text-xl shrink-0 shadow-inner">
                            {badge.icon}
                          </div>
                          <div>
                            <h3 className="font-display font-bold text-base sm:text-lg text-[#3B2A1A] capitalize">
                              {entry.food_name}
                            </h3>
                            <p className="text-xs text-[#745F4B] mt-0.5 flex items-center gap-2 flex-wrap">
                              <span className="inline-flex items-center gap-1 font-semibold text-[#8C4318]">
                                <FaClock size={11} />
                                <span>Pukul {entry.time}</span>
                              </span>
                              <span>•</span>
                              <span>Energi: <strong className="text-[#7A4A21]">{entry.calories} kkal</strong></span>
                              <span>•</span>
                              <span>Gula: <strong className="text-[#8C4318]">{entry.sugar}g</strong></span>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-auto">
                          <span className={`px-3.5 py-1 rounded-full text-xs font-display font-bold shrink-0 ${badge.className}`}>
                            {badge.text}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

            </div>

            {/* Kolom Kanan (4 Kolom): Panel Analisis & Wawasan Gula */}
            <div className="lg:col-span-4 space-y-5">
              
              {/* Card Gauge Batas Gula 50g */}
              <div className="daun-card p-6 bg-[#FFFDF9] border border-[#E8D9C5] shadow-sm">
                <span className="text-[10px] font-display font-bold text-[#8C4318] uppercase tracking-wider block mb-1">
                  Pengukur Asupan Harian
                </span>
                <h4 className="font-display font-bold text-base text-[#3B2A1A] mb-2">
                  Status Gula ({persenGulaHarian}% Kuota)
                </h4>
                <p className="text-xs text-[#745F4B] leading-relaxed mb-4">
                  {totalSugar > 50 
                    ? 'Perhatian: Total asupan gula kamu sudah melebihi batas 50g per hari yang disarankan Kemenkes RI.' 
                    : `Bagus! Kamu sudah menggunakan ${totalSugar.toFixed(1)}g dari batas aman 50g hari ini.`}
                </p>

                <div className="w-full bg-[#EAD5BC] h-3.5 rounded-full overflow-hidden p-0.5 mb-2">
                  <div 
                    className={`h-full rounded-full transition-all duration-700 ${
                      persenGulaHarian > 100 ? 'bg-[#B5451B]' : persenGulaHarian > 70 ? 'bg-[#F2B134]' : 'bg-[#3D7033]'
                    }`}
                    style={{ width: `${Math.min(persenGulaHarian, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-[#A89582] font-semibold">
                  <span>0g</span>
                  <span>Batas: 50g</span>
                </div>
              </div>

              {/* Card Rekomendasi Jajanan Pasar Sehat */}
              <div className="daun-card p-6 bg-[#FFF9EE] border border-[#EAD5BC] shadow-sm">
                <h4 className="font-display font-bold text-sm text-[#8C4318] mb-2 flex items-center gap-2">
                  <MdStorefront size={18} />
                  <span>Kiat Memilih Jajanan Pasar:</span>
                </h4>
                <ul className="space-y-2.5 text-xs text-[#745F4B] leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-[#8C4318] font-bold">•</span>
                    <span><strong>Pilih jajanan gurih</strong> seperti Lemper ayam, Tahu bakso, atau Semar mendem yang kaya protein dan rendah gula.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8C4318] font-bold">•</span>
                    <span><strong>Minta kuah kinca dipisah</strong> saat membeli serabi atau lupis agar kamu bisa menakar siramannya sendiri.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8C4318] font-bold">•</span>
                    <span><strong>Dampingi dengan air putih</strong> atau teh tawar hangat tanpa gula.</span>
                  </li>
                </ul>
              </div>

              {/* Card Shortcut ke Dashboard Streamlit */}
              <div className="bg-[#743714] text-white p-5 rounded-2xl shadow-md">
                <h5 className="font-display font-bold text-sm mb-1 text-white">Lihat Grafik & Analitik Lengkap</h5>
                <p className="text-xs text-[#FFF8EE]/80 mb-4 leading-relaxed">
                  Ingin melihat analisis tren glikemik dan sebaran kalori mingguan? Buka dashboard interaktif kami.
                </p>
                <a
                  href="https://dashboard-cek-gula.streamlit.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pasar-kunyit w-full py-2.5 text-xs font-bold flex items-center justify-center gap-2"
                >
                  <MdBarChart size={16} />
                  <span>Buka Dashboard Analitik ↗</span>
                </a>
              </div>

            </div>

          </div>

        </main>
      </div>

      <div className="text-center py-4 text-xs text-[#A89582] border-t border-[#E8D9C5] bg-[#FFFDF9] mt-12">
        © 2026 Cek-Gula Jajanan Pasar Indonesia
      </div>
    </div>
  )
}

export default DiaryPage
