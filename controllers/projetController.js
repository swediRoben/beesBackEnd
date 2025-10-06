const Projet = require("../models/projet");
const { Op } = require("sequelize");


// ✅ Créer un projet
exports.createProjet = async(req, res) => {
    try {
        const { title, contenu, secteur } = req.body;

        // Vérification des champs obligatoires
        if (!title || !contenu || !secteur) {
            return res.status(400).json({ message: "Champs obligatoires manquants !" });
        }

        const projet = await Projet.create(req.body);
        res.status(201).json(projet);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// ✅ Récupérer tous les projets avec pagination
exports.getAllProjets = async(req, res) => {
    try {
        let { page, size } = req.query;
        page = page ? parseInt(page) : 1; // page par défaut = 1 
        size = size ? parseInt(size) : 10; // taille par défaut = 10
        const secteur = req.query.secteur != null || req.query.secteur != 1 ? req.query.secteur : null;

        const offset = (page - 1) * size;
        const limit = size;
        let where = {};
        if (secteur != null) where.secteur = {
            [Op.eq]: `${secteur}`
        }

        const { count, rows } = await Projet.findAndCountAll({
            where,
            limit,
            offset,
            order: [
                ["createdAt", "DESC"]
            ],
        });

        res.status(200).json({
            totalItems: count,
            totalPages: Math.ceil(count / size),
            currentPage: page,
            data: rows
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// ✅ Récupérer un projet par ID
exports.getProjetById = async(req, res) => {
    try {
        const projet = await Projet.findByPk(req.params.id);
        if (!projet) return res.status(404).json({ message: "Projet non trouvé" });
        res.status(200).json(projet);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// ✅ Mettre à jour un projet
exports.updateProjet = async(req, res) => {
    try {
        const projet = await Projet.findByPk(req.params.id);
        if (!projet) return res.status(404).json({ message: "Projet non trouvé" });

        await projet.update(req.body);
        res.status(200).json(projet);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// ✅ Supprimer un projet
exports.deleteProjet = async(req, res) => {
    try {
        const projet = await Projet.findByPk(req.params.id);
        if (!projet) return res.status(404).json({ message: "Projet non trouvé" });

        await projet.destroy();
        res.status(200).json({ message: "Projet supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};