import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTag, FaCheckCircle, FaTrashAlt, FaExchangeAlt, FaRegLightbulb } from 'react-icons/fa'
import {
  MdStorefront,
  MdMenuBook,
  MdBarChart,
  MdCameraAlt,
  MdWarning,
  MdLightbulb,
  MdCheckCircle,
  MdFactCheck,
  MdArrowBack,
  MdCloudUpload,
  MdPhotoCamera,
  MdPhotoLibrary,
  MdClose
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
  const [isDragging, setIsDragging] = useState(false)

  // State untuk modal pilihan Kamera vs Galeri & live webcam
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false)
  const [isWebcamModalOpen, setIsWebcamModalOpen] = useState(false)
  const [webcamStream, setWebcamStream] = useState(null)

  const galleryInputRef = useRef(null)
  const cameraInputRef = useRef(null)
  const videoRef = useRef(null)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const processSelectedFile = async (file) => {
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

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      processSelectedFile(file)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0])
    }
  }

  const handleRemoveImage = (e) => {
    e.stopPropagation()
    setImage(null)
    setPreview(null)
    setAiResult(null)
    setError('')
    if (galleryInputRef.current) galleryInputRef.current.value = ''
    if (cameraInputRef.current) cameraInputRef.current.value = ''
  }

  const handleOpenSourceModal = () => {
    if (!scanning && !predicting) {
      setIsSourceModalOpen(true)
    }
  }

  const handleChooseGallery = () => {
    setIsSourceModalOpen(false)
    if (galleryInputRef.current) {
      galleryInputRef.current.value = ''
      galleryInputRef.current.click()
    }
  }

  const stopWebcam = useCallback(() => {
    if (webcamStream) {
      webcamStream.getTracks().forEach((track) => track.stop())
      setWebcamStream(null)
    }
  }, [webcamStream])

  const handleCloseWebcam = () => {
    stopWebcam()
    setIsWebcamModalOpen(false)
  }

  const startLiveWebcam = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Fitur webcam tidak didukung pada browser ini.')
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      })
      setWebcamStream(stream)
      setIsWebcamModalOpen(true)
    } catch (err) {
      console.warn('Gagal mengakses kamera langsung:', err)
      // Fallback ke input kamera perangkat jika webcam desktop tidak tersedia/ditolak
      if (cameraInputRef.current) {
        cameraInputRef.current.value = ''
        cameraInputRef.current.click()
      }
    }
  }

  const handleChooseCamera = () => {
    setIsSourceModalOpen(false)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    if (isMobile) {
      // Pada ponsel cerdas (Android/iOS), input capture="environment" langsung memicu kamera sistem bawaan
      if (cameraInputRef.current) {
        cameraInputRef.current.value = ''
        cameraInputRef.current.click()
      }
    } else {
      // Pada layar desktop / laptop, tampilkan viewfinder webcam langsung
      startLiveWebcam()
    }
  }

  const handleCaptureWebcam = () => {
    if (!videoRef.current) return
    const video = videoRef.current
    const width = video.videoWidth || 640
    const height = video.videoHeight || 480
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0, width, height)

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `kamera-jajanan-${Date.now()}.jpg`, { type: 'image/jpeg' })
        stopWebcam()
        setIsWebcamModalOpen(false)
        processSelectedFile(file)
      }
    }, 'image/jpeg', 0.92)
  }

  useEffect(() => {
    if (isWebcamModalOpen && videoRef.current && webcamStream) {
      videoRef.current.srcObject = webcamStream
    }
  }, [isWebcamModalOpen, webcamStream, stopWebcam])

  useEffect(() => {
    return () => {
      if (webcamStream) {
        webcamStream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [webcamStream])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsSourceModalOpen(false)
        if (isWebcamModalOpen) {
          stopWebcam()
          setIsWebcamModalOpen(false)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isWebcamModalOpen, webcamStream, stopWebcam])

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
      setTimeout(() => navigate('/result', { state: hasilFinal }), 1000)
    } catch (err) {
      setError(err.message || 'Gagal menyimpan dan menakar jajanan.')
    } finally {
      setScanning(false)
    }
  }

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
                    Studio Tilik Jajanan Pasar
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

              <a
                href="https://dashboard-cek-gula.streamlit.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7A4A21] hover:bg-[#FFF3DD] px-3.5 py-2 rounded-xl transition hidden md:flex items-center gap-2 border border-[#E8D9C5]"
              >
                <MdBarChart size={18} />
                <span>Dashboard Data</span>
              </a>

              <button
                onClick={handleLogout}
                className="text-[#B5451B] hover:bg-[#FDEEE9] px-3.5 py-2 rounded-xl transition cursor-pointer font-bold"
              >
                Keluar
              </button>
            </div>

          </div>
        </nav>

        {/* Konten Utama Studio Format Website (Lebar max-w-6xl) */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">

          {/* Header Studio Web */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-dashed border-[#E8D9C5] pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#FEF6E4] border border-[#F2B134] text-[#B5451B] text-xs font-display font-bold px-3 py-1 rounded-full mb-2.5 shadow-sm">
                <MdCameraAlt size={14} />
                <span>Studio Tilik Kecerdasan Buatan (AI)</span>
              </div>
              <h1 className="font-display font-black text-2xl sm:text-4xl text-[#3B2A1A] tracking-tight">
                Studio Tilik Kudapan Nusantara
              </h1>
              <p className="text-xs sm:text-base text-[#745F4B] mt-1 max-w-2xl leading-relaxed">
                Jepret atau unggah foto jajanan pasar beralas piring atau wadah daun pisangmu. AI kami akan menerawang jenis kue, takaran gula, dan kalori secara akurat.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-display font-bold text-[#8C4318] bg-[#FFF8EC] border border-[#E8C589] px-3.5 py-2 rounded-2xl shrink-0 self-start md:self-auto shadow-xs">
              <FaCheckCircle className="text-[#3D7033]" />
              <span>Didukung Model AI Vision Pasar</span>
            </div>
          </div>

          {/* Pesan Kesalahan / Error */}
          {error && (
            <div className="w-full mb-6 bg-[#FDEEE9] border-2 border-[#B5451B] text-[#B5451B] text-xs sm:text-sm font-semibold px-4 py-3.5 rounded-2xl flex items-center gap-3 shadow-sm">
              <MdWarning size={20} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Grid Studio 2 Kolom di Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Kolom Kiri (7 Kolom): Kanvas Foto / Dropzone */}
            <div className="lg:col-span-7 space-y-4">

              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={handleOpenSourceModal}
                className={`w-full h-80 sm:h-96 lg:h-[420px] daun-card overflow-hidden cursor-pointer relative transition-all group border-2 ${isDragging
                    ? 'border-[#8C4318] scale-[1.01] shadow-2xl bg-[#FFF3DD]'
                    : 'border-[#D8C2A4] hover:border-[#8C4318] hover:shadow-xl'
                  }`}
              >
                <DaunPisangCorner position="top-right" />

                {preview ? (
                  <div className="w-full h-full relative group">
                    <img src={preview} alt="Pratinjau Jajanan" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4 sm:p-6">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleOpenSourceModal() }}
                          className="bg-white/90 hover:bg-white text-[#8C4318] text-xs font-display font-bold px-3 py-2 rounded-xl backdrop-blur-sm flex items-center gap-1.5 shadow-md cursor-pointer transition"
                        >
                          <FaExchangeAlt size={12} />
                          <span>Ganti Foto</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="bg-[#B5451B]/90 hover:bg-[#B5451B] text-white text-xs font-display font-bold px-3 py-2 rounded-xl backdrop-blur-sm flex items-center gap-1.5 shadow-md cursor-pointer transition"
                        >
                          <FaTrashAlt size={12} />
                          <span>Hapus</span>
                        </button>
                      </div>
                      <span className="text-[11px] text-[#FFF8EC] font-semibold hidden sm:inline">
                        Format siap dianalisis
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bamboo-pattern flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#FFFDF9] border-2 border-[#E8D9C5] flex items-center justify-center text-4xl sm:text-5xl mb-4 shadow-sm group-hover:scale-105 transition-transform text-[#8C4318]">
                      {isDragging ? <MdCloudUpload size={48} /> : <MdPhotoCamera size={40} />}
                    </div>
                    <p className="font-display font-black text-xl sm:text-2xl text-[#3B2A1A] mb-1">
                      {isDragging ? 'Lepaskan Foto di Sini' : 'Tarik & Lepas Foto Jajanan ke Sini'}
                    </p>
                    <p className="text-xs sm:text-sm text-[#745F4B] max-w-md leading-relaxed mb-4">
                      Ketuk di mana saja pada kotak ini untuk memilih apakah ingin <strong>Buka Kamera</strong> atau <strong>Buka Galeri</strong>.
                    </p>
                    <div className="flex items-center gap-2 flex-wrap justify-center">
                      <span className="inline-flex items-center gap-1.5 bg-[#FFF8EC] text-[#7A4A21] font-display text-xs font-semibold px-3.5 py-1.5 rounded-full border border-[#D8C2A4]">
                        <FaTag size={10} />
                        <span>JPG, PNG, WebP</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 bg-[#FEF6E4] text-[#B5451B] font-display text-xs font-semibold px-3.5 py-1.5 rounded-full border border-[#F2B134]">
                        <span>Pilihan Kamera & Galeri</span>
                      </span>
                    </div>
                  </div>
                )}

                {/* Overlay Animasi Saat Menerawang Foto */}
                {(scanning || predicting) && (
                  <div className="absolute inset-0 bg-[#1E1610]/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center text-white z-30">
                    <KukusanLoadingSvg className="mb-4" />
                    <p className="font-display font-black text-xl sm:text-2xl text-[#F2B134] mb-1">
                      {predicting ? 'Lagi Menerawang Bentuk Jajanan...' : 'Lagi Menakar Gula & Kalori...'}
                    </p>
                    <p className="text-xs sm:text-sm text-[#FFF8EC]/90 max-w-sm leading-relaxed">
                      AI sedang mencermati warna, pori-pori kue, dan bungkusan daun pisang untuk mengenali kudapanmu...
                    </p>
                  </div>
                )}
              </div>

              {/* Input Kamera (capture="environment" untuk langsung meluncurkan aplikasi kamera di Android & iOS) */}
              <input
                type="file"
                accept="image/*"
                capture="environment"
                ref={cameraInputRef}
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Input Galeri Foto / Berkas Komputer */}
              <input
                type="file"
                accept="image/*"
                ref={galleryInputRef}
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Ticker Jajanan Pasar yang Dikenali */}
              <div className="bg-[#FFFDF9] border border-[#E8D9C5] rounded-2xl p-4 shadow-xs">
                <span className="text-[11px] font-display font-bold text-[#8C4318] block mb-2 uppercase tracking-wide">
                  Daftar Kudapan yang Dikenali AI Kami:
                </span>
                <div className="flex flex-wrap gap-1.5 text-xs text-[#5A3314]">
                  {['Klepon Pandan', 'Onde-Onde', 'Kue Lapis', 'Dadar Gulung', 'Serabi Kinca', 'Lemper Ayam', 'Es Cendol Dawet', 'Kue Cucur', 'Nagasari', 'Getuk Lindri', 'Lupis', 'Risoles'].map((snack, idx) => (
                    <span key={idx} className="bg-[#FFF8EC] border border-[#E8D9C5] px-2.5 py-1 rounded-lg font-medium">
                      {snack}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Kolom Kanan (5 Kolom): Panel Deteksi & Aksi Studio */}
            <div className="lg:col-span-5 space-y-5">

              {/* Hasil Deteksi AI */}
              {aiResult && !predicting ? (
                <div className="daun-card p-6 bg-[#FFFDF9] border-2 border-[#8C4318] shadow-lg relative overflow-hidden">
                  <DaunPisangCorner position="top-right" />

                  <div className="inline-flex items-center gap-1.5 bg-[#FEF5E7] text-[#8C4318] text-xs font-display font-bold px-3 py-1 rounded-full mb-3 border border-[#E8C589]">
                    <FaTag size={12} />
                    <span>Hasil Deteksi Tukang Tilik AI</span>
                  </div>

                  <h2 className="font-display font-black text-3xl text-[#3B2A1A] capitalize mb-1">
                    {aiResult.prediction}
                  </h2>

                  {/* Confidence Meter Bar */}
                  <div className="my-4 bg-[#FFF8EC] border border-[#E8D9C5] p-3.5 rounded-2xl">
                    <div className="flex justify-between items-center text-xs font-display font-bold mb-1.5">
                      <span className="text-[#745F4B]">Tingkat Keyakinan AI:</span>
                      <span className="text-[#8C4318] text-sm">
                        {aiResult.confidence ? aiResult.confidence.toFixed(1) : 0}%
                      </span>
                    </div>
                    <div className="w-full bg-[#EAD5BC] h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#8C4318] h-full rounded-full transition-all duration-700"
                        style={{ width: `${Math.min(aiResult.confidence || 0, 100)}%` }}
                      />
                    </div>
                  </div>

                  {aiResult.rekomendasi && (
                    <div className="bg-[#FFF9EE] border border-[#EAD5BC] p-4 rounded-2xl text-xs text-[#5A3314] mb-5">
                      <div className="flex items-center gap-2 font-display font-bold text-[#8C4318] mb-1">
                        <MdLightbulb size={16} className="text-[#F2B134]" />
                        <span>Petuah Tilik AI:</span>
                      </div>
                      <p className="italic leading-relaxed">
                        "{aiResult.rekomendasi}"
                      </p>
                    </div>
                  )}

                  {/* Tombol Utama Analisis */}
                  <button
                    onClick={handleAnalyze}
                    disabled={scanning}
                    className="w-full btn-pasar-primary py-4 text-sm sm:text-base font-bold shadow-xl flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60"
                  >
                    <MdFactCheck size={20} />
                    <span>Timbang Manisnya & Lihat Nota Hasil</span>
                  </button>

                  <p className="text-[11px] text-[#A89582] text-center mt-3">
                    Klik untuk menghitung rincian kalori, gram gula, dan beban glikemik.
                  </p>
                </div>
              ) : (
                /* Card Panduan & Tips Saat Belum Ada Foto */
                <div className="space-y-5">
                  <div className="daun-card p-6 bg-[#FFFDF9] border border-[#E8D9C5] shadow-md">
                    <h3 className="font-display font-bold text-base text-[#3B2A1A] mb-3 flex items-center gap-2">
                      <FaRegLightbulb className="text-[#F2B134]" size={18} />
                      <span>Panduan Foto agar Hasil Akurat</span>
                    </h3>

                    <ul className="space-y-3 text-xs text-[#745F4B] leading-relaxed">
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#FEF5E7] text-[#8C4318] font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">1</span>
                        <span><strong>Letakkan di alas piring atau daun pisang</strong> dengan pencahayaan ruangan yang cukup terang.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#FEF5E7] text-[#8C4318] font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">2</span>
                        <span><strong>Satu jenis kue per foto</strong> untuk memastikan AI mengenali tekstur dan warna secara optimal.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#FEF5E7] text-[#8C4318] font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">3</span>
                        <span><strong>Buka kemasan plastik buram</strong> agar kilau unti kelapa atau saus gula kinca terlihat jelas.</span>
                      </li>
                    </ul>

                    <button
                      type="button"
                      onClick={handleOpenSourceModal}
                      className="w-full mt-5 btn-pasar-primary py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
                    >
                      <MdCameraAlt size={18} />
                      <span>Buka Kamera atau Galeri</span>
                    </button>
                  </div>

                  {/* Card Edukasi Gula Harian */}
                  <div className="daun-card p-5 bg-[#FEF6E4] border-2 border-[#F2B134] shadow-sm relative overflow-hidden">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-[#F2B134]/25 text-[#8C4318] flex items-center justify-center shrink-0">
                        <MdStorefront size={20} className="text-[#8C4318]" />
                      </div>
                      <h4 className="font-display font-bold text-sm text-[#8C4318]">Batas Gula Harian Kemenkes</h4>
                    </div>
                    <p className="text-xs text-[#5A3314] leading-relaxed">
                      Kementerian Kesehatan RI menganjurkan konsumsi gula harian maksimal <strong className="text-[#8C4318] font-bold">50 gram (setara 4 sendok makan)</strong> per hari. Tilik jajananmu sebelum dimakan agar tetap dalam batas sehat!
                    </p>
                  </div>
                </div>
              )}

              {/* Status Berhasil Sementara */}
              {hasil && (
                <div className="w-full bg-[#FEF5E7] border-2 border-[#8C4318] text-[#8C4318] text-xs font-bold px-4 py-3.5 rounded-2xl flex items-center gap-2.5 shadow-sm animate-pulse">
                  <MdCheckCircle size={18} />
                  <span>Data siap! Mengantar ke nota takaran gula lapak...</span>
                </div>
              )}

            </div>

          </div>

        </main>
      </div>

      {/* Modal Dialog Pilihan Sumber Foto (Buka Kamera vs Buka Galeri) */}
      {isSourceModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={() => setIsSourceModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="daun-card bg-[#FFFDF9] border-2 border-[#D8C2A4] p-6 sm:p-7 max-w-md w-full shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <DaunPisangCorner position="top-right" />

            {/* Header Modal */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E8D9C5] mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#FEF5E7] border border-[#F2B134] text-[#8C4318] flex items-center justify-center text-xl shrink-0">
                  <MdCameraAlt size={22} />
                </div>
                <div>
                  <h3 className="font-display font-black text-lg text-[#3B2A1A] leading-tight">
                    Pilih Sumber Foto Jajanan
                  </h3>
                  <p className="text-xs text-[#745F4B]">
                    Mau memotret langsung atau mengambil dari galeri?
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSourceModalOpen(false)}
                className="text-[#8C4318] hover:bg-[#FDF1E8] p-2 rounded-xl transition min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer"
                aria-label="Tutup"
              >
                <MdClose size={22} />
              </button>
            </div>

            {/* Dua Tombol Pilihan Utama */}
            <div className="space-y-3.5 mb-5">
              {/* Pilihan 1: Buka Kamera */}
              <button
                type="button"
                onClick={handleChooseCamera}
                className="w-full text-left p-4 rounded-2xl border-2 border-[#E8D9C5] bg-[#FFFDF9] hover:bg-[#FEF7E6] hover:border-[#8C4318] hover:shadow-md transition-all flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-13 h-13 rounded-2xl bg-[#8C4318] text-white flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform shrink-0">
                  <MdPhotoCamera size={26} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-display font-bold text-base text-[#3B2A1A] group-hover:text-[#8C4318] transition-colors">
                      Buka Kamera
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8C4318] text-white">
                      Langsung
                    </span>
                  </div>
                  <p className="text-xs text-[#745F4B] leading-relaxed">
                    Potret kue jajanan pasar secara langsung dengan kamera perangkatmu.
                  </p>
                </div>
              </button>

              {/* Pilihan 2: Buka Galeri */}
              <button
                type="button"
                onClick={handleChooseGallery}
                className="w-full text-left p-4 rounded-2xl border-2 border-[#E8D9C5] bg-[#FFFDF9] hover:bg-[#FEF7E6] hover:border-[#F2B134] hover:shadow-md transition-all flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-13 h-13 rounded-2xl bg-[#F2B134] text-[#5A3314] flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform shrink-0">
                  <MdPhotoLibrary size={26} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-display font-bold text-base text-[#3B2A1A] group-hover:text-[#8C4318] transition-colors">
                      Buka Galeri
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FEF5E7] text-[#8C4318] border border-[#F2B134]">
                      Album Foto
                    </span>
                  </div>
                  <p className="text-xs text-[#745F4B] leading-relaxed">
                    Pilih foto jajanan yang sudah tersimpan di galeri ponsel atau berkas laptop.
                  </p>
                </div>
              </button>
            </div>

            {/* Tombol Batal */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsSourceModalOpen(false)}
                className="btn-pasar-secondary px-5 py-2 text-xs font-bold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Viewfinder Live Webcam untuk Layar Komputer / Desktop */}
      {isWebcamModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs transition-opacity"
          onClick={handleCloseWebcam}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="daun-card bg-[#FFFDF9] border-2 border-[#D8C2A4] p-5 sm:p-6 max-w-lg w-full shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <DaunPisangCorner position="top-right" />

            {/* Header Modal Webcam */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E8D9C5] mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#8C4318] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <MdPhotoCamera size={20} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-[#3B2A1A]">
                    Kamera Langsung Lapak
                  </h3>
                  <p className="text-[11px] text-[#745F4B]">
                    Arahkan kamera ke jajanan pasar, lalu tekan tombol ambil foto
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseWebcam}
                className="text-[#8C4318] hover:bg-[#FDF1E8] p-2 rounded-xl transition min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
                aria-label="Tutup Kamera"
              >
                <MdClose size={20} />
              </button>
            </div>

            {/* Video Viewfinder */}
            <div className="relative rounded-2xl overflow-hidden bg-black border-2 border-[#8C4318] shadow-inner aspect-video flex items-center justify-center mb-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              {/* Viewfinder Target Box Overlay */}
              <div className="absolute inset-8 border-2 border-dashed border-[#F2B134]/70 rounded-xl pointer-events-none flex items-center justify-center">
                <span className="text-[10px] font-display font-bold px-2.5 py-1 rounded-full bg-black/50 text-[#FFF8EE] backdrop-blur-xs border border-white/20">
                  Pusatkan Jajanan di Sini
                </span>
              </div>
            </div>

            {/* Action Controls */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  stopWebcam()
                  setIsWebcamModalOpen(false)
                  if (galleryInputRef.current) galleryInputRef.current.click()
                }}
                className="btn-pasar-secondary flex-1 py-3 text-xs font-bold"
              >
                Pilih dari Galeri
              </button>
              <button
                type="button"
                onClick={handleCaptureWebcam}
                className="btn-pasar-primary flex-1 py-3 text-xs sm:text-sm font-bold shadow-md flex items-center justify-center gap-2"
              >
                <MdPhotoCamera size={18} />
                <span>Ambil Foto Sekarang</span>
              </button>
            </div>

          </div>
        </div>
      )}

      <div className="text-center py-4 text-xs text-[#A89582] border-t border-[#E8D9C5] bg-[#FFFDF9] mt-12">
        © 2026 Cek-Gula Jajanan Pasar Indonesia
      </div>
    </div>
  )
}

export default ScanPage
