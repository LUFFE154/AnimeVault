const express   = require('express');
const router    = express.Router();

console.log('index.js (routes) loaded');

try {
  const recommendRoutes = require('./recommend');
  router.use('/recommend', recommendRoutes);
  console.log('Rout /recommend assembled');

  const scrapRoutes = require('./scrap');
  router.use('/scrap', scrapRoutes);
  console.log('Rout /scrap assembled');
} catch (err) {
  console.error('Error loading routes:', err);
}
module.exports = router;