const { getCardsFromMessage } = require('./parsers');
const { name } = require('./requests');

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
  return new Promise((res, rej) => {
    try {
      res(cardList);
    } catch (error) {
      rej(error);
    }
  });
}

module.exports = { startFetch, fetchAllCards };
