const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const ApplicationSchema = new mongoose.Schema({
    attachments: [mongoose.Schema.Types.Mixed]
}, { strict: false });

const Application = mongoose.model('Application', ApplicationSchema);

async function debugApp() {
    try {
        const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/buloqboshi-startuplar';
        await mongoose.connect(uri);
        console.log('Connected to DB');

        const appId = '6981e69c12e6286a478be10e';
        const app = await Application.findById(appId);

        if (!app) {
            console.log('Application NOT FOUND');
        } else {
            console.log('Application Found:', app.startupName);
            console.log('Attachments length:', app.attachments ? app.attachments.length : 'N/A');
            console.log('Attachments content:', JSON.stringify(app.attachments, null, 2));
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.connection.close();
    }
}

debugApp();
