const express   = require('express');
const router    = express.Router();

const { recommendAnime } = require('../controllers/recommendController');

console.log('recommend.js loaded');

router.get('/', (req, res) => {
  console.log('/api/recommend was called!');
  return recommendAnime(req, res);
});
module.exports = router;
