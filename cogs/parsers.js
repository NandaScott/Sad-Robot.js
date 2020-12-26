const { allSets, name } = require('./requests');
const { ScryfallCard } = require('./scryfallcard');

const getCardDeclarations = (string) =>
  string.match(/(\[\[[\w\s\'\.\,|/:🎲-]+\]\])+/g);

const sanitize = (string) => {
  const removeBrackets = string.replace('[[', '').replace(']]', '');
  return removeBrackets.split('|');
};

function getCardsFromMessage(messageString) {
  const cardDeclarations = getCardDeclarations(messageString);

  const functionModes = [
    'oracle',
    'price',
    'legal',
    'rules',
    'flavor',
    'unique',
  ];

  return cardDeclarations
    .map((val) => sanitize(val))
    .map((list) => ({
      name: list.shift(),
      modes: list.filter((mode) => functionModes.includes(mode)),
      set: list.filter((mode) => !functionModes.includes(mode))[0],
    }));
}

function fetchAllCards(cardList) {
  const promises = cardList.map((obj) =>
    name({ fuzzy: obj.name, set: obj.set })
  );

  return Promise.all(promises)
    .then((scryfallCardList) => scryfallCardList.map((resp) => resp.data))
    .catch(console.error);
}

function createEmbed(queryObject) {
  const embedDefaults = (card) => ({
    color: 0x1b6f9,
    url: card.url,
    title: `**${card.name}**`,
    type: 'image',
  });

  const imageEmbed = (card) => ({
    ...embedDefaults(card),
    image: { url: card.image },
  });

  // switch (mode) {
  //   default:
  //     const card = new ScryfallCard(cardObj).getImage().getUrl().getName()
  //       .relevantParts;
  //     return new Discord.MessageEmbed(imageEmbed(card));
  // }
}

module.exports = { getCardsFromMessage, createEmbed };
