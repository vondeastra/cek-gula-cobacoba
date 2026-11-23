import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash, FaUserPlus, FaCheckCircle, FaLeaf } from 'react-icons/fa'
import { MdStorefront, MdWarning, MdArrowBack } from 'react-icons/md'
import { registerUser } from '../services/api'
import { DaunPisangCorner, TampahHeroSvg } from '../components/JajananArt'

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

          {/* Kolom Kiri: Branding & Keuntungan Bergabung */}
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
                Buka Akun Pembeli Sehat
              </h2>
              <p className="text-xs sm:text-sm text-[#FFF8EE]/85 leading-relaxed mb-6">
                Daftar sekarang gratis untuk mulai mendata jajanan harian, menakar kalori, dan menjaga kesehatan keluarga tercinta.
              </p>

              {/* Poin Keuntungan */}
              <div className="space-y-3 text-xs text-[#FFF8EE]/90">
                <div className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-[#F2B134] shrink-0" size={14} />
                  <span>Akses gratis tak terbatas ke AI penakar gula</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-[#F2B134] shrink-0" size={14} />
                  <span>Riwayat catatan konsumsi tersimpan rapi</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-[#F2B134] shrink-0" size={14} />
                  <span>Tips hidup bugar tanpa pantang jajan enak</span>
                </div>
              </div>
            </div>

            {/* Ilustrasi Tampah Mini di Pojok Bawah */}
            <div className="mt-8 pt-6 border-t border-white/15 flex items-center gap-4">
              <div className="shrink-0">
                <TampahHeroSvg size={64} className="w-16 h-16 drop-shadow-md" />
              </div>
              <div className="text-[11px] text-[#FFF8EE]/80 italic leading-snug">
                "Keluarga sehat, budaya kuliner nusantara tetap lestari."
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Formulir Pendaftaran */}
          <div className="md:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">

            <div className="mb-6">
              <span className="inline-flex items-center gap-1.5 text-xs font-display font-bold text-[#8C4318] bg-[#FEF5E7] px-3 py-1 rounded-full border border-[#E8C589] mb-2">
                <FaLeaf size={11} />
                <span>Pendaftaran Akun Baru</span>
              </span>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-[#3B2A1A] tracking-tight">
                Mari Bergabung!
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-[#745F4B] mt-1">
                Isi data di bawah ini untuk membuka akun pelanggan setia lapak.
              </p>
            </div>

            {/* Pesan Kesalahan */}
            {error && (
              <div className="bg-[#FDEEE9] border-2 border-[#B5451B] text-[#B5451B] text-xs font-semibold px-4 py-3 rounded-2xl mb-5 flex items-center gap-2">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#7A4A21] font-display font-bold uppercase tracking-wider block mb-1">
                    Kata Sandi (Min 8 Karakter)
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Minimal 8 karakter"
                      className="w-full px-4 py-3 bg-[#FFF8EC] border border-[#D8C2A4] rounded-2xl text-sm font-medium text-[#3B2A1A] placeholder:text-[#A89582] focus:outline-none focus:ring-2 focus:ring-[#8C4318] focus:bg-white transition pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#745F4B] hover:text-[#8C4318] p-1 cursor-pointer"
                      aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                    >
                      {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
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
                      className="w-full px-4 py-3 bg-[#FFF8EC] border border-[#D8C2A4] rounded-2xl text-sm font-medium text-[#3B2A1A] placeholder:text-[#A89582] focus:outline-none focus:ring-2 focus:ring-[#8C4318] focus:bg-white transition pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#745F4B] hover:text-[#8C4318] p-1 cursor-pointer"
                      aria-label={showConfirm ? 'Sembunyikan konfirmasi' : 'Tampilkan konfirmasi'}
                    >
                      {showConfirm ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full btn-pasar-primary py-3.5 text-sm sm:text-base font-bold shadow-lg mt-6 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <span>Lagi mencatat ke buku kas...</span>
                ) : (
                  <>
                    <FaUserPlus size={16} />
                    <span>Daftarkan Akun Baru</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-8 pt-5 border-t border-dashed border-[#D8C2A4] text-center text-xs text-[#745F4B]">
              Sudah punya akun pelanggan?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-[#8C4318] font-display font-bold hover:underline ml-1 cursor-pointer"
              >
                Masuk di sini
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

export default RegisterPage
