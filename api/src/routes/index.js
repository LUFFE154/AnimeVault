const express = require('express');
const router = express.Router();

console.log('index.js (rotas) carregado');

try {
  const recommendRoutes = require('./recommend');
  router.use('/recommend', recommendRoutes);
  console.log('Rota /recommend montada');

  const scrapRoutes = require('./scrap');
  router.use('/scrap', scrapRoutes);
  console.log('Rota /scrap montada');
} catch (err) {
  console.error('Erro ao carregar rotas:', err);
}

module.exports = router;
