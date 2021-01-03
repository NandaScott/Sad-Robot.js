const { getCardsFromMessage } = require('./parsers');
const { name } = require('./requests');
const Discord = require('discord.js');

// original message ✔ -> list of cards pinged -> fetchAllCards -> create appropriate embeds for each card -> send all embeds called for.
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
      try {
        name({ fuzzy: cardObj.name, set: cardObj.set })
          .then((resp) => {
            res({ ...resp.data, modes: cardObj.modes });
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

function constructEmbeds(cardDataList, client, channel) {
  return new Promise((res, rej) => {
    try {
      const messageList = cardDataList.map((scryResp) => {
        const embedDefaults = (card) => ({
          color: 0x1b6f9,
          url: card.scryfall_uri,
          title: `**${card.name}**`,
          type: 'image',
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

module.exports = { startFetch, fetchAllCards, constructEmbeds };
