const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Vérifier/créer le dossier uploads
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log('📂 Dossier "uploads" créé automatiquement ✅');
}

// Configuration du stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Utiliser le nom original du fichier
    const filePath = path.join(uploadDir, file.originalname);

    // Supprimer l’ancien fichier s’il existe
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`⚠️ Ancien fichier "${file.originalname}" écrasé`);
    }

    cb(null, file.originalname); // même nom pour écraser
  }
});

const upload = multer({ storage });

module.exports = upload;
