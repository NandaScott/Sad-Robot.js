const embedHelpers = require('./embedHelpers');
const requestHelpers = require('./requestsHelpers');
const multifaceHandlers = require('./multifaceHandlers');
const redis = require('redis');

const cache = redis.createClient(6379, '127.0.0.1');

cache.on('ready', () => {
    console.log('Connected to redis.')
});

cache.on('error', (err) => {
    console.log(err);
});

const cardFaceMapping = {
    transform: multifaceHandlers.handleTransform,
    flip: multifaceHandlers.handleFlip,
    split: multifaceHandlers.handleSplit,
    normal: multifaceHandlers.handleNormal
};

function handleMultifaceCards(scryfallObject, returnArray) {
    const handler = cardFaceMapping[scryfallObject.layout];

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
            }
        }

        let scryfall = JSON.parse(reply);

        switch (embedType) {
            case 'image':
                return cardImageHandler(msg, paramsObject, scryfall);
            case 'oracle':
                return cardOracleHandler(msg, paramsObject, scryfall);
        }
    });
}

async function cardImageHandler(msg, paramsObject, cacheObject, getCard=false) {

    let startTimer = new Date().getTime();
    let scryfallCard;
    
    if (getCard) {

        scryfallCard = await requestHelpers.cardsByName(paramsObject);

        cache.setex(`${paramsObject.card} image`, 86400, JSON.stringify(scryfallCard));

        if (scryfallCard.object === 'error') {
            msg.channel.send(scryfallCard.details);
            return;
        }
    } else {
        scryfallCard = cacheObject;
    }

    let seconds = parseFloat(((new Date().getTime() - startTimer) / 1000) % 60);

    let params;

    if (scryfallCard.layout === 'transform') {
        params = handleMultifaceCards(scryfallCard, returnArray=true);

        for (let i = 0; i < params.length; i++) {
            embedHelpers.imageEmbed(msg, seconds, params[i]);
        }
        return;
    }
    
    params = handleMultifaceCards(scryfallCard, returnArray=false);

    embedHelpers.imageEmbed(msg, seconds, params);

}

async function cardOracleHandler(msg, paramsObject, cacheObject, getCard=false) {

    let startTimer = new Date().getTime();
    let scryfallCard;
    
    if (getCard) {

        scryfallCard = await requestHelpers.cardsByName(paramsObject);

        cache.setex(`${paramsObject.card} oracle`, 86400, JSON.stringify(scryfallCard));

        if (scryfallCard.object === 'error') {
            msg.channel.send(scryfallCard.details);
            return;
        }
    } else {
        scryfallCard = cacheObject;
    }

    let seconds = parseFloat(((new Date().getTime() - startTimer) / 1000) % 60);

    let params;

    params = handleMultifaceCards(scryfallCard, returnArray=true);

    embedHelpers.oracleEmbed(msg, seconds, params);

}

module.exports = { checkCache };