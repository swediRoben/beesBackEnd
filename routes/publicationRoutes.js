const express = require("express");
const router = express.Router();
const publicationController = require("../controllers/publicationController");
const authenticateToken = require('../middleware/auth.middleware');

// ➕ Créer une publication
router.post("/", authenticateToken, publicationController.createPublication);

// 📋 Lister toutes les publications
router.get("/", publicationController.getAllPublications);

// 🔍 Récupérer une publication par ID
router.get("/:id", publicationController.getPublicationById);

// ✏️ Mettre à jour une publication
router.put("/:id", authenticateToken, publicationController.updatePublication);

// ❌ Supprimer une publication
router.delete("/:id", authenticateToken, publicationController.deletePublication);

module.exports = router;