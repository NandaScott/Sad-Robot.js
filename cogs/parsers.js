const url = require('url');

const getCardDeclarations = (string) =>
  string.match(/(\[\[[\w\s\'\.\,|/:🎲-]+\]\])+/g);

const sanitize = (string) => {
  const removeBrackets = string.replace('[[', '').replace(']]', '');
  return removeBrackets.split('|');
};

const getCardValue = (valueName, cardObj, i = 0) => {
  if (valueName === 'legalities') return cardObj[valueName];
  if (valueName === 'prices') return cardObj[valueName];
  if ('card_faces' in cardObj) return cardObj.card_faces[i][valueName];
  return cardObj[valueName];
};

const formatFieldName = (name) => name.replace('_', ' ').toUpperCase();

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const objectToEmbedFields = (object, mode) => {
  const modeMap = {
    prices: [formatFieldName, (v) => v],
    legalities: [capitalize, formatFieldName],
  };
  return Object.entries(object).map((val) => {
    const [name, value] = val;
    const [nameFormat, valueFormat] = modeMap[mode];
    if (value === null) return {};
    return {
      name: nameFormat(name),
      value: valueFormat(value),
      inline: true,
    };
  });
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

const keyToFields = (name, cardObj) => {
  const value = getCardValue(name, cardObj);
  const embedFields = objectToEmbedFields(value, name);
  const removeEmptyFields = embedFields.filter(
    (val) => Object.keys(val).length !== 0
  );
  return removeEmptyFields;
};

const uniqueDescription = (cardObj) => {
  const { uniquePrints } = cardObj;
  return uniquePrints
    .map((print) => {
      const { setName, setCode, number, url } = print;
      return `[${setName}: ${setCode} (${number})](${url})`;
    })
    .join('\n');
};

const formatSearchURI = (uriLink) => {
  const URL = url.parse(uriLink);
  const { search } = URL;
  return `https://scryfall.com/search${search}`;
};

function getCardsFromMessage(messageString) {
  const cardDeclarations = getCardDeclarations(messageString);

  const functionModes = [
    'image',
    'oracle',
    'price',
    'legal',
    'flavor',
    'unique',
  ];

  const isMode = (val) => functionModes.includes(val);

  const isNum = (val) => isNaN(parseInt(val));

  const findColletorNum = (parsedList) =>
    parsedList.filter((val) => !isNum(val))[0];

  const findSet = (parsedList) => {
    const [found] = parsedList.filter((val) => {
      if (!isNum(val)) return false;
      if (!isMode(val)) return val;
    });
    return found;
  };

  return cardDeclarations
    .map((val) => sanitize(val))
    .map((list) => {
      return {
        name: list.shift(),
        modes: list.filter((mode) => isMode(mode)),
        set: findSet(list),
        num: findColletorNum(list),
      };
    });
}

module.exports = {
  getCardsFromMessage,
  cardAsText,
  keyToFields,
  getCardValue,
  uniqueDescription,
  formatSearchURI,
};
