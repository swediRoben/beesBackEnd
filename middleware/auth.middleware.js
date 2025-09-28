const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Accès refusé. Token manquant.' });
    }

    // Format attendu : "Bearer <token>"
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Accès refusé. Token mal formé.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token invalide.' });
    }
};