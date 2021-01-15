const getCardDeclarations = (string) =>
  string.match(/(\[\[[\w\s\'\.\,|/:🎲-]+\]\])+/g);

const sanitize = (string) => {
  const removeBrackets = string.replace('[[', '').replace(']]', '');
  return removeBrackets.split('|');
};

const getCardValue = (valueName, cardObj, i = 0) => {
  if ('card_faces' in cardObj) return cardObj.card_faces[i][valueName];
  return cardObj[valueName];
};

const PT = (cardObj, i = 0) => {
  const power = getCardValue('power', cardObj, i) || '';
  const toughness = getCardValue('toughness', cardObj, i) || '';
  if (power.length === 0 && toughness.length === 0) return '';
  return power + '/' + toughness;
};

const nameCost = (cardObj, i = 0) => {
  const name = getCardValue('name', cardObj, i);
  const cost = getCardValue('mana_cost', cardObj, i);
  return name + ' ' + cost;
};

const divider = (length) => '-'.repeat(length);

const typeLine = (cardObj, i = 0) => getCardValue('type_line', cardObj, i);

const oracle = (cardObj, i = 0) => getCardValue('oracle_text', cardObj, i);

const loyalty = (cardObj, i = 0) => getCardValue('loyalty', cardObj, i);

const gatherTextParts = (cardObj, i = 0) => {
  const line = divider(15);
  const tL = typeLine(cardObj, i);
  const isPlaneswalker = tL.includes('Planeswalker');
  const isCreature = tL.includes('Creature');
  // prettier-ignore
  const arr = [
    nameCost(cardObj, i),
    line,
    tL,
    line,
    oracle(cardObj, i),
  ];

  if (isPlaneswalker) {
    arr.push(`\n${loyalty(cardObj, i)}`);
  } else if (isCreature) {
    arr.push(`\n${PT(cardObj, i)}`);
  }
  return arr;
};

const cardAsText = (cardObj) => {
  if ('card_faces' in cardObj) {
    const foo = new Array(2)
      .fill(null)
      .map((val, i) => {
        const face = gatherTextParts(cardObj, i).join('\n');
        return face;
      })
      .join('\n' + '='.repeat(15) + '\n');
    return foo;
  }

  const oracleComponents = gatherTextParts(cardObj);
  return oracleComponents.join('\n');
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
    'frames',
  ];

  return cardDeclarations
    .map((val) => sanitize(val))
    .map((list) => ({
      name: list.shift(),
      modes: list.filter((mode) => functionModes.includes(mode)),
      set: list.filter((mode) => !functionModes.includes(mode))[0],
    }));
}

module.exports = { getCardsFromMessage, cardAsText, getCardValue };
