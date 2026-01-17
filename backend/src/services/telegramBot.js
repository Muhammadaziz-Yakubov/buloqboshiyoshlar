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

// Tadbir haqida post yuborish funksiyasi
const sendEventToTelegram = async (eventData) => {
  try {
    if (!telegramBot || !TELEGRAM_GROUP_ID) {
      console.log('Telegram bot yoki group ID mavjud emas');
      return null;
    }

    // Sana va vaqtni formatlash
    const formattedDate = new Date(eventData.date).toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Post matni
    const messageText = `🚀 *Yangi tadbir e'lon qilindi!*

📌 *${eventData.title}*

📝 ${eventData.description}

📅 *Sana:* ${formattedDate}
⏰ *Vaqt:* ${eventData.time}
📍 *Joy:* ${eventData.location}

✅ *Ro'yxatdan o'tish uchun saytimizga tashrif buyuring!*`;

    // Inline tugma faqat haqiqiy URL bo'lganda
    let messageOptions = {
      parse_mode: 'Markdown'
    };

    // Agar FRONTEND_URL localhost bo'lmasa, tugma qo'shamiz
    if (FRONTEND_URL && !FRONTEND_URL.includes('localhost')) {
      const registerUrl = `${FRONTEND_URL}/events/register?eventId=${eventData.eventId || ''}`;
      messageOptions.reply_markup = {
        inline_keyboard: [[
          {
            text: "✅ Ro'yxatdan o'tish",
            url: registerUrl
          }
        ]]
      };
    }

    let messageId;

    // Rasm fayli bilan yuborish
    if (eventData.imagePath) {
      const fullImagePath = path.join(__dirname, '../../', eventData.imagePath);

      if (fs.existsSync(fullImagePath)) {
        const sentMessage = await telegramBot.sendPhoto(
          TELEGRAM_GROUP_ID,
          fs.createReadStream(fullImagePath),
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

    console.log('Telegram post muvaffaqiyatli yuborildi, Message ID:', messageId);
    return messageId;

  } catch (error) {
    console.error('Telegram ga yuborishda xatolik:', error.message);
    return null; // Xato bo'lsa ham tadbir yaratilsin
  }
};

// Postni o'chirish funksiyasi
const deleteTelegramPost = async (messageId) => {
  try {
    await telegramBot.deleteMessage(TELEGRAM_GROUP_ID, messageId);
    console.log('Telegram post muvaffaqiyatli o\'chirildi');
    return true;
  } catch (error) {
    console.error('Telegram postni o\'chirishda xatolik:', error);
    return false;
  }
};

// Postni yangilash funksiyasi
const updateTelegramPost = async (messageId, eventData) => {
  try {
    // Avvalgi postni o'chirish
    await deleteTelegramPost(messageId);

    // Yangi post yuborish
    const newMessageId = await sendEventToTelegram(eventData);

    console.log('Telegram post muvaffaqiyatli yangilandi');
    return newMessageId;

  } catch (error) {
    console.error('Telegram postni yangilashda xatolik:', error);
    throw new Error('Telegram postni yangilash muvaffaqiyatsiz bo\'ldi');
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
  sendEventToTelegram,
  deleteTelegramPost,
  updateTelegramPost
};
