import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { LogIn, Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import toast from "react-hot-toast"

const loginSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
})

export default function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      // TODO: API çağrısı yapılacak
      console.log("Login data:", data)
      
      // Simüle edilmiş başarılı giriş
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      toast.success("Giriş başarılı!", {
        style: {
          background: '#1a1f3a',
          color: '#fff',
          border: '1px solid #00d9ff',
        },
      })
      
      // Dashboard'a yönlendir
      navigate("/dashboard")
    } catch (error) {
      toast.error("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.", {
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
    <div className="relative min-h-screen bg-[#01040c] text-white flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,245,255,0.1),rgba(15,23,42,0.4),rgba(139,92,246,0.1))]" />
        <div className="absolute inset-0 opacity-20 mix-blend-screen">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,255,153,0.1)_1px,transparent_1px)] bg-[length:30px_30px]" />
        </div>
      </div>

      <div className="relative w-full max-w-md z-10">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-cyber-cyan transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Ana Sayfaya Dön
        </Link>

        {/* Login Card */}
        <Card className="bg-black/30 border-white/10 backdrop-blur-md">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-cyber-cyan to-cyber-purple flex items-center justify-center">
                <LogIn className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-orbitron text-white">
              <span className="text-cyber-cyan">KUVARS KALKANI</span> DATATON
            </CardTitle>
            <CardDescription className="text-base">
              Hesabınıza giriş yapın
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                  E-posta
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyber-cyan" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="ornek@email.com"
                    className="pl-10 bg-black/30 border-white/10 text-white placeholder:text-muted-foreground focus-visible:border-cyber-cyan"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-muted-foreground">
                  Şifre
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyber-cyan" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 bg-black/30 border-white/10 text-white placeholder:text-muted-foreground focus-visible:border-cyber-cyan"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-cyber-cyan transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="flex items-center justify-end">
                <Link
                  to="/auth/forgot-password"
                  className="text-xs text-cyber-cyan hover:underline"
                >
                  Şifremi Unuttum
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyber-cyan to-cyber-purple hover:from-cyber-cyan/90 hover:to-cyber-purple/90 text-black font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
              </Button>

              {/* Register Link */}
              <div className="text-center text-sm text-muted-foreground">
                Hesabınız yok mu?{" "}
                <Link
                  to="/auth/register"
                  className="text-cyber-cyan hover:underline font-medium"
                >
                  Kayıt Ol
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

