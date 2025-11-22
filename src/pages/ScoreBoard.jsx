import { useState, useMemo, useEffect, useRef } from "react"
import { Search, X, RefreshCw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"

// Örnek skor verileri - gerçek veriler API'den gelecek
const allTeams = [
  { id: 1, name: "Neon Shadows", organization: "WNYN Global" },
  { id: 2, name: "Cipher Squad", organization: "Nova Cyber Labs" },
  { id: 3, name: "Tempus Guardians", organization: "ChronoTech" },
  { id: 4, name: "Quantum Defenders", organization: "ZeroDay Hub" },
  { id: 5, name: "Cyber Phoenix", organization: "" },
  { id: 6, name: "Data Warriors", organization: "ITU" },
  { id: 7, name: "Flag Hunters", organization: "" },
  { id: 8, name: "Code Breakers", organization: "Bogazici University" },
  { id: 9, name: "Signal Processors", organization: "" },
  { id: 10, name: "Kalkani Team", organization: "METU" },
]

// Aşamalar
const stages = [
  { id: 1, name: "Hayaletin Yuvası", type: "Web / Keşif" },
  { id: 2, name: "Dijital Enkaz", type: "Veri Temizleme ve EDA" },
  { id: 3, name: "Opera Binası'ndaki Fısıltı", type: "Steganografi" },
  { id: 4, name: "Kaos Sınıflandırması", type: "ML Sınıflandırma - Leaderboard 1" },
  { id: 5, name: "Çekirdek Kilidi", type: "Kriptografi" },
  { id: 6, name: "Saniyelerle Yarış", type: "Optimizasyon - Leaderboard 2" },
]

// Örnek skor verileri - takım ID'si ve aşama ID'si ile eşleşen skorlar
const scores = {
  "1-1": 100,
  "1-2": 85,
  "1-3": 90,
  "2-1": 95,
  "2-2": 100,
  "2-3": 88,
  "3-1": 80,
  "3-2": 75,
  "4-1": 100,
  "4-2": 100,
  "4-3": 100,
  "5-1": 60,
  "6-1": 100,
  "6-2": 90,
  "6-3": 85,
  "6-4": 95,
  "7-1": 70,
  "8-1": 100,
  "8-2": 95,
  "8-3": 100,
  "8-4": 90,
  "9-1": 50,
  "10-1": 100,
  "10-2": 100,
  "10-3": 100,
  "10-4": 100,
  "10-5": 95,
}

function getScore(teamId, stageId) {
  return scores[`${teamId}-${stageId}`] || 0
}

function getTotalScore(teamId) {
  return stages.reduce((total, stage) => total + getScore(teamId, stage.id), 0)
}

export default function ScoreBoard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [lastRefreshTime, setLastRefreshTime] = useState(Date.now())
  const [refreshKey, setRefreshKey] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const refreshIntervalRef = useRef(null)

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

  // Toplam skora göre sıralama
  const sortedTeams = useMemo(() => {
    return [...filteredTeams].sort((a, b) => {
      const scoreA = getTotalScore(a.id)
      const scoreB = getTotalScore(b.id)
      return scoreB - scoreA
    })
  }, [filteredTeams])

  const clearSearch = () => {
    setSearchQuery("")
  }

  // Scoreboard'u yenile
  const refreshScoreboard = (isManual = false) => {
    const now = Date.now()
    const timeSinceLastRefresh = now - lastRefreshTime

    // Eğer manuel tıklama ve 1 saniye içindeyse uyarı göster
    if (isManual && timeSinceLastRefresh < 1000) {
      const secondsAgo = Math.floor(timeSinceLastRefresh / 1000) || 1
      toast.error(`${secondsAgo} saniye önce yenilendi`, {
        duration: 2000,
        style: {
          background: '#1a1f3a',
          color: '#fff',
          border: '1px solid #ef4444',
        },
      })
      return
    }

    // Animasyon başlat
    if (isManual) {
      setIsRefreshing(true)
    }

    // Yenileme işlemi
    setRefreshKey(prev => prev + 1)
    setLastRefreshTime(now)
    
    if (isManual) {
      // Animasyonu durdur (1 saniye sonra)
      setTimeout(() => {
        setIsRefreshing(false)
        toast.success("Scoreboard yenilendi", {
          duration: 2000,
          style: {
            background: '#1a1f3a',
            color: '#fff',
            border: '1px solid #00d9ff',
          },
        })
      }, 1000)
    }

    // TODO: Burada gerçek API çağrısı yapılacak
    // fetchScoreboardData()
  }

  // 3 dakikada bir otomatik yenileme
  useEffect(() => {
    refreshIntervalRef.current = setInterval(() => {
      const now = Date.now()
      setRefreshKey(prev => prev + 1)
      setLastRefreshTime(now)
      // TODO: Burada gerçek API çağrısı yapılacak
      // fetchScoreboardData()
    }, 3 * 60 * 1000) // 3 dakika = 180000ms

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current)
      }
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-[#01040c] text-white">
      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-12">
        <div className="w-full mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-orbitron font-bold text-white mb-2">
              <span className="text-cyber-cyan">KUVARS KALKANI</span> SCOREBOARD
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">Takım Skorları ve Aşama İlerlemeleri</p>
          </div>

          {/* Filter Section */}
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center gap-3 flex-wrap justify-between">
              <div className="relative flex-1 min-w-[200px] max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Takım adı veya organizasyon ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
              <Button
                onClick={() => refreshScoreboard(true)}
                size="sm"
                variant="outline"
                disabled={isRefreshing}
                className="flex items-center gap-2 border-white/10 hover:bg-cyber-cyan/20 hover:text-cyber-cyan hover:border-cyber-cyan/50 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="text-xs sm:text-sm">Yenile</span>
              </Button>
            </div>
            {searchQuery && (
              <p className="mt-2 text-sm text-muted-foreground">
                {filteredTeams.length} takım bulundu
              </p>
            )}
          </div>

          {/* Scoreboard Table */}
          <div className="rounded-lg border border-white/10 bg-black/30 backdrop-blur-md overflow-hidden">
            <div className="w-full overflow-x-auto">
              <table className="w-full table-auto min-w-[800px]">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="px-2 sm:px-4 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider w-12 sm:w-16">
                      #
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider min-w-[150px] sm:w-[220px]">
                      TAKIM
                    </th>
                    {stages.map((stage) => (
                      <th
                        key={stage.id}
                        className="px-2 sm:px-4 py-3 sm:py-4 text-center text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider min-w-[120px] sm:min-w-[140px]"
                      >
                        <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                          <span className="text-[10px] sm:text-[11px] leading-tight">{stage.name}</span>
                          <span className="text-[8px] sm:text-[9px] text-cyber-cyan/80 leading-tight">({stage.type})</span>
                        </div>
                      </th>
                    ))}
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold text-cyber-cyan uppercase tracking-wider w-20 sm:w-32">
                      TOPLAM
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {sortedTeams.length > 0 ? (
                    sortedTeams.map((team, index) => {
                      const totalScore = getTotalScore(team.id)
                      return (
                        <tr
                          key={team.id}
                          className={`hover:bg-white/5 transition-colors ${
                            index % 2 === 0 ? "bg-white/2" : "bg-transparent"
                          }`}
                        >
                          <td className="px-2 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                            <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                              {index + 1}
                            </span>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4">
                            <div className="flex flex-col">
                              <span className="text-xs sm:text-sm font-medium text-white">
                                {team.name}
                              </span>
                              {team.organization && (
                                <span className="text-[10px] sm:text-xs text-muted-foreground">
                                  {team.organization}
                                </span>
                              )}
                            </div>
                          </td>
                          {stages.map((stage) => {
                            const score = getScore(team.id, stage.id)
                            return (
                              <td
                                key={stage.id}
                                className="px-2 sm:px-4 py-3 sm:py-4 text-center"
                              >
                                {score > 0 ? (
                                  <span className="text-xs sm:text-sm font-semibold text-cyber-cyan">
                                    {score}
                                  </span>
                                ) : (
                                  <span className="text-xs sm:text-sm text-muted-foreground/50">-</span>
                                )}
                              </td>
                            )
                          })}
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                            <span className="text-sm sm:text-base font-bold text-cyber-cyan">
                              {totalScore}
                            </span>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={stages.length + 3}
                        className="px-6 py-12 text-center"
                      >
                        <p className="text-muted-foreground">
                          {searchQuery ? "Arama sonucu bulunamadı" : "Takım bulunamadı"}
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-4 sm:mt-6 rounded-lg border border-white/10 bg-black/20 p-3 sm:p-4">
            <p className="text-[10px] sm:text-xs text-muted-foreground text-center">
              Skorlar gerçek zamanlı olarak güncellenmektedir. Her aşama için maksimum 100 puan verilir.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

