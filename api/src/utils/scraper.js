const axios = require('axios');

async function scrapeAnime(query) {
  const url = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=15`;

  try {
    const response = await axios.get(url);
    const data = response.data.data;

    if (!data || data.length === 0) return [];

    return data.map(anime => ({
      title: anime.title,
      image: anime.images?.jpg?.image_url,
      synopsis: anime.synopsis,
      url: anime.url
    }));
  } catch (err) {
    console.error('Erro ao buscar anime:', err.message);
    return [];
  }
}

module.exports = { scrapeAnime };
