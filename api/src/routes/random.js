const express = require('express');
const router = express.Router();
const { randomAnime } = require('../controllers/randomController');

router.get('/', randomAnime);

module.exports = router;