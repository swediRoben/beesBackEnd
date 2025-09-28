const express = require('express');
const router = express.Router();
const sendController = require('../controllers/sendMail');
const authenticateToken = require('../middleware/auth.middleware');

// Routes
router.post('/', authenticateToken, sendController.sendMail);
module.exports = router;