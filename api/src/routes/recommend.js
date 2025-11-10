const express = require('express');
const router = express.Router();
const { recommendAnime } = require('../controllers/recommendController');

console.log('recommend.js foi carregado');

router.get('/', (req, res) => {
  console.log('/api/recommend foi chamada!');
  return recommendAnime(req, res);
});

module.exports = router;
