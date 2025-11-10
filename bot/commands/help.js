const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Mostra todos os comandos disponíveis',
  execute(message) {
    const embed = new EmbedBuilder()
      .setTitle('📖 AnimeVault - Comandos')
      .setColor('#00FFFF')
      .setDescription('Aqui estão os comandos disponíveis:')
      .addFields(
        { name: '!anime <nome>', value: 'Busca informações detalhadas sobre um anime' },
        { name: '!recommend <filtros>', value: 'Recomenda um anime aleatório baseado em filtros' },
        { name: 'Exemplo de filtros:', value: '`genre:Action min_score:7 max_score:10 min_episodes:12 max_episodes:100 type:TV`' },
        { name: '!help', value: 'Mostra esta mensagem de ajuda' }
      )
      .setFooter({ text: 'AnimeVault • MyAnimeList' });

    message.channel.send({ embeds: [embed] });
  }
};
