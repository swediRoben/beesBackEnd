const Publication = require("../models/publication");
const { Op } = require("sequelize");
const upload = require('../middleware/upload');
const path = require('path');
const fs = require('fs');

// ✅ Ajouter une publication
exports.createPublication = async(req, res) => {
    try {
        const { title, contenu,urlVideo, typeFichier, type } = req.body;

        let fichierNom = null; 
            if (typeFichier === "VIDEO") {
            fichierNom = urlVideo; // pas de fichier uploadé
            } else {
            // Multer uploadé
            if (req.file) {
                fichierNom = req.file.filename;
            } else {
                return res.status(400).json({ message: "Fichier requis pour images/PDF" });
            }
            }
       

        const publication = await Publication.create({
            title,
            contenu,
            fichier: fichierNom,
            typeFichier,
            type
        });

        res.status(201).json(publication);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Lister toutes les publications
exports.getAllPublications = async(req, res) => {
    try {
        // récupérer page et size depuis les query params, avec valeurs par défaut
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;
        const type = req.query.type != null || req.query.type != 1 ? req.query.type : null;
         
        const offset = (page - 1) * size;
        const limit = size;

        let where = {};
        if (type) where.type = {
            [Op.eq]: `${type}`
        }


        // requête avec pagination
        const { count, rows } = await Publication.findAndCountAll({
            where,
            order: [
                ["date", "DESC"]
            ],
            limit,
            offset,
        });

        // renvoyer les données avec infos de pagination
        res.json({
            currentPage: page,
            totalItems: count,
            totalPages: Math.ceil(count / size),
            data: rows,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// ✅ Récupérer une publication par ID
exports.getPublicationById = async(req, res) => {
    try {
        const { id } = req.params;
        const publication = await Publication.findByPk(id);

        if (!publication) {
            return res.status(404).json({ message: "Publication introuvable" });
        }

        res.json(publication);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Mettre à jour une publication
exports.updatePublication = async(req, res) => {
    try {
        const { id } = req.params;
        const { title, contenu, urlVideo, typeFichier, type } = req.body;
        let fichierNom = publication.fichier; // 🟡 par défaut, garder l'ancien fichier

        if (typeFichier === "VIDEO") {
        fichierNom = urlVideo;
        } else if (typeFichier === "IMAGES" || typeFichier === "PDF") {
             if (req.file) {
                fichierNom = req.file.filename; 
             }
        }

        const publication = await Publication.findByPk(id);
        if (!publication) {
            return res.status(404).json({ message: "Publication introuvable" });
        }

        publication.title = title || publication.title;
        publication.contenu = contenu || publication.contenu;
        publication.fichier = fichierNom || publication.fichier;
        publication.typeFichier = typeFichier || publication.typeFichier;
        publication.type = type || publication.type;

        await publication.save();

        res.json(publication);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}; 

exports.deletePublication = async (req, res) => {
    try {
        const { id } = req.params;
        const publication = await Publication.findByPk(id);

        if (!publication) {
            return res.status(404).json({ message: "Publication introuvable" });
        } 
        if (publication.fichier) {
            const filePath = path.join(__dirname, "../middleware/uploads", publication.fichier);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); 
                console.log(`📂 Fichier "${publication.fichier}" supprimé`);
            }
        } 
        await publication.destroy();

        res.json({ message: "Publication et fichier supprimés avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// exports.deletePublication = async(req, res) => {
//     try {
//         const { id } = req.params;
//         const publication = await Publication.findByPk(id);

//         if (!publication) {
//             return res.status(404).json({ message: "Publication introuvable" });
//         }

//         await publication.destroy();
//         res.json({ message: "Publication supprimée avec succès" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };