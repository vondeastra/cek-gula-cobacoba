import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash, FaCheckCircle, FaLeaf } from 'react-icons/fa'
import { MdStorefront, MdWarning, MdLogin, MdArrowBack } from 'react-icons/md'
import { loginUser } from '../services/api'
import { DaunPisangCorner, TampahHeroSvg } from '../components/JajananArt'

function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()

    if (!form.email || !form.password) {
      setError('Email dan kata sandi jangan sampai kosong ya, Bu/Pak.')
      return
    }

    setLoading(true)
    setError('')

    try {
      await loginUser({ email: form.email, password: form.password })
      navigate('/scan')
    } catch (err) {
      setError(err.message || 'Gagal masuk. Periksa kembali email dan password Anda.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen font-body text-[#3B2A1A] flex flex-col justify-between">
      {/* Kanopi Tenda Lapak */}
      <div className="canopy-stripes h-2.5 w-full border-b border-[#5E2A0B]"></div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Tombol Navigasi Kembali ke Landing Page */}
        <div className="w-full max-w-4xl lg:max-w-5xl mb-4 flex justify-start">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-display font-bold text-[#8C4318] hover:text-[#5E2A0B] bg-[#FFFDF9] border border-[#D8C2A4] px-4 py-2 rounded-full shadow-xs hover:bg-[#FFF3DD] transition cursor-pointer min-h-[44px]"
            title="Kembali ke Halaman Utama (Landing Page)"
          >
            <MdArrowBack size={18} />
            <span>Kembali</span>
          </button>
        </div>

        {/* Kartu Format Website Lebar (2 Kolom di Desktop) */}
        <div className="w-full max-w-4xl lg:max-w-5xl daun-card overflow-hidden bg-[#FFFDF9] shadow-2xl border-2 border-[#D8C2A4] grid grid-cols-1 md:grid-cols-12 relative">
          <DaunPisangCorner position="top-right" />

          {/* Kolom Kiri: Branding & Nuansa Lapak Pasar Tradisional (Hanya di Layar Desktop/Tablet) */}
          <div className="md:col-span-5 bg-[#743714] text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden border-b-4 md:border-b-0 md:border-r-4 border-[#F2B134]">
            {/* Latar Belakang Lingkaran Halus */}
            <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-[#F2B134]/10 pointer-events-none" />

            <div>
              <div
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-3 cursor-pointer group mb-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#8C4318] border-2 border-[#D8A868] text-white flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform shrink-0">
                  <MdStorefront size={26} />
                </div>
                <div>
                  <span className="font-display font-black text-2xl text-white tracking-tight block leading-none">
                    Lapak Cek-Gula
                  </span>
                  <span className="text-[10px] text-[#F2B134] font-semibold uppercase tracking-wider block mt-1">
                    Jajanan Pasar Indonesia
                  </span>
                </div>
              </div>

              <h2 className="font-display font-black text-2xl lg:text-3xl text-[#FFF8EE] leading-tight mb-3">
                Jajan Boleh, Gula Tetap Terjaga!
              </h2>
              <p className="text-xs sm:text-sm text-[#FFF8EE]/85 leading-relaxed mb-6">
                Masuk ke akunmu untuk memantau asupan manis dari klepon, kue lapis, onde-onde, dan aneka kudapan tradisional nusantara.
              </p>

              {/* Poin Keunggulan Lapak */}
              <div className="space-y-3 text-xs text-[#FFF8EE]/90">
                <div className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-[#F2B134] shrink-0" size={14} />
                  <span>AI Pintar penakar kadar gula & kalori instan</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-[#F2B134] shrink-0" size={14} />
                  <span>Buku Kas konsumsi makanan harian</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-[#F2B134] shrink-0" size={14} />
                  <span>Basis data 100+ kudapan pasar nusantara</span>
                </div>
              </div>
            </div>

            {/* Ilustrasi Tampah Mini di Pojok Bawah */}
            <div className="mt-8 pt-6 border-t border-white/15 flex items-center gap-4">
              <div className="shrink-0">
                <TampahHeroSvg size={64} className="w-16 h-16 drop-shadow-md" />
              </div>
              <div className="text-[11px] text-[#FFF8EE]/80 italic leading-snug">
                "Kudapan warisan leluhur kita nikmati dengan takaran gizi yang teratur."
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Formulir Masuk (Login) */}
          <div className="md:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">

            <div className="mb-6">
              <span className="inline-flex items-center gap-1.5 text-xs font-display font-bold text-[#8C4318] bg-[#FEF5E7] px-3 py-1 rounded-full border border-[#E8C589] mb-2">
                <FaLeaf size={11} />
                <span>Pintu Masuk Lapak</span>
              </span>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-[#3B2A1A] tracking-tight">
                Selamat Datang!
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-[#745F4B] mt-1">
                Silakan masuk dengan akun terdaftar untuk memulai tilik jajanan.
              </p>
            </div>

            {/* Pesan Kesalahan */}
            {error && (
              <div className="bg-[#FDEEE9] border-2 border-[#B5451B] text-[#B5451B] text-xs font-semibold px-4 py-3 rounded-2xl mb-5 flex items-center gap-2">
                <MdWarning size={18} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Kotak Akun Uji Coba / Tester */}
            <div className="mb-6 bg-[#FEF5E7] border border-[#E8C589] rounded-2xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs shadow-xs">
              <div>
                <span className="font-display font-bold text-[#8C4318] block">Akun Uji Coba (Tester):</span>
                <span className="text-[#745F4B] text-[11px] font-medium block mt-0.5">
                  tester@cekgula.com • password123
                </span>
              </div>
              <button
                type="button"
                onClick={() => setForm({ email: 'tester@cekgula.com', password: 'password123' })}
                className="btn-pasar-secondary px-3.5 py-1.5 text-xs font-bold shrink-0 self-end sm:self-auto cursor-pointer"
              >
                Gunakan Akun
              </button>
            </div>

            {/* Form Login */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-[#7A4A21] font-display font-bold uppercase tracking-wider block mb-1">
                  Alamat Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="nama@email.com"
                  className="w-full px-4 py-3 bg-[#FFF8EC] border border-[#D8C2A4] rounded-2xl text-sm font-medium text-[#3B2A1A] placeholder:text-[#A89582] focus:outline-none focus:ring-2 focus:ring-[#8C4318] focus:bg-white transition"
                />
              </div>

              <div>
                <label className="text-xs text-[#7A4A21] font-display font-bold uppercase tracking-wider block mb-1">
                  Kata Sandi (Password)
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-[#FFF8EC] border border-[#D8C2A4] rounded-2xl text-sm font-medium text-[#3B2A1A] placeholder:text-[#A89582] focus:outline-none focus:ring-2 focus:ring-[#8C4318] focus:bg-white transition pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#745F4B] hover:text-[#8C4318] p-1 cursor-pointer"
                    aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-pasar-primary py-3.5 text-sm sm:text-base font-bold shadow-lg mt-6 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <span>Lagi dibukakan pintu lapak...</span>
                ) : (
                  <>
                    <MdLogin size={18} />
                    <span>Masuk ke Lapak</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-5 border-t border-dashed border-[#D8C2A4] text-center text-xs text-[#745F4B]">
              Belum punya akun langganan?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-[#8C4318] font-display font-bold hover:underline ml-1 cursor-pointer"
              >
                Daftar akun baru di sini
              </button>
            </div>

          </div>

        </div>
      </div>

      <div className="text-center py-4 text-xs text-[#A89582]">
        © 2026 Cek-Gula Jajanan Pasar Indonesia
      </div>
    </div>
  )
}

export default LoginPage
