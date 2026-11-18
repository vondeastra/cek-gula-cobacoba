import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash, FaUserPlus } from 'react-icons/fa'
import { MdStorefront, MdWarning, MdArrowBack } from 'react-icons/md'
import { registerUser } from '../services/api'
import { DaunPisangCorner } from '../components/JajananArt'

function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (error) setError('')
  }

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError('Semua data wajib diisi ya, Bu/Pak.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      setError('Format email kamu sepertinya kurang pas (contoh: nama@email.com).')
      return
    }

    if (form.password.length < 8) {
      setError('Kata sandi harus minimal 8 karakter agar aman.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Kata sandi dan konfirmasi kata sandi belum sama.')
      return
    }

    setLoading(true)
    setError('')

    try {
      await registerUser({
        name: form.name,
        email: form.email,
        password: form.password
      })
      navigate('/login')
    } catch (err) {
      setError(err.message || 'Pendaftaran gagal. Silakan coba lagi.')
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

          {/* Header Lapak */}
          <div className="text-center mb-8">
            <div 
              onClick={() => navigate('/')} 
              className="w-16 h-16 rounded-2xl bg-[#8C4318] border-2 border-[#D8A868] text-white flex items-center justify-center mx-auto mb-3 shadow-md cursor-pointer hover:scale-105 transition-transform"
            >
              <MdStorefront size={32} />
            </div>
            <h1 className="font-display font-black text-3xl text-[#8C4318] tracking-tight">
              Daftar Lapak Cek-Gula
            </h1>
            <p className="text-xs font-semibold text-[#745F4B] mt-1">
              Bikin akun belanja sehat untuk kontrol gula darahmu
            </p>
          </div>

          {/* Pesan Kesalahan */}
          {error && (
            <div className="bg-[#FDEEE9] border-2 border-[#B5451B] text-[#B5451B] text-xs font-semibold px-4 py-3 rounded-2xl mb-6 flex items-center gap-2">
              <MdWarning size={18} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-xs text-[#7A4A21] font-display font-bold uppercase tracking-wider block mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Contoh: Siti Rahmawati"
                className="w-full px-4 py-3 bg-[#FFF8EC] border border-[#D8C2A4] rounded-2xl text-sm font-medium text-[#3B2A1A] placeholder:text-[#A89582] focus:outline-none focus:ring-2 focus:ring-[#8C4318] focus:bg-white transition"
              />
            </div>

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
                Kata Sandi (Minimal 8 karakter)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Minimal 8 karakter"
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

            <div>
              <label className="text-xs text-[#7A4A21] font-display font-bold uppercase tracking-wider block mb-1">
                Ulangi Kata Sandi
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Ketik ulang kata sandi"
                  className="w-full px-4 py-3 bg-[#FFF8EC] border border-[#D8C2A4] rounded-2xl text-sm font-medium text-[#3B2A1A] placeholder:text-[#A89582] focus:outline-none focus:ring-2 focus:ring-[#8C4318] focus:bg-white transition pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#745F4B] hover:text-[#8C4318] p-1"
                  aria-label={showConfirm ? 'Sembunyikan konfirmasi' : 'Tampilkan konfirmasi'}
                >
                  {showConfirm ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full btn-pasar-primary py-3.5 text-base font-bold shadow-lg mt-6 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Mendaftarkan ke buku lapak...</span>
              ) : (
                <>
                  <FaUserPlus size={18} />
                  <span>Bikin Akun Sekarang</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-dashed border-[#D8C2A4] text-center text-xs text-[#745F4B]">
            Sudah punya akun?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-[#8C4318] font-display font-bold hover:underline ml-1"
            >
              Masuk di sini
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

export default RegisterPage
