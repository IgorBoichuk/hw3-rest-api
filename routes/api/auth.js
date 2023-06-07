const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const authControllers = require('../../controllers/auth-controllers');

router.post('/register', authControllers.register);
router.post('/login', authControllers.login);
router.get('/logout', auth, authControllers.logout);

module.exports = router;
