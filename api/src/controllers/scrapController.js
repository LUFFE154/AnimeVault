console.log('scrapController loaded');

const { scrapeAnime } = require('../utils/scraper');

async function getAnime(req, res) {
  const { query } = req.params;
  const result = await scrapeAnime(query);
  res.json(result);
}

module.exports = { getAnime };