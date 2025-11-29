import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { 
  Globe, 
  Database, 
  FileText, 
  Brain,
  Award,
  Clock,
  Users,
  Download,
  Send,
  X,
  CheckCircle2
} from "lucide-react"
import toast from "react-hot-toast"

// Aşamalar - ScoreBoard'dan alınan veriler
const stages = [
  { 
    id: 1, 
    name: "Hayaletin Yuvası", 
    type: "Web / Keşif",
    description: "Web uygulamalarında güvenlik açıklarını keşfedin ve gizli bilgileri bulun. Web uygulamalarında güvenlik açıklarını keşfedin ve gizli bilgileri bulun. Web uygulamalarında güvenlik açıklarını keşfedin ve gizli bilgileri bulun.",
    fullDescription: "Web uygulamalarında güvenlik açıklarını keşfedin ve gizli bilgileri bulun. Bu challenge'da web uygulamalarındaki yaygın güvenlik açıklarını araştıracaksınız. SQL injection, XSS, CSRF gibi saldırı türlerini anlamanız ve bunları nasıl önleyeceğinizi öğrenmeniz gerekiyor.",
    icon: Globe,
    difficulty: "Kolay",
    points: 100,
    estimatedTime: "2-3 saat",
    author: "CTF Team",
    solves: 65,
    fileUrl: "/files/hayaletin-yuvasi.zip",
    fileName: "hayaletin-yuvasi.zip",
    flagFormat: "Flag may have characters such as underscores, asterisks, dashes, or parentheses in it."
  },
  { 
    id: 2, 
    name: "Dijital Enkaz", 
    type: "Veri Temizleme ve EDA",
    description: "Dağınık veri setlerini temizleyin ve keşifsel veri analizi yapın.",
    fullDescription: "Dağınık veri setlerini temizleyin ve keşifsel veri analizi yapın. Bu challenge'da eksik veriler, hatalı formatlar ve gürültülü verilerle çalışacaksınız. Veri temizleme tekniklerini kullanarak analiz edilebilir bir veri seti oluşturmanız gerekiyor.",
    icon: Database,
    difficulty: "Orta",
    points: 100,
    estimatedTime: "3-4 saat",
    author: "Data Team",
    solves: 42,
    fileUrl: "/files/dijital-enkaz.zip",
    fileName: "dijital-enkaz.zip",
    flagFormat: "Flag format: DATATON{...}"
  },
  { 
    id: 3, 
    name: "Opera Binası'ndaki Fısıltı", 
    type: "Steganografi",
    description: "Görüntüler ve dosyalar içinde gizlenmiş mesajları bulun.",
    fullDescription: "Görüntüler ve dosyalar içinde gizlenmiş mesajları bulun. Steganografi tekniklerini kullanarak görüntüler, ses dosyaları ve diğer dosya formatlarında gizlenmiş bilgileri çıkarmanız gerekiyor. LSB (Least Significant Bit) ve diğer steganografi yöntemlerini kullanabilirsiniz.",
    icon: FileText,
    difficulty: "Orta",
    points: 100,
    estimatedTime: "2-3 saat",
    author: "Crypto Team",
    solves: 38,
    fileUrl: "/files/opera-binasi.zip",
    fileName: "opera-binasi.zip",
    flagFormat: "Flag may contain special characters."
  },
  { 
    id: 4, 
    name: "Kaos Sınıflandırması", 
    type: "ML Sınıflandırma - Leaderboard 1",
    description: "Makine öğrenmesi modelleri ile veri sınıflandırma yarışması.",
    fullDescription: "Makine öğrenmesi modelleri ile veri sınıflandırma yarışması. Bu challenge'da verilen veri setini kullanarak en iyi sınıflandırma modelini oluşturmanız gerekiyor. Model performansınız leaderboard'da görüntülenecek ve en yüksek doğruluk oranına sahip modeller ödüllendirilecek.",
    icon: Brain,
    difficulty: "Zor",
    points: 100,
    estimatedTime: "4-6 saat",
    author: "ML Team",
    solves: 25,
    fileUrl: "/files/kaos-siniflandirma.zip",
    fileName: "kaos-siniflandirma.zip",
    flagFormat: "Submit your model accuracy score."
  },
]

const difficultyColors = {
  "Kolay": "bg-green-500/20 text-green-400 border-green-500/50",
  "Orta": "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
  "Zor": "bg-orange-500/20 text-orange-400 border-orange-500/50",
  "Çok Zor": "bg-red-500/20 text-red-400 border-red-500/50",
}

export default function Challenges() {
  const [selectedStage, setSelectedStage] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [flagInput, setFlagInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCardClick = (stageId) => {
    setSelectedStage(stageId)
    setOpenDialog(true)
    setFlagInput("")
  }

  const handleDownload = (stage) => {
    // TODO: Gerçek dosya indirme işlemi burada yapılacak
    toast.success(`${stage.fileName} indiriliyor...`, {
      duration: 2000,
      style: {
        background: '#1a1f3a',
        color: '#fff',
        border: '1px solid #DC143C',
      },
    })
    // Simüle edilmiş indirme
    const link = document.createElement('a')
    link.href = stage.fileUrl
    link.download = stage.fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleSubmitFlag = async (stage) => {
    if (!flagInput.trim()) {
      toast.error("Lütfen bir flag girin", {
        duration: 2000,
        style: {
          background: '#1a1f3a',
          color: '#fff',
          border: '1px solid #ef4444',
        },
      })
      return
    }

    setIsSubmitting(true)
    
    // TODO: Gerçek API çağrısı burada yapılacak
    // Simüle edilmiş API çağrısı
    setTimeout(() => {
      setIsSubmitting(false)
      // Örnek: Flag doğru mu kontrolü
      if (flagInput.toLowerCase().includes("dataton")) {
        toast.success("Flag doğru! Tebrikler!", {
          duration: 3000,
          style: {
            background: '#1a1f3a',
            color: '#fff',
            border: '1px solid #10b981',
          },
        })
        setFlagInput("")
      } else {
        toast.error("Flag yanlış. Tekrar deneyin.", {
          duration: 2000,
          style: {
            background: '#1a1f3a',
            color: '#fff',
            border: '1px solid #ef4444',
          },
        })
      }
    }, 1000)
  }

  const currentStage = stages.find(s => s.id === selectedStage)

  return (
    <div className="relative min-h-screen bg-[#01040c] text-white">
      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-12">
        <div className="w-full mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl font-orbitron font-bold text-white mb-2"
            >
              <span className="text-ny-red">KUVARS KALKANI</span> CHALLENGES
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base text-muted-foreground"
            >
              Tüm aşamalar ve görevler
            </motion.p>
          </div>

          {/* Challenges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {stages.map((stage, index) => {
              const Icon = stage.icon
              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card 
                    className="bg-black/30 border-white/10 hover:border-ny-red/50 transition-all duration-300 cursor-pointer h-full backdrop-blur-md hover:shadow-[0_0_20px_rgba(220,20,60,0.3)]"
                    onClick={() => handleCardClick(stage.id)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-ny-red/20 border border-ny-red/50">
                            <Icon className="h-5 w-5 text-ny-red" />
                          </div>
                          <div>
                            <CardTitle className="text-white text-lg font-semibold">
                              {stage.name}
                            </CardTitle>
                            <CardDescription className="text-muted-foreground text-xs mt-1">
                              {stage.type}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge className={difficultyColors[stage.difficulty]}>
                          {stage.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {stage.description}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center gap-4 text-xs">
                          <div className="flex items-center gap-1 text-ny-red">
                            <Award className="h-4 w-4" />
                            <span className="font-semibold">{stage.points} puan</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{stage.estimatedTime}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Challenge Detail Dialog */}
          {currentStage && (
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-black/95 border-ny-red/30">
                <DialogHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-ny-red/20 border border-ny-red/50">
                        {(() => {
                          const Icon = currentStage.icon
                          return <Icon className="h-6 w-6 text-ny-red" />
                        })()}
                      </div>
                      <div>
                        <DialogTitle className="text-2xl text-white">
                          {currentStage.name}
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground mt-1">
                          {currentStage.type} • {currentStage.points} puan
                        </DialogDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={difficultyColors[currentStage.difficulty]}>
                        {currentStage.difficulty}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        {currentStage.solves} Çözüm
                      </div>
                    </div>
                  </div>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                  {/* Challenge ID */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Challenge ID:</span>
                    <span className="text-white font-mono">{currentStage.id}</span>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Açıklama</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {currentStage.fullDescription || currentStage.description}
                    </p>
                  </div>

                  {/* Flag Format Hint */}
                  {currentStage.flagFormat && (
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-xs text-muted-foreground mb-1">Flag Format:</p>
                      <p className="text-sm text-white">{currentStage.flagFormat}</p>
                    </div>
                  )}

                  {/* Author */}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Yazar:</span>
                    <span className="text-white">{currentStage.author}</span>
                  </div>

                  {/* Download Button */}
                  <div>
                    <Button
                      onClick={() => handleDownload(currentStage)}
                      className="w-full bg-ny-red/20 hover:bg-ny-red/30 border border-ny-red/50 text-white"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {currentStage.fileName || "Dosya İndir"}
                    </Button>
                  </div>

                  {/* Flag Submission */}
                  <div className="pt-4 border-t border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-3">Flag Gönder</h3>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Flag"
                        value={flagInput}
                        onChange={(e) => setFlagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !isSubmitting) {
                            handleSubmitFlag(currentStage)
                          }
                        }}
                        className="flex-1 bg-black/50 border-white/20 text-white placeholder:text-muted-foreground focus-visible:border-ny-red focus-visible:ring-2 focus-visible:ring-ny-red/50"
                      />
                      <Button
                        onClick={() => handleSubmitFlag(currentStage)}
                        disabled={isSubmitting}
                        className="bg-ny-red hover:bg-ny-red/80 text-white px-6 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Clock className="h-4 w-4 mr-2 animate-spin" />
                            Gönderiliyor...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Gönder
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}

          {/* Info Section */}
          <div className="mt-8 sm:mt-12 rounded-lg border border-white/10 bg-black/20 p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-ny-red mb-2">
                  {stages.length}
                </div>
                <p className="text-sm text-muted-foreground">Toplam Aşama</p>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-ny-red mb-2">
                  {stages.reduce((sum, stage) => sum + stage.points, 0)}
                </div>
                <p className="text-sm text-muted-foreground">Toplam Puan</p>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-ny-red mb-2">
                  4
                </div>
                <p className="text-sm text-muted-foreground">Farklı Kategori</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

