const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// Konfiguratsiyani yuklash
require('dotenv').config();

const createUsers = async () => {
  try {
    // MongoDB ga ulanish
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/buloqboshi-startuplar');
    console.log('MongoDB ga ulanish muvaffaqiyatli');

    // Avvalgi foydalanuvchilarni tekshirish
    const existingOwner = await User.findOne({ email: 'muhammadazizyaqubov2@gmail.com' });
    const existingAdmin = await User.findOne({ email: 'admin@buloqboshi.uz' });

    if (existingOwner) {
      console.log('⚠️  Owner allaqachon mavjud');
    } else {
      // Owner yaratish (parolni hash qilmasdan, chunki middleware avtomatik qiladi)
      const owner = new User({
        name: 'Muhammad Aziz Yaqubov',
        email: 'muhammadazizyaqubov2@gmail.com',
        password: 'Azizbek0717', // Middleware avtomatik hash qiladi
        role: 'owner'
      });

      await owner.save();
      console.log('✅ Owner yaratildi:');
      console.log('   Email: muhammadazizyaqubov2@gmail.com');
      console.log('   Parol: Azizbek0717');
      console.log('   Rol: Owner');
    }

    if (existingAdmin) {
      console.log('⚠️  Admin allaqachon mavjud');
    } else {
      // Admin yaratish
      const admin = new User({
        name: 'Admin User',
        email: 'admin@buloqboshi.uz',
        password: 'admin123', // Middleware avtomatik hash qiladi
        role: 'admin'
      });

      await admin.save();
      console.log('\n✅ Admin yaratildi:');
      console.log('   Email: admin@buloqboshi.uz');
      console.log('   Parol: admin123');
      console.log('   Rol: Admin');
    }

    console.log('\n🎉 Foydalanuvchilar muvaffaqiyatli yaratildi!');
    
  } catch (error) {
    console.error('Xatolik:', error);
  } finally {
    await mongoose.disconnect();
  }
};

createUsers();
