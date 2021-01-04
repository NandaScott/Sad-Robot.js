const { getCardsFromMessage } = require('./parsers');
const { name } = require('./requests');
const Discord = require('discord.js');

const startTimer = () => new Date().getTime();

const endTimer = (start) =>
  parseFloat(((new Date().getTime() - start) / 1000) % 60);

function startFetch(msg) {
  return new Promise((res, rej) => {
    try {
      const resp = getCardsFromMessage(msg.content);
      res(resp);
    } catch (error) {
      rej(error);
    }
  });
}

function fetchAllCards(cardList) {
  return cardList.map((cardObj) => {
    return new Promise((res, rej) => {
      const start = startTimer();
      try {
        name({ fuzzy: cardObj.name, set: cardObj.set })
          .then((resp) => {
            const seconds = endTimer(start);
            res({ ...resp.data, modes: cardObj.modes, timer: seconds });
          })
          .catch((err) => {
            if (err.response) {
              res(err.response.data);
            } else {
              throw err;
            }
          });
      } catch (error) {
        rej(error);
      }
    });
  });
}

function constructEmbeds(cardDataList) {
  return new Promise((res, rej) => {
    try {
      const messageList = cardDataList.map((scryResp) => {
        const embedDefaults = (card) => ({
          color: 0x1b6f9,
          url: card.scryfall_uri,
          title: `**${card.name}**`,
          type: 'image',
          footer: { text: `Fetch took: ${card.timer} seconds.` },
        });

        const imageEmbed = (card) => ({
          ...embedDefaults(card),
          image: { url: card.image_uris.border_crop },
        });

        return new Discord.MessageEmbed(imageEmbed(scryResp));
      });
      res(messageList);
    } catch (error) {
      rej(error);
    }
  });
}

function sendAllEmbeds(embedList, message) {
  return new Promise((res, rej) => {
    try {
      const allMessages = embedList.map((embed) => message.channel.send(embed));
      res(allMessages);
    } catch (error) {
      rej(error);
    }
  });
}

function reactToAllEmbeds(sentMessages) {
  return new Promise((res, rej) => {
    try {
      sentMessages.forEach((msg) => {
        msg
          .then((msg) => msg.react('🔮'))
          .then(({ message }) => message.react('💰'))
          .then(({ message }) => message.react('⚖'))
          .then(({ message }) => message.react('📏'))
          .then(({ message }) => message.react('🌶'))
          .then(({ message }) => message.react('❄'))
          .then(({ message }) => {
            const filter = (r) =>
              ['🔮', '💰', '⚖', '📏', '🌶', '❄'].includes(r.emoji.name);
            const timer = 1000 * 60 * 10;
            return message.awaitReactions(filter, { time: timer });
          })
          .then((collected) => res(collected))
          .catch((err) => rej(err));
      });
      res(null);
    } catch (error) {
      rej(error);
    }
  });
}

function onReactEmbed(embedCollection) {
  return new Promise((res, rej) => {
    try {
      const mapping = {
        '🔮': 'oracle',
        '💰': 'price',
        '⚖': 'legal',
        '📏': 'rules',
        '🌶': 'flavor',
        '❄': 'unique',
      };
      console.log(embedCollection);

      embedCollection.forEach((reaction) => {
        const { embeds } = reaction.message;
        console.log(embeds);
      });
    } catch (error) {
      rej(error);
    }
  });
}

module.exports = {
  startFetch,
  fetchAllCards,
  constructEmbeds,
  sendAllEmbeds,
  reactToAllEmbeds,
  onReactEmbed,
};
