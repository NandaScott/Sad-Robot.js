const cardHelpers = require('./cardHelpers');
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
    split: multifaceHandlers.handleSplit
};

function handleMultifaceCards(scryfallObject) {
    const handler = cardFaceMapping[scryfallObject.layout];

    if (handler) {
        return handler(scryfallObject);
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
            }
        }

        let scryfall = JSON.parse(reply);

        switch (embedType) {
            case 'image':
                return cardImageHandler(msg, paramsObject, scryfall);
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

    if ('card_faces' in scryfallCard) {
        console.log(scryfallCard);
        const params = handleMultifaceCards(scryfallCard);

        if (Array.isArray(params)) {
            console.log(params)
            for (let i = 0; i < params.length; i++) {
                cardHelpers.imageEmbed(msg, seconds, params[i]);
            }
        } else {
            cardHelpers.imageEmbed(msg, seconds, params)
        }
    } else {
        let finalFormat = {
            image: scryfallCard.image_uris.normal,
            cardUrl: scryfallCard.scryfall_uri,
            name: scryfallCard.name
        }

        cardHelpers.imageEmbed(msg, seconds, finalFormat);
    }

}

module.exports = { checkCache };