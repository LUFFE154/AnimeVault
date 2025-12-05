const express   = require('express');
const router    = express.Router();

const { searchAnime } = require('../controllers/searchController');

router.get('/', searchAnime);
module.exports = router;