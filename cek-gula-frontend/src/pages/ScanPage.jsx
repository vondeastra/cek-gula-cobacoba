import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaCamera, FaTag } from 'react-icons/fa'
import { 
  MdStorefront, 
  MdMenuBook, 
  MdBarChart, 
  MdCameraAlt, 
  MdWarning, 
  MdLightbulb, 
  MdCheckCircle, 
  MdFactCheck,
  MdArrowBack
} from 'react-icons/md'
import { createGula, searchNutrisi, addDiary } from '../services/api'
import { KukusanLoadingSvg, DaunPisangCorner } from '../components/JajananArt'

const AI_API_URL = 'https://aulian12-model-cek-gula.hf.space/predict'

function ScanPage() {
  const navigate = useNavigate()
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [scanning, setScanning] = useState(false)
  const [hasil, setHasil] = useState(null)
  const [error, setError] = useState('')
  const [aiResult, setAiResult] = useState(null)
  const [predicting, setPredicting] = useState(false)
  const fileInputRef = useRef(null)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImage(file)
    setPreview(URL.createObjectURL(file))
    setHasil(null)
    setError('')
    setAiResult(null)
    setPredicting(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch(AI_API_URL, { method: 'POST', body: formData })
      const data = await response.json()
      setAiResult({ prediction: data.prediction, confidence: data.confidence, rekomendasi: data.rekomendasi_ai })
    } catch {
      setError('Waduh, koneksi ke tukang tilik AI terganggu. Silakan coba unggah foto ulang ya.')
    } finally {
      setPredicting(false)
    }
  }

  const handleAnalyze = async () => {
    const namaFinal = aiResult?.prediction || ''
    if (!namaFinal) {
      setError('AI belum mengenali jajanannya. Ayo pilih atau jepret foto jajanan pasarmu dulu.')
      return
    }
    setScanning(true)
    setError('')
    try {
      const nutrisiResult = await searchNutrisi(namaFinal.trim())
      let kadarGula = 100
      if (nutrisiResult.data && nutrisiResult.data.length > 0) {
        kadarGula = nutrisiResult.data[0].kadar_gula_estimasi || 100
      }
      const result = await createGula({ nama: namaFinal, kadarGula, imageFile: image })
      await addDiary({
        scan_id: result.result.id,
        nama_makanan: result.result.nama,
        kadar_gula: result.result.kadarGula,
        kalori: result.result.kalori,
        status: result.result.status,
        time_eaten: new Date().toTimeString().slice(0, 5),
      })
      const hasilFinal = {
        ...result.result,
        nutrisiDetail: {
          ...result.result.nutrisiDetail,
          rekomendasi: aiResult?.rekomendasi || result.result.nutrisiDetail?.rekomendasi,
        },
        confidence: aiResult?.confidence,
      }
      setHasil(hasilFinal)
      setTimeout(() => navigate('/result', { state: hasilFinal }), 1200)
    } catch (err) {
      setError(err.message || 'Gagal menyimpan dan menakar jajanan.')
    } finally {
      setScanning(false)
    }
  }

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
                  Tilik Jajanan Pasar
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 font-display font-semibold text-xs sm:text-sm">
            <button 
              onClick={() => navigate('/diary')} 
              className="text-[#8C4318] hover:bg-[#FDF1E8] px-3 py-1.5 rounded-xl transition flex items-center gap-1.5"
            >
              <MdMenuBook size={16} />
              <span className="hidden sm:inline">Buku Kas Diary</span>
              <span className="sm:hidden">Diary</span>
            </button>

            <a 
              href="https://dashboard-cek-gula.streamlit.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#7A4A21] hover:bg-[#FFF3DD] px-3 py-1.5 rounded-xl transition hidden md:flex items-center gap-1.5"
            >
              <MdBarChart size={16} />
              <span>Dashboard</span>
            </a>

            <button 
              onClick={handleLogout} 
              className="text-[#B5451B] hover:bg-[#FDEEE9] px-3 py-1.5 rounded-xl transition"
            >
              Keluar
            </button>
          </div>

        </div>
      </nav>

      {/* Konten Halaman Tilik / Scan */}
      <div className="flex flex-col items-center justify-center flex-1 px-4 py-8 max-w-lg mx-auto w-full">
        
        {/* Header Seksi */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 bg-[#FEF6E4] border border-[#F2B134] text-[#B5451B] text-xs font-display font-bold px-3 py-1 rounded-full mb-3 shadow-sm">
            <MdCameraAlt size={14} />
            <span>Tukang Tilik AI Pasar</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-[#3B2A1A] mb-2">
            Potret Jajananmu
          </h1>
          <p className="text-xs sm:text-sm text-[#745F4B] max-w-md leading-relaxed">
            Pilih atau jepret foto jajanan pasar beralas piring atau wadahmu, biar <strong className="text-[#8C4318]">AI Lapak</strong> bantu terawang kadar manisnya!
          </p>
        </div>

        {/* Pesan Kesalahan / Error */}
        {error && (
          <div className="w-full mb-4 bg-[#FDEEE9] border-2 border-[#B5451B] text-[#B5451B] text-xs font-semibold px-4 py-3 rounded-2xl flex items-center gap-2 shadow-sm">
            <MdWarning size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Kotak Foto / Wadah Tampah Anyaman */}
        <div 
          onClick={() => !scanning && !predicting && fileInputRef.current.click()}
          className="w-full daun-card overflow-hidden cursor-pointer relative transition-all group hover-jajan"
          style={{ height: '320px' }}
        >
          <DaunPisangCorner position="top-right" />
          
          {preview ? (
            <div className="w-full h-full relative">
              <img src={preview} alt="Pratinjau Jajanan" className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-3 bg-[#1E1610]/80 text-[#FFF8EC] font-display text-[11px] px-3 py-1.5 rounded-xl backdrop-blur-sm">
                Ketuk untuk ganti foto
              </div>
            </div>
          ) : (
            <div className="w-full h-full bamboo-pattern flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-[#D8C2A4] rounded-3xl group-hover:border-[#8C4318] transition">
              <div className="w-20 h-20 rounded-3xl bg-[#FFFDF9] border-2 border-[#E8D9C5] flex items-center justify-center text-4xl mb-4 shadow-sm group-hover:scale-105 transition-transform text-[#8C4318]">
                <FaCamera size={32} />
              </div>
              <p className="font-display font-bold text-lg text-[#3B2A1A] mb-1">
                Jepret atau Pilih Foto Jajanan
              </p>
              <p className="text-xs text-[#745F4B] max-w-xs leading-relaxed">
                Ketuk di sini untuk mengambil foto klepon, lemper, onde-onde, atau kue basah lainnya
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 bg-[#FFF8EC] text-[#7A4A21] font-display text-xs font-semibold px-3 py-1 rounded-full border border-[#D8C2A4]">
                <FaTag size={10} />
                <span>JPG, PNG • Ukuran wajar</span>
              </div>
            </div>
          )}

          {/* Overlay Animasi Saat Menerawang Foto */}
          {(scanning || predicting) && (
            <div className="absolute inset-0 bg-[#1E1610]/75 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center text-white z-30">
              <KukusanLoadingSvg className="mb-4" />
              <p className="font-display font-black text-xl text-[#F2B134] mb-1">
                {predicting ? 'Lagi Menerawang Jajanan...' : 'Lagi Dibungkus & Dihitung...'}
              </p>
              <p className="text-xs text-[#FFF8EC]/90 max-w-xs leading-relaxed">
                Tukang tilik AI lagi mencermati bentuk, warna, dan tekstur kuenya...
              </p>
            </div>
          )}
        </div>

        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
        />

        {/* Hasil Deteksi AI */}
        {aiResult && !predicting && (
          <div className="w-full mt-4 bg-[#FFFDF9] border-2 border-[#8C4318] rounded-2xl p-4 shadow-md relative overflow-hidden">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FEF5E7] border border-[#E8C589] flex items-center justify-center text-[#8C4318] shrink-0">
                <FaTag size={18} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <p className="font-display font-black text-lg text-[#8C4318] capitalize">
                    {aiResult.prediction}
                  </p>
                  <span className="bg-[#FEF5E7] text-[#8C4318] font-display font-bold text-xs px-2.5 py-0.5 rounded-full border border-[#E8C589]">
                    Keyakinan: {aiResult.confidence ? aiResult.confidence.toFixed(1) : 0}%
                  </span>
                </div>
                
                {aiResult.rekomendasi && (
                  <p className="text-xs text-[#745F4B] mt-2 italic bg-[#FFF8EC] p-2.5 rounded-xl border border-[#E8D9C5] flex items-start gap-2">
                    <MdLightbulb size={16} className="text-[#F2B134] shrink-0 mt-0.5" />
                    <span>"{aiResult.rekomendasi}"</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Status Berhasil Sementara */}
        {hasil && (
          <div className="w-full mt-4 bg-[#FEF5E7] border-2 border-[#8C4318] text-[#8C4318] text-xs font-bold px-4 py-3 rounded-2xl flex items-center gap-2 shadow-sm animate-pulse">
            <MdCheckCircle size={16} />
            <span>Data siap! Mengantar ke nota takaran gula...</span>
          </div>
        )}

        {/* Petunjuk / Tips Lapak */}
        <div className="w-full mt-4 bg-[#FFF9EE] border border-[#EAD5BC] rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-[#745F4B]">
          <MdLightbulb size={18} className="text-[#F2B134] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#7A4A21] font-display">Petunjuk Jajan Sehat:</strong> Pastikan foto jelas, fokus pada kue, dan tidak tertutup plastik buram agar AI mudah menakar gizinya.
          </div>
        </div>

        {/* Tombol Aksi */}
        {aiResult && !scanning && !predicting && (
          <button 
            onClick={handleAnalyze} 
            className="w-full mt-6 btn-pasar-primary py-4 text-base font-bold shadow-xl flex items-center justify-center gap-2.5"
          >
            <MdFactCheck size={18} />
            <span>Timbang Manisnya & Lihat Hasil</span>
          </button>
        )}

        {!image && !predicting && (
          <button 
            onClick={() => fileInputRef.current.click()} 
            className="w-full mt-6 btn-pasar-secondary py-3.5 text-sm font-bold flex items-center justify-center gap-2"
          >
            <FaCamera size={16} />
            <span>Buka Kamera / Galeri Ponsel</span>
          </button>
        )}

      </div>
    </div>
  )
}

export default ScanPage
