import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import artikel1 from '../assets/artikel1.png'
import artikel2 from '../assets/artikel2.png'
import artikel3 from '../assets/artikel3.png'
import { 
  TampahHeroSvg, 
  KleponSvg, 
  OndeOndeSvg, 
  KueLapisSvg, 
  DadarGulungSvg, 
  SerabiSvg, 
  LemperSvg, 
  EsCendolSvg, 
  BatikDivider, 
  DaunPisangCorner 
} from '../components/JajananArt'
import { FaInstagram, FaTwitter, FaGithub, FaSearch, FaTag, FaLeaf, FaBalanceScale, FaCalendarAlt } from 'react-icons/fa'
import { MdArrowForward, MdCameraAlt, MdMenu, MdClose, MdStorefront, MdMenuBook } from 'react-icons/md'

function LandingPage() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  // Contoh jajanan di etalase lapak
  const etalaseJajanan = [
    { nama: 'Klepon Pandan', kalori: '110 kkal', gula: '5.6g', status: 'Aman', icon: <KleponSvg size={44} />, desc: 'Ketan pandan legit isi gula merah cair tabur kelapa gurih' },
    { nama: 'Onde-Onde', kalori: '133 kkal', gula: '6.5g', status: 'Boleh Jajan', icon: <OndeOndeSvg size={44} />, desc: 'Kulit kenyal renyah bertabur wijen dengan pasta kacang hijau' },
    { nama: 'Kue Lapis', kalori: '185 kkal', gula: '19.1g', status: 'Manis Nendang', icon: <KueLapisSvg size={44} />, desc: 'Kue lapis tepung beras kenyal berlapis-lapis warna-warni' },
    { nama: 'Dadar Gulung', kalori: '139 kkal', gula: '3.5g', status: 'Aman', icon: <DadarGulungSvg size={44} />, desc: 'Dadar pandan wangi berpori berisi unti kelapa gula aren' },
    { nama: 'Serabi Kinca', kalori: '174 kkal', gula: '11.1g', status: 'Boleh Jajan', icon: <SerabiSvg size={44} />, desc: 'Serabi lembut bersarang dengan siraman kuah kinca manis gurih' },
    { nama: 'Es Cendol Dawet', kalori: '185 kkal', gula: '21.0g', status: 'Manis Nendang', icon: <EsCendolSvg size={44} />, desc: 'Cendol kenyal berpadu santan gurih dan sirup gula aren legit' },
    { nama: 'Lemper Ayam', kalori: '186 kkal', gula: '2.0g', status: 'Aman', icon: <LemperSvg size={44} />, desc: 'Ketan pulen harum gurih santan dengan suwiran ayam' },
  ]

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate('/scan')
    }
  }

  return (
    <div className="min-h-screen font-body text-[#3B2A1A] flex flex-col">

      {/* Kanopi Tenda Lapak Tradisional (Top Banner Garis Gula Aren & Krem) */}
      <div className="canopy-stripes h-3 w-full border-b border-[#5E2A0B]"></div>

      {/* Navbar Papan Nama Lapak */}
      <nav className="bg-[#FFFDF9] border-b-2 border-[#E8D9C5] px-6 py-3.5 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          
          {/* Logo Lapak */}
          <div 
            onClick={() => scrollTo('hero')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#8C4318] border-2 border-[#D8A868] flex items-center justify-center text-xl shadow-sm group-hover:scale-105 transition-transform text-white">
              <MdStorefront size={22} />
            </div>
            <div>
              <div className="font-display font-bold text-2xl text-[#8C4318] tracking-tight leading-none">
                Lapak Cek-Gula
              </div>
              <span className="text-[11px] font-semibold text-[#B5451B] uppercase tracking-wider block mt-0.5">
                Kudapan Pasar Tradisional
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7 font-display font-semibold text-[#5A3314]">
            <span onClick={() => scrollTo('hero')} className="cursor-pointer text-[#8C4318] hover:text-[#A04E1D] transition">Beranda</span>
            <span onClick={() => scrollTo('etalase')} className="cursor-pointer hover:text-[#8C4318] transition">Etalase Jajanan</span>
            <span onClick={() => scrollTo('fitur')} className="cursor-pointer hover:text-[#8C4318] transition">Fitur Lapak</span>
            <span onClick={() => scrollTo('tentang')} className="cursor-pointer hover:text-[#8C4318] transition">Cerita Kami</span>
            <span onClick={() => scrollTo('artikel')} className="cursor-pointer hover:text-[#8C4318] transition">Kabar Sehat</span>
            
            <button 
              onClick={() => navigate('/login')} 
              className="btn-pasar-primary px-6 py-2 text-sm shadow-md"
            >
              Masuk Lapak
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="md:hidden p-2 rounded-xl text-[#8C4318] hover:bg-[#FDF1E8] transition"
            aria-label="Menu"
          >
            {menuOpen ? <MdClose size={26} /> : <MdMenu size={26} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#FFFDF9] border-t border-[#E8D9C5] mt-3 py-4 px-4 flex flex-col gap-3 font-display font-semibold rounded-2xl shadow-xl">
            <span onClick={() => scrollTo('hero')} className="py-2 px-3 text-[#8C4318] rounded-lg bg-[#FDF1E8] cursor-pointer">Beranda</span>
            <span onClick={() => scrollTo('etalase')} className="py-2 px-3 text-[#5A3314] hover:bg-[#FFF3DD] rounded-lg cursor-pointer">Etalase Jajanan</span>
            <span onClick={() => scrollTo('fitur')} className="py-2 px-3 text-[#5A3314] hover:bg-[#FFF3DD] rounded-lg cursor-pointer">Fitur Lapak</span>
            <span onClick={() => scrollTo('tentang')} className="py-2 px-3 text-[#5A3314] hover:bg-[#FFF3DD] rounded-lg cursor-pointer">Cerita Kami</span>
            <span onClick={() => scrollTo('artikel')} className="py-2 px-3 text-[#5A3314] hover:bg-[#FFF3DD] rounded-lg cursor-pointer">Kabar Sehat</span>
            <button 
              onClick={() => navigate('/login')} 
              className="btn-pasar-primary w-full py-3 mt-2 text-base"
            >
              Masuk Lapak
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="max-w-6xl mx-auto px-6 pt-12 pb-16 flex flex-col-reverse md:flex-row items-center justify-between gap-12 w-full">
        
        {/* Left Column: Greeting & Call to action */}
        <div className="flex-1 text-center md:text-left">
          
          {/* Badge Suasana Pasar */}
          <div className="inline-flex items-center gap-2 bg-[#FEF6E4] border border-[#F2B134] text-[#B5451B] text-xs font-display font-bold px-4 py-1.5 rounded-full mb-5 shadow-sm">
            <MdStorefront size={16} />
            <span>Jajan Boleh, Gula Tetap Dijaga!</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#3B2A1A] leading-[1.15] mb-5">
            Cek Manisnya <br />
            <span className="text-[#8C4318] underline decoration-[#F2B134] decoration-wavy decoration-4">
              Jajanan Pasar
            </span> <br />
            Keluarga Indonesia!
          </h1>

          <p className="text-[#745F4B] text-base sm:text-lg mb-8 leading-relaxed max-w-xl">
            Suka jajan klepon, onde-onde, atau lemper tapi waswas gula darah naik? 
            Foto jajananmu, dan biarkan <strong>AI Lapak Cek-Gula</strong> menakar kalori, 
            kandungan gula, hingga beban glikemiknya secara instan!
          </p>

          {/* Quick Search Form di Lapak */}
          <form onSubmit={handleSearchSubmit} className="mb-8 max-w-md mx-auto md:mx-0">
            <div className="flex items-center bg-white border-2 border-[#D8C2A4] rounded-full p-1.5 shadow-md focus-within:border-[#8C4318] focus-within:ring-2 focus-within:ring-[#8C4318]/20 transition">
              <span className="pl-3.5 text-[#7A4A21]"><FaSearch size={16} /></span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Mau jajan apa hari ini? Contoh: klepon, kue cucur..."
                className="w-full px-3 py-2 text-sm text-[#3B2A1A] bg-transparent outline-none font-medium placeholder:text-[#A89582]"
              />
              <button 
                type="submit" 
                className="btn-pasar-primary px-5 py-2 text-xs font-bold shrink-0"
              >
                Cari Gula
              </button>
            </div>
          </form>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button 
              onClick={() => navigate('/register')} 
              className="btn-pasar-primary px-8 py-3.5 text-base font-bold flex items-center justify-center gap-3"
            >
              <MdCameraAlt size={20} />
              Mulai Cek Jajanan Gratis
              <MdArrowForward size={18} />
            </button>
            
            <button 
              onClick={() => scrollTo('etalase')} 
              className="btn-pasar-secondary px-6 py-3.5 text-base font-bold"
            >
              Tengok Etalase Lapak
            </button>
          </div>

        </div>

        {/* Right Column: Hero Tampah Ilustrasi */}
        <div className="flex-1 flex justify-center relative">
          <div className="relative group">
            {/* Hiasan Papan Harga Kayu Mini */}
            <div className="absolute -top-4 -left-4 bg-[#7A4A21] text-[#FFF8EC] font-display text-xs font-bold px-3 py-1.5 rounded-xl border-2 border-[#D8A868] shadow-md z-20 rotate-[-8deg] flex items-center gap-1.5">
              <FaTag size={12} className="text-[#F2B134]" />
              <span>100% Tradisional</span>
            </div>
            
            {/* Tampah Hero */}
            <div className="hover:rotate-2 transition-transform duration-500 ease-out">
              <TampahHeroSvg size={300} className="w-64 h-64 sm:w-80 sm:h-80 drop-shadow-2xl" />
            </div>

            {/* Stiker Kertas Nasi */}
            <div className="absolute -bottom-3 -right-2 bg-[#FFFDF9] border-2 border-[#E8D9C5] text-[#8C4318] font-display text-xs font-bold px-4 py-2 rounded-2xl shadow-lg z-20 rotate-[6deg] flex items-center gap-1.5">
              <FaLeaf size={12} />
              <span>Beralas Daun Pisang & Tampah Bambu</span>
            </div>
          </div>
        </div>

      </section>

      {/* Info Bar Tenda Lapak (Stats Berwarna Cokelat Gula Aren & Kuning Emas) */}
      <div className="bg-[#743714] text-white py-8 px-6 border-y-4 border-[#F2B134] shadow-inner">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-2">
            <p className="font-display font-black text-4xl text-[#F2B134] mb-1">50+</p>
            <p className="text-[#FFF8EE] font-medium text-sm">Ragam Jajanan Pasar Indonesia</p>
          </div>
          <div className="p-2 border-y sm:border-y-0 sm:border-x border-white/20">
            <p className="font-display font-black text-4xl text-[#F2B134] mb-1">85%+</p>
            <p className="text-[#FFF8EE] font-medium text-sm">Akurasi Pengenal Citra AI</p>
          </div>
          <div className="p-2">
            <p className="font-display font-black text-4xl text-[#F2B134] mb-1">100%</p>
            <p className="text-[#FFF8EE] font-medium text-sm">Gratis untuk Masyarakat Sehat</p>
          </div>
        </div>
      </div>

      {/* Section Etalase Jajanan Pasar */}
      <section id="etalase" className="py-16 px-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <div className="inline-block bg-[#FEF5E7] text-[#8C4318] font-display font-bold text-xs px-4 py-1.5 rounded-full mb-3 border border-[#E8C589]">
            Kudapan Favorit
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#3B2A1A] mb-3">
            Etalase Jajanan Pasar
          </h2>
          <p className="text-[#745F4B] text-base max-w-xl mx-auto">
            Tengok takaran manisnya aneka kudapan tradisional yang sering dijumpai di pasar subuh.
          </p>
        </div>

        {/* Grid Kartu Jajanan Pasar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {etalaseJajanan.map((jajan, i) => (
            <div 
              key={i} 
              className="daun-card p-6 flex flex-col justify-between hover-jajan transition-all cursor-pointer relative overflow-hidden group"
              onClick={() => navigate('/scan')}
            >
              <DaunPisangCorner position="top-right" />
              
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#FFF8EC] border-2 border-[#E8D9C5] flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                    {jajan.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-[#3B2A1A]">
                      {jajan.nama}
                    </h3>
                    <span className={`inline-block text-[11px] font-display font-bold px-2.5 py-0.5 rounded-full mt-1 ${
                      jajan.status === 'Aman' ? 'bg-[#FEF6E4] text-[#7A4A21] border border-[#F2B134]' :
                      jajan.status === 'Boleh Jajan' ? 'bg-[#FEF5E7] text-[#B5451B] border border-[#F2B134]' :
                      'bg-[#FDEEE9] text-[#B5451B] border border-[#B5451B]/40'
                    }`}>
                      {jajan.status}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#745F4B] leading-relaxed mb-4">
                  {jajan.desc}
                </p>
              </div>

              {/* Papan Harga / Takaran Gula */}
              <div className="bg-[#FFF9EE] border-2 border-dashed border-[#D8C2A4] rounded-xl p-3 flex justify-between items-center text-xs">
                <div>
                  <span className="text-[#A89582] block text-[10px] font-semibold uppercase">Energi</span>
                  <strong className="text-[#7A4A21] font-display text-sm">{jajan.kalori}</strong>
                </div>
                <div className="w-[1px] h-6 bg-[#D8C2A4]"></div>
                <div>
                  <span className="text-[#A89582] block text-[10px] font-semibold uppercase">Kadar Gula</span>
                  <strong className="text-[#B5451B] font-display text-sm">{jajan.gula}</strong>
                </div>
                <button className="bg-[#8C4318] text-white p-2 rounded-lg hover:bg-[#A04E1D] transition shadow-sm">
                  <MdCameraAlt size={14} />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Info Cek Mandiri */}
        <div className="mt-10 text-center">
          <p className="text-sm text-[#745F4B] mb-4">
            Punya jajanan lain yang dibeli di pasar pagi ini?
          </p>
          <button 
            onClick={() => navigate('/scan')}
            className="btn-pasar-primary px-8 py-3 text-sm font-bold flex items-center gap-2 mx-auto"
          >
            <MdCameraAlt size={18} />
            <span>Foto Jajananmu Sekarang</span>
          </button>
        </div>
      </section>

      <BatikDivider />

      {/* Section Fitur Lapak */}
      <section id="fitur" className="py-16 px-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-14">
          <div className="inline-block bg-[#FEF6E4] text-[#B5451B] font-display font-bold text-xs px-4 py-1.5 rounded-full mb-3 border border-[#F2B134]">
            Pelayanan Lapak Kami
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#3B2A1A] mb-3">
            Mudah, Cepat, dan Ramah
          </h2>
          <p className="text-[#745F4B] text-base max-w-xl mx-auto">
            Tak perlu repot menimbang dan membaca jurnal rumit. Kami siapkan semuanya seringkas berbelanja di lapak pasar!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Fitur 1 */}
          <div className="daun-card p-8 flex flex-col items-center text-center hover-jajan transition">
            <div className="w-16 h-16 rounded-2xl bg-[#FEF5E7] border-2 border-[#E8C589] flex items-center justify-center text-3xl mb-5 shadow-sm text-[#8C4318]">
              <MdCameraAlt size={28} />
            </div>
            <h3 className="font-display font-bold text-xl text-[#3B2A1A] mb-2">
              Tukang Tilik AI
            </h3>
            <p className="text-[#745F4B] text-sm leading-relaxed">
              Cukup jepret foto jajanan pasar dari piring atau bungkusan daun pisangmu. AI kami langsung mengenali jenis kuenya.
            </p>
          </div>

          {/* Fitur 2 */}
          <div className="daun-card p-8 flex flex-col items-center text-center hover-jajan transition">
            <div className="w-16 h-16 rounded-2xl bg-[#FEF6E4] border-2 border-[#F2B134] flex items-center justify-center text-3xl mb-5 shadow-sm text-[#8C4318]">
              <FaBalanceScale size={28} />
            </div>
            <h3 className="font-display font-bold text-xl text-[#3B2A1A] mb-2">
              Timbangan Gula & Gizi
            </h3>
            <p className="text-[#745F4B] text-sm leading-relaxed">
              Dapatkan perkiraan gram gula pasir, kalori, karbohidrat, serta beban glikemik yang disesuaikan dengan takaran porsi makanmu.
            </p>
          </div>

          {/* Fitur 3 */}
          <div className="daun-card p-8 flex flex-col items-center text-center hover-jajan transition">
            <div className="w-16 h-16 rounded-2xl bg-[#FDEEE9] border-2 border-[#B5451B]/40 flex items-center justify-center text-3xl mb-5 shadow-sm text-[#8C4318]">
              <MdMenuBook size={28} />
            </div>
            <h3 className="font-display font-bold text-xl text-[#3B2A1A] mb-2">
              Buku Kas Food Diary
            </h3>
            <p className="text-[#745F4B] text-sm leading-relaxed">
              Catat riwayat jajan harianmu agar asupan gula tetap terkontrol dan tidak kebablasan sepanjang minggu.
            </p>
          </div>

        </div>
      </section>

      <BatikDivider />

      {/* Section Cerita Kami / Tentang */}
      <section id="tentang" className="bg-[#FFFDF9] border-y-2 border-[#E8D9C5] py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          
          <div className="flex-1">
            <div className="bamboo-pattern p-6 sm:p-8 rounded-3xl border-2 border-[#D8C2A4] shadow-lg">
              <div className="bg-[#743714] text-white rounded-2xl p-6 mb-6 shadow-md">
                <div className="w-12 h-12 rounded-xl bg-[#8C4318] border border-[#D8A868] flex items-center justify-center text-white mb-3 shadow-sm">
                  <MdStorefront size={26} />
                </div>
                <h3 className="font-display font-black text-2xl mb-1">Lapak Cek-Gula</h3>
                <p className="text-[#FFF8EE]/90 text-xs font-semibold">Inovasi Peduli Diabetes & Kuliner Nusantara</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 text-center border border-[#E8D9C5] shadow-sm">
                  <p className="font-display font-black text-2xl text-[#B5451B]">Peringkat 5</p>
                  <p className="text-[#745F4B] text-xs mt-1">Dunia untuk Kasus Diabetes di Indonesia</p>
                </div>
                <div className="bg-white rounded-xl p-4 text-center border border-[#E8D9C5] shadow-sm">
                  <p className="font-display font-black text-2xl text-[#8C4318]">Tanpa Label</p>
                  <p className="text-[#745F4B] text-xs mt-1">99% Jajanan Pasar Belum Berlabel Nutrisi</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="inline-block bg-[#FEF5E7] text-[#8C4318] font-display font-bold text-xs px-4 py-1.5 rounded-full mb-3 border border-[#E8C589]">
              Cerita di Balik Lapak
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#3B2A1A] mb-5 leading-tight">
              Mengapa Cek-Gula Jajanan Pasar Hadir?
            </h2>
            <p className="text-[#745F4B] text-sm sm:text-base leading-relaxed mb-4">
              Indonesia adalah surga kudapan tradisional dengan rasa manis gula aren, gurihnya santan, dan kenyalnya tepung ketan. Namun, 19,5 juta saudara kita berjuang dengan diabetes tanpa informasi takaran gula yang jelas pada jajanan kesukaan mereka.
            </p>
            <p className="text-[#745F4B] text-sm sm:text-base leading-relaxed mb-8">
              Kami hadir untuk menjembatani rasa cinta pada kuliner tradisional dengan gaya hidup sehat. Anda tetap bisa menikmati jajanan pasar kesayangan bersama keluarga dengan porsi yang terukur dan aman!
            </p>
            <button 
              onClick={() => navigate('/register')} 
              className="btn-pasar-primary px-8 py-3 text-sm font-bold flex items-center gap-2"
            >
              Mulai Bergabung Sekarang <MdArrowForward size={18} />
            </button>
          </div>

        </div>
      </section>

      {/* Section Artikel & Tips Hidup Sehat */}
      <section id="artikel" className="py-16 px-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <div className="inline-block bg-[#FEF6E4] text-[#B5451B] font-display font-bold text-xs px-4 py-1.5 rounded-full mb-3 border border-[#F2B134]">
            Kabar Sehat Lapak
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#3B2A1A] mb-3">
            Tips Jajan Sehat & Bugar
          </h2>
          <p className="text-[#745F4B] text-base">
            Wawasan seputar gula darah, indeks glikemik, dan kiat memilih jajanan pasar yang bijak.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { img: artikel1, tag: 'Glikemik', title: 'Apa itu Indeks Glikemik?', desc: 'Pelajari bagaimana indeks glikemik mempengaruhi lonjakan kadar gula darah dan energi harianmu.', date: '28 April 2026' },
            { img: artikel2, tag: 'Diabetes', title: 'Bahaya Sugar Crash di Tempat Kerja', desc: 'Sugar crash bikin mengantuk dan loyo setelah makan manis. Kenali gejalanya dan cara mengatasinya.', date: '25 April 2026' },
            { img: artikel3, tag: 'Pilihan Jajan', title: 'Jajanan Pasar yang Lebih Ramah Gula', desc: 'Tidak semua jajanan pasar manis berlebih. Ini ragam jajanan gurih berprotein yang relatif aman.', date: '20 April 2026' }
          ].map((art, idx) => (
            <div 
              key={idx} 
              className="daun-card overflow-hidden hover-jajan transition flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden border-b border-[#E8D9C5]">
                  <img src={art.img} alt={art.title} className="w-full h-full object-cover hover:scale-105 transition duration-300" />
                </div>
                <div className="p-5">
                  <span className="bg-[#FEF6E4] text-[#B5451B] text-[11px] font-display font-bold px-3 py-1 rounded-full border border-[#F2B134]">
                    {art.tag}
                  </span>
                  <h3 className="font-display font-bold text-lg text-[#3B2A1A] mt-3 mb-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-[#745F4B] leading-relaxed">
                    {art.desc}
                  </p>
                </div>
              </div>
              <div className="px-5 pb-5 pt-2 text-[11px] font-semibold text-[#A89582] border-t border-[#F0E4D3] mt-2 flex items-center gap-1.5">
                <FaCalendarAlt size={11} className="text-[#B5451B]" />
                <span>{art.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spanduk Banner Bawah Lapak (CTA Cokelat Gula Aren) */}
      <section className="bg-[#743714] text-white py-16 px-6 text-center border-t-4 border-[#F2B134] relative overflow-hidden">
        <div className="max-w-2xl mx-auto relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-[#8C4318] border-2 border-[#F2B134] flex items-center justify-center text-white mx-auto mb-4 shadow-md">
            <MdStorefront size={28} />
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl mb-3">
            Yuk, Mampir dan Cek Jajananmu Hari Ini!
          </h2>
          <p className="text-[#FFF8EE]/90 text-sm sm:text-base mb-8">
            Daftar gratis, buka kamera ponselmu, dan jaga kesehatan diri serta keluarga tercinta tanpa harus pantang makanan enak.
          </p>
          <button 
            onClick={() => navigate('/register')} 
            className="btn-pasar-kunyit px-10 py-4 text-base font-bold shadow-xl"
          >
            Buka Akun Lapak Sekarang
          </button>
        </div>
      </section>

      {/* Footer Nuansa "Terima Kasih Sudah Jajan" */}
      <footer className="bg-[#1E1610] text-[#D8C2A4] py-12 px-6 border-t border-[#382618]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
          
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#8C4318] text-white flex items-center justify-center text-xl">
                <MdStorefront size={22} />
              </div>
              <span className="font-display font-bold text-2xl text-white">Lapak Cek-Gula</span>
            </div>
            <p className="text-xs leading-relaxed text-[#A89582] mb-4">
              "Matur nuwun sanget sampun rawuh / Terima kasih sudah mampir jajan!" 
              Aplikasi pendeteksi kandungan nutrisi & indeks glikemik jajanan pasar tradisional Indonesia berbasis kecerdasan buatan.
            </p>
            <div className="flex gap-4 text-[#D8C2A4]">
              <FaInstagram size={18} className="hover:text-white cursor-pointer transition" />
              <FaTwitter size={18} className="hover:text-white cursor-pointer transition" />
              <FaGithub size={18} className="hover:text-white cursor-pointer transition" />
            </div>
          </div>

          <div className="flex gap-16 font-display">
            <div>
              <h4 className="font-bold text-white text-sm mb-3">Lorong Lapak</h4>
              <ul className="flex flex-col gap-2 text-xs text-[#A89582]">
                <li><span onClick={() => scrollTo('hero')} className="hover:text-[#F2B134] cursor-pointer transition">Beranda</span></li>
                <li><span onClick={() => scrollTo('etalase')} className="hover:text-[#F2B134] cursor-pointer transition">Etalase Jajanan</span></li>
                <li><span onClick={() => scrollTo('fitur')} className="hover:text-[#F2B134] cursor-pointer transition">Fitur Unggulan</span></li>
                <li><span onClick={() => scrollTo('tentang')} className="hover:text-[#F2B134] cursor-pointer transition">Cerita Kami</span></li>
                <li><span onClick={() => scrollTo('artikel')} className="hover:text-[#F2B134] cursor-pointer transition">Kabar Sehat</span></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white text-sm mb-3">Akses Akun</h4>
              <ul className="flex flex-col gap-2 text-xs text-[#A89582]">
                <li><span onClick={() => navigate('/login')} className="hover:text-[#F2B134] cursor-pointer transition">Masuk Lapak</span></li>
                <li><span onClick={() => navigate('/register')} className="hover:text-[#F2B134] cursor-pointer transition">Daftar Baru</span></li>
                <li><span onClick={() => navigate('/scan')} className="hover:text-[#F2B134] cursor-pointer transition">Kamera Scan</span></li>
                <li><span onClick={() => navigate('/diary')} className="hover:text-[#F2B134] cursor-pointer transition">Catatan Diary</span></li>
              </ul>
            </div>
          </div>

        </div>

        <div className="max-w-6xl mx-auto border-t border-[#382618] mt-10 pt-6 text-center text-xs text-[#8A7663]">
          © 2026 Cek-Gula Jajanan Pasar — Inovasi CC26-PSU007 • Coding Camp powered by DBS Foundation.
          <p className="mt-1 text-[11px] text-[#7A6451]">
            *Disclaimer: Informasi kandungan nutrisi dan estimasi gula bersifat edukatif dan bukan pengganti diagnosis medis resmi.
          </p>
        </div>
      </footer>

    </div>
  )
}

export default LandingPage
