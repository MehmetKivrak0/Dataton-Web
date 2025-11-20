# Dataton-Web - CTF & Datathon Platform

Modern, ölçeklenebilir CTF (Capture The Flag) ve Datathon etkinlik platformu. 400+ eşzamanlı kullanıcıyı destekleyen, performanslı ve güvenli bir yarışma platformu.

## 📋 İçindekiler

- [Genel Bakış](#genel-bakış)
- [Mimari Yapı](#mimari-yapı)
- [Teknolojiler](#teknolojiler)
- [Kurulum](#kurulum)
- [Geliştirme](#geliştirme)
- [Deployment](#deployment)

## 🎯 Genel Bakış

Bu platform, "Siber Müdahale Ekibi Alfa" hikayesi etrafında kurgulanmış bir CTF ve Datathon etkinliği için geliştirilmiştir. Katılımcılar, "Gölge" adlı kötü karakterin saldırılarını durdurmak için 6 aşamalı görevleri tamamlar.

### Etkinlik Yapısı

1. **Aşama 1**: CTF - Web Keşif (robots.txt analizi)
2. **Aşama 2**: Datathon - Veri Temizleme ve EDA
3. **Aşama 3**: CTF - Steganografi (gizli mesaj çıkarma)
4. **Aşama 4**: Datathon - ML Sınıflandırma (Leaderboard 1)
5. **Aşama 5**: CTF - Kriptografi (Vigenere şifresi)
6. **Aşama 6**: Datathon - Optimizasyon TSP (Leaderboard 2)

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
└─────────────────┘
```

## 🚀 Teknolojiler

### Frontend
- React 19 + Vite
- Tailwind CSS + shadcn/ui
- Framer Motion
- React Router
- Zustand
- Socket.io Client
- React Hook Form + Zod

### Backend
- Node.js + Express
- Supabase (PostgreSQL)
- Socket.io
- Redis (Upstash - Cache & Rate Limiting)
- JWT Authentication

## 📦 Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn
- Supabase hesabı (ücretsiz)

### Adımlar

1. **Repository'yi klonlayın**
```bash
git clone <repository-url>
cd Dataton-Web
```

2. **Frontend kurulumu**
```bash
cd frontend
npm install
```

3. **Backend kurulumu**
```bash
cd backend
npm install
```

4. **Supabase yapılandırması**
   - [Supabase](https://supabase.com) hesabı oluşturun
   - Yeni proje oluşturun
   - `.env` dosyalarını yapılandırın (detaylar için `frontend/README.md` ve `backend/README.md`)

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

## 📁 Proje Yapısı

```
Dataton-Web/
├── frontend/          # React uygulaması
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── lib/
│   │   └── ...
│   └── README.md
│
├── backend/           # Node.js API
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   └── ...
│   └── README.md
│
├── database/          # SQL migrations
│   └── migrations/
│
└── README.md          # Bu dosya
```

## 🎨 Tasarım

- **Tema**: Cyber CTF (Karanlık, neon efektler)
- **Renkler**: Cyan (#00d9ff) ve Purple (#8b5cf6) vurgular
- **Fontlar**: Orbitron (başlıklar), Inter (body)

Detaylı tasarım bilgileri için `frontend/README.md` dosyasına bakın.

## 🔒 Güvenlik

- JWT Authentication
- Rate Limiting
- Input Validation
- SQL Injection Protection
- CORS yapılandırması

## 📊 Performans

### 400+ Eşzamanlı Kullanıcı İçin Optimizasyonlar

1. **Supabase Connection Pooling** - Otomatik bağlantı yönetimi
2. **Redis Cache** - Flag doğrulama ve session cache
3. **Database Indexing** - Hızlı sorgular
4. **API Rate Limiting** - Abuse önleme
5. **CDN** (İsteğe bağlı) - Statik dosya servisi

## 🚀 Deployment

### Frontend
- **Vercel** veya **Netlify** (önerilen)
- Otomatik CI/CD
- CDN dahil

### Backend
- **Railway** veya **Render**
- Environment variables yapılandırın
- Supabase connection string'i ekleyin

### Supabase
- Otomatik hosting
- Connection pooling dahil
- SSL sertifikaları otomatik

## 📚 Dokümantasyon

- [Frontend README](frontend/README.md) - Detaylı frontend dokümantasyonu
- [Backend README](backend/README.md) - Detaylı backend dokümantasyonu (oluşturulacak)
- [Supabase Docs](https://supabase.com/docs)

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje özel bir etkinlik için geliştirilmiştir.

---

**Not**: Bu platform 400+ eşzamanlı kullanıcıyı desteklemek için optimize edilmiştir. Supabase'in connection pooling özelliği sayesinde yüksek trafikte stabil çalışır.

