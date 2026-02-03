const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Konfiguratsiyani yuklash
dotenv.config();

// Application modeli (oddiy versiya)
const ApplicationSchema = new mongoose.Schema({
    applicationNumber: String,
    startupName: String,
    attachments: [mongoose.Schema.Types.Mixed],
    createdAt: Date
}, { strict: false });

const Application = mongoose.model('Application', ApplicationSchema);

async function checkApplications() {
    try {
        // MongoDB ga ulanish
        const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/buloqboshi-startuplar';
        await mongoose.connect(uri);
        console.log('MongoDB ga ulanish muvaffaqiyatli:', uri);

        // Barcha arizalarni topish
        const applications = await Application.find({}).sort({ createdAt: -1 }).limit(10);
        console.log(`Oxirgi ${applications.length} ta ariza topildi:`);

        applications.forEach((app, index) => {
            console.log(`${index + 1}. ${app.applicationNumber || 'N/A'} - ${app.startupName || 'Nomsiz'}`);
            console.log(`   Attachments: ${JSON.stringify(app.attachments).substring(0, 100)}...`);
            if (app.attachments && app.attachments.length > 0) {
                app.attachments.forEach((att, i) => {
                    console.log(`     - Attachment ${i}: Type: ${typeof att}, Value: ${typeof att === 'object' ? 'OBJECT (keys: ' + Object.keys(att).join(',') + ')' : att}`);
                });
            }
            console.log('');
        });

    } catch (error) {
        console.error('Xatolik:', error);
    } finally {
        await mongoose.connection.close();
    }
}

checkApplications();
