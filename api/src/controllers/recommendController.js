const axios = require('axios');

async function recommendAnime(req, res) {
  console.log('[LOG] Requisição recebida em /api/recommend');
  try {
    const response = await axios.get('https://api.jikan.moe/v4/top/anime', {
      params: { limit: 10 },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Erro no recommendAnime:', error.message);
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
}

module.exports = { recommendAnime };
