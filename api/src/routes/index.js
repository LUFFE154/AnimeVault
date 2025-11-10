const express = require('express');
const router = express.Router();

console.log('📦 index.js (rotas) carregado');

try {
  const recommendRoutes = require('./recommend');
  console.log('recommend.js importado:', typeof recommendRoutes);
  router.use('/recommend', recommendRoutes);
  console.log('Rota /recommend montada');
} catch (err) {
  console.error('Erro ao carregar recommend.js:', err);
}

module.exports = router;
