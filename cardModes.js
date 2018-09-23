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

function handleCardLayout(scryfallObject, returnArray) {
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
                case 'price':
                    return cardPriceHandler(msg, paramsObject, null, getCard=true);
                case 'legal':
                    return cardLegalHandler(msg, paramsObject, null, getCard=true);
                case 'set':
                    return cardSetHandler(msg, paramsObject, null, getCard=true);
                case 'rules':
                    return cardRulesHandler(msg, paramsObject, null, getCard=true);
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

    if (scryfallCard.layout === 'transform') {
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

module.exports = { checkCache };