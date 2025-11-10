console.log('scrap.js foi carregado');

const express = require('express');
const router = express.Router();
const { getAnime } = require('../controllers/scrapController');

console.log('scrap.js foi carregado');

router.get('/:query', getAnime);

module.exports = router;
