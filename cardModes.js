const embedHelpers = require('./embedHelpers');
const requestHelpers = require('./requestsHelpers');
const cardLayoutHandlers = require('./cardLayoutHandlers');
const redis = require('redis');

const cache = redis.createClient(6379, '127.0.0.1');

cache.on('ready', () => {
    console.log('Connected to redis.')
});

cache.on('error', (err) => {
    console.log(err);
});

const cardLayoutMapping = {
    transform: cardLayoutHandlers.handleTransform,
    flip: cardLayoutHandlers.handleFlip,
    split: cardLayoutHandlers.handleSplit,
    normal: cardLayoutHandlers.handleNormal,
    planar: cardLayoutHandlers.handlePlanar,
    scheme: cardLayoutHandlers.handleScheme,
    emblem: cardLayoutHandlers.handleEmblem,
    leveler: cardLayoutHandlers.handleLeveler,
    saga: cardLayoutHandlers.handleSaga,
    vanguard: cardLayoutHandlers.handleVanguard,
    meld: cardLayoutHandlers.handleMeld,
    token: cardLayoutHandlers.handleToken,
    host: cardLayoutHandlers.handleHost,
    augment: cardLayoutHandlers.handleAugment,
    double_faced_token: cardLayoutHandlers.handleDoubleFacedToken
};

function handleCardLayout(scryfallObject, returnArray) {
    const handler = cardLayoutMapping[scryfallObject.layout];

    if (handler) {
        return handler(scryfallObject, returnArray);
    }
}

function checkCache(msg, paramsObject, embedType) {

    key = `${paramsObject.card} ${embedType}${paramsObject.setCode}`;

    cache.get(key, (err, reply) => {
        
        if (err) {
            msg.channel.send(err);
            return;
        }
        
        if (reply === null) {
            switch (embedType) {
                case 'image':
                    return cardImageHandler(msg, paramsObject, null, getCard=true);
                case 'oracle':
                    return cardOracleHandler(msg, paramsObject, null, getCard=true);
                case 'price':
                    return cardPriceHandler(msg, paramsObject, null, getCard=true);
                case 'legal':
                    return cardLegalHandler(msg, paramsObject, null, getCard=true);
                case 'set':
                    return cardSetHandler(msg, paramsObject, null, getCard=true);
                case 'rules':
                    return cardRulesHandler(msg, paramsObject, null, getCard=true);
                case 'flavor':
                    return cardFlavorHandler(msg, paramsObject, null, getCard=true);
                case 'unique':
                    return uniquePrintsHandler(msg, paramsObject, null, getCard=true);
                case 'random':
                    return randomCardHandler(msg, paramsObject, null, getCard=true);
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
            case 'set':
                return cardSetHandler(msg, paramsObject, reply);
            case 'rules':
                return cardRulesHandler(msg, paramsObject, reply);
            case 'flavor':
                return cardFlavorHandler(msg, paramsObject, reply);
            case 'unique':
                return uniquePrintsHandler(msg, paramsObject, reply);
        }
    });
}

async function cardImageHandler(msg, paramsObject, cacheReply, getCard=false) {

    let startTimer = new Date().getTime();
    let scryfallCard;
    
    if (getCard) {

        scryfallCard = await requestHelpers.cardsByName(paramsObject);

        if (scryfallCard.object === 'error') {
            let autocomplete = await requestHelpers.autocompleteName(paramsObject);
            
            let errorString = `${scryfallCard.details}\n\nYou may have meant one of the following:\n${autocomplete.data.join('\n')}`;
            msg.channel.send(errorString);
            return;
        }

        cache.setex(`${paramsObject.card} image`, 86400, JSON.stringify(scryfallCard));
    } else {
        scryfallCard = JSON.parse(cacheReply);
    }

    let seconds = parseFloat(((new Date().getTime() - startTimer) / 1000) % 60);

    let params;

    let doubleFaceLayouts = [
        'transform',
        'double_faced_token'
    ]

    if (doubleFaceLayouts.indexOf(scryfallCard.layout) > -1) {
        params = handleCardLayout(scryfallCard, returnArray=true);

        for (let i = 0; i < params.length; i++) {
            embedHelpers.imageEmbed(msg, seconds, params[i]);
        }
        return;
    } else {
        params = handleCardLayout(scryfallCard, returnArray=false);
    }


    embedHelpers.imageEmbed(msg, seconds, params);

}

async function cardOracleHandler(msg, paramsObject, cacheReply, getCard=false) {

    let startTimer = new Date().getTime();
    let scryfallCard;
    
    if (getCard) {

        scryfallCard = await requestHelpers.cardsByName(paramsObject);

        
        if (scryfallCard.object === 'error') {
            let autocomplete = await requestHelpers.autocompleteName(paramsObject);

            let errorString = `${scryfallCard.details}\n\nYou may have meant one of the following:\n${autocomplete.data.join('\n')}`;
            msg.channel.send(errorString);
            return;
        }

        cache.setex(`${paramsObject.card} oracle`, 86400, JSON.stringify(scryfallCard));
    } else {
        scryfallCard = JSON.parse(cacheReply);
    }

    let seconds = parseFloat(((new Date().getTime() - startTimer) / 1000) % 60);

    let params = handleCardLayout(scryfallCard, returnArray=true);

    embedHelpers.oracleEmbed(msg, seconds, params);

}

async function cardPriceHandler(msg, paramsObject, cacheReply, getCard=false) {

    let startTimer = new Date().getTime();
    let scryfallCard;
    
    if (getCard) {

        scryfallCard = await requestHelpers.cardsByName(paramsObject);

        if (scryfallCard.object === 'error') {
            let autocomplete = await requestHelpers.autocompleteName(paramsObject);

            let errorString = `${scryfallCard.details}\n\nYou may have meant one of the following:\n${autocomplete.data.join('\n')}`;
            msg.channel.send(errorString);
            return;
        }

        cache.setex(`${paramsObject.card} price`, 86400, JSON.stringify(scryfallCard));
    } else {
        scryfallCard = JSON.parse(cacheReply);
    }

    let seconds = parseFloat(((new Date().getTime() - startTimer) / 1000) % 60);

    let params = handleCardLayout(scryfallCard, returnArray=true);

    embedHelpers.priceEmbed(msg, seconds, params);
}

async function cardLegalHandler(msg, paramsObject, cacheReply, getCard=false) {

    let startTimer = new Date().getTime();
    let scryfallCard;
    
    if (getCard) {

        scryfallCard = await requestHelpers.cardsByName(paramsObject);

        if (scryfallCard.object === 'error') {
            let autocomplete = await requestHelpers.autocompleteName(paramsObject);

            let errorString = `${scryfallCard.details}\n\nYou may have meant one of the following:\n${autocomplete.data.join('\n')}`;
            msg.channel.send(errorString);
            return;
        }
        cache.setex(`${paramsObject.card} price`, 86400, JSON.stringify(scryfallCard));
    } else {
        scryfallCard = JSON.parse(cacheReply);
    }

    let seconds = parseFloat(((new Date().getTime() - startTimer) / 1000) % 60);

    let params = handleCardLayout(scryfallCard, returnArray=true);

    embedHelpers.legalEmbed(msg, seconds, params);
}

async function cardSetHandler(msg, paramsObject, cacheReply, getCard=false) {

    let startTimer = new Date().getTime();
    let scryfallCard;
    
    if (getCard) {

        scryfallCard = await requestHelpers.cardsByNameSet(paramsObject);

        if (scryfallCard.object === 'error') {
            let autocomplete = await requestHelpers.autocompleteName(paramsObject);

            let errorString = `${scryfallCard.details}\n\nYou may have meant one of the following:\n${autocomplete.data.join('\n')}`;
            msg.channel.send(errorString);
            return;
        }

        cache.setex(`${paramsObject.card} set${paramsObject.setCode}`, 86400, JSON.stringify(scryfallCard));
    } else {
        scryfallCard = JSON.parse(cacheReply);
    }

    let seconds = parseFloat(((new Date().getTime() - startTimer) / 1000) % 60);

    let params;

    if (scryfallCard.layout === 'transform') {
        params = handleCardLayout(scryfallCard, returnArray=true);

        for (let i = 0; i < params.length; i++) {
            embedHelpers.imageEmbed(msg, seconds, params[i]);
        }
        return;
    } else {
        params = handleCardLayout(scryfallCard, returnArray=true);
    }


    embedHelpers.imageEmbed(msg, seconds, params);
}

async function cardRulesHandler(msg, paramsObject, cacheReply, getCard=false) {

    let startTimer = new Date().getTime();
    let scryfallCard, cardRulings;

    if (getCard) {

        scryfallCard = await requestHelpers.cardsByName(paramsObject);
        cardRulings = await requestHelpers.cardRulesById(scryfallCard.id);

        if (scryfallCard.object === 'error') {
            let autocomplete = await requestHelpers.autocompleteName(paramsObject);

            let errorString = `${scryfallCard.details}\n\nYou may have meant one of the following:\n${autocomplete.data.join('\n')}`;
            msg.channel.send(errorString);
            return;
        }

        if (cardRulings.data.length == 0) {
            msg.channel.send(`${scryfallCard.name} has no current rulings.`);
            return;
        }

        // Cleaning up data for combining
        delete scryfallCard.object;
        delete cardRulings.object;
        delete cardRulings.has_more;
        cardRulings.rulingsList = cardRulings.data;
        delete cardRulings.data;

        let combine = Object.assign(scryfallCard, cardRulings);

        cache.setex(`${paramsObject.card} rules`, 86400, JSON.stringify(combine));

    } else {
        scryfallCard = JSON.parse(cacheReply);
    }

    let seconds = parseFloat(((new Date().getTime() - startTimer) / 1000) % 60);

    let params = handleCardLayout(scryfallCard);

    params.rulingsList = ('rulingsList' in scryfallCard) ? scryfallCard.rulingsList : cardRulings.data;

    embedHelpers.rulesEmbed(msg, seconds, params);
}

async function cardFlavorHandler(msg, paramsObject, cacheReply, getCard = false) {

    let startTimer = new Date().getTime();
    let scryfallCard;

    if (getCard) {

        scryfallCard = await requestHelpers.cardsByName(paramsObject);

        if (scryfallCard.object === 'error') {
            let autocomplete = await requestHelpers.autocompleteName(paramsObject);

            let errorString = `${scryfallCard.details}\n\nYou may have meant one of the following:\n${autocomplete.data.join('\n')}`;
            msg.channel.send(errorString);
            return;
        }

        cache.setex(`${paramsObject.card} flavor`, 86400, JSON.stringify(scryfallCard));

    } else {
        scryfallCard = JSON.parse(cacheReply);
    }

    let seconds = parseFloat(((new Date().getTime() - startTimer) / 1000) % 60);

    let params = handleCardLayout(scryfallCard);

    embedHelpers.flavorEmbed(msg, seconds, params);
}

async function uniquePrintsHandler(msg, paramsObject, cacheReply, getCard=false) {

    let forbiddenCards = [
        'plains',
        'island',
        'swamp',
        'mountain',
        'forest'
    ]

    if (forbiddenCards.indexOf(paramsObject.card) > -1) {
        msg.channel.send(
            'You may not search that card with the `unique` mode.\nHere\'s a link you can use:\n' + 
            `https://scryfall.com/search?q=!"${paramsObject.card.replace(' ', '+')}"&unique=prints`
        )
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
            if (autocomplete.data == 0) {
                return;
            }

            let errorString = `\n\nYou may have meant one of the following:\n${autocomplete.data.join('\n')}`;
            msg.channel.send(errorString);
            return;
        }

        cache.setex(`${paramsObject.card} unique`, 86400, JSON.stringify(cardList));

    } else {
        cardList = JSON.parse(cacheReply);
    }

    let seconds = parseFloat(((new Date().getTime() - startTimer) / 1000) % 60);

    let newList = cardList.data.map((card) => {
        return `[${card.set.toUpperCase()}: ${card.set_name}](${card.scryfall_uri})`;
    });

    //Set up for batch embeds
    let total = 0;
    let batch = {};
    let currentBatch = 1;
    batch[currentBatch] = [];

    // Creating batch embeds.
    //We do this because there's a hard limit of 2048 characters in a RichEmbed.
    for (let i=0; i < newList.length; i++) {

        total = total + newList[i].length;

        if (total < 2000) {
            batch[currentBatch].push(newList[i]);
            batch[currentBatch]
        } else {
            total = 0;
            currentBatch++
            batch[currentBatch] = [];
        }
    }

    for (let key in batch) {
        let params = {
            url: `https://scryfall.com/search?q=!"${cardList.data[0].name.replace(' ', '+')}"&unique=prints`,
            cardList: batch[key],
            name: cardList.data[0].name
        }

        embedHelpers.uniquePrintsEmbed(msg, seconds, params);
    }
}

async function randomCardHandler(msg, paramsObject, cacheReply, getCard=false) {

    let startTimer = new Date().getTime();
    let scryfallCard;
    
    if (getCard) {

        scryfallCard = await requestHelpers.randomCard();

        if (scryfallCard.object === 'error') {
            let autocomplete = await requestHelpers.autocompleteName(paramsObject);

            msg.channel.send(cardList.details);

            let errorString = `\n\nYou may have meant one of the following:\n${autocomplete.data.join('\n')}`;
            msg.channel.send(errorString);
            return;
        }
    } else {
        scryfallCard = JSON.parse(cacheReply);
    }

    let seconds = parseFloat(((new Date().getTime() - startTimer) / 1000) % 60);

    let params;

    let doubleFaceLayouts = [
        'transform',
        'double_faced_token'
    ]

    if (doubleFaceLayouts.indexOf(scryfallCard.layout) > -1) {
        params = handleCardLayout(scryfallCard, returnArray=true);

        for (let i = 0; i < params.length; i++) {
            embedHelpers.imageEmbed(msg, seconds, params[i]);
        }
        return;
    } else {
        params = handleCardLayout(scryfallCard, returnArray=false);
    }

    embedHelpers.imageEmbed(msg, seconds, params);

}

module.exports = { checkCache };