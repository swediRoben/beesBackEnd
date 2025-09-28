const express = require("express");
const router = express.Router();
const coordonneeController = require('../controllers/cordonneeController');

// Routes CRUD
router.post("/", coordonneeController.createCoordonnee);
router.get("/", coordonneeController.getAllCoordonnees); // pagination supportée avec ?page=1&size=10
router.get("/:id", coordonneeController.getCoordonneeById);
router.put("/:id", coordonneeController.updateCoordonnee);
router.delete("/:id", coordonneeController.deleteCoordonnee);

module.exports = router;