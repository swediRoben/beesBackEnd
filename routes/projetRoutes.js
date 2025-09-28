const express = require("express");
const router = express.Router();
const projetController = require("../controllers/projetController");
const authenticateToken = require('../middleware/auth.middleware');

// CRUD
router.post("/", authenticateToken, projetController.createProjet);
router.get("/", projetController.getAllProjets); // ✅ pagination ici
router.get("/:id", projetController.getProjetById);
router.put("/:id", authenticateToken, projetController.updateProjet);
router.delete("/:id", authenticateToken, projetController.deleteProjet);

module.exports = router;