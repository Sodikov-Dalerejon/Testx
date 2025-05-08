
// const express = require('express');
// const TelegramBot = require('node-telegram-bot-api');
// const axios = require('axios');

// const app = express();
// const PORT = 3000;
// app.use(express.json());

// // 1. Telegram token (o'zingizning tokeningizni bu yerga yozing)
// const TELEGRAM_TOKEN = '7804079944:AAG_M5VlExBHG3WPH4mkrzuI8OQ6Nh1YN7w';
// const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// // 2. Kodlarni vaqtincha saqlovchi obyekt
// const verificationCodes = {};

// // 3. Telegramdan `/start <ref>` kelganda
// bot.onText(/\/start(?:\s+(.+))?/, async (msg, match) => {
//     const chatId = msg.chat.id;
//     const ref = match[1] || null;

//     // 6 xonali random code
//     const code = Math.floor(100000 + Math.random() * 900000).toString();
//     verificationCodes[chatId] = code;

//     // Foydalanuvchiga kodni yuborish
//     await bot.sendMessage(chatId, `🔐 Tasdiqlash kodingiz: ${code}`);

//     // Backendga yuborish (ref optional)
//     try {
//         await axios.post('http://localhost:3000/save-chatid', {
//             chatId,
//             code,
//             ref
//         });
//     } catch (err) {
//         console.error('❌ Backendga yuborishda xatolik:', err);
//     }
// });


// app.post('/save-chatid', (req, res) => {
//     const { chatId, code, ref } = req.body;

//     if (!chatId || !code || !ref) {
//         return res.status(400).json({ success: false, message: "chatId, code va ref kerak" });
//     }

//     console.log("✅ Kelgan ma'lumot:", { chatId, code, ref });

//     // Bu yerda kodni vaqtinchalik saqlash yoki DBga yozish mumkin
//     verificationCodes[ref] = { code, chatId }

//     return res.status(200).json({ success: true, message: "ChatID saqlandi" });
// });

// // 5. Kodni tekshiruvchi endpoint
// app.post('/verify/tg', (req, res) => {
//     const { ref, code } = req.body;

//     if (!ref || !code) {
//         return res.status(400).json({ error: 'ref va code kerak' });
//     }

//     const entry = verificationCodes[ref];
//     if (!entry) {
//         return res.status(404).json({ error: 'ref topilmadi' });
//     }

//     if (entry.code === code) {
//         return res.json({ success: true, chatId: entry.chatId });
//     } else {
//         return res.status(400).json({ success: false, message: '❌ Kod noto‘g‘ri' });
//     }
// });


// app.listen(PORT, () => {
//     console.log(`🚀 Server ishga tushdi: http://localhost:${PORT}`);
// });
