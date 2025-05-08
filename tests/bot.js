// // const TBot = require("node-telegram-bot-api")
// // const express = require("express")
// // const { Client } = require("whatsapp-web.js")
// // const qrcode = require("qrcode-terminal")
// // const client = new Client()
// // const router = express.Router()
// // const token = process.env.TEL_BOT_TOKEN
// // const bot = new TBot(token, { polling: true })

// // router.post("/verify/tg", async (req, res) => {
// //     function gen() {
// //         const num = Math.floor(100000 + Math.random() * 900000);
// //         return num
// //     }
// //     const SecretNumber = gen()
// //     const { pNumber } = req.body
// //     await bot.onText(/\/start/, (msg) => {
// //         const uNumber = msg.contact.phone_number
// //         if (uNumber == pNumber) {
// //             bot.sendMessage(chatId, `Your verification code is: ${SecretNumber}`)
// //         }
// //     })
// // })

// // client.on('qr', qr => {
// //     console.log("Qrcode: ")
// //     qrcode.generate(qr, { small: true })
// // })

// // client.on("ready", () => {
// //     console.log("Bot ready")
// //     const number = "992800160687"

// //     const chatId = number + "@c.us"
// //     const message = "Hello world"
// //     client.sendMessage(chatId, message)
// //         .then(res => console.log(res))
// //         .catch(err => console.log(err))
// // })

// // client.initialize()

// const express = require('express');
// const { Client } = require('whatsapp-web.js');
// const qrcode = require('qrcode-terminal');

// const app = express();
// const PORT = 3000;

// app.use(express.json()); // JSON requestlarni parse qiladi

// // WhatsApp client
// const client = new Client();
// let verificationCodes = {}; // Bu yerda telefon => kod saqlanadi

// // QR code chiqishi
// client.on('qr', qr => {
//     console.log('QR kodni skaner qiling:');
//     qrcode.generate(qr, { small: true });
// });

// // Tayyor bo‘lganda
// client.on('ready', () => {
//     console.log('✅ WhatsApp ulandi!');
// });

// app.post('/verify/wp', async (req, res) => {
//     const { phone } = req.body;

//     if (!phone || !/^\d{12}$/.test(phone)) {
//         return res.status(400).json({ error: 'Noto‘g‘ri raqam formati. Masalan: 998901234567' });
//     }

//     const chatId = phone + '@c.us';

//     try {
//         const isRegistered = await client.isRegisteredUser(chatId);
//         if (!isRegistered) {
//             return res.status(404).json({ error: 'Bu raqam WhatsApp’da topilmadi' });
//         }

//         // 6 xonali tasodifiy kod
//         const code = Math.floor(100000 + Math.random() * 900000).toString();

//         // Kodni xotirada saqlaymiz
//         verificationCodes[phone] = code;

//         // WhatsApp orqali yuboramiz
//         await client.sendMessage(chatId, `Sizning tasdiqlash kodingiz: ${code}`);

//         return res.json({ success: true, message: 'Kod yuborildi!' });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ error: err });
//     }
// });

// // Kodni tekshiruvchi endpoint (optional)
// app.post('/verify/check', (req, res) => {
//     const { phone, code } = req.body;

//     if (verificationCodes[phone] === code) {
//         return res.json({ success: true, message: 'Kod to‘g‘ri!' });
//     } else {
//         return res.status(400).json({ success: false, message: 'Kod noto‘g‘ri.' });
//     }
// });

// client.initialize();

// app.listen(PORT, () => {
//     console.log(`✅ Server http://localhost:${PORT} da ishlayapti`);
// });
