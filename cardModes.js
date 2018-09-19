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
    transform: multifaceHandlers.handleTransform
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
            msg.channel.send(errr);
            return;
        }

        if (reply === null) {
            switch (embedType) {
                case 'image':
                    return cardImageHandler(msg, paramsObject, getCard=true);
            }
        }

        let scryfall = JSON.parse(reply);

        switch (embedType) {
            case 'image':
                return cardImageHandler(msg, scryfall, paramsObject);
        }
    });
}

function cardImageHandler(msg, scryfall=undefined, paramsObject, getCard=false) {

    let startTimer = new Date().getTime();
    let scryfallCard;

    if (getCard) {
        scryfallCard = requestHelpers.cardsByName(paramsObject); //This isn't getting called for some reason

        cache.setex(`${paramsObject.card} image`, 86400, JSON.stringify(scryfall));

        if (scryfallCard.object === 'error') {
            msg.channel.send(error.response.data.details);
            return;
        }
    } else {
        scryfallCard = scryfall;
    }

    let seconds = parseFloat(((new Date().getTime() - startTimer) / 1000) % 60);

    if ('card_faces' in scryfallCard) {

        let faceArray = handleMultifaceCards(scryfallCard);

        for (let i = 0; i < faceArray.length; i++) {
            cardHelpers.imageEmbed(msg, seconds, faceArray[i]);
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