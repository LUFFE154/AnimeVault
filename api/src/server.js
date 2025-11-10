const express = require('express');
const app = express();

console.log('🔍 Iniciando servidor...');

try {
  const routes = require('./routes');
  console.log('Rotas importadas:', typeof routes);
  app.use('/api', routes);
  console.log('Middleware /api aplicado');
} catch (err) {
  console.error('Erro ao carregar rotas:', err);
}

app.get('/', (req, res) => res.send('Servidor online'));

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT}`));
