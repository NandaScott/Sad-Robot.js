// Many of the card faces all have similar places for each attribute
// however we need to rewrite the `base` object in memory because
// otherwise we'll eventually have a very messy object in memory
// so we call this to generate it, then modify values as needed, if any
function generateBase(scryfallObject) {
  const {
    name,
    scryfall_uri,
    power,
    toughness,
    mana_cost,
    prices,
    legalities,
    type_line,
    oracle_text,
    flavor_text,
    image_uris,
  } = scryfallObject;

  const { usd, usd_foil, eur, tix } = prices;

  return {
    name: name || '',
    url: scryfall_uri || '',
    power: power || '',
    toughness: toughness || '',
    cost: mana_cost || '',
    usd: usd || 'N/A',
    usdFoil: usd_foil || 'N/A',
    eur: eur || 'N/A',
    tix: tix || 'N/A',
    legalities: legalities || '',
    typeLine: type_line || '',
    oracleText: oracle_text || '',
    flavorText: flavor_text || 'N/A',
    image: image_uris?.border_crop || '',
    thumbnail: image_uris?.small || '',
  };
}

function handleDoubleFaceCard(scryfallObject, returnArray = false) {
  if (returnArray) {
    return new Array(scryfallObject.card_faces.length)
      .fill(undefined)
      .map((val, i) => {
        const base = generateBase(scryfallObject);
        const {
          name,
          image_uris,
          power,
          toughness,
          mana_cost,
          type_line,
          oracle_text,
          flavor_text,
        } = scryfallObject.card_faces[i];

        const newVals = {
          name: name || '',
          image: image_uris?.border_crop || '',
          power: power || '',
          toughness: toughness || '',
          cost: mana_cost || '',
          typeLine: type_line || '',
          oracleText: oracle_text || '',
          thumbnail: image_uris?.small || '',
          flavorText: flavor_text || '',
        };

        return { ...base, ...newVals };
      });
  }

  const base = generateBase(scryfallObject);
  const {
    name,
    image_uris,
    power,
    toughness,
    mana_cost,
    type_line,
    oracle_text,
    flavor_text,
  } = scryfallObject.card_faces[0];

  const newVals = {
    name: name || '',
    image: image_uris?.border_crop || '',
    power: power || '',
    toughness: toughness || '',
    cost: mana_cost || '',
    typeLine: type_line || '',
    oracleText: oracle_text || '',
    thumbnail: image_uris?.small || '',
    flavorText: flavor_text || '',
  };

  return { ...base, ...newVals };
}

function handleTransform(scryfallObject, returnArray = false) {
  return handleDoubleFaceCard(scryfallObject, returnArray);
}

function handleFlip(scryfallObject, returnArray = false) {
  if (returnArray) {
    return new Array(scryfallObject.card_faces.length)
      .fill(undefined)
      .map((val, i) => {
        const base = generateBase(scryfallObject);
        const {
          image_uris,
          scryfall_uri,
          card_faces,
          prices,
          legalities,
        } = scryfallObject;
        const {
          name,
          power,
          toughness,
          mana_cost,
          type_line,
          oracle_text,
          flavor_text,
        } = card_faces[i];
        const { usd, usd_foil, eur, tix } = prices;

        const newVals = {
          name: name,
          image: image_uris.border_crop,
          thumbnail: image_uris.small,
          url: scryfall_uri,
          power: power || '',
          toughness: toughness || '',
          cost: mana_cost || '',
          usd: usd || 'N/A',
          usdFoil: usd_foil || 'N/A',
          eur: eur || 'N/A',
          tix: tix || 'N/A',
          legalities: legalities,
          typeLine: type_line,
          oracleText: oracle_text,
          flavorText: flavor_text,
        };

        return { ...base, ...newVals };
      });
  }

  let base = {
    name: scryfallObject.card_faces[0].name,
    image: scryfallObject.image_uris.border_crop,
    thumbnail: scryfallObject.image_uris.small,
    url: scryfallObject.scryfall_uri,
    power:
      'power' in scryfallObject.card_faces[0]
        ? scryfallObject.card_faces[0].power
        : '',
    toughness:
      'toughness' in scryfallObject.card_faces[0]
        ? scryfallObject.card_faces[0].toughness
        : '',
    cost:
      'mana_cost' in scryfallObject.card_faces[0]
        ? scryfallObject.card_faces[0].mana_cost
        : '',
    usd: 'usd' in scryfallObject ? scryfallObject.usd : 'N/A',
    eur: 'eur' in scryfallObject ? scryfallObject.eur : 'N/A',
    tix: 'tix' in scryfallObject ? scryfallObject.tix : 'N/A',
    legalities: scryfallObject.legalities,
    typeLine: scryfallObject.card_faces[0].type_line,
    oracleText: scryfallObject.card_faces[0].oracle_text,
    flavorText:
      'flavor_text' in scryfallObject ? scryfallObject.flavor_text : 'N/A',
  };

  return base;
}

function handleSplit(scryfallObject, returnArray = false) {
  if (returnArray) {
    let array = [];

    for (let i = 0; i < scryfallObject.card_faces.length; i++) {
      let base = {
        name: scryfallObject.card_faces[i].name,
        image: scryfallObject.image_uris.border_crop,
        thumbnail: scryfallObject.image_uris.small,
        url: scryfallObject.scryfall_uri,
        power:
          'power' in scryfallObject.card_faces[i]
            ? scryfallObject.card_faces[i].power
            : '',
        toughness:
          'toughness' in scryfallObject.card_faces[i]
            ? scryfallObject.card_faces[i].toughness
            : '',
        cost:
          'mana_cost' in scryfallObject.card_faces[i]
            ? scryfallObject.card_faces[i].mana_cost
            : '',
        usd: 'usd' in scryfallObject ? scryfallObject.usd : 'N/A',
        eur: 'eur' in scryfallObject ? scryfallObject.eur : 'N/A',
        tix: 'tix' in scryfallObject ? scryfallObject.tix : 'N/A',
        legalities: scryfallObject.legalities,
        typeLine: scryfallObject.card_faces[i].type_line,
        oracleText: scryfallObject.card_faces[i].oracle_text,
        flavorText:
          'flavor_text' in scryfallObject ? scryfallObject.flavor_text : 'N/A',
      };

      array.push(base);
    }

    return array;
  }

  let base = {
    name: scryfallObject.card_faces[0].name,
    image: scryfallObject.image_uris.border_crop,
    thumbnail: scryfallObject.image_uris.small,
    url: scryfallObject.scryfall_uri,
    power:
      'power' in scryfallObject.card_faces[0]
        ? scryfallObject.card_faces[0].power
        : '',
    toughness:
      'toughness' in scryfallObject.card_faces[0]
        ? scryfallObject.card_faces[0].toughness
        : '',
    cost:
      'mana_cost' in scryfallObject.card_faces[0]
        ? scryfallObject.card_faces[0].mana_cost
        : '',
    usd: 'usd' in scryfallObject ? scryfallObject.usd : 'N/A',
    eur: 'eur' in scryfallObject ? scryfallObject.eur : 'N/A',
    tix: 'tix' in scryfallObject ? scryfallObject.tix : 'N/A',
    legalities: scryfallObject.legalities,
    typeLine: scryfallObject.card_faces[0].type_line,
    oracleText: scryfallObject.card_faces[0].oracle_text,
    flavorText:
      'flavor_text' in scryfallObject ? scryfallObject.flavor_text : 'N/A',
  };

  return base;
}

function handleNormal(scryfallObject, returnArray = false) {
  return generateBase(scryfallObject);
}

function handlePlanar(scryfallObject, returnArray = false) {
  return generateBase(scryfallObject);
}

function handleScheme(scryfallObject, returnArray = false) {
  return generateBase(scryfallObject);
}

function handleEmblem(scryfallObject, returnArray = false) {
  return generateBase(scryfallObject);
}

function handleLeveler(scryfallObject, returnArray = false) {
  return generateBase(scryfallObject);
}

function handleSaga(scryfallObject, returnArray = false) {
  return generateBase(scryfallObject);
}

function handleVanguard(scryfallObject, returnArray = false) {
  return generateBase(scryfallObject);
}

function handleMeld(scryfallObject, returnArray = false) {
  return generateBase(scryfallObject);
}

function handleToken(scryfallObject, returnArray = false) {
  return generateBase(scryfallObject);
}

function handleHost(scryfallObject, returnArray = false) {
  return generateBase(scryfallObject);
}

function handleAugment(scryfallObject, returnArray = false) {
  return generateBase(scryfallObject);
}

function handleDoubleFacedToken(scryfallObject, returnArray = false) {
  return handleDoubleFaceCard(scryfallObject, returnArray);
}

module.exports = {
  handleTransform,
  handleFlip,
  handleSplit,
  handleNormal,
  handlePlanar,
  handleScheme,
  handleEmblem,
  handleLeveler,
  handleSaga,
  handleVanguard,
  handleMeld,
  handleToken,
  handleHost,
  handleAugment,
  handleDoubleFacedToken,
};
