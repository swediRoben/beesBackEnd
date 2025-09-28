const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authenticateToken = require('../middleware/auth.middleware');

// Routes
router.get('/', authenticateToken, contactController.getAllContacts);
router.get('/:id', authenticateToken, contactController.getContactById);
router.post('/', contactController.createContact);
router.put('/:id', authenticateToken, contactController.updateContact);
router.delete('/:id', authenticateToken, contactController.deleteContact);

module.exports = router;