const express = require('express');
const router = express.Router();
const getCurrentController = require('../../controllers/getCurrent-controllers');
const auth = require('../../middleware/auth');

router.get('/current', auth, getCurrentController.getCurrent);

module.exports = router;
