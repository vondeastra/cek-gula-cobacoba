import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaUtensils } from 'react-icons/fa'
import { 
  MdStorefront, 
  MdCameraAlt, 
  MdMenuBook, 
  MdBarChart, 
  MdLightbulb, 
  MdCheckCircle, 
  MdWarning, 
  MdError,
  MdArrowBack
} from 'react-icons/md'
import { SendokGulaSvg, DaunPisangCorner } from '../components/JajananArt'

const SATUAN_OPTIONS = [
  { label: 'Buah / Potong (±100g)', value: 'buah', faktor: 100 },
  { label: 'Bungkus / Porsi (±150g)', value: 'porsi', faktor: 150 },
  { label: 'Sendok Makan (±15g)', value: 'sdm', faktor: 15 },
  { label: 'Sendok Teh (±5g)', value: 'sdt', faktor: 5 },
  { label: 'Mangkok Kecil (±250g)', value: 'mangkok', faktor: 250 },
  { label: 'Gelas (±200ml)', value: 'gelas', faktor: 200 },
  { label: 'Gram (g)', value: 'gram', faktor: 1 },
  { label: 'Mililiter (ml)', value: 'ml', faktor: 1 },
]

function ResultPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const hasil = location.state

  const [jumlah, setJumlah] = useState(1)
  const [satuan, setSatuan] = useState(SATUAN_OPTIONS[0])

  if (!hasil) {
    return (
      <div className="min-h-screen font-body text-[#3B2A1A] flex items-center justify-center p-6">
        <div className="daun-card p-8 text-center max-w-sm w-full">
          <div className="w-16 h-16 rounded-full bg-[#FFF8EC] border-2 border-[#E8D9C5] flex items-center justify-center text-[#8C4318] mx-auto mb-4">
            <MdStorefront size={32} />
          </div>
          <h2 className="font-display font-black text-2xl text-[#7A4A21] mb-2">
            Nota Belum Ditemukan
          </h2>
          <p className="text-xs text-[#745F4B] mb-6 leading-relaxed">
            Belum ada jajanan yang ditilik nih. Yuk jepret foto jajanan pasarmu terlebih dahulu!
          </p>
          <div className="flex flex-col gap-2.5">
            <button 
              onClick={() => navigate('/scan')} 
              className="btn-pasar-primary w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2"
            >
              <MdCameraAlt size={18} />
              <span>Ke Kamera Tilik</span>
            </button>
            <button 
              onClick={() => navigate('/')} 
              className="btn-pasar-secondary w-full py-3 text-xs font-bold flex items-center justify-center gap-2"
            >
              <MdArrowBack size={16} />
              <span>Kembali ke Beranda</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Pengelompokan status gula & microcopy khas pasar
  const getStatusInfo = (status) => {
    if (status === 'Rendah') {
      return {
        badgeClass: 'bg-[#FEF5E7] text-[#7A4A21] border-2 border-[#F2B134]',
        icon: <MdCheckCircle size={26} className="text-[#3D7033]" />,
        title: 'Manis Ringan (Rendah)',
        microcopy: 'Aman, Bu/Pak! Manisnya pas di lidah.',
        desc: 'Kudapan ini ramah untuk dinikmati dengan santai tanpa khawatir lonjakan gula drastis.'
      }
    }
    if (status === 'Normal' || status === 'Sedang') {
      return {
        badgeClass: 'bg-[#FEF6E4] text-[#B5451B] border-2 border-[#F2B134]',
        icon: <MdWarning size={26} className="text-[#B5451B]" />,
        title: 'Manis Sedang (Normal)',
        microcopy: 'Boleh jajan, tapi jangan kebanyakan ya.',
        desc: 'Nikmati secukupnya dalam takaran wajar, imbangi dengan minum air putih hangat.'
      }
    }
    return {
      badgeClass: 'bg-[#FDEEE9] text-[#B5451B] border-2 border-[#B5451B]',
      icon: <MdError size={26} className="text-[#B5451B]" />,
      title: 'Manis Pekat (Tinggi)',
      microcopy: 'Wah, manisnya nendang! Sebaiknya dibagi dua.',
      desc: 'Kandungan gula cukup pekat, sangat dianjurkan berbagi dengan teman atau keluarga.'
    }
  }

  const statusInfo = getStatusInfo(hasil.status)
  const nutrisi = hasil.nutrisiDetail || {}
  const faktorPorsi = (jumlah * satuan.faktor) / 100

  const hitung = (nilai) => {
    if (!nilai) return null
    return (parseFloat(nilai) * faktorPorsi).toFixed(1)
  }

  const totalGram = (jumlah * satuan.faktor).toFixed(0)
  const gramGulaDihitung = nutrisi.gula_g ? parseFloat(nutrisi.gula_g) * faktorPorsi : 0
  const estimasiSendokTeh = gramGulaDihitung > 0 ? gramGulaDihitung / 4.5 : (hasil.kadarGula ? parseFloat(hasil.kadarGula) / 25 : 1)

  return (
    <div className="min-h-screen font-body text-[#3B2A1A] flex flex-col">
      {/* Kanopi Tenda Lapak */}
      <div className="canopy-stripes h-2.5 w-full border-b border-[#5E2A0B]"></div>

      {/* Navbar Lapak */}
      <nav className="bg-[#FFFDF9] border-b-2 border-[#E8D9C5] px-4 sm:px-6 py-3.5 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          
          <div className="flex items-center gap-2 sm:gap-3">
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
                  Nota Hasil Tilik
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 font-display font-semibold text-xs sm:text-sm">
            <button 
              onClick={() => navigate('/diary')} 
              className="text-[#8C4318] hover:bg-[#FDF1E8] px-3 py-1.5 rounded-xl transition flex items-center gap-1.5"
            >
              <MdMenuBook size={16} />
              <span>Buku Kas Diary</span>
            </button>

            <button 
              onClick={() => {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                navigate('/login')
              }} 
              className="text-[#B5451B] hover:bg-[#FDEEE9] px-3 py-1.5 rounded-xl transition"
            >
              Keluar
            </button>
          </div>

        </div>
      </nav>

      {/* Main Container - Desain Nota Pasar Tradisional */}
      <div className="flex flex-col items-center px-4 py-8 max-w-md mx-auto w-full">
        
        {/* Kartu Struk Pasar / Nota Pembungkus */}
        <div className="w-full daun-card p-6 relative overflow-hidden bg-[#FFFDF9] shadow-xl">
          <DaunPisangCorner position="top-right" />

          {/* Stempel Cap Lapak */}
          <div className="text-center pb-4 mb-4 border-b-2 border-dashed border-[#D8C2A4]">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#FEF5E7] border-2 border-[#8C4318] mb-2 shadow-inner">
              {statusInfo.icon}
            </div>
            <div className="text-[10px] font-display font-bold tracking-widest text-[#7A4A21] uppercase">
              • NOTA TAKARAN GULA LAPAK •
            </div>
            <h1 className="font-display font-black text-3xl text-[#3B2A1A] capitalize mt-1 mb-2">
              {hasil.nama}
            </h1>
            
            {/* Badge Status */}
            <div className="inline-block">
              <span className={`px-4 py-1.5 rounded-full text-xs font-display font-bold ${statusInfo.badgeClass}`}>
                {statusInfo.title}
              </span>
            </div>

            {/* Microcopy Pasar */}
            <p className="font-display font-bold text-sm text-[#B5451B] mt-2.5">
              "{statusInfo.microcopy}"
            </p>
            <p className="text-[11px] text-[#745F4B] mt-0.5">
              {statusInfo.desc}
            </p>
          </div>

          {/* Pengatur Porsi Jajan (Interaktif) */}
          <div className="bg-[#FFF9EE] border border-[#EAD5BC] rounded-2xl p-4 mb-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display font-bold text-xs text-[#7A4A21] uppercase tracking-wide flex items-center gap-1.5">
                <FaUtensils size={13} className="text-[#8C4318]" />
                <span>Takaran Porsi yang Dimakan</span>
              </h3>
              <span className="text-[10px] bg-[#FEF5E7] text-[#8C4318] font-bold px-2 py-0.5 rounded-md border border-[#E8C589]">
                Otomatis Dihitung
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] text-[#745F4B] font-semibold block mb-1">
                  Berapa Banyak?
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.5"
                  value={jumlah}
                  onChange={(e) => setJumlah(Math.max(0.1, parseFloat(e.target.value) || 1))}
                  className="w-full bg-white border border-[#D8C2A4] rounded-xl px-3 py-2 text-sm font-display font-bold text-[#3B2A1A] focus:outline-none focus:ring-2 focus:ring-[#8C4318]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#745F4B] font-semibold block mb-1">
                  Satuan Porsi
                </label>
                <select
                  value={satuan.value}
                  onChange={(e) => setSatuan(SATUAN_OPTIONS.find(s => s.value === e.target.value) || SATUAN_OPTIONS[0])}
                  className="w-full bg-white border border-[#D8C2A4] rounded-xl px-2.5 py-2 text-xs font-semibold text-[#3B2A1A] focus:outline-none focus:ring-2 focus:ring-[#8C4318]"
                >
                  {SATUAN_OPTIONS.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-[#EAD5BC] text-center text-xs text-[#745F4B]">
              Total berat perkiraan: <strong className="text-[#8C4318] font-display font-bold">{totalGram} gram</strong>
            </div>
          </div>

          {/* Visualisasi Sendok Gula */}
          <SendokGulaSvg sendok={estimasiSendokTeh} gram={gramGulaDihitung} />

          {/* Tabel / Grid Rincian Nutrisi Kudapan */}
          <div className="my-5">
            <h3 className="font-display font-bold text-xs text-[#7A4A21] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <MdBarChart size={16} className="text-[#8C4318]" />
              <span>Rincian Nutrisi Porsi ({totalGram}g)</span>
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              
              {/* Gula Pasir / Aren */}
              <div className="bg-[#FEF6E4] border border-[#F2B134] rounded-2xl p-3 text-center">
                <span className="text-[10px] text-[#745F4B] font-semibold uppercase block">Kandungan Gula</span>
                <span className="font-display font-black text-2xl text-[#B5451B] block">
                  {nutrisi.gula_g ? hitung(nutrisi.gula_g) : (hasil.kadarGula || '-')}
                </span>
                <span className="text-[11px] text-[#745F4B]">gram gula</span>
              </div>

              {/* Kalori */}
              <div className="bg-[#FFF8EC] border border-[#E8D9C5] rounded-2xl p-3 text-center">
                <span className="text-[10px] text-[#745F4B] font-semibold uppercase block">Total Energi</span>
                <span className="font-display font-black text-2xl text-[#7A4A21] block">
                  {hitung(nutrisi.kalori_kkal) || (hasil.kalori ? parseFloat(hasil.kalori) * faktorPorsi : '150')}
                </span>
                <span className="text-[11px] text-[#745F4B]">kkal</span>
              </div>

              {/* Karbohidrat */}
              {nutrisi.karbohidrat_g && (
                <div className="bg-white border border-[#E8D9C5] rounded-2xl p-2.5 text-center shadow-xs">
                  <span className="text-[10px] text-[#745F4B] font-semibold block">Karbohidrat</span>
                  <span className="font-display font-bold text-lg text-[#3B2A1A]">
                    {hitung(nutrisi.karbohidrat_g)}
                  </span>
                  <span className="text-[10px] text-[#A89582] block">gram</span>
                </div>
              )}

              {/* Protein */}
              {nutrisi.protein_g && (
                <div className="bg-white border border-[#E8D9C5] rounded-2xl p-2.5 text-center shadow-xs">
                  <span className="text-[10px] text-[#745F4B] font-semibold block">Protein</span>
                  <span className="font-display font-bold text-lg text-[#7A4A21]">
                    {hitung(nutrisi.protein_g)}
                  </span>
                  <span className="text-[10px] text-[#A89582] block">gram</span>
                </div>
              )}

              {/* Lemak */}
              {nutrisi.lemak_g && (
                <div className="bg-white border border-[#E8D9C5] rounded-2xl p-2.5 text-center shadow-xs">
                  <span className="text-[10px] text-[#745F4B] font-semibold block">Lemak</span>
                  <span className="font-display font-bold text-lg text-[#8E5BA8]">
                    {hitung(nutrisi.lemak_g)}
                  </span>
                  <span className="text-[10px] text-[#A89582] block">gram</span>
                </div>
              )}

              {/* Glycemic Load (GL) */}
              {nutrisi.estimasi_glycemic_load && (
                <div className="bg-white border border-[#E8D9C5] rounded-2xl p-2.5 text-center shadow-xs">
                  <span className="text-[10px] text-[#745F4B] font-semibold block">Beban Glikemik</span>
                  <span className="font-display font-bold text-lg text-[#E64A72]">
                    {hitung(nutrisi.estimasi_glycemic_load)}
                  </span>
                  <span className="text-[10px] text-[#A89582] block">GL</span>
                </div>
              )}

              {/* Indeks Glikemik (GI) */}
              {nutrisi.estimasi_indeks_glikemik && (
                <div className="bg-white border border-[#E8D9C5] rounded-2xl p-2.5 text-center shadow-xs col-span-2">
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-xs text-[#745F4B] font-semibold">Indeks Glikemik (GI):</span>
                    <span className="font-display font-black text-lg text-[#8C4318]">
                      {nutrisi.estimasi_indeks_glikemik}
                    </span>
                    <span className="text-[10px] bg-[#FEF5E7] text-[#8C4318] font-bold px-2 py-0.5 rounded-full border border-[#E8C589]">
                      Skala 0-100
                    </span>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Rekomendasi Ramah Penjual Lapak */}
          {nutrisi.rekomendasi && (
            <div className="bg-[#FEF5E7] border border-[#E8C589] rounded-2xl p-4 mb-4">
              <h4 className="font-display font-bold text-xs text-[#8C4318] mb-1 flex items-center gap-1.5">
                <MdLightbulb size={16} className="text-[#F2B134]" />
                <span>Petuah Sehat Lapak:</span>
              </h4>
              <p className="text-xs text-[#5A3314] leading-relaxed">
                {nutrisi.rekomendasi}
              </p>
            </div>
          )}

          {/* Disclaimer Medis Kecil & Rapi */}
          <div className="pt-3 border-t border-dashed border-[#D8C2A4] text-center text-[10px] text-[#9B8672] leading-tight">
            *Hasil takaran nutrisi dan gula merupakan perkiraan berbasis AI & basis data gizi jajanan pasar Indonesia, bukan diagnosa dokter.
          </div>
        </div>

        {/* Tombol Aksi di Bawah Nota */}
        <div className="w-full flex gap-3 mt-6">
          <button 
            onClick={() => navigate('/scan')} 
            className="flex-1 btn-pasar-secondary py-3.5 text-xs sm:text-sm font-bold"
          >
            ← Cek Jajanan Lain
          </button>
          
          <button 
            onClick={() => navigate('/diary')} 
            className="flex-1 btn-pasar-primary py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2"
          >
            <MdMenuBook size={18} />
            <span>Buka Food Diary</span>
          </button>
        </div>

      </div>
    </div>
  )
}

export default ResultPage
