// backend/controllers/recommend.js
const axios = require('axios');

let animeCache = null;
let cacheTimestamp = 0;
const CACHE_TTL = 3600_000; // 1 hora

const genreMap = {
  Action: 1,
  Adventure: 2,
  Comedy: 4,
  Drama: 8,
  Romance: 22,
  Fantasy: 10,
  Horror: 14,
  Shounen: 27,
};

async function recommendAnime(req, res) {
  try {
    const { genre, type, min_score, max_score, min_episodes, max_episodes } = req.query;

    const now = Date.now();
    if (!animeCache || now - cacheTimestamp > CACHE_TTL) {
      const response = await axios.get('https://api.jikan.moe/v4/anime', {
        params: { limit: 25, order_by: 'score', sort: 'desc' }
      });
      animeCache = response.data.data;
      cacheTimestamp = now;
    }

    let filtered = animeCache;

    if (genre && genreMap[genre]) filtered = filtered.filter(a => a.genres.some(g => g.mal_id === genreMap[genre]));
    if (type) filtered = filtered.filter(a => a.type?.toLowerCase() === type.toLowerCase());
    if (min_score) filtered = filtered.filter(a => a.score >= parseFloat(min_score));
    if (max_score) filtered = filtered.filter(a => a.score <= parseFloat(max_score));
    if (min_episodes) filtered = filtered.filter(a => a.episodes >= parseInt(min_episodes));
    if (max_episodes) filtered = filtered.filter(a => a.episodes <= parseInt(max_episodes));

    if (filtered.length === 0) {
      return res.status(404).json({ anime: null, message: 'Nenhum anime encontrado com esses filtros ❌' });
    }

    const randomIndex = Math.floor(Math.random() * filtered.length);
    const anime = filtered[randomIndex];

    const mapped = {
      title: anime.title,
      image: anime.images?.jpg?.image_url,
      synopsis: anime.synopsis,
      url: anime.url,
      score: anime.score,
      type: anime.type,
      episodes: anime.episodes,
      status: anime.status,
      rank: anime.rank ? `#${anime.rank}` : 'N/A',
      popularity: anime.popularity ? `#${anime.popularity}` : 'N/A',
      aired: anime.aired?.string,
      genres: anime.genres?.map(g => g.name).join(', ')
    };

    res.json({ anime: mapped });

  } catch (error) {
    console.error('Erro no recommendAnime:', error.response?.data || error.message);

    if (error.response?.status === 429) {
      return res.status(429).json({ anime: null, message: '🚨 Rate-limited pela Jikan API. Tente novamente em alguns segundos!' });
    }

    if (error.response?.status === 400) {
      return res.status(400).json({ anime: null, message: '❌ Parâmetros inválidos para a Jikan API.' });
    }

    res.status(500).json({ anime: null, message: 'Ocorreu um erro inesperado ao buscar a recomendação ❌' });
  }
}

module.exports = { recommendAnime };
