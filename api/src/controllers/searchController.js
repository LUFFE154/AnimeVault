const axios = require('axios');

async function searchAnime(req, res) {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter "q"' });
  }

  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime`, {
      params: { q: query, limit: 10 },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching anime:', error.message);
    res.status(500).json({ error: 'Failed to fetch anime data' });
  }
}

module.exports = { searchAnime };