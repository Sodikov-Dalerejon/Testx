const express = require("express");
const nodemailer = require('nodemailer');
require("dotenv").config();

const router = express.Router();

const transporter = nodemailer.createTransport({
    host: "smtp.elasticemail.com",
    port: 2525,
    secure: false, // true uchun 465 portidan foydalaning
    auth: {
        user: process.env.ELASTIC_API_USER,   // Mailjet API Key (Public key)
        pass: process.env.ELASTIC_API_PWD // Mailjet Secret Key (Private key)
    }
});

router.post("/send-email", async (req, res) => {
    const { to, subject, text } = req.body;

    try {
        const info = await transporter.sendMail({
            from: 'englishstdev@gmail.com', // Yuboruvchi manzili
            to: to, // Qabul qiluvchi
            subject: subject, // Mavzu
            text: text, // Matnli versiya
            html: "<b>HTML formatdagi xabar</b>" // HTML versiya
        });


        res.status(200).json({ success: true, result: info });
    } catch (err) {
        console.error("Email sending error:", err);
        res.status(500).json({ success: false, message: "Failed to send email." });
    }
});

module.exports=router