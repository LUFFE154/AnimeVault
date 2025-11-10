// commands/recommend.js
const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'recommend',
  description: 'Recomenda um anime aleatório baseado em filtros',
  async execute(message, args) {
    try {
      // Montar query string a partir dos argumentos do usuário
      const query = args.join(' ').replace(/ /g, '&').replace(/:/g, '=');

      const res = await fetch(`http://localhost:3000/api/recommend?${query}`);
      const data = await res.json();

      if (!data || !data.anime) {
        return message.reply(data?.message || 'Ocorreu um erro ao buscar a recomendação ❌');
      }

      const anime = data.anime;

      const embed = new EmbedBuilder()
        .setTitle(`🎬 ${anime.title}`)
        .setURL(anime.url || '#')
        .setDescription(anime.synopsis ? `${anime.synopsis.slice(0, 400)}...` : 'Sem sinopse')
        .setColor('#00FFFF')
        .setThumbnail(anime.image)
        .addFields(
  { name: '⭐ Nota', value: anime.score ? String(anime.score) : 'N/A', inline: true },
  { name: '🖥️ Tipo', value: anime.type || 'N/A', inline: true },
  { name: '📺 Episódios', value: anime.episodes ? String(anime.episodes) : 'N/A', inline: true },
  { name: '⏱️ Status', value: anime.status || 'N/A', inline: true },
  { name: '🏆 Ranking', value: anime.rank ? String(anime.rank) : 'N/A', inline: true },
  { name: '🔥 Popularidade', value: anime.popularity ? String(anime.popularity) : 'N/A', inline: true },
  { name: '📅 Lançamento', value: anime.aired || 'N/A', inline: true },
  { name: '🎭 Gêneros', value: anime.genres || 'N/A', inline: true }
)
        .setFooter({ text: 'AnimeVault • MyAnimeList', iconURL: 'https://cdn-icons-png.flaticon.com/512/732/732200.png' })
        .setTimestamp();

      message.channel.send({ embeds: [embed] });

    } catch (err) {
      console.error(err);
      message.reply('Ocorreu um erro inesperado ao buscar a recomendação ❌');
    }
  },
};
