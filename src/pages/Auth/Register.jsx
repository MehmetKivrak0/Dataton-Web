import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { UserPlus, Mail, Lock, Eye, EyeOff, User, ArrowLeft, GraduationCap, BookOpen, School, Phone, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import toast from "react-hot-toast"

// Telefon numarası validasyon fonksiyonu
const validatePhoneNumber = (phone) => {
  // Boşluk, tire, parantez gibi karakterleri temizle
  const cleaned = phone.replace(/[\s\-()]/g, '')
  
  // Türkiye telefon numarası formatları:
  // 05XX XXX XX XX (10 haneli, 0 ile başlar)
  // +90 5XX XXX XX XX (13 haneli, +90 ile başlar)
  // 5XX XXX XX XX (9 haneli, 5 ile başlar)
  
  if (cleaned.length === 0) {
    return false
  }
  
  // 0 ile başlayan 10 haneli numara
  if (cleaned.startsWith('0') && cleaned.length === 10) {
    return /^0[5][0-9]{9}$/.test(cleaned)
  }
  
  // +90 ile başlayan 13 haneli numara
  if (cleaned.startsWith('90') && cleaned.length === 12) {
    return /^90[5][0-9]{9}$/.test(cleaned)
  }
  
  // 5 ile başlayan 9 haneli numara
  if (cleaned.startsWith('5') && cleaned.length === 9) {
    return /^5[0-9]{8}$/.test(cleaned)
  }
  
  return false
}

const registerSchema = z.object({
  fullName: z.string()
    .min(3, "Ad soyad en az 3 karakter olmalıdır")
    .max(100, "Ad soyad en fazla 100 karakter olabilir")
    .regex(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, "Ad soyad sadece harf içerebilir"),
  nickname: z.string()
    .min(3, "Takma ad en az 3 karakter olmalıdır")
    .max(30, "Takma ad en fazla 30 karakter olabilir")
    .regex(/^[a-zA-Z0-9_]+$/, "Takma ad sadece harf, rakam ve alt çizgi içerebilir"),
  email: z.string()
    .email("Geçerli bir e-posta adresi giriniz")
    .toLowerCase()
    .max(100, "E-posta en fazla 100 karakter olabilir"),
  password: z.string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .max(50, "Şifre en fazla 50 karakter olabilir")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Şifre en az bir küçük harf, bir büyük harf ve bir rakam içermelidir"),
  phone: z.string()
    .min(1, "Telefon numarası gereklidir")
    .refine((val) => {
      const cleaned = val.replace(/[\s\-()]/g, '')
      return cleaned.length >= 9 && cleaned.length <= 12
    }, "Telefon numarası 9-12 haneli olmalıdır")
    .refine((val) => validatePhoneNumber(val), {
      message: "Geçerli bir Türkiye telefon numarası giriniz (05XX XXX XX XX formatında)",
    }),
  isNotStudent: z.boolean().default(false),
  university: z.string().optional(),
  department: z.string().optional(),
  grade: z.string().optional(),
}).refine((data) => {
  // Eğer üniversite okumuyorsa, üniversite alanları boş olabilir
  if (data.isNotStudent) {
    return true
  }
  // Üniversite okuyorsa, tüm alanlar dolu olmalı
  return data.university && data.university.length >= 2 && 
         data.department && data.department.length >= 2 && 
         data.grade && data.grade.length >= 1
}, {
  message: "Üniversite bilgileri eksik. Tüm alanları doldurun veya 'Üniversite Okumuyorum' seçeneğini işaretleyin.",
  path: ["university"], // Hata mesajı university alanında gösterilecek
})

// Sınıf seçenekleri
const gradeOptions = [
  { value: "prep", label: "Hazırlık" },
  { value: "associate_1", label: "Önlisans 1. Sınıf" },
  { value: "associate_2", label: "Önlisans 2. Sınıf" },
  { value: "bachelor_1", label: "Lisans 1. Sınıf" },
  { value: "bachelor_2", label: "Lisans 2. Sınıf" },
  { value: "bachelor_3", label: "Lisans 3. Sınıf" },
  { value: "bachelor_4", label: "Lisans 4. Sınıf" },
  { value: "bachelor_5", label: "Lisans 5. Sınıf" },
]

export default function Register() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isNotStudent, setIsNotStudent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      isNotStudent: false,
    },
  })

  const isNotStudentValue = watch("isNotStudent")

  const handleNotStudentChange = (checked) => {
    setIsNotStudent(checked)
    setValue("isNotStudent", checked)
    if (checked) {
      // Üniversite okumuyorsa alanları temizle
      setValue("university", "")
      setValue("department", "")
      setValue("grade", "")
    }
  }

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      // TODO: API çağrısı yapılacak
      console.log("Register data:", data)
      
      // Simüle edilmiş başarılı kayıt
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      toast.success("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...", {
        style: {
          background: '#1a1f3a',
          color: '#fff',
          border: '1px solid #00d9ff',
        },
      })
      
      // Takım seçim sayfasına yönlendir
      setTimeout(() => {
        navigate("/auth/team-setup")
      }, 1500)
    } catch (error) {
      toast.error("Kayıt başarısız. Lütfen tekrar deneyin.", {
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
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-cyber-cyan transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Ana Sayfaya Dön
        </Link>

        {/* Register Card */}
        <Card className="bg-black/30 border-white/10 backdrop-blur-md">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-cyber-cyan to-cyber-purple flex items-center justify-center">
                <UserPlus className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-orbitron text-white">
              <span className="text-cyber-cyan">KUVARS KALKANI</span> DATATON
            </CardTitle>
            <CardDescription className="text-base">
              Yeni hesap oluşturun
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name Field */}
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-medium text-muted-foreground">
                    Ad Soyad
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyber-cyan" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Adınız Soyadınız"
                      className="pl-10 bg-black/30 border-white/10 text-white placeholder:text-muted-foreground focus-visible:border-cyber-cyan"
                      {...register("fullName")}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                {/* Nick Name Field */}
                <div className="space-y-2">
                  <label htmlFor="nickname" className="text-sm font-medium text-muted-foreground">
                    Nick Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyber-cyan" />
                    <Input
                      id="nickname"
                      type="text"
                      placeholder="Takma adınız"
                      className="pl-10 bg-black/30 border-white/10 text-white placeholder:text-muted-foreground focus-visible:border-cyber-cyan"
                      {...register("nickname")}
                    />
                  </div>
                  {errors.nickname && (
                    <p className="text-xs text-red-500 mt-1">{errors.nickname.message}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                    Email
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
                    Password
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
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-muted-foreground">
                  Telefon Numarası
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyber-cyan" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="05XX XXX XX XX"
                    className="pl-10 bg-black/30 border-white/10 text-white placeholder:text-muted-foreground focus-visible:border-cyber-cyan"
                    {...register("phone", {
                      onChange: (e) => {
                        // Telefon numarası formatlaması
                        let value = e.target.value.replace(/\D/g, '') // Sadece rakamları al
                        
                        // 0 ile başlamıyorsa ve 5 ile başlıyorsa 0 ekle
                        if (value.length > 0 && !value.startsWith('0') && value.startsWith('5')) {
                          value = '0' + value
                        }
                        
                        // Formatla: 05XX XXX XX XX
                        if (value.length > 0) {
                          if (value.length <= 3) {
                            value = value
                          } else if (value.length <= 6) {
                            value = value.slice(0, 3) + ' ' + value.slice(3)
                          } else if (value.length <= 8) {
                            value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6)
                          } else {
                            value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 8) + ' ' + value.slice(8, 10)
                          }
                        }
                        
                        e.target.value = value
                      },
                    })}
                    maxLength={14} // 0XXX XXX XX XX formatı için
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Örnek: 05XX XXX XX XX
                </p>
              </div>

              {/* Not Student Checkbox */}
              <div className="flex items-center space-x-2 p-3 rounded-md border border-white/10 bg-black/30 hover:bg-black/40 transition-colors cursor-pointer"
                   onClick={() => handleNotStudentChange(!isNotStudentValue)}>
                <input
                  type="checkbox"
                  id="isNotStudent"
                  checked={isNotStudentValue}
                  onChange={(e) => handleNotStudentChange(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-black/50 text-cyber-cyan focus:ring-cyber-cyan focus:ring-offset-0 cursor-pointer"
                  {...register("isNotStudent")}
                />
                <label htmlFor="isNotStudent" className="text-sm font-medium text-muted-foreground cursor-pointer flex items-center gap-2">
                  <X className="h-4 w-4 text-cyber-cyan" />
                  Üniversite Okumuyorum
                </label>
              </div>

              {/* University Fields - Conditional */}
              {!isNotStudentValue && (
                <>
                  {/* University Field */}
                  <div className="space-y-2">
                    <label htmlFor="university" className="text-sm font-medium text-muted-foreground">
                      Üniversite İsmi
                    </label>
                    <div className="relative">
                      <School className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyber-cyan" />
                      <Input
                        id="university"
                        type="text"
                        placeholder="Üniversite adı"
                        className="pl-10 bg-black/30 border-white/10 text-white placeholder:text-muted-foreground focus-visible:border-cyber-cyan"
                        {...register("university")}
                      />
                    </div>
                    {errors.university && (
                      <p className="text-xs text-red-500 mt-1">{errors.university.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Department Field */}
                    <div className="space-y-2">
                      <label htmlFor="department" className="text-sm font-medium text-muted-foreground">
                        Bölüm Adı
                      </label>
                      <div className="relative">
                        <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyber-cyan" />
                        <Input
                          id="department"
                          type="text"
                          placeholder="Bölüm adı"
                          className="pl-10 bg-black/30 border-white/10 text-white placeholder:text-muted-foreground focus-visible:border-cyber-cyan"
                          {...register("department")}
                        />
                      </div>
                      {errors.department && (
                        <p className="text-xs text-red-500 mt-1">{errors.department.message}</p>
                      )}
                    </div>

                    {/* Grade Field */}
                    <div className="space-y-2">
                      <label htmlFor="grade" className="text-sm font-medium text-muted-foreground">
                        Sınıf
                      </label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyber-cyan z-10" />
                        <select
                          id="grade"
                          className="w-full h-10 pl-10 pr-10 rounded-md border border-white/10 bg-black/30 text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:border-cyber-cyan appearance-none cursor-pointer"
                          {...register("grade")}
                        >
                          <option value="">Sınıf Seçiniz</option>
                          {gradeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      {errors.grade && (
                        <p className="text-xs text-red-500 mt-1">{errors.grade.message}</p>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Submit Button and Login Link */}
              <div className="flex items-center justify-between pt-4">
                <Link
                  to="/auth/login"
                  className="text-sm text-muted-foreground hover:text-cyber-cyan transition-colors"
                >
                  Already registered?
                </Link>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-cyber-cyan to-cyber-purple hover:from-cyber-cyan/90 hover:to-cyber-purple/90 text-black font-semibold px-8"
                  disabled={isLoading}
                >
                  {isLoading ? "Kayıt yapılıyor..." : "REGISTER"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
