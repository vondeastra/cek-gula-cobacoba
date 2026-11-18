import { useNavigate } from 'react-router-dom'
import { MdStorefront, MdArrowBack, MdHome } from 'react-icons/md'
import { DaunPisangCorner } from '../components/JajananArt'

function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen font-body text-[#3B2A1A] flex flex-col justify-between">
      {/* Kanopi Tenda Lapak */}
      <div className="canopy-stripes h-2.5 w-full border-b border-[#5E2A0B]"></div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md mb-3 flex justify-start">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-display font-bold text-[#8C4318] hover:text-[#5E2A0B] bg-[#FFFDF9] border border-[#D8C2A4] px-4 py-2 rounded-full shadow-xs hover:bg-[#FFF3DD] transition cursor-pointer min-h-[44px]"
            aria-label="Kembali ke halaman sebelumnya"
          >
            <MdArrowBack size={18} />
            <span>Kembali</span>
          </button>
        </div>

        <div className="w-full max-w-md daun-card p-8 sm:p-10 text-center relative overflow-hidden bg-[#FFFDF9] shadow-xl">
          <DaunPisangCorner position="top-right" />

          <div className="w-20 h-20 rounded-full bg-[#FFF8EC] border-2 border-[#E8D9C5] flex items-center justify-center text-4xl mx-auto mb-4 text-[#8C4318]">
            <MdStorefront size={38} />
          </div>

          <span className="font-display font-black text-6xl text-[#8C4318] block mb-2">
            404
          </span>

          <h1 className="font-display font-black text-2xl text-[#3B2A1A] mb-2">
            Waduh, Lapaknya Belum Buka!
          </h1>

          <p className="text-xs sm:text-sm text-[#745F4B] max-w-xs mx-auto mb-8 leading-relaxed">
            Halaman jajanan yang kamu cari tidak ditemukan atau sudah pindah lapak. Ayo kembali ke beranda pasar!
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate(-1)}
              className="btn-pasar-secondary w-full py-3 text-sm font-bold shadow-xs flex items-center justify-center gap-2"
            >
              <MdArrowBack size={18} />
              <span>Kembali ke Halaman Sebelumnya</span>
            </button>
            <button
              onClick={() => navigate('/')}
              className="btn-pasar-primary w-full py-3.5 text-sm font-bold shadow-md flex items-center justify-center gap-2"
            >
              <MdHome size={18} />
              <span>Kembali ke Beranda Lapak</span>
            </button>
          </div>
        </div>
      </div>

      <div className="text-center py-4 text-xs text-[#A89582]">
        © 2026 Cek-Gula Jajanan Pasar Indonesia
      </div>
    </div>
  )
}

export default NotFoundPage
