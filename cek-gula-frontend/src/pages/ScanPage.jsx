import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTag, FaCheckCircle, FaTrashAlt, FaExchangeAlt, FaCheck } from 'react-icons/fa'
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
  MdClose,
  MdRestaurantMenu,
  MdSearch,
  MdEdit
} from 'react-icons/md'
import { createGula, searchNutrisi, addDiary } from '../services/api'
import { DATASET_NUTRISI } from '../services/datasetNutrisi.js'
import { KukusanLoadingSvg, DaunPisangCorner } from '../components/JajananArt'

const AI_API_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_AI_API_URL)
  ? import.meta.env.VITE_AI_API_URL
  : 'https://aulian12-model-cek-gula.hf.space/predict'

const JAJANAN_POPULER = [
  'klepon',
  'dadar gulung',
  'onde-onde',
  'bakwan',
  'lemper',
  'lumpia',
  'bika ambon',
  'risol',
  'serabi',
  'kue cucur',
  'lapis legit',
  'pisang goreng'
]

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

  // State untuk pemilihan manual dari 100 jajanan pasar
  const [manualMode, setManualMode] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')

  const galleryInputRef = useRef(null)
  const cameraInputRef = useRef(null)
  const videoRef = useRef(null)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  // Filter daftar jajanan untuk pemilihan manual
  const filteredJajanan = useMemo(() => {
    const q = searchKeyword.trim().toLowerCase()
    if (!q) return DATASET_NUTRISI
    return DATASET_NUTRISI.filter((item) =>
      item.nama_makanan.toLowerCase().includes(q)
    )
  }, [searchKeyword])

  const handleSelectManual = (item) => {
    setAiResult({
      prediction: item.nama_makanan,
      confidence: 100,
      rekomendasi: `Pilihan manual (${item.nama_makanan}). Takaran gizi dan indeks glikemik diambil dari database gizi standar.`,
      isManual: true,
    })
    setError('')
    setManualMode(false)
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
      if (!response.ok) throw new Error(`Status ${response.status}`)
      const data = await response.json()
      setAiResult({
        prediction: data.prediction,
        confidence: data.confidence,
        rekomendasi: data.rekomendasi_ai,
        isManual: false,
      })
    } catch {
      setError('Koneksi ke server AI sedang tidak aktif. Jangan khawatir, silakan pilih jenis jajananmu secara manual di bawah!')
      setManualMode(true)
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
      if (cameraInputRef.current) {
        cameraInputRef.current.value = ''
        cameraInputRef.current.click()
      }
    } else {
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
  }, [isWebcamModalOpen, webcamStream])

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
      setError('Belum ada jajanan yang dipilih. Jepret foto atau pilih jajanan dari daftar pasar dulu.')
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

        {/* Navbar Lapak */}
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

        {/* Konten Utama Studio */}
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
                onDragOver={(e) => {
                  e.preventDefault()
                  setIsDragging(true)
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={handleOpenSourceModal}
                className={`w-full h-80 sm:h-96 lg:h-[420px] daun-card overflow-hidden cursor-pointer relative transition-all group border-2 ${
                  isDragging
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
                          onClick={(e) => {
                            e.stopPropagation()
                            handleOpenSourceModal()
                          }}
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

              {/* Input Kamera Tersembunyi */}
              <input
                type="file"
                accept="image/*"
                capture="environment"
                ref={cameraInputRef}
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Input Galeri Tersembunyi */}
              <input
                type="file"
                accept="image/*"
                ref={galleryInputRef}
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Tombol Pemilihan Sumber & Opsi Manual */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleOpenSourceModal}
                  className="flex-1 btn-pasar-secondary py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <MdPhotoCamera size={16} />
                  <span>{image ? 'Ganti Foto Jajanan' : 'Pilih Foto / Buka Kamera'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setManualMode(!manualMode)}
                  className="flex-1 bg-[#FFFDF9] border-2 border-[#8C4318] text-[#8C4318] hover:bg-[#FEF5E7] py-3 text-xs sm:text-sm font-bold rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition shadow-xs"
                >
                  <MdRestaurantMenu size={16} />
                  <span>{manualMode ? 'Tutup Pilihan Manual' : 'Pilih Manual dari 100 Kue'}</span>
                </button>
              </div>

              {/* Petunjuk / Tips */}
              <div className="bg-[#FFF9EE] border border-[#EAD5BC] rounded-2xl p-4 flex items-start gap-3 text-xs text-[#745F4B]">
                <MdLightbulb size={20} className="text-[#F2B134] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#7A4A21] font-display">Petunjuk Jajan Sehat:</strong> Pastikan foto jelas dan terpusat. Anda juga dapat memilih langsung dari 100 daftar kue tradisional pasar jika server AI sedang istirahat.
                </div>
              </div>
            </div>

            {/* Kolom Kanan (5 Kolom): Panel Hasil Prediksi / Pemilihan Manual */}
            <div className="lg:col-span-5 space-y-4">
              {/* Panel Pemilihan Manual dari 100 Jajanan Pasar */}
              {manualMode && (
                <div className="daun-card bg-[#FFFDF9] border-2 border-[#D8C2A4] p-5 shadow-lg animate-fadeIn">
                  <div className="flex justify-between items-center mb-3 pb-2 border-b border-[#E8D9C5]">
                    <div className="flex items-center gap-2">
                      <MdRestaurantMenu size={18} className="text-[#8C4318]" />
                      <h3 className="font-display font-bold text-sm text-[#3B2A1A]">
                        Katalog Jajanan ({DATASET_NUTRISI.length} Pilihan)
                      </h3>
                    </div>
                    <button
                      onClick={() => setManualMode(false)}
                      className="text-[#745F4B] hover:text-[#B5451B] p-1 rounded-lg"
                    >
                      <MdClose size={18} />
                    </button>
                  </div>

                  {/* Input Pencarian */}
                  <div className="relative mb-3">
                    <MdSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#745F4B]" />
                    <input
                      type="text"
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      placeholder="Ketik nama jajanan (misal: klepon, bakwan)..."
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#FFF8EC] border border-[#E8D9C5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C4318]"
                    />
                  </div>

                  {/* Rekomendasi Cepat / Jajanan Populer */}
                  {!searchKeyword && (
                    <div className="mb-3">
                      <p className="text-[11px] font-display font-bold text-[#745F4B] mb-1.5">
                        Populer di Lapak:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {JAJANAN_POPULER.map((nama) => (
                          <button
                            key={nama}
                            type="button"
                            onClick={() => {
                              const item = DATASET_NUTRISI.find(
                                (n) => n.nama_makanan.toLowerCase() === nama.toLowerCase()
                              )
                              if (item) handleSelectManual(item)
                            }}
                            className="text-[11px] bg-[#FFF8EC] hover:bg-[#F2B134] hover:text-[#3B2A1A] text-[#7A4A21] px-2.5 py-1 rounded-full border border-[#D8C2A4] capitalize font-medium transition cursor-pointer"
                          >
                            {nama}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* List Jajanan Hasil Pencarian */}
                  <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
                    {filteredJajanan.length === 0 ? (
                      <p className="text-xs text-[#745F4B] text-center py-4 italic">
                        Jajanan "{searchKeyword}" tidak ditemukan.
                      </p>
                    ) : (
                      filteredJajanan.map((item) => (
                        <div
                          key={item.nama_makanan}
                          onClick={() => handleSelectManual(item)}
                          className="p-2.5 bg-[#FFF8EC] hover:bg-[#FEF5E7] border border-[#E8D9C5] hover:border-[#8C4318] rounded-xl flex items-center justify-between cursor-pointer transition text-xs group"
                        >
                          <div>
                            <span className="font-display font-bold text-[#3B2A1A] capitalize block">
                              {item.nama_makanan}
                            </span>
                            <span className="text-[10px] text-[#745F4B]">
                              Kalori: {item.kalori_kkal} kkal • Gula: {item.gula_g}g
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[11px] font-bold text-[#8C4318] opacity-0 group-hover:opacity-100 transition">
                            <span>Pilih</span>
                            <FaCheck size={10} />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Hasil Deteksi AI / Pilihan Manual */}
              {aiResult && !predicting ? (
                <div className="daun-card bg-[#FFFDF9] border-2 border-[#8C4318] p-5 sm:p-6 shadow-xl relative overflow-hidden animate-fadeIn">
                  <DaunPisangCorner position="top-right" />
                  <div className="flex items-start gap-3.5 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#FEF5E7] border border-[#E8C589] flex items-center justify-center text-[#8C4318] shrink-0 text-xl shadow-xs">
                      <FaTag size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <div className="flex items-center gap-2">
                          <h2 className="font-display font-black text-2xl text-[#8C4318] capitalize leading-tight">
                            {aiResult.prediction}
                          </h2>
                          {aiResult.isManual && (
                            <span className="bg-[#FEF5E7] text-[#8C4318] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#F2B134]">
                              Manual
                            </span>
                          )}
                        </div>
                        <span className="bg-[#FEF5E7] text-[#8C4318] font-display font-bold text-xs px-2.5 py-1 rounded-full border border-[#E8C589]">
                          Keyakinan: {aiResult.confidence ? aiResult.confidence.toFixed(1) : 100}%
                        </span>
                      </div>
                      <p className="text-xs text-[#745F4B] mt-0.5">
                        Kudapan siap dihitung takaran gula dan indeks glikemiknya
                      </p>
                    </div>
                  </div>

                  {aiResult.rekomendasi && (
                    <div className="text-xs text-[#745F4B] italic bg-[#FFF8EC] p-3 rounded-xl border border-[#E8D9C5] flex items-start gap-2.5 mb-4 leading-relaxed">
                      <MdLightbulb size={18} className="text-[#F2B134] shrink-0 mt-0.5" />
                      <span>"{aiResult.rekomendasi}"</span>
                    </div>
                  )}

                  {/* Tombol Ganti Jajanan */}
                  <div className="pt-2 border-t border-[#E8D9C5] flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setManualMode(true)}
                      className="text-xs font-display font-bold text-[#8C4318] hover:text-[#B5451B] flex items-center gap-1.5 transition underline decoration-dotted cursor-pointer"
                    >
                      <MdEdit size={14} />
                      <span>Bukan kue ini? Ganti dari 100 daftar</span>
                    </button>
                  </div>

                  {/* Tombol Aksi Utama */}
                  <button
                    onClick={handleAnalyze}
                    disabled={scanning}
                    className="w-full mt-5 btn-pasar-primary py-4 text-base font-bold shadow-xl flex items-center justify-center gap-2.5 cursor-pointer active:scale-98 transition disabled:opacity-50"
                  >
                    <MdFactCheck size={20} />
                    <span>{scanning ? 'Lagi Menakar Nota...' : 'Timbang Manisnya & Lihat Hasil'}</span>
                  </button>
                </div>
              ) : (
                !manualMode && (
                  <div className="daun-card bg-[#FFFDF9] border-2 border-dashed border-[#D8C2A4] p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
                    <div className="w-16 h-16 rounded-full bg-[#FEF6E4] border border-[#F2B134] flex items-center justify-center text-3xl mb-3 text-[#8C4318]">
                      🍃
                    </div>
                    <h3 className="font-display font-bold text-lg text-[#3B2A1A] mb-1">
                      Belum Ada Jajanan Dipilih
                    </h3>
                    <p className="text-xs text-[#745F4B] max-w-xs leading-relaxed mb-4">
                      Unggah foto jajanan di sebelah kiri atau pilih langsung dari daftar 100 kue tradisional pasar.
                    </p>
                    <button
                      type="button"
                      onClick={() => setManualMode(true)}
                      className="btn-pasar-secondary px-5 py-2.5 text-xs font-bold flex items-center gap-2"
                    >
                      <MdRestaurantMenu size={16} />
                      <span>Buka Katalog 100 Jajanan</span>
                    </button>
                  </div>
                )
              )}

              {/* Status Berhasil Sementara */}
              {hasil && (
                <div className="w-full bg-[#FEF5E7] border-2 border-[#8C4318] text-[#8C4318] text-xs font-bold px-4 py-3 rounded-2xl flex items-center gap-2 shadow-sm animate-pulse">
                  <MdCheckCircle size={18} />
                  <span>Data siap! Mengantar ke nota takaran gula...</span>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Modal Pilihan Sumber Foto: Kamera vs Galeri */}
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

      {/* Footer Lapak */}
      <div className="text-center py-4 text-xs text-[#A89582] border-t border-[#E8D9C5] bg-[#FFFDF9] mt-12">
        © 2026 Cek-Gula Jajanan Pasar Indonesia
      </div>
    </div>
  )
}

export default ScanPage
