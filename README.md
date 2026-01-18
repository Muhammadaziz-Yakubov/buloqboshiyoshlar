# Buloqboshi Startuplar

Buloqboshi tumanidagi startuplarni qo'llab-quvvatlash uchun yaratilgan to'liq web platforma. Y Combinator modeliga asoslangan bo'lib, startup arizalarini qabul qilish, moliyaviy yordam ko'rsatish va inkubatsiya dasturini o'z ichiga oladi.

## Texnologiyalar

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **Multer** - File uploads
- **Telegram Bot API** - Event notifications

### Frontend
- **React.js** - UI library
- **Tailwind CSS** - CSS framework
- **React Router** - Navigation
- **Axios** - HTTP client
- **Context API** - State management

## Xususiyatlar

### 🏠 Asosiy sahifa
- Hero section
- Platforma maqsadi
- Muvaffaqiyat hikoyalari
- Startup statistikasi
- Kontakt ma'lumotlari

### 👤 Foydalanuvchi rollari
- **Owner** - To'liq huquqlar, adminlarni boshqarish
- **Admin** - Startup arizalarini boshqarish
- **User** - Startup ariza topshirish

### 📝 Ariza tizimi
- Startup ma'lumotlari
- Jamoa a'zolari
- Fayl yuklash
- Status kuzatuv

### 🤖 Telegram bot
- Avtomatik startup ariza bildirishnomalari
- Rasm qo'llab-quvvatlash
- Admin panelga havolalar

## O'rnatish

### Backend
```bash
cd backend
npm install
cp .env.example .env
# .env faylini to'ldiring
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Muhit o'zgaruvchilari

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/buloqboshi-startuplar
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=30d
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_GROUP_ID=your-group-id
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000
MAX_FILE_SIZE=10485760
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## API Endpointlar

### Auth
- `POST /api/auth/register` - Ro'yxatdan o'tish
- `POST /api/auth/login` - Kirish
- `GET /api/auth/me` - Profil
- `PUT /api/auth/profile` - Profil yangilash
- `PUT /api/auth/password` - Parol o'zgartirish

### Startuplar
- `GET /api/startups` - Qabul qilingan startup ro'yxati (Admin)
- `GET /api/startups/stats` - Startup statistikasi (Admin)

### Arizalar
- `GET /api/applications` - Arizalar ro'yxati (Admin)
- `POST /api/applications` - Yangi ariza
- `GET /api/applications/:id` - Ariza tafsilotlari
- `PATCH /api/applications/:id/status` - Status o'zgartirish (Admin)
- `DELETE /api/applications/:id` - Ariza o'chirish (Admin)
- `GET /api/applications/stats/summary` - Statistika

### Foydalanuvchilar (Admin)
- `GET /api/users` - Foydalanuvchilar ro'yxati (Owner)
- `POST /api/users/admin` - Admin yaratish (Owner)
- `PATCH /api/users/:id/role` - Rol o'zgartirish (Owner)
- `DELETE /api/users/:id` - Foydalanuvchi o'chirish (Owner)
- `GET /api/users/stats/summary` - Statistika

## Struktura

```
buloqboshi-startuplar/
├── backend/
│   ├── src/
│   │   ├── models/          # Mongoose modellari
│   │   ├── routes/          # API marshrutlari
│   │   ├── middleware/      # Middleware
│   │   ├── services/        # Xizmatlar (Telegram bot)
│   │   └── app.js           # Asosiy fayl
│   ├── uploads/             # Yuklangan fayllar
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Komponentlar
│   │   ├── pages/           # Sahifalar
│   │   ├── contexts/        # Context API
│   │   └── App.js           # Asosiy komponent
│   └── package.json
└── README.md
```

## Telegram bot sozlash

1. [@BotFather](https://t.me/BotFather) orqali yangi bot yarating
2. Bot tokenini oling
3. Guruh yarating va botni qo'shing
4. Guruh ID sini oling (-100... formatda)
5. `.env` fayliga token va ID ni kiriting

## Ishga tushirish

1. MongoDB ishga tushirilganligini tekshiring
2. Backend ni ishga tushiring: `npm run dev`
3. Frontend ni ishga tushiring: `npm start`
4. Brauzerda `http://localhost:3000` oching

## Rivojlantirish

### Yangi Owner yaratish
Birinchi marta ishga tushirgandan so'ng, MongoDB da to'g'ridan-to'g'ri user yaratib, role ni 'owner' qiling.

### Admin qo'shish
Owner dashboard orqali yangi admin qo'shishingiz mumkin.

### Startup arizasi qabul qilish
Admin panel orqali startup arizalarini ko'rib chiqing va qabul qiling. Har bir yangi ariza avtomatik ravishda Telegram guruhiga yuboriladi.

## Litsenziya

ISC License
