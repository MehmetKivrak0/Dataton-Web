import { useState, useMemo, useEffect, useRef } from "react"
import { Search, X, RefreshCw, Users, Download, GitCompare, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
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

// Örnek takım üyesi katkı verileri - gerçek veriler API'den gelecek
const teamMemberContributions = {
  1: [
    { name: "ShadowX", contributions: 45 },
    { name: "NeonHacker", contributions: 30 },
    { name: "CyberGhost", contributions: 15 },
    { name: "DarkByte", contributions: 10 },
  ],
  2: [
    { name: "CipherMaster", contributions: 50 },
    { name: "CodeBreaker", contributions: 30 },
    { name: "EncryptPro", contributions: 20 },
  ],
  3: [
    { name: "TimeKeeper", contributions: 40 },
    { name: "ChronoHack", contributions: 30 },
    { name: "TempusPro", contributions: 20 },
    { name: "GuardianX", contributions: 10 },
  ],
}

// Tüm takımların üyelerini birleştirip skorlarıyla eşleştir
const allMemberScores = [
  { name: "Manpreet", score: 0 },
  { name: "newkidcrazy", score: 0 },
  { name: "noahnescio", score: 1900 },
  { name: "ShadowX", score: 1250 },
  { name: "NeonHacker", score: 850 },
  { name: "CyberGhost", score: 450 },
  { name: "DarkByte", score: 320 },
  { name: "CipherMaster", score: 750 },
  { name: "CodeBreaker", score: 590 },
  { name: "EncryptPro", score: 410 },
  { name: "TimeKeeper", score: 520 },
  { name: "ChronoHack", score: 380 },
  { name: "TempusPro", score: 250 },
  { name: "GuardianX", score: 100 },
]

// Örnek çözüm istatistikleri - gerçek veriler API'den gelecek
const solveStatistics = {
  solves: 12,
  fails: 11,
  total: 23,
}

// Örnek kategori dağılımı - gerçek veriler API'den gelecek
const categoryBreakdown = [
  { name: "OSINT", value: 5, percentage: 41.67 },
  { name: "Reverse Engineering", value: 5, percentage: 41.67 },
  { name: "Cryptography", value: 1, percentage: 8.33 },
  { name: "Forensics", value: 1, percentage: 8.33 },
]

// Grafik renkleri
const CHART_COLORS = {
  solve: "#10b981", // Yeşil
  fail: "#ef4444", // Kırmızı
  categories: ["#ec4899", "#10b981", "#06b6d4", "#ef4444"], // Magenta, Yeşil, Cyan, Kırmızı
}

export default function ScoreBoard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [lastRefreshTime, setLastRefreshTime] = useState(Date.now())
  const [refreshKey, setRefreshKey] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedTeams, setSelectedTeams] = useState([])
  const [isCompareDialogOpen, setIsCompareDialogOpen] = useState(false)
  const [isSelectionMode, setIsSelectionMode] = useState(false)
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
            border: '1px solid #DC143C',
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
              <span className="text-ny-red">KUVARS KALKANI</span> SCOREBOARD
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">Takım Skorları ve Aşama İlerlemeleri</p>
          </div>

          {/* Filter Section */}
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center gap-3 flex-wrap justify-between">
              <div className="relative flex-1 min-w-[200px] max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-ny-red" />
                <Input
                  type="text"
                  placeholder="Takım adı veya organizasyon ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 bg-black/30 border-ny-red/40 text-white placeholder:text-muted-foreground focus-visible:border-ny-red focus-visible:ring-2 focus-visible:ring-ny-red/50 shadow-[0_0_10px_rgba(220,20,60,0.3)]"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-ny-red transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    if (selectedTeams.length === 0) {
                      // İlk tıklamada: Bildirim göster, seçim modu aktif olur, modal açılmaz
                      setIsSelectionMode(true)
                      toast.success("Takım seçiniz. Tablodan takım seçebilirsiniz.", {
                        duration: 3000,
                        style: {
                          background: '#1a1f3a',
                          color: '#fff',
                          border: '1px solid #DC143C',
                        },
                      })
                    } else {
                      // Takım seçildikten sonra: Karşılaştırma modalı açılır
                      setIsCompareDialogOpen(true)
                    }
                  }}
                  className={`flex items-center gap-2 border-ny-red/50 text-white hover:bg-ny-red/20 hover:text-ny-red hover:border-ny-red transition-colors whitespace-nowrap shadow-[0_0_10px_rgba(220,20,60,0.3)] hover:shadow-[0_0_15px_rgba(220,20,60,0.5)] ${isSelectionMode ? 'bg-ny-red/20 border-ny-red' : ''}`}
                >
                  <GitCompare className="h-4 w-4" />
                  <span className="text-xs sm:text-sm">Karşılaştır</span>
                  {selectedTeams.length > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 rounded-full bg-ny-red text-white text-xs font-bold">
                      {selectedTeams.length}
                    </span>
                  )}
                </Button>
                <Dialog open={isCompareDialogOpen} onOpenChange={setIsCompareDialogOpen}>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-black/95 border-ny-red/30">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2 text-2xl text-white">
                        <GitCompare className="h-6 w-6 text-ny-red" />
                        Takım Karşılaştırması
                      </DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      {selectedTeams.length > 0 ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {selectedTeams.map((teamId) => {
                              const team = allTeams.find(t => t.id === teamId)
                              const totalScore = getTotalScore(teamId)
                              return team ? (
                                <Card key={teamId} className="bg-white/5 border-white/10">
                                  <CardContent className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                      <h3 className="text-sm font-semibold text-white">{team.name}</h3>
                                      <button
                                        onClick={() => setSelectedTeams(prev => prev.filter(id => id !== teamId))}
                                        className="text-muted-foreground hover:text-ny-red transition-colors"
                                      >
                                        <X className="h-4 w-4" />
                                      </button>
                                    </div>
                                    {team.organization && (
                                      <p className="text-xs text-muted-foreground mb-2">{team.organization}</p>
                                    )}
                                    <p className="text-2xl font-bold text-white">{totalScore}</p>
                                    <p className="text-xs text-muted-foreground mt-1">Toplam Puan</p>
                                  </CardContent>
                                </Card>
                              ) : null
                            })}
                          </div>
                          {selectedTeams.length < 3 && (
                            <div className="text-center py-4 border-t border-white/10">
                              <p className="text-sm text-muted-foreground mb-2">
                                Daha fazla takım seçmek için tablodan seçin (Maksimum 3 takım)
                              </p>
                              {isSelectionMode && (
                                <p className="text-xs text-ny-red/80">
                                  Seçim modu aktif. Tablodan takım seçebilirsiniz.
                                </p>
                              )}
                            </div>
                          )}
                          <div className="flex items-center justify-center gap-2 pt-4 border-t border-white/10">
                            <Button
                              onClick={() => {
                                setIsSelectionMode(false)
                                setSelectedTeams([])
                                setIsCompareDialogOpen(false)
                              }}
                              variant="outline"
                              size="sm"
                              className="border-white/20 text-white hover:bg-white/10"
                            >
                              Seçimleri Temizle
                            </Button>
                            <Button
                              onClick={() => setIsSelectionMode(false)}
                              variant="outline"
                              size="sm"
                              className="border-ny-red/50 text-ny-red hover:bg-ny-red/20"
                            >
                              Seçim Modunu Kapat
                            </Button>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  onClick={() => refreshScoreboard(true)}
                  size="sm"
                  variant="outline"
                  disabled={isRefreshing}
                  className="flex items-center gap-2 border-ny-red/50 text-white hover:bg-ny-red/20 hover:text-ny-red hover:border-ny-red transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_10px_rgba(220,20,60,0.3)] hover:shadow-[0_0_15px_rgba(220,20,60,0.5)]"
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span className="text-xs sm:text-sm">Yenile</span>
                </Button>
              </div>
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
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white uppercase tracking-wider w-12 sm:w-16">
                      #
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">
                      TAKIM
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-white uppercase tracking-wider w-24 sm:w-32">
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
                          className={`hover:bg-white/5 transition-colors cursor-pointer ${
                            index % 2 === 0 ? "bg-white/2" : "bg-transparent"
                          } ${selectedTeams.includes(team.id) ? "bg-ny-red/10 border-l-2 border-ny-red" : ""}`}
                          onClick={() => {
                            if (!isSelectionMode) {
                              return
                            }
                            if (selectedTeams.includes(team.id)) {
                              setSelectedTeams(prev => prev.filter(id => id !== team.id))
                            } else {
                              if (selectedTeams.length < 3) {
                                setSelectedTeams(prev => [...prev, team.id])
                                toast.success(`${team.name} seçildi`, {
                                  duration: 2000,
                                  style: {
                                    background: '#1a1f3a',
                                    color: '#fff',
                                    border: '1px solid #DC143C',
                                  },
                                })
                              } else {
                                toast.error("Maksimum 3 takım seçebilirsiniz", {
                                  duration: 2000,
                                  style: {
                                    background: '#1a1f3a',
                                    color: '#fff',
                                    border: '1px solid #ef4444',
                                  },
                                })
                              }
                            }
                          }}
                        >
                          <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              {selectedTeams.includes(team.id) && (
                                <Check className="h-4 w-4 text-ny-red" />
                              )}
                              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                                {index + 1}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
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
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-right">
                            <span className="text-sm sm:text-base font-bold text-white">
                              {totalScore}
                            </span>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
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

