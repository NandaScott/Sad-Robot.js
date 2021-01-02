const embedHelpers = require('./embedHelpers');
const requestHelpers = require('./requestsHelpers');
const cardLayoutHandlers = require('./cardLayoutHandlers');
const redis = require('redis');

const cache = redis.createClient(6379, '127.0.0.1');

// prettier-ignore
const errorString = (scryfallCard, autocomplete) =>`${scryfallCard.details}\n\nYou may have meant one of the following:\n${autocomplete.data.join('\n')}`;

cache.on('ready', () => {
  console.log('Connected to redis.');
});

cache.on('error', (err) => {
  console.log(err);
});

const cardLayoutMapping = {
  normal: cardLayoutHandlers.handleNormal,
  split: cardLayoutHandlers.handleSplit,
  flip: cardLayoutHandlers.handleFlip,
  transform: cardLayoutHandlers.handleTransform,
  modal_dfc: cardLayoutHandlers.handleTransform,
  meld: cardLayoutHandlers.handleMeld,
  leveler: cardLayoutHandlers.handleLeveler,
  saga: cardLayoutHandlers.handleSaga,
  planar: cardLayoutHandlers.handlePlanar,
  scheme: cardLayoutHandlers.handleScheme,
  vanguard: cardLayoutHandlers.handleVanguard,
  token: cardLayoutHandlers.handleToken,
  double_faced_token: cardLayoutHandlers.handleDoubleFacedToken,
  emblem: cardLayoutHandlers.handleEmblem,
  augment: cardLayoutHandlers.handleAugment,
  host: cardLayoutHandlers.handleHost,
  art_series: cardLayoutHandlers.handleTransform,
};

const doubleFaceLayouts = ['transform', 'double_faced_token', 'modal_dfc'];

const forOneHour = 1000 * 60 * 60;

const endTimer = (start) =>
  parseFloat(((new Date().getTime() - start) / 1000) % 60);

const isDoubleFaced = (card) => doubleFaceLayouts.indexOf(card.layout) > -1;

const handleNoCardFound = async (card, params, msg) => {
  if (card.object === 'error') {
    const autocomplete = await requestHelpers.autocompleteName(params);

    if (autocomplete.data.length > 0) {
      msg.channel.send(errorString(card, autocomplete));
    } else {
      msg.channel.send(card.details);
    }
    return true;
  }
  return false;
};

function handleCardLayout(scryfallObject, returnArray) {
  const handler = cardLayoutMapping[scryfallObject.layout];

  if (handler) {
    return handler(scryfallObject, returnArray);
  }
}

function checkCache(msg, paramsObject, embedType) {
  const key = `${paramsObject.card} ${embedType}${paramsObject.setCode}`;

  cache.get(key, (err, reply) => {
    if (err) {
      msg.channel.send(err);
      return;
    }

    if (reply === null) {
      switch (embedType) {
        case 'image':
          return cardImageHandler(msg, paramsObject, null, (getCard = true));
        case 'oracle':
          return cardOracleHandler(msg, paramsObject, null, (getCard = true));
        case 'price':
          return cardPriceHandler(msg, paramsObject, null, (getCard = true));
        case 'legal':
          return cardLegalHandler(msg, paramsObject, null, (getCard = true));
        case 'rules':
          return cardRulesHandler(msg, paramsObject, null, (getCard = true));
        case 'flavor':
          return cardFlavorHandler(msg, paramsObject, null, (getCard = true));
        case 'unique':
          return uniquePrintsHandler(msg, paramsObject, null, (getCard = true));
        case 'random':
          return randomCardHandler(msg, paramsObject, null, (getCard = true));
      }
    }

    switch (embedType) {
      case 'image':
        return cardImageHandler(msg, paramsObject, reply);
      case 'oracle':
        return cardOracleHandler(msg, paramsObject, reply);
      case 'price':
        return cardPriceHandler(msg, paramsObject, reply);
      case 'legal':
        return cardPriceHandler(msg, paramsObject, reply);
      case 'rules':
        return cardRulesHandler(msg, paramsObject, reply);
      case 'flavor':
        return cardFlavorHandler(msg, paramsObject, reply);
      case 'unique':
        return uniquePrintsHandler(msg, paramsObject, reply);
    }
  });
}

async function cardImageHandler(
  msg,
  paramsObject,
  cacheReply,
  getCard = false
) {
  const startTimer = new Date().getTime();
  let scryfallCard;

  if (getCard) {
    scryfallCard = await requestHelpers.cardsByName(paramsObject);

    if (handleNoCardFound(scryfallCard, paramsObject, msg)) return;

    cache.setex(
      `${paramsObject.card} image`,
      forOneHour,
      JSON.stringify(scryfallCard)
    );
  } else {
    scryfallCard = JSON.parse(cacheReply);
  }

  const seconds = endTimer(startTimer);

  if (isDoubleFaced(scryfallCard)) {
    const params = handleCardLayout(scryfallCard, (returnArray = true));
    params.forEach((param) => embedHelpers.imageEmbed(msg, seconds, param));
  } else {
    const params = handleCardLayout(scryfallCard, (returnArray = false));
    embedHelpers.imageEmbed(msg, seconds, params);
  }
}

async function cardOracleHandler(
  msg,
  paramsObject,
  cacheReply,
  getCard = false
) {
  const startTimer = new Date().getTime();
  let scryfallCard;

  if (getCard) {
    scryfallCard = await requestHelpers.cardsByName(paramsObject);

    if (handleNoCardFound(scryfallCard, paramsObject, msg)) return;

    cache.setex(
      `${paramsObject.card} oracle`,
      forOneHour,
      JSON.stringify(scryfallCard)
    );
  } else {
    scryfallCard = JSON.parse(cacheReply);
  }

  const seconds = endTimer(startTimer);

  const params = handleCardLayout(scryfallCard, (returnArray = true));

  embedHelpers.oracleEmbed(msg, seconds, params);
}

async function cardPriceHandler(
  msg,
  paramsObject,
  cacheReply,
  getCard = false
) {
  const startTimer = new Date().getTime();
  let scryfallCard;

  if (getCard) {
    scryfallCard = await requestHelpers.cardsByName(paramsObject);

    if (handleNoCardFound(scryfallCard, paramsObject, msg)) return;

    cache.setex(
      `${paramsObject.card} price`,
      forOneHour,
      JSON.stringify(scryfallCard)
    );
  } else {
    scryfallCard = JSON.parse(cacheReply);
  }

  const seconds = endTimer(startTimer);

  const params = handleCardLayout(scryfallCard, (returnArray = true));

  embedHelpers.priceEmbed(msg, seconds, params);
}

async function cardLegalHandler(
  msg,
  paramsObject,
  cacheReply,
  getCard = false
) {
  const startTimer = new Date().getTime();
  let scryfallCard;

  if (getCard) {
    scryfallCard = await requestHelpers.cardsByName(paramsObject);

    if (handleNoCardFound(scryfallCard, paramsObject, msg)) return;

    cache.setex(
      `${paramsObject.card} price`,
      forOneHour,
      JSON.stringify(scryfallCard)
    );
  } else {
    scryfallCard = JSON.parse(cacheReply);
  }

  const seconds = endTimer(startTimer);

  const params = handleCardLayout(scryfallCard, (returnArray = true));

  embedHelpers.legalEmbed(msg, seconds, params);
}

async function cardRulesHandler(
  msg,
  paramsObject,
  cacheReply,
  getCard = false
) {
  const startTimer = new Date().getTime();
  let scryfallCard, cardRulings;

  if (getCard) {
    scryfallCard = await requestHelpers.cardsByName(paramsObject);
    cardRulings = await requestHelpers.cardRulesById(scryfallCard.id);

    if (handleNoCardFound(scryfallCard, paramsObject, msg)) return;

    if (cardRulings.data.length === 0) {
      msg.channel.send(`${scryfallCard.name} has no current rulings.`);
      return;
    }

    // Cleaning up data for combining
    delete scryfallCard.object;
    delete cardRulings.object;
    delete cardRulings.has_more;
    cardRulings.rulingsList = cardRulings.data;
    delete cardRulings.data;

    const combine = { ...scryfallCard, ...cardRulings };

    cache.setex(
      `${paramsObject.card} rules`,
      forOneHour,
      JSON.stringify(combine)
    );
  } else {
    scryfallCard = JSON.parse(cacheReply);
  }

  const seconds = endTimer(startTimer);

  const params = handleCardLayout(scryfallCard);

  params.rulingsList = scryfallCard?.rulingsList || cardRulings.data;

  embedHelpers.rulesEmbed(msg, seconds, params);
}

async function cardFlavorHandler(
  msg,
  paramsObject,
  cacheReply,
  getCard = false
) {
  const startTimer = new Date().getTime();
  let scryfallCard;

  if (getCard) {
    scryfallCard = await requestHelpers.cardsByName(paramsObject);

    if (handleNoCardFound(scryfallCard, paramsObject, msg)) return;

    cache.setex(
      `${paramsObject.card} flavor`,
      forOneHour,
      JSON.stringify(scryfallCard)
    );
  } else {
    scryfallCard = JSON.parse(cacheReply);
  }

  const seconds = endTimer(startTimer);

  const params = handleCardLayout(scryfallCard);

  embedHelpers.flavorEmbed(msg, seconds, params);
}

async function uniquePrintsHandler(
  msg,
  paramsObject,
  cacheReply,
  getCard = false
) {
  const forbiddenCards = ['plains', 'island', 'swamp', 'mountain', 'forest'];

  if (forbiddenCards.includes(paramsObject.card)) {
    msg.channel.send(
      "You may not search that card with the `unique` mode.\nHere's a link you can use:\n" +
        `https://scryfall.com/search?q=!"${paramsObject.card.replace(
          ' ',
          '+'
        )}"&unique=prints`
    );
    return;
  }

  let startTimer = new Date().getTime();
  let cardList;

  if (getCard) {
    cardList = await requestHelpers.uniquePrints(paramsObject);

    if (cardList.object === 'error') {
      let autocomplete = await requestHelpers.autocompleteName(paramsObject);

      msg.channel.send(cardList.details);

      // If no autocompletion is found just break.
      if (autocomplete.data === 0) {
        return;
      }

      if (autocomplete.data.length > 0) {
        msg.channel.send(errorString(scryfallCard, autocomplete));
      } else {
        msg.channel.send(`${scryfallCard.details}`);
      }
      return;
    }

    cache.setex(
      `${paramsObject.card} unique`,
      forOneHour,
      JSON.stringify(cardList)
    );
  } else {
    cardList = JSON.parse(cacheReply);
  }

  const seconds = endTimer(startTimer);

  let newList = cardList.data.map((card) => {
    return `[${card.set.toUpperCase()}: ${card.set_name}](${
      card.scryfall_uri
    })`;
  });

  //Set up for batch embeds
  let total = 0;
  let batch = {};
  let currentBatch = 1;
  batch[currentBatch] = [];

  // Creating batch embeds.
  //We do this because there's a hard limit of 2048 characters in a RichEmbed.
  for (let i = 0; i < newList.length; i++) {
    total = total + newList[i].length;

    if (total < 2000) {
      batch[currentBatch].push(newList[i]);
      batch[currentBatch];
    } else {
      total = 0;
      currentBatch++;
      batch[currentBatch] = [];
    }
  }

  for (let key in batch) {
    let params = {
      url: `https://scryfall.com/search?q=!"${cardList.data[0].name.replace(
        ' ',
        '+'
      )}"&unique=prints`,
      cardList: batch[key],
      name: cardList.data[0].name,
    };

    embedHelpers.uniquePrintsEmbed(msg, seconds, params);
  }
}

async function randomCardHandler(
  msg,
  paramsObject,
  cacheReply,
  getCard = false
) {
  let startTimer = new Date().getTime();
  let scryfallCard;

  if (getCard) {
    scryfallCard = await requestHelpers.randomCard();

    if (scryfallCard.object === 'error') {
      let autocomplete = await requestHelpers.autocompleteName(paramsObject);

      msg.channel.send(cardList.details);

      if (autocomplete.data.length > 0) {
        msg.channel.send(errorString(scryfallCard, autocomplete));
      } else {
        msg.channel.send(`${scryfallCard.details}`);
      }
      return;
    }
  } else {
    scryfallCard = JSON.parse(cacheReply);
  }

  let seconds = parseFloat(((new Date().getTime() - startTimer) / 1000) % 60);

  let params;

  let doubleFaceLayouts = ['transform', 'double_faced_token'];

  if (doubleFaceLayouts.indexOf(scryfallCard.layout) > -1) {
    params = handleCardLayout(scryfallCard, (returnArray = true));

    for (let i = 0; i < params.length; i++) {
      embedHelpers.imageEmbed(msg, seconds, params[i]);
    }
    return;
  } else {
    params = handleCardLayout(scryfallCard, (returnArray = false));
  }

  embedHelpers.imageEmbed(msg, seconds, params);
}

module.exports = { checkCache };
