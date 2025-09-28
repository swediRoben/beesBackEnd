const Coordonnee = require("../models/cordonnee");

// ✅ Create
exports.createCoordonnee = async(req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: "Title et Content sont obligatoires" });
        }

        const coordonnee = await Coordonnee.create({ title, content });
        res.status(201).json(coordonnee);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// ✅ Get all avec pagination
exports.getAllCoordonnees = async(req, res) => {
    try {
        let { page, size } = req.query;
        page = page ? parseInt(page) : 1;
        size = size ? parseInt(size) : 10;

        const offset = (page - 1) * size;

        const { count, rows } = await Coordonnee.findAndCountAll({
            limit: size,
            offset: offset,
            order: [
                ["date", "DESC"]
            ],
        });

        res.json({
            totalItems: count,
            totalPages: Math.ceil(count / size),
            currentPage: page,
            data: rows,
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// ✅ Get by ID
exports.getCoordonneeById = async(req, res) => {
    try {
        const coordonnee = await Coordonnee.findByPk(req.params.id);
        if (!coordonnee) return res.status(404).json({ message: "Non trouvé" });
        res.json(coordonnee);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// ✅ Update
exports.updateCoordonnee = async(req, res) => {
    try {
        const { title, content } = req.body;
        const coordonnee = await Coordonnee.findByPk(req.params.id);
        if (!coordonnee) return res.status(404).json({ message: "Non trouvé" });

        coordonnee.title = title || coordonnee.title;
        coordonnee.content = content || coordonnee.content;
        await coordonnee.save();

        res.json(coordonnee);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// ✅ Delete
exports.deleteCoordonnee = async(req, res) => {
    try {
        const coordonnee = await Coordonnee.findByPk(req.params.id);
        if (!coordonnee) return res.status(404).json({ message: "Non trouvé" });

        await coordonnee.destroy();
        res.json({ message: "Supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};