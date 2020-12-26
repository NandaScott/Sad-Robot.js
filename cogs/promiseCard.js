const Discord = require('discord.js');
const { name } = require('./requests');

const { getCardsFromMessage } = require('./parsers');

// original message ✔ -> list of cards pinged -> fetchAllCards -> create appropriate embeds for each card -> send all embeds called for.
function fetchCards(msg) {
  return new Promise((res, rej) => {
    let cardsFound = getCardsFromMessage(msg.content);

    let cardList = cardsFound.map(async (obj) => {
      const scryfallCard = await name({
        fuzzy: obj.name,
        set: obj.set,
      }).catch((err) => {
        const { details } = err.response.data.data;
        if (details) {
          msg.channel.send(details);
        } else {
          rej(err);
        }
      });

      return { ...obj, cardData: scryfallCard.data };
    });

    // cardsFound.map((val) => name({ fuzzy: val.card, set: val.setCode }));

    // cardsFound.forEach((val) => {
    //   const startTimer = new Date().getTime();
    //   const endTimer = () =>
    //     parseFloat(((new Date().getTime() - startTimer) / 1000) % 60);
    //   switch (val.mode) {
    //     default:
    //       name({ fuzzy: val.card, set: val.setCode })
    //         .then((resp) => {
    //           const embedMsg = createEmbedFromCard(resp.data);
    //           const seconds = endTimer();
    //           embedMsg.setFooter(`Fetch took: ${seconds} seconds.`);
    //           res(embedMsg);
    //         })
    //         .catch((err) => rej(err.response.data));
    //       break;
    //   }
    // });
  });
}

module.exports = { fetchCards };
