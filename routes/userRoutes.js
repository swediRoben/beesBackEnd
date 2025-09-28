const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const controller = require('../controllers/userController');

router.post('/signup', controller.signup);
router.post('/', auth, controller.create);
router.post('/ifUserDontExist', controller.createIfUserDontExist);
router.delete("/:id", auth, controller.deleteUsers);
router.get('/', auth, controller.getAllUsers);
router.post('/login', controller.login);
router.get('/profile', auth, controller.profile);

module.exports = router;