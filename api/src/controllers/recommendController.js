const axios = require('axios');

// avoid rate limit
let animeCache = null;
let cacheTimestamp = 0;
const CACHE_TTL = 3600_000; // 1 hour

const genreMap = {
  Action:     1,
  Adventure:  2,
  Comedy:     4,
  Drama:      8,
  Romance:    22,
  Fantasy:    10,
  Horror:     14,
  Shounen:    27,
};

async function recommendAnime(req, res) {
  try {
    const { 
      genre, type, min_score, max_score, 
      min_episodes, max_episodes, season_year, season
    } = req.query;

    const now = Date.now();

    const needSeason = season_year && season;

    if ((!animeCache) || (now - cacheTimestamp > CACHE_TTL) || (needSeason)) {
      let url;
      let params = {};

      if(needSeason){
        // filter by season - alt rout
        url = `https://api.jikan.moe/v4/seasons/${season_year}/${season.toLowerCase()}`;
      }else{
        // other filters - default rout
        url = "https://api.jikan.moe/v4/anime";
        params = {limit: 25, order_by: 'score', sort: 'desc'};
      }

      const response = await axios.get(url, {params});
      animeCache = response.data.data;
      cacheTimestamp = now;
    }

    // additional filters
    let filtered = animeCache;

    if (genre && genreMap[genre]) filtered = filtered.filter(a => Array.isArray(a.genres) && a.genres.some(g => g.mal_id === genreMap[genre]));
    if (type)         filtered    = filtered.filter(a => a.type && a.type.toLowerCase() === type.toLowerCase());
    if (min_score)    filtered    = filtered.filter(a => typeof a.score === "number" && a.score >= parseFloat(min_score));
    if (max_score)    filtered    = filtered.filter(a => typeof a.score === "number" && a.score <= parseFloat(max_score));
    if (min_episodes) filtered    = filtered.filter(a => Number.isInteger(a.episodes) && a.episodes >= parseInt(min_episodes));
    if (max_episodes) filtered    = filtered.filter(a => Number.isInteger(a.episodes) && a.episodes <= parseInt(max_episodes));

    // blank result
    if (filtered.length === 0) {
      return res.status(404).json({ anime: null, message: ' Cannot find any anime with the selected filters. ❌' });
    }

    // chosing random anime from the filtered ones
    const anime = filtered[Math.floor(Math.random() * filtered.length)];

    const mapped = {
      title:      anime.title,
      image:      anime.images?.jpg?.image_url,
      synopsis:   anime.synopsis,
      url:        anime.url,
      score:      anime.score,
      type:       anime.type,
      episodes:   anime.episodes ?? "?",
      status:     anime.status,
      rank:       anime.rank ? `#${anime.rank}` : 'N/A',
      popularity: anime.popularity ? `#${anime.popularity}` : 'N/A',
      aired:      anime.aired?.string,
      genres:     anime.genres?.map(g => g.name).join(', ')
    };

    res.json({ anime: mapped });

  } catch (error) {
    console.error('Error at recommendAnime:', error.response?.data || error.message);

    if (error.response?.status === 429) {
      return res.status(429).json({ anime: null, message: '🚨 Rate-limited by Jikan API. Try again in a feel seconds' });
    }

    if (error.response?.status === 400) {
      return res.status(400).json({ anime: null, message: '❌ Invalid parameters for Jikan API.' });
    }
    res.status(500).json({ anime: null, message: ' An unexpected error occurred while retrieving recommendations. ❌' });
  }
}

module.exports = { recommendAnime };