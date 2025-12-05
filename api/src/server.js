const path = require('path');
const express = require('express');
const app = express();

const PORT = 3000;

console.log('🚀 Server starting...');

// server public folder (webpage)
app.use(express.static(path.join(__dirname, '../../public')));

// API routes
try {
  const routes = require('./routes');
  app.use('/api', routes);
  console.log('Routes /api applied');
} catch (err) {
  console.error('Error loading routes:', err);
}

// default route (webpage)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public', 'index.html'));
});
app.listen(PORT, () => console.log(`Server live at port: http://localhost:${PORT}`));