const Publication = require("../models/publication");
const { Op } = require("sequelize");

// ✅ Ajouter une publication
exports.createPublication = async(req, res) => {
    try {
        const { title, contenu, fichier, typeFichier, type } = req.body;

        const publication = await Publication.create({
            title,
            contenu,
            fichier,
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
        const { title, contenu, fichier, typeFichier, type } = req.body;

        const publication = await Publication.findByPk(id);
        if (!publication) {
            return res.status(404).json({ message: "Publication introuvable" });
        }

        publication.title = title || publication.title;
        publication.contenu = contenu || publication.contenu;
        publication.fichier = fichier || publication.fichier;
        publication.typeFichier = typeFichier || publication.typeFichier;
        publication.type = type || publication.type;

        await publication.save();

        res.json(publication);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Supprimer une publication
exports.deletePublication = async(req, res) => {
    try {
        const { id } = req.params;
        const publication = await Publication.findByPk(id);

        if (!publication) {
            return res.status(404).json({ message: "Publication introuvable" });
        }

        await publication.destroy();
        res.json({ message: "Publication supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};