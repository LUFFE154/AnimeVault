const express = require('express');
const app = express();

console.log('🚀 Iniciando servidor...');

try {
  const routes = require('./routes');
  app.use('/api', routes);
  console.log('Rotas /api aplicadas');
} catch (err) {
  console.error('Erro ao carregar rotas:', err);
}

app.get('/', (req, res) => res.send('Servidor online'));

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT}`));
