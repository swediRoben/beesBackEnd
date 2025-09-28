const Donnation = require("../models/donation")

// ✅ Create
exports.createDonnation = async(req, res) => {
    try {
        const { donateur, montant, devise, email, status } = req.body;
        if (!donateur || !montant) {
            return res.status(400).json({ message: "Title et Donateur et montant sont obligatoires" });
        }

        const donnation = await Donnation.create({ donateur, montant, devise, email, status });
        res.status(201).json(donnation);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// ✅ Get all avec pagination
exports.getAllDonnation = async(req, res) => {
    try {
        let { page, size } = req.query;
        page = page ? parseInt(page) : 1;
        size = size ? parseInt(size) : 10;

        const offset = (page - 1) * size;

        const { count, rows } = await Donnation.findAndCountAll({
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
exports.getDonnationById = async(req, res) => {
    try {
        const donnation = await Donnation.findByPk(req.params.id);
        if (!donnation) return res.status(404).json({ message: "Non trouvé" });
        res.json(donnation);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// ✅ Update
exports.updateDonnation = async(req, res) => {
    try {
        console.log(req.body)
        const donnation = await Donnation.findByPk(req.params.id);
        const { id, donateur, montant, devise, email, status } = req.body;
        if (!donnation) return res.status(404).json({ message: "Non trouvé" });

        donnation.id = id || donnation.id;
        donnation.donateur = donateur || donnation.donateur;
        donnation.montant = montant || donnation.montant;
        donnation.devise = devise || donnation.devise;
        donnation.status = status || donnation.status;
        donnation.email = email || donnation.status;
        await donnation.save();

        res.json(donnation);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// ✅ Delete
exports.deleteDonnation = async(req, res) => {
    try {
        const donnation = await Donnation.findByPk(req.params.id);
        if (!donnation) return res.status(404).json({ message: "Non trouvé" });

        await donnation.destroy();
        res.json({ message: "Supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};