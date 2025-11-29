import { useState, useEffect, useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Calendar, Users, Code, User, TrendingUp, Award, Target, Clock, Activity, CheckCircle2, XCircle, Github, Linkedin, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

// Örnek takım verileri - gerçek veriler API'den gelecek
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
]

// Örnek üye verileri - gerçek veriler API'den gelecek
const teamMembers = {
  "Neon Shadows": [
    { nickname: "ShadowX", firstName: "Ahmet", lastName: "Yılmaz", softwareField: "Web Security", github: "https://github.com/shadowx", linkedin: "https://linkedin.com/in/ahmetyilmaz" },
    { nickname: "NeonHacker", firstName: "Zeynep", lastName: "Kaya", softwareField: "Penetration Testing", github: "https://github.com/neonhacker", linkedin: "https://linkedin.com/in/zeynepkaya" },
    { nickname: "CyberGhost", firstName: "Mehmet", lastName: "Demir", softwareField: "Network Security", github: "https://github.com/cyberghost", linkedin: "https://linkedin.com/in/mehmetdemir" },
    { nickname: "DarkByte", firstName: "Elif", lastName: "Şahin", softwareField: "Cryptography", github: "https://github.com/darkbyte", linkedin: "https://linkedin.com/in/elifsahin" },
  ],
  "Cipher Squad": [
    { nickname: "CipherMaster", firstName: "Can", lastName: "Özkan", softwareField: "Reverse Engineering", github: "https://github.com/ciphermaster", linkedin: "https://linkedin.com/in/canozkan" },
    { nickname: "CodeBreaker", firstName: "Ayşe", lastName: "Arslan", softwareField: "Malware Analysis", github: "https://github.com/codebreaker", linkedin: "https://linkedin.com/in/aysearslan" },
    { nickname: "EncryptPro", firstName: "Burak", lastName: "Çelik", softwareField: "Blockchain Security", github: "https://github.com/encryptpro", linkedin: "https://linkedin.com/in/burakcelik" },
  ],
  "Tempus Guardians": [
    { nickname: "TimeKeeper", firstName: "Deniz", lastName: "Yıldız", softwareField: "Time Synchronization", github: "https://github.com/timekeeper", linkedin: "https://linkedin.com/in/denizyildiz" },
    { nickname: "ChronoHack", firstName: "Selin", lastName: "Aydın", softwareField: "System Security", github: "https://github.com/chronohack", linkedin: "https://linkedin.com/in/selinaydin" },
    { nickname: "TempusPro", firstName: "Emre", lastName: "Kurt", softwareField: "Network Protocols", github: "https://github.com/tempuspro", linkedin: "https://linkedin.com/in/emrekurt" },
    { nickname: "GuardianX", firstName: "Merve", lastName: "Koç", softwareField: "Cloud Security", github: "https://github.com/guardianx", linkedin: "https://linkedin.com/in/mervekoc" },
  ],
  "Quantum Defenders": [
    { nickname: "QuantumX", firstName: "Fatih", lastName: "Şen", softwareField: "Quantum Computing", github: "https://github.com/quantumx", linkedin: "https://linkedin.com/in/fatihsen" },
    { nickname: "DefenderPro", firstName: "Gizem", lastName: "Türk", softwareField: "AI Security", github: "https://github.com/defenderpro", linkedin: "https://linkedin.com/in/gizemturk" },
    { nickname: "QubitHack", firstName: "Hakan", lastName: "Güneş", softwareField: "Cryptography", github: "https://github.com/qubithack", linkedin: "https://linkedin.com/in/hakangunes" },
  ],
  "Cyber Phoenix": [
    { nickname: "PhoenixRise", firstName: "İrem", lastName: "Bulut", softwareField: "Incident Response", github: "https://github.com/phoenixrise", linkedin: "https://linkedin.com/in/irembulut" },
    { nickname: "FireWall", firstName: "Kaan", lastName: "Yüksel", softwareField: "Network Defense", github: "https://github.com/firewall", linkedin: "https://linkedin.com/in/kaanyuksel" },
  ],
  "Data Warriors": [
    { nickname: "DataMaster", firstName: "Leyla", lastName: "Doğan", softwareField: "Data Science", github: "https://github.com/datamaster", linkedin: "https://linkedin.com/in/leyladogan" },
    { nickname: "WarriorX", firstName: "Murat", lastName: "Ateş", softwareField: "Machine Learning", github: "https://github.com/warriorx", linkedin: "https://linkedin.com/in/muratates" },
    { nickname: "DataGuard", firstName: "Nazlı", lastName: "Kara", softwareField: "Big Data Security", github: "https://github.com/dataguard", linkedin: "https://linkedin.com/in/nazlikara" },
  ],
  "Flag Hunters": [
    { nickname: "FlagSeeker", firstName: "Onur", lastName: "Yılmaz", softwareField: "CTF Specialist", github: "https://github.com/flagseeker", linkedin: "https://linkedin.com/in/onuryilmaz" },
    { nickname: "HunterPro", firstName: "Pınar", lastName: "Özdemir", softwareField: "Forensics", github: "https://github.com/hunterpro", linkedin: "https://linkedin.com/in/pinarozdemir" },
  ],
  "Code Breakers": [
    { nickname: "CodeX", firstName: "Rıza", lastName: "Çakır", softwareField: "Software Security", github: "https://github.com/codex", linkedin: "https://linkedin.com/in/rizacakir" },
    { nickname: "BreakerPro", firstName: "Seda", lastName: "Aktaş", softwareField: "Code Analysis", github: "https://github.com/breakerpro", linkedin: "https://linkedin.com/in/sedaaktas" },
    { nickname: "CryptoBreak", firstName: "Tolga", lastName: "Şahin", softwareField: "Cryptanalysis", github: "https://github.com/cryptobreak", linkedin: "https://linkedin.com/in/tolgashahin" },
  ],
  "Signal Processors": [
    { nickname: "SignalX", firstName: "Umut", lastName: "Kılıç", softwareField: "Signal Processing", github: "https://github.com/signalx", linkedin: "https://linkedin.com/in/umutkilic" },
    { nickname: "ProcessorPro", firstName: "Vildan", lastName: "Erdem", softwareField: "Digital Signal Security", github: "https://github.com/processorpro", linkedin: "https://linkedin.com/in/vildanerdem" },
  ],
  "Kalkani Team": [
    { nickname: "KalkanX", firstName: "Yasin", lastName: "Özkan", softwareField: "Defensive Security", github: "https://github.com/kalkanx", linkedin: "https://linkedin.com/in/yasinozkan" },
    { nickname: "ShieldPro", firstName: "Zehra", lastName: "Yıldırım", softwareField: "Security Operations", github: "https://github.com/shieldpro", linkedin: "https://linkedin.com/in/zehraildirim" },
    { nickname: "GuardPro", firstName: "Arda", lastName: "Çetin", softwareField: "Threat Intelligence", github: "https://github.com/guardpro", linkedin: "https://linkedin.com/in/ardacetin" },
  ],
}

// Örnek takım performans verileri - gerçek veriler API'den gelecek
const teamPerformanceData = {
  "Neon Shadows": {
    scoreOverTime: [
      { date: "2025-01-15", score: 0 },
      { date: "2025-01-16", score: 150 },
      { date: "2025-01-17", score: 320 },
      { date: "2025-01-18", score: 450 },
      { date: "2025-01-19", score: 680 },
      { date: "2025-01-20", score: 850 },
      { date: "2025-01-21", score: 1020 },
      { date: "2025-01-22", score: 1250 },
    ],
    challengesSolved: 28,
    challengesFailed: 2,
    totalChallenges: 30,
    successRate: 93.33,
    totalAttempts: 35,
    averageSolveTime: "12 dakika",
    lastActivity: "2 saat önce",
    categoryBreakdown: [
      { category: "Web Security", solved: 8, total: 9, rate: 88.9 },
      { category: "Cryptography", solved: 6, total: 6, rate: 100 },
      { category: "Network Security", solved: 7, total: 8, rate: 87.5 },
      { category: "Penetration Testing", solved: 7, total: 7, rate: 100 },
    ],
    memberContributions: [
      { name: "ShadowX", contributions: 45 },
      { name: "NeonHacker", contributions: 30 },
      { name: "CyberGhost", contributions: 15 },
      { name: "DarkByte", contributions: 10 },
    ],
  },
  "Cipher Squad": {
    scoreOverTime: [
      { date: "2025-01-18", score: 0 },
      { date: "2025-01-19", score: 120 },
      { date: "2025-01-20", score: 280 },
      { date: "2025-01-21", score: 410 },
      { date: "2025-01-22", score: 590 },
      { date: "2025-01-23", score: 750 },
    ],
    challengesSolved: 22,
    challengesFailed: 3,
    totalChallenges: 25,
    successRate: 88.0,
    totalAttempts: 28,
    averageSolveTime: "15 dakika",
    lastActivity: "5 saat önce",
    categoryBreakdown: [
      { category: "Reverse Engineering", solved: 7, total: 8, rate: 87.5 },
      { category: "Malware Analysis", solved: 6, total: 7, rate: 85.7 },
      { category: "Blockchain Security", solved: 9, total: 10, rate: 90.0 },
    ],
    memberContributions: [
      { name: "CipherMaster", contributions: 50 },
      { name: "CodeBreaker", contributions: 30 },
      { name: "EncryptPro", contributions: 20 },
    ],
  },
  "Tempus Guardians": {
    scoreOverTime: [
      { date: "2025-01-20", score: 0 },
      { date: "2025-01-21", score: 100 },
      { date: "2025-01-22", score: 250 },
      { date: "2025-01-23", score: 380 },
      { date: "2025-01-24", score: 520 },
    ],
    challengesSolved: 20,
    challengesFailed: 1,
    totalChallenges: 21,
    successRate: 95.24,
    totalAttempts: 22,
    averageSolveTime: "10 dakika",
    lastActivity: "1 saat önce",
    categoryBreakdown: [
      { category: "Time Synchronization", solved: 8, total: 8, rate: 100 },
      { category: "System Security", solved: 6, total: 7, rate: 85.7 },
      { category: "Network Protocols", solved: 4, total: 4, rate: 100 },
      { category: "Cloud Security", solved: 2, total: 2, rate: 100 },
    ],
    memberContributions: [
      { name: "TimeKeeper", contributions: 40 },
      { name: "ChronoHack", contributions: 30 },
      { name: "TempusPro", contributions: 20 },
      { name: "GuardianX", contributions: 10 },
    ],
  },
  "Quantum Defenders": {
    scoreOverTime: [
      { date: "2025-01-22", score: 0 },
      { date: "2025-01-23", score: 180 },
      { date: "2025-01-24", score: 350 },
      { date: "2025-01-25", score: 480 },
    ],
    challengesSolved: 18,
    challengesFailed: 2,
    totalChallenges: 20,
    successRate: 90.0,
    totalAttempts: 22,
    averageSolveTime: "14 dakika",
    lastActivity: "3 saat önce",
    categoryBreakdown: [
      { category: "Quantum Computing", solved: 6, total: 7, rate: 85.7 },
      { category: "AI Security", solved: 5, total: 5, rate: 100 },
      { category: "Cryptography", solved: 7, total: 8, rate: 87.5 },
    ],
    memberContributions: [
      { name: "QuantumX", contributions: 45 },
      { name: "DefenderPro", contributions: 35 },
      { name: "QubitHack", contributions: 20 },
    ],
  },
  "Cyber Phoenix": {
    scoreOverTime: [
      { date: "2025-01-25", score: 0 },
      { date: "2025-01-26", score: 90 },
      { date: "2025-01-27", score: 210 },
      { date: "2025-01-28", score: 320 },
    ],
    challengesSolved: 15,
    challengesFailed: 1,
    totalChallenges: 16,
    successRate: 93.75,
    totalAttempts: 17,
    averageSolveTime: "11 dakika",
    lastActivity: "30 dakika önce",
    categoryBreakdown: [
      { category: "Incident Response", solved: 7, total: 7, rate: 100 },
      { category: "Network Defense", solved: 8, total: 9, rate: 88.9 },
    ],
    memberContributions: [
      { name: "PhoenixRise", contributions: 55 },
      { name: "FireWall", contributions: 45 },
    ],
  },
  "Data Warriors": {
    scoreOverTime: [
      { date: "2025-02-01", score: 0 },
      { date: "2025-02-02", score: 200 },
      { date: "2025-02-03", score: 420 },
      { date: "2025-02-04", score: 610 },
    ],
    challengesSolved: 24,
    challengesFailed: 2,
    totalChallenges: 26,
    successRate: 92.31,
    totalAttempts: 28,
    averageSolveTime: "13 dakika",
    lastActivity: "4 saat önce",
    categoryBreakdown: [
      { category: "Data Science", solved: 9, total: 10, rate: 90.0 },
      { category: "Machine Learning", solved: 8, total: 8, rate: 100 },
      { category: "Big Data Security", solved: 7, total: 8, rate: 87.5 },
    ],
    memberContributions: [
      { name: "DataMaster", contributions: 40 },
      { name: "WarriorX", contributions: 35 },
      { name: "DataGuard", contributions: 25 },
    ],
  },
  "Flag Hunters": {
    scoreOverTime: [
      { date: "2025-02-03", score: 0 },
      { date: "2025-02-04", score: 110 },
      { date: "2025-02-05", score: 270 },
    ],
    challengesSolved: 12,
    challengesFailed: 0,
    totalChallenges: 12,
    successRate: 100.0,
    totalAttempts: 12,
    averageSolveTime: "8 dakika",
    lastActivity: "15 dakika önce",
    categoryBreakdown: [
      { category: "CTF Specialist", solved: 6, total: 6, rate: 100 },
      { category: "Forensics", solved: 6, total: 6, rate: 100 },
    ],
    memberContributions: [
      { name: "FlagSeeker", contributions: 60 },
      { name: "HunterPro", contributions: 40 },
    ],
  },
  "Code Breakers": {
    scoreOverTime: [
      { date: "2025-02-05", score: 0 },
      { date: "2025-02-06", score: 140 },
      { date: "2025-02-07", score: 310 },
      { date: "2025-02-08", score: 450 },
    ],
    challengesSolved: 19,
    challengesFailed: 3,
    totalChallenges: 22,
    successRate: 86.36,
    totalAttempts: 25,
    averageSolveTime: "16 dakika",
    lastActivity: "6 saat önce",
    categoryBreakdown: [
      { category: "Software Security", solved: 7, total: 8, rate: 87.5 },
      { category: "Code Analysis", solved: 6, total: 7, rate: 85.7 },
      { category: "Cryptanalysis", solved: 6, total: 7, rate: 85.7 },
    ],
    memberContributions: [
      { name: "CodeX", contributions: 40 },
      { name: "BreakerPro", contributions: 35 },
      { name: "CryptoBreak", contributions: 25 },
    ],
  },
  "Signal Processors": {
    scoreOverTime: [
      { date: "2025-02-07", score: 0 },
      { date: "2025-02-08", score: 95 },
      { date: "2025-02-09", score: 230 },
    ],
    challengesSolved: 11,
    challengesFailed: 1,
    totalChallenges: 12,
    successRate: 91.67,
    totalAttempts: 13,
    averageSolveTime: "18 dakika",
    lastActivity: "8 saat önce",
    categoryBreakdown: [
      { category: "Signal Processing", solved: 6, total: 6, rate: 100 },
      { category: "Digital Signal Security", solved: 5, total: 6, rate: 83.3 },
    ],
    memberContributions: [
      { name: "SignalX", contributions: 55 },
      { name: "ProcessorPro", contributions: 45 },
    ],
  },
  "Kalkani Team": {
    scoreOverTime: [
      { date: "2025-02-10", score: 0 },
      { date: "2025-02-11", score: 160 },
      { date: "2025-02-12", score: 340 },
      { date: "2025-02-13", score: 490 },
    ],
    challengesSolved: 21,
    challengesFailed: 1,
    totalChallenges: 22,
    successRate: 95.45,
    totalAttempts: 23,
    averageSolveTime: "9 dakika",
    lastActivity: "45 dakika önce",
    categoryBreakdown: [
      { category: "Defensive Security", solved: 8, total: 8, rate: 100 },
      { category: "Security Operations", solved: 7, total: 8, rate: 87.5 },
      { category: "Threat Intelligence", solved: 6, total: 6, rate: 100 },
    ],
    memberContributions: [
      { name: "KalkanX", contributions: 40 },
      { name: "ShieldPro", contributions: 35 },
      { name: "GuardPro", contributions: 25 },
    ],
  },
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
    "from-ny-red to-white",
    "from-pink-500 to-rose-500",
    "from-yellow-400 to-orange-500",
    "from-green-400 to-emerald-500",
    "from-red-400 to-pink-500",
    "from-red-500 to-rose-500",
    "from-red-600 to-red-400",
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

function TeamLogo({ team }) {
  const [imageError, setImageError] = useState(false)
  const showLogo = team.logo && !imageError

  return (
    <div className="relative">
      {showLogo ? (
        <img
          src={team.logo}
          alt={`${team.name} logo`}
          className="h-20 w-20 sm:h-24 sm:w-24 rounded-xl object-contain bg-white/5 p-2 border-2 border-ny-red/30 shadow-lg ring-2 ring-ny-red/20"
          onError={() => setImageError(true)}
        />
      ) : (
        <div
          className={`h-20 w-20 sm:h-24 sm:w-24 rounded-xl bg-gradient-to-br ${getTeamColor(
            team.name
          )} flex items-center justify-center text-2xl sm:text-3xl font-bold text-white shadow-lg border-2 border-white/10`}
        >
          {getTeamInitials(team.name)}
        </div>
      )}
    </div>
  )
}

// Grafik renkleri
const CHART_COLORS = {
  primary: "#DC143C",
  secondary: "#FFFFFF",
  success: "#10b981",
  danger: "#ef4444",
  warning: "#f59e0b",
  colors: ["#DC143C", "#FFFFFF", "#10b981", "#f59e0b", "#ef4444", "#FF6B6B", "#B91C1C", "#ec4899"],
  solve: "#10b981", // Yeşil
  fail: "#ef4444", // Kırmızı
  categories: ["#ec4899", "#10b981", "#06b6d4", "#ef4444"], // Magenta, Yeşil, Cyan, Kırmızı
}

export default function TeamDetail() {
  const { teamName } = useParams()
  const navigate = useNavigate()
  const [team, setTeam] = useState(null)
  const [members, setMembers] = useState([])
  const [performanceData, setPerformanceData] = useState(null)
  const [isMembersDialogOpen, setIsMembersDialogOpen] = useState(false)

  useEffect(() => {
    // URL'den gelen takım adını decode et
    const decodedTeamName = decodeURIComponent(teamName || "")
    
    // Takımı bul
    const foundTeam = allTeams.find(
      t => t.name.toLowerCase() === decodedTeamName.toLowerCase()
    )

    if (foundTeam) {
      setTeam(foundTeam)
      // Üyeleri bul
      const teamMembersList = teamMembers[foundTeam.name] || []
      setMembers(teamMembersList)
      // Performans verilerini bul
      const perfData = teamPerformanceData[foundTeam.name] || null
      setPerformanceData(perfData)
    }
  }, [teamName])

  // Yazılım alanlarına göre dağılım hesapla
  const fieldDistribution = useMemo(() => {
    const fieldCounts = {}
    members.forEach(member => {
      fieldCounts[member.softwareField] = (fieldCounts[member.softwareField] || 0) + 1
    })
    return Object.entries(fieldCounts).map(([name, value]) => ({ name, value }))
  }, [members])


  if (!team) {
    return (
      <div className="relative min-h-screen bg-[#01040c] text-white">
        <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-12">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="outline"
              onClick={() => navigate("/team")}
              className="mb-6 border-white/10 hover:bg-white/5"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Takımlara Dön
            </Button>
            <Card className="bg-black/30 border-white/10 backdrop-blur-md">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Takım bulunamadı</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-[#01040c] text-white">
      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Button
            variant="outline"
            onClick={() => navigate("/team")}
            className="mb-6 border-white/10 hover:bg-white/5"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Takımlara Dön
          </Button>

          {/* Team Header */}
          <Card className="bg-black/30 border-white/10 backdrop-blur-md mb-6">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <TeamLogo team={team} />
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-orbitron font-bold text-white mb-2">
                    {team.name}
                  </h1>
                  {team.organization && (
                    <p className="text-sm sm:text-base text-muted-foreground mb-3">
                      {team.organization}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-base">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4 text-ny-red" />
                      <span>Oluşturma Tarihi: <span className="text-white">{formatDate(team.createdAt)}</span></span>
                    </div>
                    <Dialog open={isMembersDialogOpen} onOpenChange={setIsMembersDialogOpen}>
                      <DialogTrigger asChild>
                        <button className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg border border-ny-red/40 bg-gradient-to-r from-ny-red/10 to-white/5 hover:from-ny-red/20 hover:to-white/10 transition-all cursor-pointer group shadow-[0_0_8px_rgba(220,20,60,0.2)] hover:shadow-[0_0_12px_rgba(220,20,60,0.4)]">
                          <Users className="h-4 w-4 text-ny-red group-hover:rotate-12 transition-transform" />
                          <span className="text-sm text-white font-medium">Üye Sayısı: <span className="text-ny-red font-bold glow-red-text">{members.length}</span></span>
                          <span className="absolute -top-1 -right-1 h-2 w-2 bg-ny-red rounded-full animate-pulse opacity-75"></span>
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-black/95 border-ny-red/30">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2 text-2xl text-white">
                            <Users className="h-6 w-6 text-ny-red" />
                            Takım Üyeleri - {team.name}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          {members.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {members.map((member, index) => (
                                <div
                                  key={index}
                                  className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-5 hover:bg-white/10 transition-all hover:border-ny-red/30"
                                >
                                  <div className="flex items-start gap-3 mb-3">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-ny-red to-white flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                      {member.firstName[0]}{member.lastName[0]}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-1">
                                        <User className="h-4 w-4 text-ny-red flex-shrink-0" />
                                        <p className="text-sm sm:text-base font-semibold text-white truncate">
                                          {member.firstName} {member.lastName}
                                        </p>
                                      </div>
                                      <p className="text-xs sm:text-sm text-ny-red mb-2 truncate">
                                        @{member.nickname}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-3">
                                    <Code className="h-3 w-3 sm:h-4 sm:w-4 text-ny-red flex-shrink-0" />
                                    <span className="truncate">{member.softwareField}</span>
                                  </div>
                                  {/* Social Media Buttons */}
                                  <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                                    {member.github && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 px-2 flex-1 text-xs hover:bg-white/10 hover:text-ny-red"
                                        asChild
                                      >
                                        <a
                                          href={member.github}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="flex items-center justify-center gap-1.5"
                                        >
                                          <Github className="h-3.5 w-3.5" />
                                          <span className="hidden sm:inline">GitHub</span>
                                        </a>
                                      </Button>
                                    )}
                                    {member.linkedin && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 px-2 flex-1 text-xs hover:bg-white/10 hover:text-ny-red"
                                        asChild
                                      >
                                        <a
                                          href={member.linkedin}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="flex items-center justify-center gap-1.5"
                                        >
                                          <Linkedin className="h-3.5 w-3.5" />
                                          <span className="hidden sm:inline">LinkedIn</span>
                                        </a>
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <p className="text-muted-foreground">Bu takımda henüz üye bulunmamaktadır.</p>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                {/* Rank Badge - Sağ Taraf */}
                <div className="flex-shrink-0">
                  <div className="flex flex-col items-center sm:items-end gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-ny-red/20 to-white/10 border border-ny-red/30">
                      <Award className="h-5 w-5 text-ny-red" />
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Sıralama</span>
                        <span className="text-2xl sm:text-3xl font-bold text-white glow-red-text">
                          #{team.rank}
                        </span>
                      </div>
                    </div>
                    {performanceData && (
                      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-ny-red/20 to-white/10 border border-ny-red/30">
                        <TrendingUp className="h-5 w-5 text-ny-red" />
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">Toplam Puan</span>
                          <span className="text-2xl sm:text-3xl font-bold text-white glow-red-text">
                            {performanceData.scoreOverTime[performanceData.scoreOverTime.length - 1]?.score || 0}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Member Contributions Table */}
          {performanceData && performanceData.memberContributions && (
            <Card className="bg-black/30 border-white/10 backdrop-blur-md mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                  <Users className="h-5 w-5 text-ny-red" />
                  Takım Üyeleri Katkıları
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="rounded-lg border border-white/10 bg-black/20 overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-white/5 border-b border-white/10">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">
                          User Name
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-white uppercase tracking-wider">
                          Score
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {performanceData.memberContributions.map((member, index) => {
                        // Üye katkısına göre skor hesapla (örnek: katkı yüzdesi * toplam skor)
                        const totalScore = performanceData.scoreOverTime[performanceData.scoreOverTime.length - 1]?.score || 0
                        const memberScore = Math.round((member.contributions / 100) * totalScore)
                        return (
                          <tr
                            key={index}
                            className={`hover:bg-white/5 transition-colors ${
                              index % 2 === 0 ? "bg-white/2" : "bg-transparent"
                            }`}
                          >
                            <td className="px-4 py-3">
                              <span className="text-sm text-cyan-400 font-medium">
                                {member.name}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <span className="text-sm text-white font-semibold">
                                {memberScore}
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Team Statistics & Analytics */}
          {performanceData && (
            <div className="space-y-6 mb-6">
              {/* Performance Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-black/30 border-white/10 backdrop-blur-md">
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Target className="h-4 w-4 text-ny-red" />
                        <span className="text-xs sm:text-sm">Çözülen Challenge</span>
                      </div>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-white">
                      {performanceData.challengesSolved}
                      <span className="text-sm sm:text-base text-muted-foreground font-normal ml-1">
                        / {performanceData.totalChallenges}
                      </span>
                    </p>
                    <div className="mt-3 h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-ny-red to-white rounded-full transition-all"
                        style={{ width: `${performanceData.successRate}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Başarı Oranı: {performanceData.successRate.toFixed(1)}%
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-black/30 border-white/10 backdrop-blur-md">
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Award className="h-4 w-4 text-ny-red" />
                        <span className="text-xs sm:text-sm">Toplam Skor</span>
                      </div>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-white">
                      {performanceData.scoreOverTime[performanceData.scoreOverTime.length - 1]?.score || 0}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="h-3 w-3 text-ny-red" />
                      <span className="text-xs text-muted-foreground">
                        Son {performanceData.scoreOverTime.length} günde
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/30 border-white/10 backdrop-blur-md">
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4 text-ny-red" />
                        <span className="text-xs sm:text-sm">Aktif Üyeler</span>
                      </div>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-white">{members.length}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <Code className="h-3 w-3 text-ny-red" />
                      <span className="text-xs text-muted-foreground">
                        {fieldDistribution.length} farklı alan
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Team Statistics & Analytics - Charts */}
          {performanceData && (
            <div className="space-y-6">
              {/* Charts Grid */}
              <div className="grid grid-cols-1 gap-6">
                {/* Success Rate Progress */}
                <Card className="bg-black/30 border-white/10 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                      <Target className="h-5 w-5 text-ny-red" />
                      Başarı İstatistikleri
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    {/* Yatay İstatistikler Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Çözülen Challenge'lar */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-ny-red" />
                          <span className="text-xs sm:text-sm text-muted-foreground">Çözülen Challenge'lar</span>
                        </div>
                        <p className="text-xl sm:text-2xl font-bold text-white">
                          {performanceData.challengesSolved}
                          <span className="text-sm text-muted-foreground font-normal ml-1">
                            / {performanceData.totalChallenges}
                          </span>
                        </p>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-ny-red to-white rounded-full"
                            style={{ width: `${performanceData.successRate}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {performanceData.successRate.toFixed(1)}% başarı
                        </p>
                      </div>

                      {/* Başarısız Denemeler */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-500" />
                          <span className="text-xs sm:text-sm text-muted-foreground">Başarısız Denemeler</span>
                        </div>
                        <p className="text-xl sm:text-2xl font-bold text-white">
                          {performanceData.challengesFailed}
                        </p>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                            style={{
                              width: `${(performanceData.challengesFailed / performanceData.totalChallenges) * 100}%`,
                            }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {((performanceData.challengesFailed / performanceData.totalChallenges) * 100).toFixed(1)}% başarısız
                        </p>
                      </div>

                      {/* Toplam Deneme */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-ny-red" />
                          <span className="text-xs sm:text-sm text-muted-foreground">Toplam Deneme</span>
                        </div>
                        <p className="text-xl sm:text-2xl font-bold text-white">
                          {performanceData.totalAttempts || performanceData.challengesSolved + performanceData.challengesFailed}
                        </p>
                        {performanceData.lastActivity && (
                          <p className="text-xs text-muted-foreground">
                            Son: {performanceData.lastActivity}
                          </p>
                        )}
                      </div>

                      {/* Ortalama Çözüm Süresi */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-ny-red" />
                          <span className="text-xs sm:text-sm text-muted-foreground">Ort. Çözüm Süresi</span>
                        </div>
                        <p className="text-xl sm:text-2xl font-bold text-white">
                          {performanceData.averageSolveTime || "N/A"}
                        </p>
                      </div>
                    </div>

                    {/* Kategori Bazlı Başarı Oranları */}
                    {performanceData.categoryBreakdown && performanceData.categoryBreakdown.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-white/10">
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                          Kategori Performansı
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {performanceData.categoryBreakdown.slice(0, 3).map((category, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground truncate pr-2">{category.category}</span>
                                <span className="text-white font-semibold whitespace-nowrap">
                                  {category.solved}/{category.total}
                                </span>
                              </div>
                              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-ny-red to-white rounded-full"
                                  style={{ width: `${category.rate}%` }}
                                />
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {category.rate.toFixed(1)}% başarı
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

              </div>
            </div>
          )}

          {/* Solve Statistics Charts */}
          {performanceData && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Solve Percentages Donut Chart */}
              <Card className="bg-black/30 border-white/10 backdrop-blur-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                      <Target className="h-5 w-5 text-ny-red" />
                      Çözüm Yüzdeleri
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-white/10"
                    >
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          {
                            name: "Çözülen",
                            value: performanceData.challengesSolved,
                            percentage: performanceData.successRate.toFixed(2),
                          },
                          {
                            name: "Başarısız",
                            value: performanceData.challengesFailed,
                            percentage: ((performanceData.challengesFailed / performanceData.totalChallenges) * 100).toFixed(2),
                          },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name}: ${percentage}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        <Cell fill={CHART_COLORS.solve} />
                        <Cell fill={CHART_COLORS.fail} />
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0, 0, 0, 0.9)",
                          border: "1px solid rgba(220, 20, 60, 0.3)",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                        formatter={(value, name) => [
                          `${value} (${name === "Çözülen" ? performanceData.successRate.toFixed(2) : ((performanceData.challengesFailed / performanceData.totalChallenges) * 100).toFixed(2)}%)`,
                          name,
                        ]}
                      />
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        formatter={(value) => (
                          <span className="text-white text-sm">{value}</span>
                        )}
                        iconType="square"
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 flex items-center justify-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded bg-[#10b981]"></div>
                      <span className="text-muted-foreground">
                        Çözülen: {performanceData.challengesSolved} ({performanceData.successRate.toFixed(2)}%)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded bg-[#ef4444]"></div>
                      <span className="text-muted-foreground">
                        Başarısız: {performanceData.challengesFailed} ({((performanceData.challengesFailed / performanceData.totalChallenges) * 100).toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Category Breakdown Donut Chart */}
              {performanceData.categoryBreakdown && performanceData.categoryBreakdown.length > 0 && (
                <Card className="bg-black/30 border-white/10 backdrop-blur-md">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                        <Code className="h-5 w-5 text-ny-red" />
                        Kategori Dağılımı
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-white/10"
                      >
                        <Download className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={performanceData.categoryBreakdown.map((cat) => ({
                            name: cat.category,
                            value: cat.solved,
                            percentage: cat.rate.toFixed(2),
                          }))}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percentage }) => `${percentage}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {performanceData.categoryBreakdown.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={CHART_COLORS.categories[index % CHART_COLORS.categories.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(0, 0, 0, 0.9)",
                            border: "1px solid rgba(220, 20, 60, 0.3)",
                            borderRadius: "8px",
                            color: "#fff",
                          }}
                          formatter={(value, name, props) => [
                            `${value}/${props.payload.total} (${props.payload.percentage}%)`,
                            name,
                          ]}
                        />
                        <Legend
                          verticalAlign="bottom"
                          height={36}
                          formatter={(value) => (
                            <span className="text-white text-sm">{value}</span>
                          )}
                          iconType="square"
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                      {performanceData.categoryBreakdown.map((category, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div
                            className="h-3 w-3 rounded"
                            style={{
                              backgroundColor:
                                CHART_COLORS.categories[index % CHART_COLORS.categories.length],
                            }}
                          ></div>
                          <span className="text-muted-foreground truncate">
                            {category.category}: {category.solved}/{category.total} ({category.rate.toFixed(1)}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

