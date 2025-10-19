const express = require("express");
const router = express.Router();
const projetController = require("../controllers/projetController");
const authenticateToken = require('../middleware/auth.middleware');
const upload = require('../middleware/upload');

// CRUD
router.post("/",upload.single('fichier'),  authenticateToken, projetController.createProjet);
router.get("/", projetController.getAllProjets); // ✅ pagination ici
router.get("/:id", projetController.getProjetById);
router.put("/:id",upload.single('fichier'),  authenticateToken, projetController.updateProjet);
router.delete("/:id", authenticateToken, projetController.deleteProjet);

module.exports = router;