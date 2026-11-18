import { FaUtensilSpoon } from 'react-icons/fa'

// 1. Klepon
export function KleponSvg({ className = 'w-10 h-10', size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Alas daun kecil */}
      <ellipse cx="32" cy="50" rx="22" ry="8" fill="#2E6B34" opacity="0.3" />
      {/* Bola pandan */}
      <circle cx="32" cy="34" r="22" fill="#4C8B3F" />
      <circle cx="29" cy="31" r="19" fill="#5EAA4D" />
      <ellipse cx="25" cy="22" rx="7" ry="4" fill="#88D476" opacity="0.5" />
      {/* Tetesan gula aren */}
      <path d="M26 36C26 36 28 42 32 42C36 42 38 36 38 36" stroke="#5A3314" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="45" r="2" fill="#7A4A21" />
      {/* Parutan kelapa gurih */}
      <rect x="22" y="24" width="4" height="2" rx="1" fill="#FFFFFF" transform="rotate(25 22 24)" />
      <rect x="36" y="22" width="4" height="2" rx="1" fill="#FFFFFF" transform="rotate(-30 36 22)" />
      <rect x="30" y="27" width="5" height="2" rx="1" fill="#FFFFFF" transform="rotate(10 30 27)" />
      <rect x="20" y="34" width="4" height="2" rx="1" fill="#FFFFFF" transform="rotate(-15 20 34)" />
      <rect x="42" y="32" width="5" height="2" rx="1" fill="#FFFFFF" transform="rotate(40 42 32)" />
      <rect x="34" y="37" width="4" height="2" rx="1" fill="#FFFFFF" transform="rotate(-45 34 37)" />
      <rect x="25" y="42" width="4" height="2" rx="1" fill="#FFFFFF" transform="rotate(20 25 42)" />
    </svg>
  )
}

// 2. Onde-Onde
export function OndeOndeSvg({ className = 'w-10 h-10', size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="52" rx="20" ry="7" fill="#7A4A21" opacity="0.2" />
      {/* Bola goreng keemasan */}
      <circle cx="32" cy="34" r="22" fill="#D48B38" />
      <circle cx="30" cy="32" r="19" fill="#E8A855" />
      <ellipse cx="25" cy="22" rx="7" ry="4" fill="#FAD18F" opacity="0.6" />
      {/* Biji wijen renyah */}
      <ellipse cx="22" cy="24" rx="2" ry="3.5" fill="#FFF9EB" transform="rotate(30 22 24)" />
      <ellipse cx="32" cy="20" rx="2" ry="3.5" fill="#FFF9EB" transform="rotate(-20 32 20)" />
      <ellipse cx="40" cy="26" rx="2" ry="3.5" fill="#FFF9EB" transform="rotate(45 40 26)" />
      <ellipse cx="20" cy="35" rx="2" ry="3.5" fill="#FFF9EB" transform="rotate(-35 20 35)" />
      <ellipse cx="30" cy="32" rx="2" ry="3.5" fill="#FFF9EB" transform="rotate(15 30 32)" />
      <ellipse cx="42" cy="36" rx="2" ry="3.5" fill="#FFF9EB" transform="rotate(-15 42 36)" />
      <ellipse cx="26" cy="44" rx="2" ry="3.5" fill="#FFF9EB" transform="rotate(40 26 44)" />
      <ellipse cx="36" cy="42" rx="2" ry="3.5" fill="#FFF9EB" transform="rotate(-25 36 42)" />
      <ellipse cx="16" cy="28" rx="1.8" ry="3" fill="#FFF9EB" transform="rotate(10 16 28)" />
      <ellipse cx="46" cy="30" rx="1.8" ry="3" fill="#FFF9EB" transform="rotate(-40 46 30)" />
    </svg>
  )
}

// 3. Kue Lapis Pelangi
export function KueLapisSvg({ className = 'w-10 h-10', size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="54" rx="22" ry="6" fill="#7A4A21" opacity="0.2" />
      {/* Potongan kue lapis kenyal */}
      <g transform="rotate(-5 32 32)">
        {/* Layer 1 - Merah Muda */}
        <rect x="14" y="16" width="36" height="7" rx="3" fill="#E64A72" />
        {/* Layer 2 - Putih Gurih Santan */}
        <rect x="14" y="23" width="36" height="7" fill="#FFF8EC" />
        {/* Layer 3 - Hijau Pandan */}
        <rect x="14" y="30" width="36" height="7" fill="#43A047" />
        {/* Layer 4 - Putih Santan */}
        <rect x="14" y="37" width="36" height="7" fill="#FFF8EC" />
        {/* Layer 5 - Ungu Ubi */}
        <rect x="14" y="44" width="36" height="7" rx="3" fill="#8E44AD" />
        {/* Kilap transparan kenyal */}
        <path d="M16 18H48" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      </g>
    </svg>
  )
}

// 4. Dadar Gulung
export function DadarGulungSvg({ className = 'w-10 h-10', size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="52" rx="24" ry="7" fill="#7A4A21" opacity="0.2" />
      {/* Gulungan pandan */}
      <rect x="12" y="24" width="40" height="20" rx="10" fill="#387A3E" />
      <rect x="13" y="25" width="38" height="18" rx="9" fill="#4CAF50" />
      {/* Pori-pori dadar khas */}
      <circle cx="20" cy="30" r="1.5" fill="#2E6B34" opacity="0.6" />
      <circle cx="28" cy="28" r="2" fill="#2E6B34" opacity="0.5" />
      <circle cx="36" cy="32" r="1.8" fill="#2E6B34" opacity="0.6" />
      <circle cx="44" cy="29" r="1.5" fill="#2E6B34" opacity="0.5" />
      <circle cx="24" cy="37" r="1.8" fill="#2E6B34" opacity="0.6" />
      <circle cx="32" cy="38" r="1.5" fill="#2E6B34" opacity="0.5" />
      <circle cx="40" cy="36" r="2" fill="#2E6B34" opacity="0.6" />
      {/* Inti kelapa gula merah nampak di ujung */}
      <ellipse cx="50" cy="34" rx="3" ry="7" fill="#7A4A21" />
      <ellipse cx="50" cy="34" rx="2" ry="5" fill="#9E5925" />
      <rect x="49" y="32" width="2" height="1" fill="#FFF8EC" />
      <rect x="50" y="35" width="2" height="1" fill="#FFF8EC" />
    </svg>
  )
}

// 5. Serabi Kuah Kinca
export function SerabiSvg({ className = 'w-10 h-10', size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Piring alas daun pisang */}
      <ellipse cx="32" cy="46" rx="26" ry="12" fill="#2E6B34" />
      <ellipse cx="32" cy="46" rx="24" ry="10" fill="#3D7E35" />
      <line x1="10" y1="46" x2="54" y2="46" stroke="#4C8B3F" strokeWidth="1" />
      {/* Serabi putih bersarang */}
      <ellipse cx="32" cy="36" rx="18" ry="11" fill="#F7F1E1" />
      <ellipse cx="32" cy="34" rx="16" ry="9" fill="#FFFDF8" />
      {/* Pori-pori serabi */}
      <circle cx="24" cy="32" r="1" fill="#D6C5A9" />
      <circle cx="28" cy="30" r="1.2" fill="#D6C5A9" />
      <circle cx="36" cy="31" r="1" fill="#D6C5A9" />
      <circle cx="38" cy="35" r="1.3" fill="#D6C5A9" />
      <circle cx="27" cy="36" r="1.1" fill="#D6C5A9" />
      {/* Kuah kinca gula aren meleleh */}
      <path d="M28 32C28 32 30 36 34 35C38 34 39 37 36 39C33 41 29 38 28 32Z" fill="#7A4A21" />
      <ellipse cx="33" cy="35" rx="4" ry="2.5" fill="#8C5325" />
      {/* Hiasan daun pandan kecil */}
      <path d="M38 24C38 24 43 27 40 31C37 29 38 24 38 24Z" fill="#2E6B34" />
    </svg>
  )
}

// 6. Getuk Lindri
export function GetukSvg({ className = 'w-10 h-10', size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="52" rx="22" ry="7" fill="#7A4A21" opacity="0.2" />
      {/* Tiga balok getuk bergelombang */}
      <rect x="14" y="32" width="10" height="16" rx="4" fill="#F48FB1" />
      <path d="M14 36H24M14 40H24M14 44H24" stroke="#D81B60" strokeWidth="0.8" opacity="0.4" />
      <rect x="27" y="28" width="10" height="20" rx="4" fill="#FDD835" />
      <path d="M27 33H37M27 38H37M27 43H37" stroke="#F57F17" strokeWidth="0.8" opacity="0.4" />
      <rect x="40" y="30" width="10" height="18" rx="4" fill="#81C784" />
      <path d="M40 35H50M40 40H50M40 44H50" stroke="#388E3C" strokeWidth="0.8" opacity="0.4" />
      {/* Taburan kelapa parut di atas */}
      <ellipse cx="32" cy="27" rx="14" ry="4" fill="#FFFFFF" opacity="0.9" />
      <rect x="22" y="24" width="4" height="1.5" rx="0.5" fill="#FFFFFF" transform="rotate(20 22 24)" />
      <rect x="34" y="25" width="4" height="1.5" rx="0.5" fill="#FFFFFF" transform="rotate(-30 34 25)" />
      <rect x="42" y="26" width="3" height="1.5" rx="0.5" fill="#FFFFFF" transform="rotate(15 42 26)" />
    </svg>
  )
}

// 7. Lemper Daun Pisang
export function LemperSvg({ className = 'w-10 h-10', size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="52" rx="22" ry="6" fill="#7A4A21" opacity="0.2" />
      {/* Bungkusan Daun Pisang Silinder */}
      <g transform="rotate(-8 32 32)">
        <rect x="14" y="22" width="36" height="20" rx="6" fill="#2E6B34" />
        <rect x="16" y="23" width="32" height="18" rx="5" fill="#3A7E3E" />
        {/* Serat daun */}
        <line x1="20" y1="23" x2="20" y2="41" stroke="#4C8B3F" strokeWidth="1" />
        <line x1="26" y1="23" x2="26" y2="41" stroke="#4C8B3F" strokeWidth="1" />
        <line x1="32" y1="23" x2="32" y2="41" stroke="#4C8B3F" strokeWidth="1" />
        <line x1="38" y1="23" x2="38" y2="41" stroke="#4C8B3F" strokeWidth="1" />
        <line x1="44" y1="23" x2="44" y2="41" stroke="#4C8B3F" strokeWidth="1" />
        {/* Ujung lidi sematan */}
        <line x1="12" y1="32" x2="16" y2="32" stroke="#B88E55" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="48" y1="32" x2="52" y2="32" stroke="#B88E55" strokeWidth="2.5" strokeLinecap="round" />
        {/* Terlihat ketan putih intip di ujung */}
        <ellipse cx="14" cy="32" rx="2" ry="5" fill="#FFFDF8" />
        <ellipse cx="50" cy="32" rx="2" ry="5" fill="#FFFDF8" />
      </g>
    </svg>
  )
}

// 8. Es Cendol / Dawet Segar
export function EsCendolSvg({ className = 'w-10 h-10', size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="58" rx="14" ry="4" fill="#7A4A21" opacity="0.2" />
      {/* Sedotan merah putih */}
      <path d="M38 10L32 30" stroke="#E64A72" strokeWidth="3" strokeLinecap="round" />
      <path d="M38 10L32 30" stroke="#FFF" strokeWidth="3" strokeDasharray="3 3" strokeLinecap="round" />
      {/* Gelas Kaca */}
      <path d="M20 22L24 54H40L44 22H20Z" fill="#F4EAE0" fillOpacity="0.3" stroke="#D0BFAB" strokeWidth="1.5" />
      {/* Lapisan Gula Merah di dasar */}
      <path d="M23.5 48L24 54H40L40.5 48C38 49 26 49 23.5 48Z" fill="#7A4A21" />
      {/* Butiran Cendol Hijau di santan */}
      <rect x="22" y="32" width="20" height="17" fill="#FDF7EA" />
      {/* Cendol */}
      <ellipse cx="28" cy="40" rx="3.5" ry="1.5" fill="#43A047" transform="rotate(-15 28 40)" />
      <ellipse cx="34" cy="37" rx="3" ry="1.5" fill="#43A047" transform="rotate(20 34 37)" />
      <ellipse cx="31" cy="45" rx="3.5" ry="1.5" fill="#43A047" transform="rotate(-10 31 45)" />
      <ellipse cx="37" cy="43" rx="3" ry="1.5" fill="#43A047" transform="rotate(30 37 43)" />
      <ellipse cx="26" cy="46" rx="2.5" ry="1.5" fill="#43A047" />
      {/* Es Batu terapung */}
      <rect x="25" y="24" width="7" height="6" rx="1.5" fill="#FFFFFF" fillOpacity="0.8" stroke="#B3E5FC" strokeWidth="0.8" />
      <rect x="33" y="26" width="6" height="5" rx="1.5" fill="#FFFFFF" fillOpacity="0.8" stroke="#B3E5FC" strokeWidth="0.8" />
      {/* Kilau gelas */}
      <line x1="22" y1="24" x2="25" y2="50" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    </svg>
  )
}

// 9. Tampah Hero (Tampah Bambu Berisi Aneka Jajanan Pasar)
export function TampahHeroSvg({ className = 'w-72 h-72', size = 280 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Bayangan halus tampah */}
      <ellipse cx="100" cy="170" rx="85" ry="22" fill="#7A4A21" opacity="0.18" />
      
      {/* Bingkai Luar Anyaman Tampah Bambu */}
      <circle cx="100" cy="100" r="92" fill="#E2B77B" stroke="#6E3E18" strokeWidth="5" />
      <circle cx="100" cy="100" r="86" fill="#C59352" stroke="#8C5325" strokeWidth="2.5" strokeDasharray="5 3" />
      <circle cx="100" cy="100" r="82" fill="#B07C3D" />

      {/* Alas Daun Pisang Segar */}
      <circle cx="100" cy="100" r="78" fill="#2E6B34" />
      <circle cx="100" cy="100" r="74" fill="#3E8344" />
      {/* Urat Daun Pisang Melintang */}
      <path d="M26 100H174" stroke="#5EAA65" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M42 65L158 135" stroke="#5EAA65" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M42 135L158 65" stroke="#5EAA65" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M65 42L135 158" stroke="#5EAA65" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <path d="M135 42L65 158" stroke="#5EAA65" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />

      {/* 1. Klepon Pandan Gurih (Tengah Kiri) */}
      <g transform="translate(48, 80)">
        <circle cx="18" cy="18" r="16" fill="#439A36" />
        <circle cx="15" cy="15" r="13" fill="#58B849" />
        <circle cx="10" cy="12" r="1.3" fill="#FFF" />
        <circle cx="16" cy="10" r="1.5" fill="#FFF" />
        <circle cx="22" cy="15" r="1.2" fill="#FFF" />
        <circle cx="14" cy="22" r="1.4" fill="#FFF" />
        <circle cx="19" cy="20" r="1.1" fill="#FFF" />
      </g>
      
      {/* Klepon ke-2 di sebelahnya */}
      <g transform="translate(68, 98)">
        <circle cx="14" cy="14" r="13" fill="#3B892F" />
        <circle cx="12" cy="12" r="10" fill="#4CAF50" />
        <circle cx="9" cy="9" r="1.1" fill="#FFF" />
        <circle cx="15" cy="13" r="1.2" fill="#FFF" />
      </g>

      {/* 2. Kue Lapis Pelangi Kenyal (Kanan Atas) */}
      <g transform="translate(108, 48) rotate(15)">
        <rect x="0" y="0" width="34" height="6" rx="2" fill="#E64A72" />
        <rect x="0" y="6" width="34" height="6" fill="#FFF9ED" />
        <rect x="0" y="12" width="34" height="6" fill="#43A047" />
        <rect x="0" y="18" width="34" height="6" fill="#FFF9ED" />
        <rect x="0" y="24" width="34" height="6" rx="2" fill="#8E44AD" />
      </g>

      {/* 3. Onde-onde Wijen Gurih (Kiri Atas) */}
      <g transform="translate(60, 44)">
        <circle cx="16" cy="16" r="15" fill="#C57E2F" />
        <circle cx="14" cy="14" r="13" fill="#E29E4D" />
        <ellipse cx="10" cy="10" rx="1.5" ry="2.5" fill="#FFF" transform="rotate(25 10 10)" />
        <ellipse cx="18" cy="8" rx="1.5" ry="2.5" fill="#FFF" transform="rotate(-30 18 8)" />
        <ellipse cx="22" cy="15" rx="1.5" ry="2.5" fill="#FFF" transform="rotate(40 22 15)" />
        <ellipse cx="12" cy="19" rx="1.5" ry="2.5" fill="#FFF" transform="rotate(-20 12 19)" />
        <ellipse cx="18" cy="21" rx="1.5" ry="2.5" fill="#FFF" transform="rotate(15 18 21)" />
      </g>

      {/* 4. Dadar Gulung Pandan (Tengah Kanan) */}
      <g transform="translate(102, 92) rotate(-10)">
        <rect x="0" y="0" width="36" height="18" rx="9" fill="#3D8B43" />
        <circle cx="8" cy="6" r="1.5" fill="#2E6B34" opacity="0.6" />
        <circle cx="16" cy="12" r="1.5" fill="#2E6B34" opacity="0.6" />
        <circle cx="24" cy="5" r="1.5" fill="#2E6B34" opacity="0.6" />
        <ellipse cx="34" cy="9" rx="2" ry="6" fill="#6A3B14" />
      </g>

      {/* 5. Lemper Daun Pisang (Bawah Tengah) */}
      <g transform="translate(80, 126) rotate(6)">
        <rect x="0" y="0" width="38" height="18" rx="5" fill="#235428" />
        <line x1="8" y1="0" x2="8" y2="18" stroke="#3D7E35" strokeWidth="1.2" />
        <line x1="18" y1="0" x2="18" y2="18" stroke="#3D7E35" strokeWidth="1.2" />
        <line x1="28" y1="0" x2="28" y2="18" stroke="#3D7E35" strokeWidth="1.2" />
        <line x1="-3" y1="9" x2="1" y2="9" stroke="#C59352" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="37" y1="9" x2="41" y2="9" stroke="#C59352" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* 6. Mangkok Kinca Gula Jawa */}
      <g transform="translate(86, 74)">
        <ellipse cx="14" cy="18" rx="14" ry="7" fill="#7A4A21" opacity="0.3" />
        <circle cx="14" cy="14" r="11" fill="#FFF9EE" stroke="#D2B998" strokeWidth="1.5" />
        <circle cx="14" cy="14" r="8" fill="#6A3A13" />
        <ellipse cx="12" cy="12" rx="3" ry="1.5" fill="#9C5A27" />
      </g>
    </svg>
  )
}

// 10. Divider Batik Tradisional Minimalis
export function BatikDivider({ className = 'w-full my-8' }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#D8C2A4] to-[#B5451B]/40" />
      <svg width="60" height="24" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 text-[#7A4A21]">
        <ellipse cx="30" cy="12" rx="8" ry="4" fill="#F2B134" opacity="0.4" />
        <ellipse cx="30" cy="12" rx="4" ry="8" fill="#4C8B3F" opacity="0.4" />
        <circle cx="30" cy="12" r="3.5" fill="#7A4A21" />
        <circle cx="14" cy="12" r="2.5" fill="#B5451B" />
        <circle cx="46" cy="12" r="2.5" fill="#B5451B" />
        <circle cx="4" cy="12" r="1.5" fill="#4C8B3F" />
        <circle cx="56" cy="12" r="1.5" fill="#4C8B3F" />
      </svg>
      <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-[#D8C2A4] to-[#B5451B]/40" />
    </div>
  )
}

// 11. Kukusan Bambu Tradisional (Loading state)
export function KukusanLoadingSvg({ className = 'w-16 h-16' }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <div className="absolute -top-6 flex gap-1 animate-steam">
        <span className="w-1.5 h-4 bg-[#7A4A21]/30 rounded-full blur-[1px]"></span>
        <span className="w-2 h-6 bg-[#7A4A21]/40 rounded-full blur-[1px]"></span>
        <span className="w-1.5 h-4 bg-[#7A4A21]/30 rounded-full blur-[1px]"></span>
      </div>
      
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 48L24 16H40L52 48H12Z" fill="#D8A868" stroke="#7A4A21" strokeWidth="2.5" />
        <line x1="20" y1="26" x2="44" y2="26" stroke="#9A6231" strokeWidth="1.5" />
        <line x1="16" y1="36" x2="48" y2="36" stroke="#9A6231" strokeWidth="1.5" />
        <line x1="13" y1="44" x2="51" y2="44" stroke="#9A6231" strokeWidth="1.5" />
        <line x1="32" y1="16" x2="32" y2="48" stroke="#9A6231" strokeWidth="1.5" strokeDasharray="3 2" />
        <ellipse cx="32" cy="48" rx="20" ry="4" fill="#B07C3D" stroke="#7A4A21" strokeWidth="2" />
      </svg>
    </div>
  )
}

// 12. Sendok Gula Visualizer
export function SendokGulaSvg({ sendok = 1, gram = 5 }) {
  const jumlahSendok = Math.min(Math.max(Math.round(sendok * 10) / 10, 0), 10)
  const bulatList = Array.from({ length: Math.min(Math.ceil(jumlahSendok), 6) }, (_, i) => i)

  return (
    <div className="bg-[#FFF9EC] border-2 border-[#EAD5BC] rounded-2xl p-4 my-3 text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="text-lg text-[#8C4318] inline-flex items-center">
          <FaUtensilSpoon />
        </span>
        <span className="font-display font-bold text-[#7A4A21] text-base">
          Setara ± {sendok.toFixed(1)} Sendok Teh ({gram.toFixed(1)}g Gula)
        </span>
      </div>
      
      <div className="flex items-center justify-center gap-2 flex-wrap my-2">
        {bulatList.map((i) => (
          <div key={i} className="flex flex-col items-center">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M6 18C6 14 12 14 16 16L30 30L28 32L14 18C12 19 6 22 6 18Z" fill="#B0BEC5" />
              <ellipse cx="11" cy="16" rx="6" ry="3.5" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="0.8" />
              <circle cx="9" cy="15" r="0.8" fill="#FFF9C4" />
              <circle cx="12" cy="15" r="0.7" fill="#FFF9C4" />
              <circle cx="11" cy="17" r="0.6" fill="#FFF9C4" />
            </svg>
            <span className="text-[10px] text-[#745F4B] font-semibold">1 sdt</span>
          </div>
        ))}
      </div>
      
      <p className="text-xs text-[#745F4B] mt-1">
        (1 sendok teh gula pasir rata-rata setara 4 — 5 gram)
      </p>
    </div>
  )
}

// 13. Ornamen Sudut Daun Pisang
export function DaunPisangCorner({ position = 'top-right' }) {
  const isLeft = position.includes('left')
  return (
    <div className={`absolute ${isLeft ? 'top-0 left-0 -scale-x-100' : 'top-0 right-0'} pointer-events-none w-16 h-16 overflow-hidden rounded-tr-2xl`}>
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="opacity-90">
        <path d="M64 0C40 0 20 20 0 64C40 50 64 25 64 0Z" fill="#387A3E" />
        <path d="M64 0C45 5 30 25 15 55" stroke="#5EAA4D" strokeWidth="1.5" />
        <path d="M55 5C45 15 40 25 35 40" stroke="#5EAA4D" strokeWidth="1" opacity="0.6" />
      </svg>
    </div>
  )
}
