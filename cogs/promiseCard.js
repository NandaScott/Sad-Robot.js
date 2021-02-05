const {
  getCardsFromMessage,
  cardAsText,
  getCardValue,
  keyToFields,
  uniqueDescription,
  formatSearchURI,
} = require('./parsers');
const { name, allPrints, autocomplete, codeAndNumber } = require('./requests');
const Discord = require('discord.js');

const startTimer = () => new Date().getTime();

const endTimer = (start) =>
  parseFloat(((new Date().getTime() - start) / 1000) % 60);

const fetchUnique = (scryData) => {
  return new Promise((res, rej) => {
    try {
      allPrints(scryData.name).then((resp) => {
        const { data: uniqeList } = resp.data;
        const relevantParts = uniqeList.map((card) => ({
          setName: card.set_name,
          setCode: card.set.toUpperCase(),
          number: card.collector_number,
          url: card.scryfall_uri,
        }));
        res({ ...scryData, uniquePrints: relevantParts });
      });
    } catch (error) {
      rej(error);
    }
  });
};

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
        const { name: cardName, set, num } = cardObj;
        let promise;
        if (num) {
          promise = codeAndNumber(set, num);
        } else {
          promise = name(cardName, set);
        }
        promise
          .then((resp) => {
            const seconds = endTimer(start);
            return fetchUnique({
              ...resp.data,
              modes: cardObj.modes,
              timer: seconds,
            });
          })
          .then((resp) => res(resp))
          .catch((err) => {
            if (err.response) {
              autocomplete({ q: cardObj.name, include_extras: true })
                .then((resp) => {
                  const { data: suggestions } = resp.data;
                  const { details } = err.response.data;
                  if (suggestions.length > 0) {
                    res({
                      object: 'error',
                      details: details,
                      sugg: `You may have meant one of the following:\n${suggestions.join(
                        '\n'
                      )}`,
                    });
                  } else {
                    res({
                      object: 'error',
                      details: details,
                      sugg: 'No suggestions found.',
                    });
                  }
                })
                .catch((err) => rej(err));
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
      const messageList = cardDataList
        .map((scryResp) => {
          const name = getCardValue('name', scryResp);
          const imageUris = getCardValue('image_uris', scryResp);
          const smallImage = { url: imageUris?.small };
          if (scryResp.modes?.length === 0) {
            scryResp.modes = ['image'];
          }

          const errorEmbed = () => ({
            color: '#C31F1F',
            title: 'Mode Error',
            description: `Mode "${mode}" does not exist. Please refer to my help dialog for a list of modes that I can do.`,
          });

          const embedDefaults = (card) => ({
            color: 0x1b6f9,
            url: card.scryfall_uri,
            title: `**${name}**`,
            footer: { text: `Fetch took: ${card.timer} seconds.` },
          });

          const imageEmbed = (card, i = 0) => ({
            ...embedDefaults(card),
            image: { url: imageUris?.border_crop },
          });

          const oracleEmbed = (card) => ({
            ...embedDefaults(card),
            thumbnail: smallImage,
            description: cardAsText(card),
          });

          const priceEmbed = (card) => ({
            ...embedDefaults(card),
            fields: keyToFields('prices', card),
            thumbnail: smallImage,
          });

          const legalEmbed = (card) => ({
            ...embedDefaults(card),
            fields: keyToFields('legalities', card),
            thumbnail: smallImage,
          });

          const flavorEmbed = (card) => ({
            ...embedDefaults(card),
            thumbnail: smallImage,
            description: getCardValue('flavor_text', card),
          });

          const uniqueEmbed = (card) => ({
            ...embedDefaults(card),
            url: formatSearchURI(card.prints_search_uri),
            thumbnail: smallImage,
            description: uniqueDescription(card),
          });

          const modeMap = {
            image: imageEmbed,
            oracle: oracleEmbed,
            price: priceEmbed,
            legal: legalEmbed,
            flavor: flavorEmbed,
            unique: uniqueEmbed,
          };

          if (scryResp.object === 'error') {
            return [
              new Discord.MessageEmbed({
                color: '#C31F1F',
                title: scryResp.details,
                description: scryResp.sugg,
              }),
            ];
          }
          return scryResp.modes.map((mode) => {
            const embedStyle = modeMap[mode];
            if (embedStyle === undefined) {
              return new Discord.MessageEmbed(errorEmbed(mode));
            }
            if ('card_faces' in scryResp && mode === 'image') {
              return [
                new Discord.MessageEmbed({
                  ...embedDefaults(scryResp),
                  image: {
                    url: getCardValue('image_uris', scryResp, 0)?.border_crop,
                  },
                }),
                new Discord.MessageEmbed({
                  ...embedDefaults(scryResp),
                  image: {
                    url: getCardValue('image_uris', scryResp, 1)?.border_crop,
                  },
                }),
              ];
            }

            return new Discord.MessageEmbed(embedStyle(scryResp));
          });
        })
        .reduce((acc, curr) => acc.concat(curr), []); // Make sure the array is flattened.
      res(messageList);
    } catch (error) {
      rej(error);
    }
  });
}

function sendAllEmbeds(embedList, message) {
  return new Promise((res, rej) => {
    try {
      const allMessages = embedList.map((embeds) => {
        if (Array.isArray(embeds)) {
          embeds.forEach((embed) => message.channel.send(embed));
        } else {
          message.channel.send(embeds);
        }
      });
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

function findTimerReaction(msg) {
  if (msg.channel.type !== 'dm') {
    return msg.reactions.resolve('⏱️');
  }
}

function removeTimerReaction(reaction) {
  if (reaction) {
    return reaction.remove();
  }
}

module.exports = {
  startFetch,
  fetchAllCards,
  constructEmbeds,
  sendAllEmbeds,
  reactToAllEmbeds,
  onReactEmbed,
  findTimerReaction,
  removeTimerReaction,
};
