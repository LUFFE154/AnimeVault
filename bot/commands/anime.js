const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'anime',
  description: 'Busca informações detalhadas de um anime',
  async execute(message, args) {
    if (!args.length) return message.reply('Por favor, informe o nome do anime!');

    const search = args.join(' ').toLowerCase().replace(/ /g, '-');

    try {
      // 1️⃣ Scrap API para título, imagem, sinopse e URL
      const scrapResponse = await fetch(`http://localhost:3000/api/scrap/${search}`);
      const scrapData = await scrapResponse.json();

      if (!scrapData || !scrapData.length) {
        return message.reply('Título não encontrado ❌');
      }

      let selectedAnime;

      //  Se houver mais de um resultado, listar para o usuário escolher
      if (scrapData.length > 1) {
        const listEmbed = new EmbedBuilder()
          .setTitle(`Resultados para "${search}"`)
          .setDescription(scrapData.map((anime, i) => `${i + 1}. ${anime.title}`).join('\n'))
          .setColor('#00FFFF')
          .setFooter({ text: 'Digite o número do anime que deseja ver (15s para responder).' });

        await message.channel.send({ embeds: [listEmbed] });

        const filter = m => {
          const choice = parseInt(m.content, 10);
          return m.author.id === message.author.id && choice >= 1 && choice <= scrapData.length;
        };

        const collected = await message.channel.awaitMessages({ filter, max: 1, time: 15000, errors: ['time'] }).catch(() => {});

        if (!collected) {
          selectedAnime = scrapData[0]; // default para o primeiro
        } else {
          const choice = parseInt(collected.first().content, 10) - 1;
          selectedAnime = scrapData[choice];
        }
      } else {
        selectedAnime = scrapData[0];
      }

      // 3️⃣ Extrair MAL ID da URL
      const malUrlMatch = selectedAnime.url.match(/anime\/(\d+)/);
      const malId = malUrlMatch ? malUrlMatch[1] : null;

      let score = 'N/A';
      let type = 'Desconhecido';
      let episodes = 'N/A';
      let status = 'Desconhecido';
      let rank = 'N/A';
      let popularity = 'N/A';
      let aired = 'N/A';

      if (malId) {
        try {
          const jikanResponse = await fetch(`https://api.jikan.moe/v4/anime/${malId}`);
          const jikanData = await jikanResponse.json();
          const jikanAnime = jikanData.data;

          score = jikanAnime?.score ?? 'N/A';
          type = jikanAnime?.type ?? 'Desconhecido';
          episodes = jikanAnime?.episodes ?? 'N/A';
          status = jikanAnime?.status ?? 'Desconhecido';
          rank = jikanAnime?.rank ? `#${jikanAnime.rank}` : 'N/A';
          popularity = jikanAnime?.popularity ? `#${jikanAnime.popularity}` : 'N/A';
          aired = jikanAnime?.aired?.string ?? 'N/A';
        } catch (err) {
          console.log('Erro ao buscar nota no Jikan:', err.message);
        }
      }

      // 4️⃣ Cores por tipo
      const typeColors = {
        TV: '#1E90FF',
        Movie: '#FF4500',
        OVA: '#9932CC',
        ONA: '#32CD32',
        Special: '#FFD700',
      };
      const color = typeColors[type] || '#00FFFF';

      // 5️⃣ Criar embed
      const embed = new EmbedBuilder()
        .setTitle(`🎬 ${selectedAnime.title}`)
        .setURL(selectedAnime.url || '#')
        .setDescription(selectedAnime.synopsis ? `${selectedAnime.synopsis.slice(0, 400)}... [Leia mais](${selectedAnime.url})` : 'Descrição não disponível')
        .setColor(color)
        .setThumbnail(selectedAnime.image)
        .setImage(selectedAnime.image)
        .addFields(
          { name: '⭐ Nota', value: `${score}/10`, inline: true },
          { name: '🖥️ Tipo', value: type, inline: true },
          { name: '📺 Episódios', value: `${episodes}`, inline: true },
          { name: '⏱️ Status', value: status, inline: true },
          { name: '🏆 Ranking', value: rank, inline: true },
          { name: '🔥 Popularidade', value: popularity, inline: true },
          { name: '📅 Lançamento', value: aired, inline: true },
          { name: '🔗 MAL Link', value: selectedAnime.url ? `[Clique aqui](${selectedAnime.url})` : 'N/A', inline: true }
        )
        .setFooter({ text: 'AnimeVault • MyAnimeList', iconURL: 'https://cdn.discordapp.com/attachments/1437548421471932518/1437564709761978398/38a361a0eff96689ad826ad387a190f1.jpg?ex=6913b3f7&is=69126277&hm=54111647906657ec1ad321518074395b56874bca08fd146adbed3a881cdbb8a3&' })
        .setTimestamp();

      message.channel.send({ embeds: [embed] });

    } catch (error) {
      console.error(error);
      message.reply('Ocorreu um erro ao buscar o anime. ❌');
    }
  },
};
