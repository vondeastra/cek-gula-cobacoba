import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { MdStorefront, MdWarning, MdLogin, MdArrowBack } from 'react-icons/md'
import { loginUser } from '../services/api'
import { DaunPisangCorner } from '../components/JajananArt'

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

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md mb-3 flex justify-start">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-display font-bold text-[#8C4318] hover:text-[#5E2A0B] bg-[#FFFDF9] border border-[#D8C2A4] px-4 py-2 rounded-full shadow-xs hover:bg-[#FFF3DD] transition cursor-pointer min-h-[44px]"
          >
            <MdArrowBack size={18} />
            <span>Kembali</span>
          </button>
        </div>

        <div className="w-full max-w-md daun-card p-8 sm:p-10 relative overflow-hidden bg-[#FFFDF9] shadow-2xl">
          <DaunPisangCorner position="top-right" />

          {/* Logo & Judul Lapak */}
          <div className="text-center mb-8">
            <div 
              onClick={() => navigate('/')} 
              className="w-16 h-16 rounded-2xl bg-[#8C4318] border-2 border-[#D8A868] text-white flex items-center justify-center mx-auto mb-3 shadow-md cursor-pointer hover:scale-105 transition-transform"
            >
              <MdStorefront size={32} />
            </div>
            <h1 className="font-display font-black text-3xl text-[#8C4318] tracking-tight">
              Lapak Cek-Gula
            </h1>
            <p className="text-xs font-semibold text-[#745F4B] mt-1">
              Sugeng Rawuh! Masuk ke akun belanja sehatmu
            </p>
          </div>

          {/* Pesan Kesalahan */}
          {error && (
            <div className="bg-[#FDEEE9] border-2 border-[#B5451B] text-[#B5451B] text-xs font-semibold px-4 py-3 rounded-2xl mb-6 flex items-center gap-2">
              <MdWarning size={18} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Kotak Akun Uji Coba / Tester */}
          <div className="mb-6 bg-[#FEF5E7] border border-[#E8C589] rounded-2xl p-3.5 flex items-center justify-between gap-3 text-xs shadow-xs">
            <div>
              <span className="font-display font-bold text-[#8C4318] block">Akun Uji Coba (Tester):</span>
              <span className="text-[#745F4B] text-[11px] font-medium block mt-0.5">
                tester@cekgula.com • password123
              </span>
            </div>
            <button
              type="button"
              onClick={() => setForm({ email: 'tester@cekgula.com', password: 'password123' })}
              className="btn-pasar-secondary px-3 py-1.5 text-xs font-bold shrink-0"
            >
              Gunakan Akun
            </button>
          </div>

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
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#745F4B] hover:text-[#8C4318] p-1"
                  aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-pasar-primary py-3.5 text-base font-bold shadow-lg mt-6 disabled:opacity-60 flex items-center justify-center gap-2"
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

          <div className="mt-8 pt-6 border-t border-dashed border-[#D8C2A4] text-center text-xs text-[#745F4B]">
            Belum punya akun langganan?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-[#8C4318] font-display font-bold hover:underline ml-1"
            >
              Daftar di sini
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

export default LoginPage
