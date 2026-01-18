const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Konfiguratsiyani yuklash
dotenv.config();

// Application modeli (oddiy versiya)
const ApplicationSchema = new mongoose.Schema({
  applicationNumber: String,
  startupName: String,
  founders: [String],
  email: String,
  description: String,
  fullName: String,
  lastName: String,
  status: String,
  createdAt: Date
}, { strict: false });

const Application = mongoose.model('Application', ApplicationSchema);

async function checkApplications() {
  try {
    // MongoDB ga ulanish
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/buloqboshi-startuplar');
    console.log('MongoDB ga ulanish muvaffaqiyatli');

    // Barcha arizalarni topish
    const applications = await Application.find({}).sort({ createdAt: -1 });
    console.log(`Jami ${applications.length} ta ariza topildi:`);

    applications.forEach((app, index) => {
      console.log(`${index + 1}. ${app.applicationNumber || 'N/A'} - ${app.startupName || app.fullName || 'Nomsiz'} (${app.status || 'no-status'})`);
      console.log(`   startupName: ${app.startupName ? 'BOR' : 'YO\'Q'}`);
      console.log(`   founders: ${app.founders && app.founders.length > 0 ? 'BOR' : 'YO\'Q'}`);
      console.log(`   email: ${app.email ? 'BOR' : 'YO\'Q'}`);
      console.log(`   description: ${app.description ? 'BOR' : 'YO\'Q'}`);
      console.log(`   fullName: ${app.fullName ? 'BOR' : 'YO\'Q'}`);
      console.log('');
    });

  } catch (error) {
    console.error('Xatolik:', error);
  } finally {
    await mongoose.connection.close();
  }
}

checkApplications();