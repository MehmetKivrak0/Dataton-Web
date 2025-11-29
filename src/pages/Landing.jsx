import { motion } from "framer-motion"
import { Award, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CountdownTimer } from "@/components/CountdownTimer"

const rewards = [
  { place: "1.", title: "Büyük Ödül", prize: "50.000₺ + WNYN özel paketi" },
  { place: "2.", title: "Siber Savunma Kiti", prize: "25.000₺ + Mentorluk" },
  { place: "3.", title: "Operasyon Bonus", prize: "10.000₺ + VIP erişim" },
]

const juryMembers = [
  { name: "Dr. Mira Yılmaz", title: "WNYN Siber Güvenlik Direktörü" },
  { name: "Prof. Levent Aksoy", title: "Zaman Senkronizasyon Uzmanı" },
  { name: "Ada Korkmaz", title: "CTF Lead - Siber Müdahale Ekibi" },
]

const sponsors = ["WNYN Global", "Nova Cyber Labs", "ChronoTech", "ZeroDay Hub"]

const maker = {
  name: "Mehmet \"Cipher\" Arslan",
  role: "Platform Mühendisi & Creative Technologist",
  bio: "CTF ve Datathon ekosisteminde 8+ yıl tecrübeli, gerçek zamanlı yarışma platformları uzmanı.",
  social: [
    { label: "GitHub", href: "https://github.com/", icon: Github },
    { label: "LinkedIn", href: "https://linkedin.com/", icon: Linkedin },
  ],
}

const skylineBars = [
  { height: "h-28", width: "w-4", glow: "via-[#DC143C]" },
  { height: "h-36", width: "w-6", glow: "via-[#FFFFFF]" },
  { height: "h-40", width: "w-5", glow: "via-[#DC143C]" },
  { height: "h-24", width: "w-4", glow: "via-[#FFFFFF]" },
  { height: "h-48", width: "w-6", glow: "via-[#DC143C]" },
  { height: "h-32", width: "w-5", glow: "via-[#FFFFFF]" },
  { height: "h-44", width: "w-4", glow: "via-[#DC143C]" },
  { height: "h-[7.5rem]", width: "w-4", glow: "via-[#FFFFFF]" },
  { height: "h-36", width: "w-6", glow: "via-[#DC143C]" },
  { height: "h-[6.5rem]", width: "w-3", glow: "via-[#FFFFFF]" },
]


function SnowflakeSVG({ size, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ana çizgiler - 6 kollu kar tanesi */}
      {[0, 60, 120, 180, 240, 300].map((rotation, i) => (
        <g key={i} transform={`rotate(${rotation} 12 12)`}>
          <line
            x1="12"
            y1="2"
            x2="12"
            y2="8"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <line
            x1="12"
            y1="16"
            x2="12"
            y2="22"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
          {/* Yan dallar */}
          <line
            x1="12"
            y1="8"
            x2="8"
            y2="12"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          <line
            x1="12"
            y1="8"
            x2="16"
            y2="12"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </g>
      ))}
      {/* Merkez nokta */}
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  )
}

function WinterSnowfall() {
  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden pointer-events-none z-0">
      {/* Büyük kar taneleri - gerçek kar tanesi şekilleri */}
      {Array.from({ length: 20 }).map((_, i) => {
        const size = Math.random() * 8 + 6
        const left = Math.random() * 100
        const duration = Math.random() * 10 + 15
        const delay = Math.random() * 5
        const drift = Math.random() * 60 - 30
        
        return (
          <motion.div
            key={`snowflake-large-${i}`}
            className="absolute"
            style={{
              left: `${left}%`,
              top: '-10px',
            }}
            initial={{ y: -10, opacity: 0, rotate: 0 }}
            animate={{
              y: ['-10px', '150vh'],
              x: [0, `${drift}px`, `${drift * 1.5}px`],
              opacity: [0, 0.9, 0.9, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: 'linear',
            }}
          >
            <SnowflakeSVG 
              size={size} 
              className="text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]" 
            />
          </motion.div>
        )
      })}

      {/* Orta boy kar taneleri */}
      {Array.from({ length: 30 }).map((_, i) => {
        const size = Math.random() * 5 + 3
        const left = Math.random() * 100
        const duration = Math.random() * 8 + 10
        const delay = Math.random() * 4
        const drift = Math.random() * 40 - 20
        
        return (
          <motion.div
            key={`snowflake-medium-${i}`}
            className="absolute"
            style={{
              left: `${left}%`,
              top: '-5px',
            }}
            initial={{ y: -5, opacity: 0, rotate: 0 }}
            animate={{
              y: ['-5px', '150vh'],
              x: [0, `${drift}px`],
              opacity: [0, 0.8, 0.8, 0],
              rotate: [0, -360],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: 'linear',
            }}
          >
            <SnowflakeSVG 
              size={size} 
              className="text-ny-red-light drop-shadow-[0_0_3px_rgba(220,20,60,0.6)]" 
            />
          </motion.div>
        )
      })}

      {/* Orta boy kar taneleri */}
      {Array.from({ length: 25 }).map((_, i) => {
        const size = Math.random() * 3 + 2
        const left = Math.random() * 100
        const duration = Math.random() * 8 + 10
        const delay = Math.random() * 4
        const drift = Math.random() * 40 - 20
        
        return (
          <motion.div
            key={`snowflake-medium-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: '-5px',
              width: `${size}px`,
              height: `${size}px`,
              background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(200,230,255,0.6) 100%)',
              boxShadow: '0 0 6px rgba(255,255,255,0.4)',
            }}
            initial={{ y: -5, opacity: 0 }}
            animate={{
              y: ['-5px', '110vh'],
              x: [0, `${drift}px`],
              opacity: [0, 0.7, 0.7, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: 'linear',
            }}
          />
        )
      })}

      {/* Küçük kar taneleri - arka plan */}
      {Array.from({ length: 50 }).map((_, i) => {
        const size = Math.random() * 3 + 2
        const left = Math.random() * 100
        const duration = Math.random() * 6 + 8
        const delay = Math.random() * 3
        const drift = Math.random() * 30 - 15
        
        return (
          <motion.div
            key={`snowflake-small-${i}`}
            className="absolute"
            style={{
              left: `${left}%`,
              top: '-3px',
            }}
            initial={{ y: -3, opacity: 0, rotate: 0 }}
            animate={{
              y: ['-3px', '150vh'],
              x: [0, `${drift}px`],
              opacity: [0, 0.6, 0.6, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: 'linear',
            }}
          >
            <SnowflakeSVG 
              size={size} 
              className="text-white/70 drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]" 
            />
          </motion.div>
        )
      })}
    </div>
  )
}

function SnowFlakesLayer({ density = 30, sizeRange = [0.8, 2], drift = 2, className }) {
  return (
    <div className={`pointer-events-none fixed inset-0 w-full h-screen ${className ?? ""}`}>
      {Array.from({ length: density }).map((_, idx) => {
        const size = Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0]
        const duration = Math.random() * 6 + 6
        const delay = Math.random() * 4
        const left = Math.random() * 100
        const blur = Math.random() * 2
        const opacity = Math.random() * 0.6 + 0.25

        return (
          <motion.span
            key={`flake-${className}-${idx}`}
            className="absolute rounded-full bg-white"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              filter: `blur(${blur}px)`,
              opacity,
            }}
            initial={{ y: -20, scale: 0.8 }}
            animate={{ y: ["-5%", "105%"], x: ["0%", `${Math.random() * drift - drift / 2}%`] }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "linear",
            }}
          />
        )
      })}
    </div>
  )
}

export default function Landing() {
  const targetDate = new Date("2025-12-31T21:00:00").getTime()

  return (
    <div className="relative min-h-screen bg-[#01040c] text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(220,20,60,0.2),rgba(15,23,42,0.4),rgba(255,255,255,0.1))]" />
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-20 mix-blend-screen">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:30px_30px]" />
        <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle,rgba(220,20,60,0.15)_1px,transparent_1px)] bg-[length:120px_120px]" />
      </div>
      <main className="relative">
        <section className="relative overflow-hidden bg-gradient-to-b from-[#000112] via-[#030313] to-[#020107]">
          <div className="absolute inset-0">
            <div className="absolute inset-0 opacity-30 bg-[linear-gradient(160deg,rgba(220,20,60,0.15),transparent),linear-gradient(20deg,rgba(255,255,255,0.1),transparent)] blur-3xl" />
          </div>
          <div className="absolute inset-0 pointer-events-none">
            <WinterSnowfall />
            <SnowFlakesLayer density={25} sizeRange={[0.8, 1.8]} className="opacity-70" />
            <SnowFlakesLayer density={12} sizeRange={[1.6, 3]} className="opacity-40" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 md:gap-4 w-[120%] max-w-5xl">
              {skylineBars.map((bar, idx) => (
                <div
                  key={`skyline-${idx}`}
                  className={`relative ${bar.width} ${bar.height} rounded-t-sm bg-gradient-to-t from-black ${bar.glow} to-white/30 shadow-[0_0_25px_rgba(220,20,60,0.35)]`}
                >
                  <span className="absolute inset-x-1 bottom-2 h-1 rounded-full bg-white/30" />
                </div>
              ))}
            </div>
          </div>
          <div className="container mx-auto px-4 py-24 relative space-y-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center space-y-6"
            >
              <div className="inline-flex items-center gap-3 rounded-full border border-ny-red/40 bg-gradient-to-r from-ny-red/20 via-white/10 to-ny-red/20 px-6 py-2 text-xs sm:text-sm uppercase tracking-[0.5em] text-white glow-white-text">
                <span>Dataton 2025</span>
                <span className="h-1 w-1 rounded-full bg-ny-red animate-pulse" />
                <span>Yeni Yıl Ateşlemesi</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-orbitron font-bold leading-tight">
                <span className="text-white glow-white-text">KUVARS KALKANI</span> OPERASYONU
                <span className="block text-2xl md:text-3xl text-muted-foreground mt-4">
                  İstanbul silüetinin üzerinde parlayacak yılbaşı ateşlemesini korumak için son geri sayım.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                50+ elit ekip, gece yarısı 00:00:00&apos;da başlayacak küresel kutlamayı siber saldırılara karşı korumak için CTF + Datathon görevlerini eş zamanlı tamamlıyor.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="px-10 text-base bg-gradient-to-r from-ny-red to-ny-red-light text-white font-bold glow-red hover:from-ny-red-light hover:to-ny-red transition-all duration-300 animate-pulse">
                  Yeni Yıl Ekibimi Kaydet
                </Button>
                <Button variant="outline" size="lg" className="px-10 text-base border-white text-white hover:bg-white hover:text-ny-red glow-white">
                  Operasyon Manifestosu
                </Button>
              </div>
            </motion.div>

            {/* Sponsor Logoları - Üst Kısım - Yatay Animasyonlu */}
            <div className="mt-12 rounded-[34px] border border-white/20 bg-gradient-to-br from-ny-red/10 via-black/30 to-white/5 p-6 backdrop-blur-lg overflow-hidden">
              <div className="text-center mb-6">
                <p className="text-sm uppercase tracking-[0.6em] text-white">Sponsorlar</p>
                <h2 className="text-xl font-orbitron text-white mt-2">Görev Destekçileri</h2>
              </div>
              <div className="relative overflow-hidden">
                <div className="flex gap-8 animate-scroll will-change-transform">
                  {/* İlk set - normal */}
                  {sponsors.map((sponsor, idx) => (
                    <div
                      key={`sponsor-top-1-${idx}`}
                      className="flex-shrink-0 h-20 w-40 border border-white/20 rounded-xl bg-black/40 backdrop-blur flex items-center justify-center px-4 hover:border-ny-red/50 transition-all hover:scale-105"
                    >
                      <span className="text-white font-semibold text-base tracking-wider">{sponsor}</span>
                    </div>
                  ))}
                  {/* İkinci set - animasyon için tekrar */}
                  {sponsors.map((sponsor, idx) => (
                    <div
                      key={`sponsor-top-2-${idx}`}
                      className="flex-shrink-0 h-20 w-40 border border-white/20 rounded-xl bg-black/40 backdrop-blur flex items-center justify-center px-4 hover:border-ny-red/50 transition-all hover:scale-105"
                    >
                      <span className="text-white font-semibold text-base tracking-wider">{sponsor}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-16 relative z-10" id="scoreboard">
              <h2 className="text-center font-orbitron text-lg text-muted-foreground tracking-[0.6em] mb-6">
                Yeni Yıl Geri Sayımı
              </h2>
              <div className="relative max-w-3xl mx-auto">
                <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-ny-red/40 via-white/20 to-ny-red/40 opacity-80" />
                <div className="relative rounded-[36px] border border-white/40 bg-gradient-to-br from-ny-red/20 via-black/40 to-white/10 p-1 shadow-[0_0_35px_rgba(220,20,60,0.5),0_0_60px_rgba(255,255,255,0.3)]">
                  <div className="rounded-[30px] border border-white/20 bg-black/70 px-8 py-10 space-y-6">
                    <p className="text-sm uppercase tracking-[0.5em] text-white">00:00:00&apos;A KALAN SÜRE</p>
                    <CountdownTimer targetDate={targetDate} />
                    <p className="text-base text-muted-foreground">
                      Timer sıfırlandığında, şehir silüeti üzerinde koruyucu neon kalkan tetiklenecek ve yılbaşı havai fişekleri güvenli modda ateşlenecek.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {rewards.map((reward, idx) => (
                  <Card key={reward.place} className="border-white/30 bg-gradient-to-br from-black/50 to-black/30">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="text-sm uppercase tracking-[0.4em] text-white">
                          {reward.place} SIRALI
                        </div>
                        <Award className="text-ny-red glow-red-text" />
                      </div>
                      <CardTitle className="text-2xl text-white">{reward.title}</CardTitle>
                      <CardDescription className="text-ny-red-light text-base font-semibold">{reward.prize}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Finale kalan ilk üç ekip, WNYN yönetim kurulu tarafından özel olarak ödüllendirilecek.
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div
              id="teams"
              className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center rounded-[34px] border border-white/20 bg-gradient-to-br from-ny-red/10 via-black/30 to-white/5 p-8 backdrop-blur-lg"
            >
              <div className="space-y-6">
                <p className="text-sm uppercase tracking-[0.6em] text-white">
                  Görev Tanımı
                </p>
                <h2 className="text-3xl md:text-4xl font-orbitron text-white leading-tight">
                  TEMPUS çekirdeğini senkronize et, 00:00:00&apos;da başlayacak yılbaşı operasyonunu koru.
                </h2>
                <p className="text-lg text-muted-foreground">
                  Web, stego, kripto ve veri görevleri tek şerit üzerinde ilerliyor. Her flag yeni veri setini açıyor; her veri satırı İstanbul silüetini ışıklandıran kalkanı besliyor.
                </p>
                <div className="grid gap-4 sm:grid-cols-3">
                  {["CTF Sprintleri", "Datathon Akışı", "Canlı Leaderboard"].map((item, idx) => (
                    <div key={item} className="rounded-2xl border border-white/20 bg-gradient-to-br from-ny-red/10 via-black/30 to-white/5 p-4 shadow-inner shadow-ny-red/10">
                      <p className="text-xs uppercase tracking-[0.4em] text-white">Mod {idx + 1}</p>
                      <p className="text-lg font-semibold text-white mt-2">{item}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {idx === 0 && "Gölge'nin geride bıraktığı parazitli portalları sök."}
                        {idx === 1 && "Bozuk zaman serilerini temizle, koridoru verilerle güçlendir."}
                        {idx === 2 && "CrewCTF tarzı tek sayfalık scoreboard enerjisi."}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-white/30 bg-gradient-to-br from-ny-red/15 via-black/50 to-white/10 p-8 shadow-[0_10px_60px_rgba(220,20,60,0.3)]">
                <p className="text-sm uppercase tracking-[0.5em] text-white">Hızlı Bilgiler</p>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Takvim</span>
                    <span className="font-semibold text-white">31 Aralık 2025, 00:00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Konsept</span>
                    <span className="font-semibold text-white">Kuvars Kalkanı Operasyonu</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Format</span>
                    <span className="font-semibold text-ny-red">CTF + Datathon</span>
                  </div>
                </div>
                <div className="mt-8 text-sm text-muted-foreground">
                  CrewCTF 2025&apos;in blok yerleşimi ve tek sayfa enerjisinden ilham alan ({` `}
                  <a href="https://2025.crewc.tf/" className="text-ny-red underline hover:text-ny-red-light transition-colors" target="_blank" rel="noreferrer">
                    crewctf
                  </a>
                  ) dijital neon katmanları burada yılbaşı atmosferine uyarladı.
                </div>
              </div>
            </div>

            <div className="space-y-12 rounded-[34px] border border-white/20 bg-gradient-to-br from-ny-red/10 via-black/30 to-white/5 p-8 backdrop-blur-lg">
              <div className="text-center">
                <p className="text-sm uppercase tracking-[0.6em] text-white">Jüri</p>
                <h2 className="text-3xl font-orbitron text-white mt-3">Operasyon Konseyi</h2>
              </div>
              <div className="grid gap-8 md:grid-cols-3">
                {juryMembers.map(member => (
                  <Card key={member.name} className="border-white/20 bg-black/40 text-center backdrop-blur-md">
                    <CardHeader>
                      <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-ny-red to-white flex items-center justify-center text-2xl font-bold text-white shadow-[0_0_20px_rgba(220,20,60,0.6)]">
                        {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <CardTitle className="mt-4 text-white">{member.name}</CardTitle>
                      <CardDescription className="text-muted-foreground">{member.title}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            <div className="rounded-[34px] border border-white/30 bg-black/40 p-10 text-center backdrop-blur-lg">
              <p className="text-sm uppercase tracking-[0.6em] text-white">Platform Tasarımcısı</p>
              <h2 className="text-3xl font-orbitron text-white mt-3">{maker.name}</h2>
              <p className="text-lg text-ny-red mt-2 glow-red-text">{maker.role}</p>
              <p className="text-muted-foreground mt-4">{maker.bio}</p>
              <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
                {maker.social.map(item => (
                  <Button key={item.label} variant="outline" className="flex items-center gap-2 border-white text-white hover:bg-white hover:text-ny-red transition-all" asChild>
                    <a href={item.href} target="_blank" rel="noreferrer">
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {/* Sponsor Logoları - Yatay Animasyonlu */}
            <div className="mt-12 rounded-[34px] border border-white/20 bg-gradient-to-br from-ny-red/10 via-black/30 to-white/5 p-8 backdrop-blur-lg overflow-hidden">
              <div className="text-center mb-8">
                <p className="text-sm uppercase tracking-[0.6em] text-white">Sponsorlar</p>
                <h2 className="text-2xl font-orbitron text-white mt-2">Görev Destekçileri</h2>
              </div>
              <div className="relative overflow-hidden">
                <div className="flex gap-8 animate-scroll will-change-transform">
                  {/* İlk set - normal */}
                  {sponsors.map((sponsor, idx) => (
                    <div
                      key={`sponsor-1-${idx}`}
                      className="flex-shrink-0 h-24 w-48 border border-white/20 rounded-xl bg-black/40 backdrop-blur flex items-center justify-center px-6 hover:border-ny-red/50 transition-all hover:scale-105"
                    >
                      <span className="text-white font-semibold text-lg tracking-wider">{sponsor}</span>
                    </div>
                  ))}
                  {/* İkinci set - animasyon için tekrar */}
                  {sponsors.map((sponsor, idx) => (
                    <div
                      key={`sponsor-2-${idx}`}
                      className="flex-shrink-0 h-24 w-48 border border-white/20 rounded-xl bg-black/40 backdrop-blur flex items-center justify-center px-6 hover:border-ny-red/50 transition-all hover:scale-105"
                    >
                      <span className="text-white font-semibold text-lg tracking-wider">{sponsor}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

