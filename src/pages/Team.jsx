import { useState, useMemo, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Örnek takım verileri - gerçek veriler API'den gelecek
// logo: takım logosu URL'i (opsiyonel, yoksa fallback avatar gösterilir)
const allTeams = [
  { rank: 1, name: "Neon Shadows", organization: "WNYN Global", createdAt: "2025-01-15", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=NeonShadows" },
  { rank: 2, name: "Cipher Squad", organization: "Nova Cyber Labs", createdAt: "2025-01-18", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=CipherSquad" },
  { rank: 3, name: "Tempus Guardians", organization: "ChronoTech", createdAt: "2025-01-20", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=TempusGuardians" },
  { rank: 4, name: "Quantum Defenders", organization: "ZeroDay Hub", createdAt: "2025-01-22", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=QuantumDefenders" },
  { rank: 5, name: "Cyber Phoenix", organization: "", createdAt: "2025-01-25", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=CyberPhoenix" },
  { rank: 6, name: "Data Warriors", organization: "ITU", createdAt: "2025-02-01", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=DataWarriors" },
  { rank: 7, name: "Flag Hunters", organization: "", createdAt: "2025-02-03", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=FlagHunters" },
  { rank: 8, name: "Code Breakers", organization: "Bogazici University", createdAt: "2025-02-05", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=CodeBreakers" },
  { rank: 9, name: "Signal Processors", organization: "", createdAt: "2025-02-07", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=SignalProcessors" },
  { rank: 10, name: "Kalkani Team", organization: "METU", createdAt: "2025-02-10", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=KalkaniTeam" },
  { rank: 11, name: "Midnight Hackers", organization: "", createdAt: "2025-02-12", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=MidnightHackers" },
  { rank: 12, name: "Neon Knights", organization: "Ankara University", createdAt: "2025-02-15", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=NeonKnights" },
  { rank: 13, name: "Crypto Masters", organization: "", createdAt: "2025-02-18", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=CryptoMasters" },
  { rank: 14, name: "Time Sync", organization: "Istanbul Tech", createdAt: "2025-02-20", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=TimeSync" },
  { rank: 15, name: "Shadow Operatives", organization: "", createdAt: "2025-02-22", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=ShadowOperatives" },
  { rank: 16, name: "Digital Ninjas", organization: "Yildiz Tech", createdAt: "2025-02-25", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=DigitalNinjas" },
  { rank: 17, name: "Byte Force", organization: "", createdAt: "2025-03-01", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=ByteForce" },
  { rank: 18, name: "Neural Network", organization: "Koc University", createdAt: "2025-03-03", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=NeuralNetwork" },
  { rank: 19, name: "Firewall Fighters", organization: "", createdAt: "2025-03-05", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=FirewallFighters" },
  { rank: 20, name: "Code Storm", organization: "Sabancı University", createdAt: "2025-03-08", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=CodeStorm" },
  { rank: 21, name: "Data Pirates", organization: "", createdAt: "2025-03-10", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=DataPirates" },
  { rank: 22, name: "Quantum Leap", organization: "ODTU", createdAt: "2025-03-12", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=QuantumLeap" },
  { rank: 23, name: "Cyber Wolves", organization: "", createdAt: "2025-03-15", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=CyberWolves" },
  { rank: 24, name: "Hack Masters", organization: "Istanbul University", createdAt: "2025-03-18", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=HackMasters" },
  { rank: 25, name: "Neon Pulse", organization: "", createdAt: "2025-03-20", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=NeonPulse" },
  { rank: 26, name: "Binary Heroes", organization: "Galatasaray University", createdAt: "2025-03-22", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=BinaryHeroes" },
  { rank: 27, name: "Code Warriors", organization: "", createdAt: "2025-03-25", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=CodeWarriors" },
  { rank: 28, name: "Digital Guardians", organization: "Bahcesehir University", createdAt: "2025-03-28", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=DigitalGuardians" },
  { rank: 29, name: "Cyber Elite", organization: "", createdAt: "2025-04-01", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=CyberElite" },
  { rank: 30, name: "Data Storm", organization: "Kadir Has University", createdAt: "2025-04-03", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=DataStorm" },
  { rank: 31, name: "Neon Riders", organization: "", createdAt: "2025-04-05", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=NeonRiders" },
  { rank: 32, name: "Code Breakers Pro", organization: "Acibadem University", createdAt: "2025-04-08", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=CodeBreakersPro" },
  { rank: 33, name: "Quantum Team", organization: "", createdAt: "2025-04-10", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=QuantumTeam" },
  { rank: 34, name: "Cyber Force", organization: "Istanbul Medipol", createdAt: "2025-04-12", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=CyberForce" },
  { rank: 35, name: "Data Hunters", organization: "", createdAt: "2025-04-15", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=DataHunters" },
  { rank: 36, name: "Neon Squad", organization: "Altinbas University", createdAt: "2025-04-18", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=NeonSquad" },
  { rank: 37, name: "Code Masters", organization: "", createdAt: "2025-04-20", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=CodeMasters" },
  { rank: 38, name: "Digital Force", organization: "Istanbul Aydin", createdAt: "2025-04-22", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=DigitalForce" },
  { rank: 39, name: "Cyber Knights", organization: "", createdAt: "2025-04-25", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=CyberKnights" },
  { rank: 40, name: "Quantum Defenders", organization: "Istanbul Sehir", createdAt: "2025-04-28", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=QuantumDefenders2" },
  { rank: 41, name: "Neon Warriors", organization: "", createdAt: "2025-05-01", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=NeonWarriors" },
  { rank: 42, name: "Data Force", organization: "Istanbul Commerce", createdAt: "2025-05-03", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=DataForce" },
  { rank: 43, name: "Code Elite", organization: "", createdAt: "2025-05-05", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=CodeElite" },
  { rank: 44, name: "Cyber Storm", organization: "Istanbul Kultur", createdAt: "2025-05-08", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=CyberStorm" },
  { rank: 45, name: "Neon Force", organization: "", createdAt: "2025-05-10", logo: "https://api.dicebear.com/7.x/shapes/svg?seed=NeonForce" },
]

const ITEMS_PER_PAGE = 15

function TeamLogo({ team }) {
  const [imageError, setImageError] = useState(false)
  
  const showLogo = team.logo && !imageError
  
  return (
    <div className="relative">
      {showLogo ? (
        <img
          src={team.logo}
          alt={`${team.name} logo`}
          className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg object-contain bg-white/5 p-1 sm:p-1.5 border-2 border-cyber-cyan/30 shadow-lg ring-2 ring-cyber-cyan/20"
          onError={() => setImageError(true)}
        />
      ) : (
        <div
          className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-gradient-to-br ${getTeamColor(
            team.name
          )} flex items-center justify-center text-xs sm:text-sm font-bold text-white shadow-lg border-2 border-white/10`}
        >
          {getTeamInitials(team.name)}
        </div>
      )}
    </div>
  )
}

function getTeamInitials(name) {
  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function getTeamColor(name) {
  const colors = [
    "from-cyber-cyan to-cyber-purple",
    "from-pink-500 to-rose-500",
    "from-yellow-400 to-orange-500",
    "from-green-400 to-emerald-500",
    "from-blue-400 to-indigo-500",
    "from-purple-400 to-pink-500",
    "from-cyan-400 to-teal-500",
    "from-violet-400 to-fuchsia-500",
  ]
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[hash % colors.length]
}

function formatDate(dateString) {
  if (!dateString) return ""
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
}

export default function Team() {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  
  // Filtrelenmiş takımlar
  const filteredTeams = useMemo(() => {
    if (!searchQuery.trim()) {
      return allTeams
    }
    const query = searchQuery.toLowerCase().trim()
    return allTeams.filter(team =>
      team.name.toLowerCase().includes(query) ||
      (team.organization && team.organization.toLowerCase().includes(query))
    )
  }, [searchQuery])

  // Sayfa geçersiz hale geldiğinde sıfırla
  useEffect(() => {
    const maxPage = Math.ceil(filteredTeams.length / ITEMS_PER_PAGE) || 1
    if (currentPage > maxPage) {
      setCurrentPage(1)
    }
  }, [filteredTeams.length, currentPage])
  
  const totalPages = Math.ceil(filteredTeams.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentTeams = filteredTeams.slice(startIndex, endIndex)
  const startResult = filteredTeams.length > 0 ? startIndex + 1 : 0
  const endResult = Math.min(endIndex, filteredTeams.length)

  const goToPage = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const clearSearch = () => {
    setSearchQuery("")
    setCurrentPage(1)
  }

  return (
    <div className="relative min-h-screen bg-[#01040c] text-white">
      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-orbitron font-bold text-white mb-2">
              <span className="text-cyber-cyan">KUVARS KALKANI</span> DATATON
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">Kayıtlı Takımlar</p>
          </div>

          {/* Filter Section */}
          <div className="mb-4 sm:mb-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Takım adı veya organizasyon ara..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-10 pr-10 bg-black/30 border-white/10 text-white placeholder:text-muted-foreground"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="mt-2 text-sm text-muted-foreground">
                {filteredTeams.length} takım bulundu
              </p>
            )}
          </div>

          {/* Teams Table */}
          <div className="rounded-lg border border-white/10 bg-black/30 backdrop-blur-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[400px]">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      TEAM
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                      OLUŞTURMA TARİHİ
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {currentTeams.length > 0 ? (
                    currentTeams.map((team, index) => (
                      <tr
                        key={team.rank}
                        onClick={() => navigate(`/team/${encodeURIComponent(team.name)}`)}
                        className={`hover:bg-white/5 transition-colors cursor-pointer ${
                          index % 2 === 0 ? "bg-white/2" : "bg-transparent"
                        }`}
                      >
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                            {team.rank}
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <TeamLogo team={team} />
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                              <span className="text-xs sm:text-sm font-medium text-white">
                                {team.name}
                              </span>
                              <span className="text-[10px] sm:text-xs text-muted-foreground sm:hidden">
                                {team.createdAt ? formatDate(team.createdAt) : "-"}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 hidden sm:table-cell">
                          <span className="text-xs sm:text-sm text-muted-foreground">
                            {team.createdAt ? formatDate(team.createdAt) : "-"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center">
                        <p className="text-muted-foreground">
                          {searchQuery ? "Arama sonucu bulunamadı" : "Takım bulunamadı"}
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-3 sm:px-6 py-3 sm:py-4 border-t border-white/10 bg-white/2">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {filteredTeams.length > 0 ? (
                    <>Showing {startResult} to {endResult} of {filteredTeams.length} results</>
                  ) : (
                    <>Sonuç bulunamadı</>
                  )}
                </p>
                
                <div className="flex items-center gap-1 sm:gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="border-white/10 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // İlk sayfa, son sayfa, mevcut sayfa ve etrafındaki sayfaları göster
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => goToPage(page)}
                            className={
                              currentPage === page
                                ? "bg-cyber-cyan text-black hover:bg-cyber-cyan/90"
                                : "border-white/10 hover:bg-white/5"
                            }
                          >
                            {page}
                          </Button>
                        )
                      } else if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return (
                          <span key={page} className="text-muted-foreground px-2">
                            ...
                          </span>
                        )
                      }
                      return null
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="border-white/10 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
