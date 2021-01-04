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

module.exports = { getCardsFromMessage };
