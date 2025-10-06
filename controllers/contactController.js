const Contact = require('../models/contact');
require("dotenv").config();
const { Op } = require('sequelize');

// ✅ Get all with pagination + sort
exports.getAllContacts = async(req, res) => {
    try {
        let { page, size, sort } = req.query;

        // Valeurs par défaut
        page = page ? parseInt(page) : 1;
        size = size ? parseInt(size) : 10;
        sort = sort && sort.toLowerCase() === 'asc' ? 'ASC' : 'DESC';

        const offset = (page - 1) * size;

        const contacts = await Contact.findAndCountAll({
            limit: size,
            offset,
            order: [
                ['id', sort]
            ]
        });

        res.status(200).json({
            totalItems: contacts.count,
            totalPages: Math.ceil(contacts.count / size),
            currentPage: page,
            data: contacts.rows
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des contacts', error });
    }
};

// ✅ Get by Id
exports.getContactById = async(req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findByPk(id);

        if (!contact) {
            return res.status(404).json({ message: 'Contact non trouvé' });
        }

        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// ✅ Post (Create)
exports.createContact = async(req, res) => {
    try {
        const { nom, email, subject, message, condition } = req.body;

        // Validation des champs obligatoires
        if (!nom || !email || !subject || !message) {
            return res.status(400).json({ message: 'Les champs nom, mail, content et sujet sont obligatoires' });
        }
        // // Create transporter (example with Gmail)
        // let transporter = nodemailer.createTransport({
        //     service: "gmail",
        //     auth: {
        //         user: process.env.MAIL, // ton email
        //         pass: process.env.MAILPASSWORD, // mot de passe application Gmail
        //     },
        // });

        // // Email options
        // let mailOptions = {
        //     from: email, // l’adresse du client qui envoie le message
        //     to: process.env.MAIL, // toi, tu reçois le mail
        //     subject: subject,
        //     text: `Tu as reçu un message :\n\nNom: ${nom}\nEmail: ${email}\nMessage: ${message}`,
        // };

        // // Send email
        // await transporter.sendMail(mailOptions);

        const newContact = await Contact.create({ nom, email, subject, message, condition });

        res.status(201).json({ message: 'Contact créé avec succès', data: newContact });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du contact', error });
    }
};

// ✅ Put (Update by id)
exports.updateContact = async(req, res) => {
    try {
        const { id } = req.params;
        const { nom, email, subject, message, condition } = req.body;

        const contact = await Contact.findByPk(id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact non trouvé' });
        }

        if (!nom || !email || !subject || !message) {
            return res.status(400).json({ message: 'Les champs nom, mail, content et sujet sont obligatoires' });
        }

        await contact.update({ nom, email, subject, message, condition });
        res.status(200).json({ message: 'Contact mis à jour avec succès', data: contact });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du contact', error });
    }
};

// ✅ Delete by id
exports.deleteContact = async(req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findByPk(id);

        if (!contact) {
            return res.status(404).json({ message: 'Contact non trouvé' });
        }

        await contact.destroy();
        res.status(200).json({ message: 'Contact supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du contact', error });
    }
};