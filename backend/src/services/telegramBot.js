const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Konfiguratsiyani yuklash
dotenv.config();

// Telegram bot token
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_GROUP_ID = process.env.TELEGRAM_GROUP_ID;
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://buloqboshi-startuplar.uz';

// Botni yaratish (faqat token bo'lsa)
let telegramBot = null;
if (TELEGRAM_BOT_TOKEN) {
  try {
    telegramBot = new TelegramBot(TELEGRAM_BOT_TOKEN, {
      polling: false // Polling o'chirilgan, chunki production da muammo keltirib chiqaradi
    });
    console.log('Telegram bot muvaffaqiyatli yaratildi');
  } catch (error) {
    console.log('Telegram bot yaratishda xatolik:', error.message);
    telegramBot = null;
  }
}

// Startup ariza haqida post yuborish funksiyasi
const sendStartupApplicationToTelegram = async (applicationData) => {
  try {
    if (!telegramBot || !TELEGRAM_GROUP_ID) {
      console.log('Telegram bot yoki group ID mavjud emas');
      return null;
    }

    // Sana va vaqtni formatlash
    const formattedDate = new Date(applicationData.createdAt).toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Asoschilar ro'yxatini formatlash
    const foundersList = applicationData.founders.map(founder => `• ${founder}`).join('\n');

    // Post matni
    const messageText = `🚀 *Yangi startup ariza kelib tushdi!*

📌 *${applicationData.startupName}*

📝 *Tavsif:* ${applicationData.description.substring(0, 300)}${applicationData.description.length > 300 ? '...' : ''}

👥 *Asoschilar:*
${foundersList}

📧 *Email:* ${applicationData.email}
📱 *Telefon:* ${applicationData.phone}

📅 *Ariza sanasi:* ${formattedDate}
🔢 *Ariza raqami:* ${applicationData.applicationNumber}

📋 *Jamoa a'zolari:* ${applicationData.teamMembers.length} ta

✅ *Admin paneldan ko'rib chiqing!*`;

    // Inline tugma faqat haqiqiy URL bo'lganda
    let messageOptions = {
      parse_mode: 'Markdown'
    };

    // Agar FRONTEND_URL localhost bo'lmasa, tugma qo'shamiz
    if (FRONTEND_URL && !FRONTEND_URL.includes('localhost')) {
      const adminUrl = `${FRONTEND_URL}/admin/applications`;
      messageOptions.reply_markup = {
        inline_keyboard: [[
          {
            text: "👀 Ariza ko'rish",
            url: adminUrl
          }
        ]]
      };
    }

    let messageId;

    // Agar attachmentlar bo'lsa, birinchi rasmni yuborish
    const imageAttachments = applicationData.attachments.filter(att => {
      const filename = typeof att === 'string' ? att : (att.filename || att.originalname || '');
      return filename.match(/\.(jpg|jpeg|png|gif)$/i);
    });

    if (imageAttachments.length > 0) {
      const firstAtt = imageAttachments[0];
      let imageSource;

      if (typeof firstAtt === 'string') {
        const imagePath = path.join(__dirname, '../../uploads/applications', firstAtt);
        if (fs.existsSync(imagePath)) {
          imageSource = fs.createReadStream(imagePath);
        }
      } else if (firstAtt.data) {
        // Base64 dan buffer yaratish
        imageSource = Buffer.from(firstAtt.data, 'base64');
      }

      if (imageSource) {
        const sentMessage = await telegramBot.sendPhoto(
          TELEGRAM_GROUP_ID,
          imageSource,
          {
            caption: messageText,
            ...messageOptions
          }
        );
        messageId = sentMessage.message_id.toString();
      } else {
        // Rasm topilmasa, faqat matn yuboramiz
        const sentMessage = await telegramBot.sendMessage(
          TELEGRAM_GROUP_ID,
          messageText,
          messageOptions
        );
        messageId = sentMessage.message_id.toString();
      }
    } else {
      // Rasm bo'lmasa, faqat matn yuboramiz
      const sentMessage = await telegramBot.sendMessage(
        TELEGRAM_GROUP_ID,
        messageText,
        messageOptions
      );
      messageId = sentMessage.message_id.toString();
    }

    console.log('Telegram startup ariza post muvaffaqiyatli yuborildi, Message ID:', messageId);
    return messageId;

  } catch (error) {
    console.error('Telegram ga yuborishda xatolik:', error.message);
    return null; // Xato bo'lsa ham ariza yaratilsin
  }
};

// Bot xatolarini kuzatish - polling o'chirilgan
// if (telegramBot) {
//   telegramBot.on('polling_error', (error) => {
//     console.error('Telegram bot polling error:', error);
//   });
// }


// Bot qabul qilgan xabarlarni kuzatish (debug uchun) - o'chirilgan
// if (telegramBot) {
//   telegramBot.on('message', (msg) => {
//     console.log('Received message:', msg.text);
//   });
// }

module.exports = {
  telegramBot,
  sendStartupApplicationToTelegram
};
