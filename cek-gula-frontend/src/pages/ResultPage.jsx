import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaUtensils, FaPrint, FaRegCheckCircle } from 'react-icons/fa'
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
        <div className="daun-card p-8 sm:p-10 text-center max-w-md w-full shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-[#FFF8EC] border-2 border-[#E8D9C5] flex items-center justify-center text-[#8C4318] mx-auto mb-4">
            <MdStorefront size={32} />
          </div>
          <h2 className="font-display font-black text-2xl text-[#7A4A21] mb-2">
            Nota Belum Ditemukan
          </h2>
          <p className="text-xs sm:text-sm text-[#745F4B] mb-6 leading-relaxed">
            Belum ada jajanan yang ditilik nih. Yuk jepret foto jajanan pasarmu terlebih dahulu di studio tilik!
          </p>
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => navigate('/scan')} 
              className="btn-pasar-primary w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              <MdCameraAlt size={18} />
              <span>Ke Studio Tilik AI</span>
            </button>
            <button 
              onClick={() => navigate('/')} 
              className="btn-pasar-secondary w-full py-3 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
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
      title: 'Kadar Gula Tinggi',
      microcopy: 'Kadar gula cukup tinggi, sebaiknya dikonsumsi bijak atau dibagi dua.',
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
  
  // Persentase batas konsumsi gula harian Kemenkes RI (50g)
  const persenBatasGula = Math.min(Math.round((gramGulaDihitung / 50) * 100), 200)

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
                    Nota Hasil Tilik & Neraca Gizi
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-5 font-display font-semibold text-xs sm:text-sm">
              <button 
                onClick={() => navigate('/diary')} 
                className="text-[#8C4318] hover:bg-[#FDF1E8] px-3.5 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer border border-transparent hover:border-[#E8C589]"
              >
                <MdMenuBook size={18} />
                <span className="hidden sm:inline">Buku Kas Diary</span>
                <span className="sm:hidden">Diary</span>
              </button>

              <button 
                onClick={() => {
                  localStorage.removeItem('token')
                  localStorage.removeItem('user')
                  navigate('/login')
                }} 
                className="text-[#B5451B] hover:bg-[#FDEEE9] px-3.5 py-2 rounded-xl transition cursor-pointer font-bold"
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
                <MdBarChart size={14} />
                <span>Hasil Perhitungan Nutrisi Kudapan</span>
              </div>
              <h1 className="font-display font-black text-2xl sm:text-4xl text-[#3B2A1A] tracking-tight">
                Nota Takaran Gizi & Manis
              </h1>
              <p className="text-xs sm:text-base text-[#745F4B] mt-1 max-w-2xl leading-relaxed">
                Tilik rincian gram gula pasir, kalori energi, indeks glikemik, serta petuah sehat konsumsi kue <strong className="text-[#8C4318] capitalize">{hasil.nama}</strong>.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="btn-pasar-secondary px-4 py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <FaPrint size={14} />
                <span>Cetak Nota</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/scan')}
                className="btn-pasar-primary px-4 py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <MdCameraAlt size={16} />
                <span>Tilik Jajanan Lain</span>
              </button>
            </div>
          </div>

          {/* Grid Dashboard 2 Kolom di Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Kolom Kiri (5 Kolom): Kartu Struk Pasar Otentik */}
            <div className="lg:col-span-5 space-y-5">
              <div className="daun-card p-6 sm:p-8 relative overflow-hidden bg-[#FFFDF9] shadow-xl border-2 border-[#D8C2A4]">
                <DaunPisangCorner position="top-right" />

                {/* Stempel Cap Lapak */}
                <div className="text-center pb-5 mb-5 border-b-2 border-dashed border-[#D8C2A4]">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#FEF5E7] border-2 border-[#8C4318] mb-2 shadow-inner">
                    {statusInfo.icon}
                  </div>
                  <div className="text-[10px] font-display font-bold tracking-widest text-[#7A4A21] uppercase">
                    • NOTA TAKARAN GULA LAPAK •
                  </div>
                  <h2 className="font-display font-black text-3xl text-[#3B2A1A] capitalize mt-1 mb-2">
                    {hasil.nama}
                  </h2>
                  
                  {/* Badge Status */}
                  <div className="inline-block">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-display font-bold ${statusInfo.badgeClass}`}>
                      {statusInfo.title}
                    </span>
                  </div>

                  {/* Microcopy Pasar */}
                  <p className="font-display font-bold text-sm text-[#B5451B] mt-3">
                    "{statusInfo.microcopy}"
                  </p>
                  <p className="text-xs text-[#745F4B] mt-1 leading-relaxed">
                    {statusInfo.desc}
                  </p>
                </div>

                {/* Pengatur Porsi Jajan (Interaktif) */}
                <div className="bg-[#FFF9EE] border border-[#EAD5BC] rounded-2xl p-4 mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-bold text-xs text-[#7A4A21] uppercase tracking-wide flex items-center gap-1.5">
                      <FaUtensils size={13} className="text-[#8C4318]" />
                      <span>Takaran Porsi Makan</span>
                    </h3>
                    <span className="text-[10px] bg-[#FEF5E7] text-[#8C4318] font-bold px-2 py-0.5 rounded-md border border-[#E8C589]">
                      Dihitung Otomatis
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-[#745F4B] font-semibold block mb-1">
                        Jumlah Porsi
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
                        Satuan Ukuran
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

                  <div className="mt-3 pt-2 border-t border-[#EAD5BC] text-center text-xs text-[#745F4B]">
                    Perkiraan berat netto porsi: <strong className="text-[#8C4318] font-display font-bold">{totalGram} gram</strong>
                  </div>
                </div>

                {/* Visualisasi Sendok Gula */}
                <SendokGulaSvg sendok={estimasiSendokTeh} gram={gramGulaDihitung} />

                {/* Tombol Aksi di Bawah Nota */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button 
                    onClick={() => navigate('/scan')} 
                    className="flex-1 btn-pasar-secondary py-3 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MdCameraAlt size={16} />
                    <span>Tilik Kue Lain</span>
                  </button>
                  
                  <button 
                    onClick={() => navigate('/diary')} 
                    className="flex-1 btn-pasar-primary py-3 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MdMenuBook size={16} />
                    <span>Buka Food Diary</span>
                  </button>
                </div>

                {/* Disclaimer Mini */}
                <div className="pt-4 mt-6 border-t border-dashed border-[#D8C2A4] text-center text-[10px] text-[#9B8672] leading-tight">
                  *Estimasi nutrisi berbasis basis data gizi jajanan pasar Indonesia & kecerdasan buatan.
                </div>
              </div>
            </div>

            {/* Kolom Kanan (7 Kolom): Dashboard Analisis Gizi Komprehensif */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Card 1: Gauge Perbandingan Batas Gula Kemenkes */}
              <div className="daun-card p-6 bg-[#FFFDF9] border border-[#E8D9C5] shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] font-display font-bold text-[#8C4318] uppercase tracking-wider block">
                      Analisis Asupan Gula Harian
                    </span>
                    <h3 className="font-display font-black text-xl text-[#3B2A1A]">
                      Batas Konsumsi Gula Harian Kemenkes
                    </h3>
                  </div>
                  <span className="text-xs bg-[#FEF6E4] text-[#B5451B] font-display font-bold px-3 py-1 rounded-full border border-[#F2B134] self-start sm:self-auto">
                    Maks 50g / Hari
                  </span>
                </div>

                <p className="text-xs text-[#745F4B] leading-relaxed mb-4">
                  Satu porsi kudapan ini mengandung <strong className="text-[#B5451B] font-display text-sm">{nutrisi.gula_g ? hitung(nutrisi.gula_g) : (hasil.kadarGula || '0')}g gula</strong>, atau menghabiskan sekitar <strong>{persenBatasGula}%</strong> dari rekomendasi batas aman harianmu.
                </p>

                {/* Progress Bar Gula */}
                <div className="space-y-1.5">
                  <div className="w-full bg-[#EAD5BC] h-3.5 rounded-full overflow-hidden p-0.5">
                    <div 
                      className={`h-full rounded-full transition-all duration-700 ${
                        persenBatasGula > 80 ? 'bg-[#B5451B]' : persenBatasGula > 40 ? 'bg-[#F2B134]' : 'bg-[#3D7033]'
                      }`}
                      style={{ width: `${Math.min(persenBatasGula, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-[#A89582] font-semibold">
                    <span>0g (Aman)</span>
                    <span>25g (50%)</span>
                    <span>50g (Batas Maksimal)</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Grid 6 Metrik Nutrisi Lengkap */}
              <div>
                <h3 className="font-display font-bold text-sm text-[#7A4A21] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <MdBarChart size={18} className="text-[#8C4318]" />
                  <span>Rincian Komposisi Gizi ({totalGram} gram)</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                  
                  {/* Kandungan Gula */}
                  <div className="daun-card p-4 text-center bg-[#FEF6E4] border border-[#F2B134]">
                    <span className="text-[10px] text-[#745F4B] font-semibold uppercase block">Kandungan Gula</span>
                    <span className="font-display font-black text-3xl text-[#B5451B] my-1 block">
                      {nutrisi.gula_g ? hitung(nutrisi.gula_g) : (hasil.kadarGula || '-')}
                    </span>
                    <span className="text-[11px] text-[#745F4B] font-semibold">gram gula</span>
                  </div>

                  {/* Kalori */}
                  <div className="daun-card p-4 text-center bg-[#FFF8EC] border border-[#E8D9C5]">
                    <span className="text-[10px] text-[#745F4B] font-semibold uppercase block">Total Energi</span>
                    <span className="font-display font-black text-3xl text-[#7A4A21] my-1 block">
                      {hitung(nutrisi.kalori_kkal) || (hasil.kalori ? parseFloat(hasil.kalori) * faktorPorsi : '150')}
                    </span>
                    <span className="text-[11px] text-[#745F4B] font-semibold">kkal kalori</span>
                  </div>

                  {/* Karbohidrat */}
                  <div className="daun-card p-4 text-center bg-white border border-[#E8D9C5]">
                    <span className="text-[10px] text-[#745F4B] font-semibold uppercase block">Karbohidrat</span>
                    <span className="font-display font-bold text-2xl text-[#3B2A1A] my-1 block">
                      {nutrisi.karbohidrat_g ? hitung(nutrisi.karbohidrat_g) : '32'}
                    </span>
                    <span className="text-[11px] text-[#A89582] block">gram</span>
                  </div>

                  {/* Protein */}
                  <div className="daun-card p-4 text-center bg-white border border-[#E8D9C5]">
                    <span className="text-[10px] text-[#745F4B] font-semibold uppercase block">Protein</span>
                    <span className="font-display font-bold text-2xl text-[#7A4A21] my-1 block">
                      {nutrisi.protein_g ? hitung(nutrisi.protein_g) : '2.5'}
                    </span>
                    <span className="text-[11px] text-[#A89582] block">gram</span>
                  </div>

                  {/* Lemak */}
                  <div className="daun-card p-4 text-center bg-white border border-[#E8D9C5]">
                    <span className="text-[10px] text-[#745F4B] font-semibold uppercase block">Lemak</span>
                    <span className="font-display font-bold text-2xl text-[#8E5BA8] my-1 block">
                      {nutrisi.lemak_g ? hitung(nutrisi.lemak_g) : '4.2'}
                    </span>
                    <span className="text-[11px] text-[#A89582] block">gram</span>
                  </div>

                  {/* Glycemic Load */}
                  <div className="daun-card p-4 text-center bg-white border border-[#E8D9C5]">
                    <span className="text-[10px] text-[#745F4B] font-semibold uppercase block">Beban Glikemik</span>
                    <span className="font-display font-bold text-2xl text-[#E64A72] my-1 block">
                      {nutrisi.estimasi_glycemic_load ? hitung(nutrisi.estimasi_glycemic_load) : '14'}
                    </span>
                    <span className="text-[11px] text-[#A89582] block">GL</span>
                  </div>

                </div>
              </div>

              {/* Card 3: Skala Indeks Glikemik (GI) */}
              {nutrisi.estimasi_indeks_glikemik && (
                <div className="daun-card p-5 bg-[#FFFDF9] border border-[#E8D9C5] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#FEF5E7] border border-[#E8C589] flex items-center justify-center font-display font-black text-xl text-[#8C4318]">
                      {nutrisi.estimasi_indeks_glikemik}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-[#3B2A1A]">
                        Indeks Glikemik (GI): {nutrisi.estimasi_indeks_glikemik} / 100
                      </h4>
                      <p className="text-xs text-[#745F4B]">
                        {parseFloat(nutrisi.estimasi_indeks_glikemik) <= 55 
                          ? 'Kategori Rendah: Lonjakan gula darah perlahan dan relatif stabil.' 
                          : parseFloat(nutrisi.estimasi_indeks_glikemik) <= 69 
                          ? 'Kategori Sedang: Gula darah naik secara bertahap.' 
                          : 'Kategori Tinggi: Memicu lonjakan gula darah cepat.'}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-display font-bold px-3 py-1 rounded-full bg-[#FEF6E4] text-[#8C4318] border border-[#F2B134] shrink-0">
                    Skala Pangan 0-100
                  </span>
                </div>
              )}

              {/* Card 4: Petuah Sehat Lapak (AI Recommendation) */}
              {nutrisi.rekomendasi && (
                <div className="daun-card p-5 bg-[#FEF5E7] border-2 border-[#E8C589] shadow-sm relative overflow-hidden">
                  <h4 className="font-display font-bold text-sm text-[#8C4318] mb-1.5 flex items-center gap-2">
                    <MdLightbulb size={18} className="text-[#F2B134]" />
                    <span>Petuah Sehat & Rekomendasi Konsumsi:</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5A3314] leading-relaxed">
                    {nutrisi.rekomendasi}
                  </p>
                </div>
              )}

              {/* Action Banner */}
              <div className="bg-[#743714] text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <FaRegCheckCircle className="text-[#F2B134] shrink-0 hidden sm:inline" size={24} />
                  <div>
                    <h5 className="font-display font-bold text-sm text-white">Catatan Otomatis Masuk ke Buku Kas</h5>
                    <p className="text-xs text-[#FFF8EE]/80">Jajanan ini sudah tercatat di Buku Kas Kudapan harianmu.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/diary')}
                  className="btn-pasar-kunyit px-5 py-2.5 text-xs font-bold shrink-0 cursor-pointer shadow-sm w-full sm:w-auto"
                >
                  Buka Buku Kas Diary →
                </button>
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

export default ResultPage
