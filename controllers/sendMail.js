const nodemailer = require("nodemailer");
require("dotenv").config();
const contactController = require('../controllers/contactController');

// Route for sending email
exports.sendMail = async(req, res) => {
    const { nom, email, subject, message, condition } = req.body;

    try {
        // Create transporter (example with Gmail)
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL, // ton email
                pass: process.env.MAILPASSWORD, // mot de passe application Gmail
            },
        });

        // Email options
        let mailOptions = {
            from: email, // l’adresse du client qui envoie le message
            to: process.env.MAIL, // toi, tu reçois le mail
            subject: subject,
            text: `Tu as reçu un message :\n\nNom: ${nom}\nEmail: ${email}\nMessage: ${message}`,
        };

        // Send email
        let info = await transporter.sendMail(mailOptions);
        contactController.createContact(req, res);
        res.json({ message: "Email envoyé avec succès ✅", info });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de l'envoi ❌", error });
    }
};