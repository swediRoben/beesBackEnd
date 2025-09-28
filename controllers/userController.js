const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = async(req, res) => {
    try {
        const checkIfExist = User.count();
        if (checkIfExist) {
            const { username, email, password } = req.body;
            const hash = await bcrypt.hash(password, 10);
            const user = await User.create({ username, email, password: hash });
            res.status(201).json({ message: 'Utilisateur créé', user });
        } else {
            res.status(400).json({ message: " Utilisateur n'existe pas " });
        }
    } catch (err) {
        res.status(400).json({ message: 'Erreur', error: err.message });
    }
};

exports.create = async(req, res) => {
    try {
        const { username, email, role, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, role, password: hash });
        res.status(201).json({ message: 'Utilisateur créé', user });
    } catch (err) {
        res.status(400).json({ message: 'Erreur', error: err.message });
    }
};

exports.createIfUserDontExist = async(req, res) => {
    try {
        const { username, email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hash });
        res.status(201).json({ message: 'Utilisateur créé', user });
    } catch (err) {
        res.status(400).json({ message: 'Erreur', error: err.message });
    }
};

exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ message: 'Mot de passe incorrect' });

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ message: 'Connexion réussie', token });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

exports.profile = async(req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'username', 'email', 'role']
        });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Erreur', error: err.message });
    }
};



// ✅ Lister toutes les publications
exports.getAllUsers = async(req, res) => {
    try {
        // requête avec pagination
        const data = await User.findAll();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Supprimer une publication
exports.deleteUsers = async(req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "Publication introuvable" });
        }

        await user.destroy();
        res.json({ message: "Publication supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};