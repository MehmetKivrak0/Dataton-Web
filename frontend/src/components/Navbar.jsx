import { useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Teams", href: "#teams" },
  { label: "Scoreboard", href: "#scoreboard" },
  { label: "Challenges", href: "#challenges" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50">
      <div className="relative overflow-hidden shadow-[0_6px_30px_rgba(6,182,212,0.35)] border-b border-cyan-400/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_55%)] opacity-60" />
        <div className="bg-gradient-to-r from-[#01263f] via-[#023f5b] to-[#036a85] text-cyan-100">
          <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-[11px] sm:text-sm font-semibold tracking-[0.2em] py-2">
            <span className="flex items-center gap-2 text-cyan-200">
              <span className="h-2 w-2 rounded-full bg-cyan-300 animate-pulse" />
              Kuvars Kalkanı Datatonu 31 Aralık 2025&apos;te başlıyor
            </span>
            <Button
              asChild
              size="sm"
              className="bg-cyan-100 text-[#01263f] hover:bg-cyan-200/90 px-5 py-1 h-7 text-[11px] rounded-full shadow-[0_0_18px_rgba(6,182,212,0.45)]"
            >
              <a href="#teams">Kayıt Ol</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-cyber-dark/80 backdrop-blur border-b border-cyber-dark-secondary">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyber-cyan to-cyber-purple flex items-center justify-center font-orbitron text-lg font-bold">
              D
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Dataton</p>
              <p className="text-lg font-semibold text-white">Siber Müdahale</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navItems.map(item => (
              <a key={item.href} href={item.href} className="text-muted-foreground hover:text-white transition-colors">
                {item.label}
              </a>
            ))}
          </nav>

          <button
            className="md:hidden text-white"
            onClick={() => setOpen(prev => !prev)}
            aria-label="menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden border-t border-cyber-dark-secondary bg-cyber-dark transition-all duration-300",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        <div className="flex flex-col px-4 py-4 gap-4">
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-white transition-colors"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}

