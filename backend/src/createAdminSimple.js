const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Konfiguratsiyani yuklash
require('dotenv').config();

const createUsers = async () => {
  try {
    // MongoDB ga ulanish
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/buloqboshi-startuplar');
    console.log('MongoDB ga ulanish muvaffaqiyatli');

    // To'g'ridan-to'g'ri MongoDB collection orqali yaratish
    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');

    // Parollarni hash qilish
    const ownerPassword = await bcrypt.hash('Azizbek0717', 10);
    const adminPassword = await bcrypt.hash('admin123', 10);

    // Owner yaratish
    const existingOwner = await usersCollection.findOne({ email: 'muhammadazizyaqubov2@gmail.com' });
    if (!existingOwner) {
      await usersCollection.insertOne({
        name: 'Muhammad Aziz Yaqubov',
        email: 'muhammadazizyaqubov2@gmail.com',
        password: ownerPassword,
        role: 'owner',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log('✅ Owner yaratildi:');
      console.log('   Email: muhammadazizyaqubov2@gmail.com');
      console.log('   Parol: Azizbek0717');
      console.log('   Rol: Owner');
    } else {
      console.log('⚠️  Owner allaqachon mavjud');
    }

    // Admin yaratish
    const existingAdmin = await usersCollection.findOne({ email: 'admin@buloqboshi.uz' });
    if (!existingAdmin) {
      await usersCollection.insertOne({
        name: 'Admin User',
        email: 'admin@buloqboshi.uz',
        password: adminPassword,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log('\n✅ Admin yaratildi:');
      console.log('   Email: admin@buloqboshi.uz');
      console.log('   Parol: admin123');
      console.log('   Rol: Admin');
    } else {
      console.log('⚠️  Admin allaqachon mavjud');
    }

    console.log('\n🎉 Foydalanuvchilar muvaffaqiyatli yaratildi!');
    
  } catch (error) {
    console.error('Xatolik:', error);
  } finally {
    await mongoose.disconnect();
  }
};

createUsers();
