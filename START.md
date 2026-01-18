# Buloqboshi Startuplar - Ishga tushirish

## 1. Backend ni ishga tushirish

```bash
# Backend papkasiga o'ting
cd backend

# .env faylini yarating
copy .env.example .env

# .env faylini oching va quyidagilarni to'ldiring:
# - MONGODB_URI: MongoDB ulanish manzili
# - JWT_SECRET: Maxfiy kalit (ixtiyoriy)
# - TELEGRAM_BOT_TOKEN: Telegram bot tokeni
# - TELEGRAM_GROUP_ID: Telegram guruh ID si

# Dependency larni o'rnating
npm install

# Serverni ishga tushuring
npm run dev
```

Backend `http://localhost:5000` da ishlaydi

## 2. Frontend ni ishga tushirish

```bash
# Yangi terminal oching
# Frontend papkasiga o'ting
cd frontend

# .env faylini yarating
copy .env.example .env

# Dependency larni o'rnating
npm install

# Ilova ni ishga tushuring
npm start
```

Frontend `http://localhost:3000` da ochiladi

## 3. Birinchi Owner yaratish

1. MongoDB Compass orqali `users` kolleksiyasiga o'ting
2. Quyidagi user ni yarating:
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "$2a$10$...", // bcrypt hash
  "role": "owner",
  "createdAt": new Date(),
  "updatedAt": new Date()
}
```

Yoki backendda quyidagi kodni bir marta ishga tushiring:
```javascript
const User = require('./src/models/User');
const bcrypt = require('bcryptjs');

const createOwner = async () => {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const owner = new User({
    name: 'Admin User',
    email: 'admin@example.com',
    password: hashedPassword,
    role: 'owner'
  });
  await owner.save();
  console.log('Owner created successfully');
};

createOwner();
```

## 4. Telegram Bot sozlash

1. Telegramda @BotFather ni toping
2. `/newbot` buyrug'ini yuboring
3. Bot nomi va username ni kiriting
4. Tokenni olib `.env` fayliga qo'shing
5. Yangi guruh yarating
6. Guruhga botni qo'shing
7. Guruh ID sini olib `.env` fayliga qo'shing

## 5. Kirish

1. Brauzerda `http://localhost:3000` oching
2. "Kirish" tugmasini bosing
3. Email: `admin@example.com`
4. Parol: `admin123`
5. Admin panelga o'ting

## 6. Startup arizalarini boshqarish

1. Admin panel → Arizalar
2. Yangi kelgan startup arizalarini ko'ring
3. Arizani ko'rib chiqing va statusini o'zgartiring
4. Har bir yangi ariza Telegramga avtomatik yuboriladi

## Qo'shimcha ma'lumotlar

- Backend port: 5000
- Frontend port: 3000
- Database: MongoDB (default port: 27017)
- Uploads: `backend/uploads/` papkasiga saqlanadi

## Xatoliklar

Agar xatolik yuz bersa:
1. MongoDB ishga tushirilganligini tekshiring
2. .env fayllar to'g'ri to'ldirilganligini tekshiring
3. Portlar band bo'lmasligini tekshiring
