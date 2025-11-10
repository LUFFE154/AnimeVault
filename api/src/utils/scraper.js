const axios = require('axios');

async function scrapeAnime(query) {
  const url = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=5`;
  const { data } = await axios.get(url);
  return data.data.map(anime => ({
    title: anime.title,
    image: anime.images.jpg.image_url,
    synopsis: anime.synopsis,
    url: anime.url
  }));
}

module.exports = { scrapeAnime };