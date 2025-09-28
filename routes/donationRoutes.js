const express = require("express");
const router = express.Router();
const donationController = require('../controllers/donationController');
const authenticateToken = require('../middleware/auth.middleware');

// Routes CRUD
router.post("/", authenticateToken, donationController.createDonnation);
router.get("/", authenticateToken, donationController.getAllDonnation); // pagination supportée avec ?page=1&size=10
router.get("/:id", authenticateToken, donationController.getDonnationById);
router.put("/:id", authenticateToken, donationController.updateDonnation);
router.delete("/:id", authenticateToken, donationController.deleteDonnation);

module.exports = router;