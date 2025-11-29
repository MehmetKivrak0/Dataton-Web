import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-cyber-dark text-white p-4 sm:p-6 md:p-8">
      <div className="container mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-orbitron font-bold mb-6 sm:mb-8 glow-white-text">
          Dashboard
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card>
            <CardHeader>
              <CardTitle>İlerleme</CardTitle>
              <CardDescription>Tamamlanan aşamalar</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-ny-red">0/6</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Leaderboard</CardTitle>
              <CardDescription>Genel sıralama</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">-</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Aktif Aşamalar</CardTitle>
              <CardDescription>Çözülebilir görevler</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Aşama 1: Hayaletin Yuvası</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

