import { useState } from "react"
import { useLocation, Link } from "react-router-dom"
import { Menu, X, LogIn } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Challenges", href: "/challenges" },
  { label: "Teams", href: "/team" },
  { label: "Scoreboard", href: "/scoreboard" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  
  // Aktif sayfadaki nav item'ları filtrele
  const filteredNavItems = navItems.filter(item => {
    // Anchor link kontrolü (/#challenges gibi)
    if (item.href.startsWith('/#')) {
      // Landing sayfasındaysak challenges butonunu gösterme
      return location.pathname !== '/'
    }
    // Normal route kontrolü - aktif sayfadaki butonu gösterme
    return location.pathname !== item.href
  })

  return (
    <header className="sticky top-0 z-50">
      {/* Red Banner - Kayıt Ol */}
      <div className="relative overflow-hidden bg-[#01040c] border-b border-ny-red/30 shadow-[0_4px_20px_rgba(220,20,60,0.4)]">
        {/* Tam opak gradient katmanı - arkadaki içeriğin görünmesini engeller */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#DC143C] via-[#FF6B6B] to-[#DC143C]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_60%)] opacity-20" />
        <div className="relative container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs sm:text-sm font-semibold tracking-wide py-2.5 z-10">
          <span className="flex items-center gap-2 text-[#01040c] font-bold drop-shadow-[0_2px_4px_rgba(255,255,255,0.3)]">
            <span className="h-2 w-2 rounded-full bg-[#01040c] animate-pulse shadow-[0_0_8px_rgba(220,20,60,0.8)]" />
            Kuvars Kalkanı Datatonu 31 Aralık 2025&apos;te başlıyor
          </span>
          <Button
            asChild
            size="sm"
            className="bg-[#01040c] text-ny-red hover:bg-ny-red hover:text-[#01040c] border border-ny-red px-5 py-1.5 h-7 text-xs sm:text-sm rounded-full shadow-[0_0_18px_rgba(220,20,60,0.8)] font-bold transition-all duration-300"
          >
            <Link to="/auth/register">Kayıt Ol</Link>
          </Button>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="relative bg-[#01040c] border-b border-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-ny-red/3 to-transparent opacity-30" />
        
        <div className="relative container mx-auto px-4 lg:px-6">
          <div className="relative flex items-center justify-center h-16">
            {/* Left: Logo - Absolute positioning */}
            <div className="absolute left-4 lg:left-6 flex items-center flex-shrink-0">
              <Link to="/" className="text-white text-lg md:text-xl font-semibold tracking-tight hover:text-ny-red transition-colors">
                Dataton 2025
              </Link>
            </div>

            {/* Center: Navigation Links - Perfectly centered */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {filteredNavItems.map(item => (
                item.href.startsWith('/#') ? (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-muted-foreground hover:text-white transition-colors text-sm lg:text-base relative group"
                    onClick={(e) => {
                      e.preventDefault()
                      const hash = item.href.substring(1)
                      if (window.location.pathname !== '/') {
                        window.location.href = `/${hash}`
                      } else {
                        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-ny-red transition-all group-hover:w-full" />
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="text-muted-foreground hover:text-white transition-colors text-sm lg:text-base relative group"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-ny-red transition-all group-hover:w-full" />
                  </Link>
                )
              ))}
            </div>

            {/* Right: Login - Absolute positioning */}
            <div className="absolute right-4 lg:right-6 flex items-center gap-4">
              <Link
                to="/auth/login"
                className="flex items-center gap-2 text-white hover:text-ny-red transition-colors text-sm lg:text-base group"
              >
                <LogIn className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-0.5 transition-transform" />
                <span className="hidden sm:inline">Giriş Yap</span>
              </Link>
              
              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-white hover:text-ny-red transition-colors ml-2"
                onClick={() => setOpen(prev => !prev)}
                aria-label="menu"
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden border-t border-white/10 bg-[#01040c] backdrop-blur-md transition-all duration-300",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        <div className="flex flex-col px-4 py-4 gap-4">
          {filteredNavItems.map(item => (
            item.href.startsWith('/#') ? (
              <a
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-ny-red transition-colors py-2 border-b border-white/5 last:border-0"
                onClick={(e) => {
                  setOpen(false)
                  e.preventDefault()
                  const hash = item.href.substring(1)
                  if (window.location.pathname !== '/') {
                    window.location.href = `/${hash}`
                  } else {
                    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                to={item.href}
                className="text-muted-foreground hover:text-ny-red transition-colors py-2 border-b border-white/5 last:border-0"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            )
          ))}
        </div>
      </div>
    </header>
  )
}

