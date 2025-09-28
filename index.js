require('dotenv').config(); // Charger les variables d'environnement en premier

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // ✅ Importer cors
const publicationRoutes = require('./routes/publicationRoutes');
const contactRoutes = require('./routes/contactRoutes');
const cordonneeRoutes = require('./routes/cordonneeRoutes');
const projetRoutes = require('./routes/projetRoutes');
const donationRoutes = require('./routes/donationRoutes');
const sendMailRoutes = require('./routes/sendMailRouter');
const authRoutes = require('./routes/userRoutes');
const sequelize = require('./db');

const app = express();
const port = 3000; // Utilise le port défini dans .env ou 3000 par défaut

// ✅ Middleware
app.use(cors()); // Autoriser toutes les origines
// Si tu veux limiter : app.use(cors({ origin: "http://localhost:5173" }));

app.use(bodyParser.json()); // Parse les requêtes JSON
app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/cordonnees', cordonneeRoutes);
app.use('/api/projets', projetRoutes);
app.use('/api/donation', donationRoutes);
app.use('/api/mail', sendMailRoutes);

// ✅ Route de test
app.get('/', (req, res) => {
    res.send('Bienvenue sur Express.js 🚀');
});

// ✅ Connexion à MySQL + synchronisation des modèles
sequelize.sync()
    .then(() => {
        console.log('✅ Connexion à MySQL réussie.');
        app.listen(port, () => {
            console.log(`🚀 Serveur démarré sur http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('❌ Erreur de connexion MySQL :', err);
    });