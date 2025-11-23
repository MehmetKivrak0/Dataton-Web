import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Users, Globe, Building2, Upload, ArrowLeft, UserPlus, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import toast from "react-hot-toast"

const joinTeamSchema = z.object({
  team: z.string().min(1, "Takım seçimi gereklidir"),
  teamPassword: z.string().min(4, "Takım şifresi en az 4 karakter olmalıdır"),
  country: z.string().min(1, "Ülke seçimi gereklidir"),
  organization: z.string().optional(),
  ctfTimeLink: z.string().url("Geçerli bir URL giriniz").optional().or(z.literal("")),
  teamAvatar: z.instanceof(FileList).optional(),
})

const createTeamSchema = z.object({
  teamName: z.string().min(3, "Takım adı en az 3 karakter olmalıdır"),
  teamPassword: z.string()
    .min(4, "Takım şifresi en az 4 karakter olmalıdır")
    .max(50, "Takım şifresi en fazla 50 karakter olabilir"),
  country: z.string().min(1, "Ülke seçimi gereklidir"),
  organization: z.string().optional(),
  ctfTimeLink: z.string().url("Geçerli bir URL giriniz").optional().or(z.literal("")),
  teamAvatar: z.instanceof(FileList).optional(),
})

// Örnek takımlar - gerçek veriler API'den gelecek
const existingTeams = [
  "Neon Shadows",
  "Cipher Squad",
  "Tempus Guardians",
  "Quantum Defenders",
  "Cyber Phoenix",
  "Data Warriors",
  "Flag Hunters",
  "Code Breakers",
  "Signal Processors",
  "Kalkani Team",
]

// Ülkeler listesi
const countries = [
  "Türkiye",
  "ABD",
  "Almanya",
  "Fransa",
  "İngiltere",
  "Kanada",
  "Avustralya",
  "Hollanda",
  "İsveç",
  "Norveç",
  "Danimarka",
  "Finlandiya",
  "İspanya",
  "İtalya",
  "Polonya",
  "Çek Cumhuriyeti",
  "Yunanistan",
  "Portekiz",
  "Belçika",
  "Avusturya",
]

export default function TeamSetup() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [action, setAction] = useState(null) // "create" or "join"
  const [showTeamPassword, setShowTeamPassword] = useState(false)
  const [showJoinTeamPassword, setShowJoinTeamPassword] = useState(false)

  const {
    register: registerJoin,
    handleSubmit: handleSubmitJoin,
    formState: { errors: errorsJoin },
  } = useForm({
    resolver: zodResolver(joinTeamSchema),
  })

  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    formState: { errors: errorsCreate },
  } = useForm({
    resolver: zodResolver(createTeamSchema),
  })

  const handleCreateTeam = async (data) => {
    setIsLoading(true)
    try {
      // TODO: API çağrısı yapılacak
      console.log("Create team data:", data)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      toast.success("Takım oluşturuldu!", {
        style: {
          background: '#1a1f3a',
          color: '#fff',
          border: '1px solid #00d9ff',
        },
      })
      
      navigate("/dashboard")
    } catch (error) {
      toast.error("Takım oluşturulamadı. Lütfen tekrar deneyin.", {
        style: {
          background: '#1a1f3a',
          color: '#fff',
          border: '1px solid #ef4444',
        },
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmitJoin = async (data) => {
    setIsLoading(true)
    try {
      // TODO: API çağrısı yapılacak
      console.log("Join team data:", data)
      
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      toast.success("Takıma katıldınız!", {
        style: {
          background: '#1a1f3a',
          color: '#fff',
          border: '1px solid #00d9ff',
        },
      })
      
      navigate("/dashboard")
    } catch (error) {
      toast.error("Takıma katılamadınız. Lütfen tekrar deneyin.", {
        style: {
          background: '#1a1f3a',
          color: '#fff',
          border: '1px solid #ef4444',
        },
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#01040c] text-white flex items-center justify-center p-4 py-12">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,245,255,0.1),rgba(15,23,42,0.4),rgba(139,92,246,0.1))]" />
        <div className="absolute inset-0 opacity-20 mix-blend-screen">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,255,153,0.1)_1px,transparent_1px)] bg-[length:30px_30px]" />
        </div>
      </div>

      <div className="relative w-full max-w-2xl z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate("/auth/register")}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-cyber-cyan transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Geri Dön
        </button>

        {/* Team Setup Card */}
        <Card className="bg-black/30 border-white/10 backdrop-blur-md">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-cyber-cyan to-cyber-purple flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-orbitron text-white">
              <span className="text-cyber-cyan">TAKIM</span> SEÇİMİ
            </CardTitle>
            <CardDescription className="text-base">
              Takım oluşturun veya mevcut bir takıma katılın
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!action ? (
              /* Action Selection */
              <div className="space-y-4">
                <Button
                  onClick={() => setAction("create")}
                  className="w-full bg-gradient-to-r from-cyber-cyan to-cyber-purple hover:from-cyber-cyan/90 hover:to-cyber-purple/90 text-black font-semibold h-14 text-lg"
                >
                  <UserPlus className="h-5 w-5 mr-2" />
                  Takım Oluştur
                </Button>
                <Button
                  onClick={() => setAction("join")}
                  variant="outline"
                  className="w-full border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan/10 h-14 text-lg"
                >
                  <Users className="h-5 w-5 mr-2" />
                  Takıma Katıl
                </Button>
              </div>
            ) : action === "create" ? (
              /* Create Team Form */
              <form onSubmit={handleSubmitCreate(handleCreateTeam)} className="space-y-4">
                {/* Team Name Field */}
                <div className="space-y-2">
                  <label htmlFor="teamName" className="text-sm font-medium text-muted-foreground">
                    Team Name
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyber-cyan" />
                    <Input
                      id="teamName"
                      type="text"
                      placeholder="Takım adı"
                      className="pl-10 bg-black/30 border-white/10 text-white placeholder:text-muted-foreground focus-visible:border-cyber-cyan"
                      {...registerCreate("teamName")}
                    />
                  </div>
                  {errorsCreate.teamName && (
                    <p className="text-xs text-red-500 mt-1">{errorsCreate.teamName.message}</p>
                  )}
                </div>

                {/* Team Password Field */}
                <div className="space-y-2">
                  <label htmlFor="teamPassword" className="text-sm font-medium text-muted-foreground">
                    Takım Şifresi
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyber-cyan" />
                    <Input
                      id="teamPassword"
                      type={showTeamPassword ? "text" : "password"}
                      placeholder="Takım şifresi"
                      className="pl-10 pr-10 bg-black/30 border-white/10 text-white placeholder:text-muted-foreground focus-visible:border-cyber-cyan"
                      {...registerCreate("teamPassword")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowTeamPassword(!showTeamPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-cyber-cyan transition-colors"
                    >
                      {showTeamPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errorsCreate.teamPassword && (
                    <p className="text-xs text-red-500 mt-1">{errorsCreate.teamPassword.message}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Bu şifre ile takım üyeleri takıma katılabilir
                  </p>
                </div>

                {/* Country Field */}
                <div className="space-y-2">
                  <label htmlFor="country" className="text-sm font-medium text-muted-foreground">
                    Country
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyber-cyan z-10" />
                    <select
                      id="country"
                      className="w-full h-10 pl-10 pr-10 rounded-md border border-white/10 bg-black/30 text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:border-cyber-cyan appearance-none cursor-pointer"
                      {...registerCreate("country")}
                    >
                      <option value="">Choose Country</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {errorsCreate.country && (
                    <p className="text-xs text-red-500 mt-1">{errorsCreate.country.message}</p>
                  )}
                </div>

                {/* Organization Field */}
                <div className="space-y-2">
                  <label htmlFor="organization" className="text-sm font-medium text-muted-foreground">
                    Organization
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyber-cyan" />
                    <Input
                      id="organization"
                      type="text"
                      placeholder="Organizasyon adı"
                      className="pl-10 bg-black/30 border-white/10 text-white placeholder:text-muted-foreground focus-visible:border-cyber-cyan"
                      {...registerCreate("organization")}
                    />
                  </div>
                </div>

                {/* CTFTime Link Field */}
                <div className="space-y-2">
                  <label htmlFor="ctfTimeLink" className="text-sm font-medium text-muted-foreground">
                    CTFTime Link
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyber-cyan" />
                    <Input
                      id="ctfTimeLink"
                      type="url"
                      placeholder="https://ctftime.org/team/..."
                      className="pl-10 bg-black/30 border-white/10 text-white placeholder:text-muted-foreground focus-visible:border-cyber-cyan"
                      {...registerCreate("ctfTimeLink")}
                    />
                  </div>
                  {errorsCreate.ctfTimeLink && (
                    <p className="text-xs text-red-500 mt-1">{errorsCreate.ctfTimeLink.message}</p>
                  )}
                </div>

                {/* Team Avatar Field */}
                <div className="space-y-2">
                  <label htmlFor="teamAvatar" className="text-sm font-medium text-muted-foreground">
                    Team Avatar
                  </label>
                  <div className="relative">
                    <Input
                      id="teamAvatar"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      {...registerCreate("teamAvatar")}
                    />
                    <label
                      htmlFor="teamAvatar"
                      className="flex items-center justify-center gap-2 h-10 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-muted-foreground cursor-pointer hover:bg-white/5 hover:border-cyber-cyan/30 transition-colors"
                    >
                      <Upload className="h-4 w-4 text-cyber-cyan" />
                      <span>Select File less than 1024px*1024px and 48KB</span>
                    </label>
                  </div>
                </div>

                {/* Submit Button and Back Button */}
                <div className="flex items-center justify-between pt-4">
                  <Button
                    type="button"
                    onClick={() => setAction(null)}
                    variant="ghost"
                  >
                    Geri Dön
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-cyber-cyan to-cyber-purple hover:from-cyber-cyan/90 hover:to-cyber-purple/90 text-black font-semibold px-8"
                    disabled={isLoading}
                  >
                    {isLoading ? "Oluşturuluyor..." : "OLUŞTUR"}
                  </Button>
                </div>
              </form>
            ) : (
              /* Join Team Form */
              <form onSubmit={handleSubmitJoin(onSubmitJoin)} className="space-y-4">
                {/* Team Field */}
                <div className="space-y-2">
                  <label htmlFor="team" className="text-sm font-medium text-muted-foreground">
                    Team
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyber-cyan z-10" />
                    <select
                      id="team"
                      className="w-full h-10 pl-10 pr-10 rounded-md border border-white/10 bg-black/30 text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:border-cyber-cyan appearance-none cursor-pointer"
                      {...registerJoin("team")}
                    >
                      <option value="">Choose Team</option>
                      {existingTeams.map((team) => (
                        <option key={team} value={team}>
                          {team}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {errorsJoin.team && (
                    <p className="text-xs text-red-500 mt-1">{errorsJoin.team.message}</p>
                  )}
                </div>

                {/* Team Password Field */}
                <div className="space-y-2">
                  <label htmlFor="teamPassword" className="text-sm font-medium text-muted-foreground">
                    Takım Şifresi
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyber-cyan" />
                    <Input
                      id="teamPassword"
                      type={showJoinTeamPassword ? "text" : "password"}
                      placeholder="Takım şifresini giriniz"
                      className="pl-10 pr-10 bg-black/30 border-white/10 text-white placeholder:text-muted-foreground focus-visible:border-cyber-cyan"
                      {...registerJoin("teamPassword")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowJoinTeamPassword(!showJoinTeamPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-cyber-cyan transition-colors"
                    >
                      {showJoinTeamPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errorsJoin.teamPassword && (
                    <p className="text-xs text-red-500 mt-1">{errorsJoin.teamPassword.message}</p>
                  )}
                </div>

                {/* Country Field */}
                <div className="space-y-2">
                  <label htmlFor="country" className="text-sm font-medium text-muted-foreground">
                    Country
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyber-cyan z-10" />
                    <select
                      id="country"
                      className="w-full h-10 pl-10 pr-10 rounded-md border border-white/10 bg-black/30 text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:border-cyber-cyan appearance-none cursor-pointer"
                      {...registerJoin("country")}
                    >
                      <option value="">Choose Country</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {errorsJoin.country && (
                    <p className="text-xs text-red-500 mt-1">{errorsJoin.country.message}</p>
                  )}
                </div>

                {/* Organization Field */}
                <div className="space-y-2">
                  <label htmlFor="organization" className="text-sm font-medium text-muted-foreground">
                    Organization
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyber-cyan" />
                    <Input
                      id="organization"
                      type="text"
                      placeholder="Organizasyon adı"
                      className="pl-10 bg-black/30 border-white/10 text-white placeholder:text-muted-foreground focus-visible:border-cyber-cyan"
                      {...registerJoin("organization")}
                    />
                  </div>
                </div>

                {/* CTFTime Link Field */}
                <div className="space-y-2">
                  <label htmlFor="ctfTimeLink" className="text-sm font-medium text-muted-foreground">
                    CTFTime Link
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyber-cyan" />
                    <Input
                      id="ctfTimeLink"
                      type="url"
                      placeholder="https://ctftime.org/team/..."
                      className="pl-10 bg-black/30 border-white/10 text-white placeholder:text-muted-foreground focus-visible:border-cyber-cyan"
                      {...registerJoin("ctfTimeLink")}
                    />
                  </div>
                  {errorsJoin.ctfTimeLink && (
                    <p className="text-xs text-red-500 mt-1">{errorsJoin.ctfTimeLink.message}</p>
                  )}
                </div>

                {/* Team Avatar Field */}
                <div className="space-y-2">
                  <label htmlFor="teamAvatar" className="text-sm font-medium text-muted-foreground">
                    Team Avatar
                  </label>
                  <div className="relative">
                    <Input
                      id="teamAvatar"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      {...registerJoin("teamAvatar")}
                    />
                    <label
                      htmlFor="teamAvatar"
                      className="flex items-center justify-center gap-2 h-10 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-muted-foreground cursor-pointer hover:bg-white/5 hover:border-cyber-cyan/30 transition-colors"
                    >
                      <Upload className="h-4 w-4 text-cyber-cyan" />
                      <span>Select File less than 1024px*1024px and 48KB</span>
                    </label>
                  </div>
                </div>

                {/* Submit Button and Back Button */}
                <div className="flex items-center justify-between pt-4">
                  <Button
                    type="button"
                    onClick={() => setAction(null)}
                    variant="ghost"
                  >
                    Geri Dön
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-cyber-cyan to-cyber-purple hover:from-cyber-cyan/90 hover:to-cyber-purple/90 text-black font-semibold px-8"
                    disabled={isLoading}
                  >
                    {isLoading ? "Katılıyor..." : "KATIL"}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

