# Dataton-Web - CTF & Datathon Platform

Modern, ölçeklenebilir CTF (Capture The Flag) ve Datathon etkinlik platformu. 400+ eşzamanlı kullanıcıyı destekleyen, performanslı ve güvenli bir yarışma platformu.

## 🏗️ Mimari Yapı

```
┌─────────────────┐
│  Frontend       │  React 19 + Vite + Tailwind CSS
│  (React)        │  shadcn/ui + Framer Motion
└────────┬────────┘
         │
         │ HTTP/WebSocket
         │
┌────────▼────────┐
│  Backend API    │  Node.js + Express
│  (Node.js)      │  Socket.io + Rate Limiting
└────────┬────────┘
         │
         │ Connection Pooling
         │
┌────────▼────────┐
│  Supabase       │  PostgreSQL Database
│  (Database)     │  Real-time Subscriptions
└────────┬────────┘
         │
┌────────▼────────┐
│  Redis Cache    │  Upstash Redis (Cache & Rate Limiting)
│  (Optional)     │
└─────────────────┘
```

## 🚀 Teknolojiler

### Frontend
- **React 19** - UI Framework
- **Vite** - Build Tool (Hızlı HMR)
- **Tailwind CSS** - Utility-first CSS Framework
- **shadcn/ui** - Modern, özelleştirilebilir UI bileşenleri
- **Framer Motion** - Smooth animasyonlar
- **React Router v6** - Client-side routing
- **Zustand** - Hafif state management
- **Socket.io Client** - Real-time güncellemeler
- **React Hook Form + Zod** - Performanslı form yönetimi ve validasyon
- **Axios** - HTTP client
- **React Hot Toast** - Bildirimler
- **Recharts** - Grafik ve görselleştirme

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Supabase** - PostgreSQL veritabanı (Connection pooling dahil)
- **Socket.io** - Real-time bidirectional communication
- **Redis** (Upstash) - Cache ve rate limiting
- **JWT** - Authentication token'ları
- **Bcrypt** - Şifre hashleme
- **Multer** - Dosya upload yönetimi

### Veritabanı (Supabase)
- **PostgreSQL** - İlişkisel veritabanı
- **Connection Pooling** - 400+ eşzamanlı kullanıcı desteği
- **Real-time Subscriptions** - Anlık veri güncellemeleri
- **Row Level Security (RLS)** - Güvenlik politikaları
- **Storage API** - Zip dosyaları için

## 📦 Kurulum

### Gereksinimler
- Node.js 18+ 
- npm veya yarn
- Supabase hesabı (ücretsiz)

### Frontend Kurulumu

```bash
cd frontend
npm install
```

### Backend Kurulumu

```bash
cd backend
npm install
```

### Supabase Kurulumu

1. [Supabase](https://supabase.com) hesabı oluşturun
2. Yeni proje oluşturun
3. `.env` dosyasını oluşturun:

```env
SUPABASE_URL=your-project-url
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL=your-connection-string
```

4. Veritabanı şemasını çalıştırın (SQL migrations)

## 🏃 Geliştirme

### Frontend

```bash
cd frontend
npm run dev
```

Frontend `http://localhost:5173` adresinde çalışacak.

### Backend

```bash
cd backend
npm run dev
```

Backend `http://localhost:3000` adresinde çalışacak.

## 🎨 Tasarım Sistemi

### Renkler (CTF Cyber Theme)
- **Cyber Dark**: `#0a0e27` - Ana arka plan
- **Cyber Dark Secondary**: `#1a1f3a` - İkincil arka plan
- **Cyber Cyan**: `#00d9ff` - Vurgu rengi (neon efektler)
- **Cyber Purple**: `#8b5cf6` - İkincil vurgu
- **Success**: `#10b981` - Flag bulundu
- **Danger**: `#ef4444` - Hata durumları

### Fontlar
- **Orbitron** - Başlıklar için (futuristik, CTF teması)
- **Rajdhani** - Alt başlıklar için
- **Inter** - Body text için (okunabilirlik)

### Özel Utility Class'lar
- `.glow-cyan` - Cyan glow efekti
- `.glow-purple` - Purple glow efekti
- `.neon-border` - Neon kenarlık
- `.glass` - Glassmorphism efekti

## 📁 Proje Yapısı

```
Dataton-Web/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/              # shadcn/ui bileşenleri
│   │   │   └── ...              # Özel bileşenler
│   │   ├── pages/               # Sayfa bileşenleri
│   │   │   ├── Landing.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── stages/          # Aşama sayfaları
│   │   ├── lib/
│   │   │   ├── utils.js         # Utility fonksiyonlar
│   │   │   └── supabase.js      # Supabase client
│   │   ├── hooks/               # Custom React hooks
│   │   ├── store/               # Zustand store
│   │   ├── services/            # API servisleri
│   │   └── utils/               # Yardımcı fonksiyonlar
│   ├── public/                  # Statik dosyalar
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── routes/              # API route'ları
│   │   ├── controllers/         # İş mantığı
│   │   ├── models/              # Veritabanı modelleri
│   │   ├── middleware/          # Auth, rate limiting
│   │   ├── services/            # Supabase servisleri
│   │   ├── utils/               # Yardımcı fonksiyonlar
│   │   └── config/              # Yapılandırma
│   ├── uploads/                 # Zip dosyaları
│   └── package.json
│
└── database/
    └── migrations/              # SQL migration dosyaları
```

## 🗄️ Veritabanı Şeması (Supabase)

### Ana Tablolar

- **users** - Kullanıcı bilgileri
- **teams** - Takım bilgileri
- **stages** - Aşama tanımları
- **submissions** - Flag gönderimleri
- **leaderboard_ml** - ML model skorları
- **leaderboard_optimization** - Optimizasyon skorları
- **user_progress** - Kullanıcı ilerlemesi

## 🎯 Özellikler

### Frontend
- ✅ Modern, responsive tasarım (mobile-first)
- ✅ Dark mode (varsayılan)
- ✅ Real-time leaderboard (Socket.io)
- ✅ Aşamalı görev sistemi (6 aşama)
- ✅ Flag doğrulama formu
- ✅ Dosya indirme sistemi
- ✅ Animasyonlu UI (Framer Motion)
- ✅ CTF cyber teması
- ✅ Progress tracking
- ✅ Toast bildirimleri

### Backend
- ✅ RESTful API
- ✅ JWT authentication
- ✅ Rate limiting (Redis ile)
- ✅ Flag doğrulama sistemi
- ✅ Dosya upload/download
- ✅ Real-time updates (Socket.io)
- ✅ Connection pooling (Supabase)
- ✅ Error handling & logging
- ✅ CORS yapılandırması

### Veritabanı (Supabase)
- ✅ PostgreSQL (güçlü ve ölçeklenebilir)
- ✅ Connection pooling (400+ eşzamanlı kullanıcı)
- ✅ Real-time subscriptions
- ✅ Row Level Security (RLS)
- ✅ Storage API (zip dosyaları)
- ✅ Otomatik API oluşturma

## 🔒 Güvenlik

- **JWT Tokens** - Güvenli authentication
- **Rate Limiting** - API abuse önleme
- **CORS** - Cross-origin koruması
- **Input Validation** - Zod ile validasyon
- **SQL Injection Protection** - Supabase prepared statements
- **XSS Protection** - React otomatik escaping
- **Flag Encryption** - Hassas verilerin korunması

## 📊 Performans Optimizasyonları

### 400+ Eşzamanlı Kullanıcı İçin

1. **Connection Pooling** (Supabase)
   - Otomatik connection yönetimi
   - 400+ bağlantıyı verimli yönetir

2. **Redis Cache** (Upstash)
   - Flag doğrulama cache
   - Session cache
   - Rate limiting

3. **Database Indexing**
   - Sık sorgulanan kolonlar için index'ler
   - Hızlı arama ve sıralama

4. **API Rate Limiting**
   - Kullanıcı başına limit
   - IP bazlı koruma

5. **CDN** (İsteğe bağlı)
   - Statik dosyalar için
   - Zip dosyaları için

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
```

### Backend (Railway/Render)
```bash
cd backend
npm start
```

### Supabase
- Otomatik hosting
- Connection pooling dahil
- SSL sertifikaları otomatik

## 📝 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Backend (.env)
```env
PORT=3000
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL=your-connection-string
REDIS_URL=your-redis-url (optional)
JWT_SECRET=your-jwt-secret
NODE_ENV=development
```

## 🧪 Test

```bash
# Frontend testleri
cd frontend
npm run test

# Backend testleri
cd backend
npm run test
```

## 📚 Dokümantasyon

- [Supabase Docs](https://supabase.com/docs)
- [React Router](https://reactrouter.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje özel bir etkinlik için geliştirilmiştir.

## 👥 Ekip

- Frontend: React + Tailwind CSS + shadcn/ui
- Backend: Node.js + Express + Supabase
- Database: PostgreSQL (Supabase)

---

**Not**: Bu platform 400+ eşzamanlı kullanıcıyı desteklemek için optimize edilmiştir. Supabase'in connection pooling özelliği sayesinde yüksek trafikte stabil çalışır.
