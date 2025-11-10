// src/controllers/randomController.js
const axios = require('axios');

async function randomAnime(req, res) {
  try {
    const response = await axios.get('https://api.jikan.moe/v4/random/anime');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching random anime:', error.message);
    res.status(500).json({ error: 'Failed to fetch random anime' });
  }
}

module.exports = { randomAnime };
