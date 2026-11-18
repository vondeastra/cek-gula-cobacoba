import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaFire, FaUtensilSpoon, FaClock } from 'react-icons/fa'
import { 
  MdStorefront, 
  MdMenuBook, 
  MdCameraAlt, 
  MdCheckCircle, 
  MdWarning, 
  MdError,
  MdArrowBack
} from 'react-icons/md'
import { getDiary } from '../services/api'
import { KukusanLoadingSvg, DaunPisangCorner } from '../components/JajananArt'

function DiaryPage() {
  const navigate = useNavigate()
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

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
                  Buku Kas Konsumsi
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/scan')}
              className="btn-pasar-primary px-4 py-2 text-xs sm:text-sm font-bold shadow-sm flex items-center gap-1.5"
            >
              <span>+</span>
              <span>Tilik Jajanan</span>
            </button>
            
            <button
              onClick={handleLogout}
              className="text-[#B5451B] hover:bg-[#FDEEE9] px-3 py-1.5 rounded-xl font-display font-semibold text-xs transition"
            >
              Keluar
            </button>
          </div>

        </div>
      </nav>

      {/* Konten Buku Kas Diary */}
      <div className="px-4 py-8 max-w-2xl mx-auto w-full flex-1">
        
        {/* Header Seksi */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 bg-[#FEF6E4] border border-[#F2B134] text-[#B5451B] text-xs font-display font-bold px-3 py-1 rounded-full mb-2">
            <MdMenuBook size={14} />
            <span>Buku Kas Kudapan Harian</span>
          </div>
          <h1 className="font-display font-black text-3xl text-[#3B2A1A]">
            Catatan Jajananmu Hari Ini
          </h1>
          <p className="text-xs sm:text-sm text-[#745F4B] mt-1">
            Pantau seberapa banyak manisnya jajanan pasar yang sudah dinikmati hari ini.
          </p>
        </div>

        {/* Ringkasan Gula & Kalori Papan Lapak */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          
          {/* Total Kalori */}
          <div className="daun-card p-5 text-center relative overflow-hidden bg-[#FFFDF9]">
            <DaunPisangCorner position="top-right" />
            <div className="w-10 h-10 rounded-xl bg-[#FEF5E7] text-[#8C4318] flex items-center justify-center mx-auto mb-2">
              <FaFire size={20} />
            </div>
            <p className="text-xs font-semibold text-[#745F4B] uppercase tracking-wide">
              Total Kalori
            </p>
            <p className="font-display font-black text-3xl sm:text-4xl text-[#7A4A21] my-1">
              {totalCalories.toFixed(0)}
            </p>
            <p className="text-[11px] text-[#A89582] font-semibold">
              kkal energi
            </p>
          </div>

          {/* Total Gula */}
          <div className="daun-card p-5 text-center relative overflow-hidden bg-[#FFFDF9]">
            <DaunPisangCorner position="top-right" />
            <div className="w-10 h-10 rounded-xl bg-[#FEF5E7] text-[#8C4318] flex items-center justify-center mx-auto mb-2">
              <FaUtensilSpoon size={20} />
            </div>
            <p className="text-xs font-semibold text-[#745F4B] uppercase tracking-wide">
              Total Gula Hari Ini
            </p>
            <p className="font-display font-black text-3xl sm:text-4xl text-[#8C4318] my-1">
              {totalSugar.toFixed(1)}
            </p>
            <p className="text-[11px] text-[#A89582] font-semibold">
              gram (±{totalSendokTeh} sendok teh)
            </p>
          </div>

        </div>

        {/* Status Loading */}
        {loading ? (
          <div className="text-center py-16">
            <KukusanLoadingSvg className="mx-auto mb-4" />
            <p className="font-display font-bold text-base text-[#7A4A21]">
              Membuka lembaran buku kas lapak...
            </p>
            <p className="text-xs text-[#A89582] mt-1">
              Mohon tunggu sejenak ya.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-lg text-[#3B2A1A]">
                Daftar Kudapan yang Dimakan ({entries.length})
              </h2>
              <span className="text-xs font-semibold text-[#745F4B]">
                Hari ini
              </span>
            </div>

            {/* List Entri Kudapan */}
            <div className="flex flex-col gap-3">
              {entries.map(entry => {
                const badge = getCategoryBadge(entry.category)
                return (
                  <div 
                    key={entry.id} 
                    className="daun-card p-4 sm:p-5 flex justify-between items-center bg-[#FFFDF9] hover-jajan transition"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#FFF8EC] border border-[#E8D9C5] flex items-center justify-center text-xl shrink-0">
                        {badge.icon}
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-base text-[#3B2A1A] capitalize">
                          {entry.food_name}
                        </h3>
                        <p className="text-xs text-[#745F4B] mt-0.5 flex items-center gap-1.5 flex-wrap">
                          <span className="inline-flex items-center gap-1">
                            <FaClock size={11} className="text-[#8C4318]" />
                            <span>Pukul {entry.time}</span>
                          </span>
                          <span>•</span>
                          <span><strong className="text-[#7A4A21]">{entry.calories} kkal</strong></span>
                          <span>•</span>
                          <span>Gula: <strong className="text-[#8C4318]">{entry.sugar}g</strong></span>
                        </p>
                      </div>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-xs font-display font-bold shrink-0 ${badge.className}`}>
                      {badge.text}
                    </span>
                  </div>
                )
              })}

              {/* State Kosong (Empty State) */}
              {entries.length === 0 && (
                <div className="daun-card p-10 text-center bg-[#FFFDF9]">
                  <div className="w-20 h-20 rounded-full bg-[#FFF8EC] border-2 border-[#E8D9C5] flex items-center justify-center mx-auto mb-4 text-[#8C4318]">
                    <MdStorefront size={38} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#7A4A21] mb-2">
                    Lapak Catatan Masih Kosong
                  </h3>
                  <p className="text-xs sm:text-sm text-[#745F4B] max-w-sm mx-auto mb-6 leading-relaxed">
                    Belum ada jajanan yang dicatat hari ini. Yuk foto jajanan pasar favoritmu dan masukkan ke catatan!
                  </p>
                  <button
                    onClick={() => navigate('/scan')}
                    className="btn-pasar-primary px-8 py-3 text-sm font-bold inline-flex items-center gap-2"
                  >
                    <MdCameraAlt size={18} />
                    <span>Tilik Jajanan Sekarang</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default DiaryPage
