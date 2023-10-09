const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

router.get('/', documentController.getLoggedInUser);
router.post('/register', documentController.registerUser);
router.post('/login', documentController.loginUser);



module.exports = router;