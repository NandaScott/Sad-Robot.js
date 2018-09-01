const cardHelpers = require('./cardHelpers');
const axios = require('axios');
const redis = require('redis');

const cache = redis.createClient(6379, '127.0.0.1');

cache.on('ready', (err, reply) => {
    console.log('Connected to redis.')
});

cache.on('error', (err, reply) => {
    console.log(err);
});

function checkCache(msg, scryfallBaseUrl, paramsObject, embedType) {

    let startTimer = new Date().getTime();

    key = `${paramsObject.card} ${embedType}${paramsObject.setCode}`;

    cache.get(key, (err, reply) => {
        if (reply === null) {
            switch (embedType) {
                case 'image':
                    return cardImage(msg, scryfallBaseUrl, paramsObject.card);
                case 'oracle':
                    return oracleText(msg, scryfallBaseUrl, paramsObject.card);
                case 'price':
                    return cardPrice(msg, scryfallBaseUrl, paramsObject.card);
                case 'set':
                    return cardSet(msg, scryfallBaseUrl, paramsObject);
                case 'legal':
                    return cardLegality(msg, scryfallBaseUrl, paramsObject.card);
            }
        }

        let scryfall = JSON.parse(reply);

        let seconds = parseFloat(((new Date().getTime() - startTimer) / 1000) % 60);

        switch (embedType) {
            case 'image':
                if ('card_faces' in scryfall) {
                    handleMultifaceCards(msg, seconds, scryfall, 'image');
                } else {
                    cardHelpers.imageEmbed(
                        msg,
                        seconds,
                        scryfall.image_uris.normal,
                        scryfall.scryfall_uri,
                        scryfall.name
                    );
                }
                break;

            case 'oracle':
                if ('card_faces' in scryfall) {
                    handleMultifaceCards(msg, seconds, scryfall, 'oracle')
                } else {
                    let power, toughness;

                    if ('power' in scryfall) {
                        power = scryfall.power;
                        toughness = scryfall.toughness;
                    } else {
                        power = '';
                        toughness = '';
                    }
    
                    let object = {
                        image: scryfall.image_uris.small,
                        url: scryfall.scryfall_uri,
                        name: scryfall.name,
                        cost: scryfall.mana_cost,
                        typeLine: scryfall.type_line,
                        oracleText: scryfall.oracle_text,
                        power: power,
                        toughness: toughness
                    }

                    cardHelpers.oracleEmbed(
                        msg,
                        seconds,
                        object
                    );
                }
                break;

            case 'price':
                let image;

                if ('card_faces' in scryfall) {
                    image = scryfall.card_faces[0].image_uris.small
                } else {
                    image = scryfall.image_uris.small
                }
        
                let price_object = {
                    usd: scryfall.usd || 'N/A',
                    eur: scryfall.eur || 'N/A',
                    tix: scryfall.tix || 'N/A',
                    name: scryfall.name,
                    image: image,
                    url: scryfall.scryfall_uri
                }
        
                cardHelpers.priceEmbed(msg, seconds, price_object);
                break;

            case 'set':
                if ('card_faces' in scryfall) {
                    handleMultifaceCards(msg, seconds, scryfall, 'image')
                } else {
                    cardHelpers.imageEmbed(
                        msg,
                        seconds,
                        scryfall.image_uris.normal,
                        scryfall.scryfall_uri,
                        scryfall.name);
                }
                break;

            case 'legal':
                let thumbnail;

                if ('card_faces' in scryfall) {
                    thumbnail = scryfall.card_faces[0].image_uris.small
                } else {
                    thumbnail = scryfall.image_uris.small
                }
        
                let object = {
                    url: scryfall.scryfall_uri,
                    name: scryfall.name,
                    image: thumbnail,
                    legalities: scryfall.legalities
                }
        
                cardHelpers.legalEmbed(msg, seconds, object);
                break;
        }
    })
}

function handleMultifaceCards(msg, seconds, scryfall_object, mode) {
    for (let i = 0; i < scryfall_object.card_faces.length; i++) {
        switch (mode) {
            case 'image':

                cardHelpers.imageEmbed(
                    msg,
                    seconds,
                    scryfall_object.card_faces[i].image_uris.normal,
                    scryfall_object.scryfall_uri,
                    scryfall_object.card_faces[i].name
                );
                break;

            case 'oracle':
                let power, toughness;

                if ('power' in scryfall_object.card_faces[i]) {
                    power = scryfall_object.card_faces[i].power;
                    toughness = scryfall_object.card_faces[i].toughness;
                } else {
                    power = '';
                    toughness = '';
                }

                let object = {
                    image: scryfall_object.card_faces[i].image_uris.small,
                    url: scryfall_object.scryfall_uri,
                    name: scryfall_object.card_faces[i].name,
                    cost: scryfall_object.card_faces[i].mana_cost,
                    typeLine: scryfall_object.card_faces[i].type_line,
                    oracleText: scryfall_object.card_faces[i].oracle_text,
                    power: power,
                    toughness: toughness
                }

                cardHelpers.oracleEmbed(msg, seconds, object);

            
        }
    }
}

function cardImage(msg, scryfallBaseUrl, cardName) {

    let startTimer = new Date().getTime();

    axios.get(`${scryfallBaseUrl}/cards/named`, {
        params: {
            fuzzy: cardName
        }
    })
    .then((response) => {
        // Number of seconds it took to complete the get request
        // displayed as a float.
        let seconds = parseFloat(((new Date().getTime() - startTimer) / 1000) % 60);

        let scryfall = response.data;

        cache.setex(`${cardName} image`, 86400, JSON.stringify(scryfall));

        switch ("card_faces" in scryfall) {

            case true:
                handleMultifaceCards(msg, seconds, scryfall, 'image');
                break;

            case false:
                cardHelpers.imageEmbed(
                    msg,
                    seconds,
                    scryfall.image_uris.normal,
                    scryfall.scryfall_uri,
                    scryfall.name
                );
                break;
        }
    })
    .catch((error) => {
        msg.channel.send(error.response.data.details);
    });
}

function oracleText(msg, scryfallBaseUrl, cardName) {

    let startTimer = new Date().getTime();

    axios.get(`${scryfallBaseUrl}/cards/named`, {
        params: {
            fuzzy: cardName
        }
    })
    .then((response) => {
        // Number of seconds it took to complete the get request
        // displayed as a float.
        let seconds = parseFloat(((new Date().getTime() - startTimer) / 1000) % 60);

        let scryfall = response.data;

        cache.setex(`${cardName} oracle`, 86400, JSON.stringify(scryfall));

        switch ("card_faces" in scryfall) {

            case true:
                handleMultifaceCards(msg, seconds, scryfall, 'oracle')
                break;

            case false:
                let power, toughness;

                if ('power' in scryfall) {
                    power = scryfall.power;
                    toughness = scryfall.toughness;
                } else {
                    power = '';
                    toughness = '';
                }

                let object = {
                    image: scryfall.image_uris.small,
                    url: scryfall.scryfall_uri,
                    name: scryfall.name,
                    cost: scryfall.mana_cost,
                    typeLine: scryfall.type_line,
                    oracleText: scryfall.oracle_text,
                    power: power,
                    toughness: toughness
                }

                cardHelpers.oracleEmbed(msg, seconds, object);
                break;
        }
    })
    .catch((error) => {
        msg.channel.send(error.response.data.details);
    });
}

function cardPrice(msg, scryfallBaseUrl, cardName) {

    let startTimer = new Date().getTime();

    axios.get(`${scryfallBaseUrl}/cards/named`, {
        params: {
            fuzzy: cardName
        }
    })
    .then((response) => {
        // Number of seconds it took to complete the get request
        // displayed as a float.
        let seconds = parseFloat(((new Date().getTime() - startTimer) / 1000) % 60);

        let scryfall = response.data;

        cache.setex(`${cardName} price`, 86400, JSON.stringify(scryfall));

        let image;

        if ('card_faces' in scryfall) {
            image = scryfall.card_faces[0].image_uris.small
        } else {
            image = scryfall.image_uris.small
        }

        let object = {
            usd: scryfall.usd || 'N/A',
            eur: scryfall.eur || 'N/A',
            tix: scryfall.tix || 'N/A',
            name: scryfall.name,
            image: image,
            url: scryfall.scryfall_uri
        }

        cardHelpers.priceEmbed(msg, seconds, object);

    })
    .catch((error) => {
        msg.channel.send(error.response.data.details);
    });
}

function cardSet(msg, scryfallBaseUrl, cardObject) {

    let startTimer = new Date().getTime();

    axios.get(`${scryfallBaseUrl}/cards/named`, {
        params: {
            fuzzy: cardObject.card,
            set: cardObject.setCode
        }
    })
    .then((response) => {
        // Number of seconds it took to complete the get request
        // displayed as a float.
        let seconds = parseFloat(((new Date().getTime() - startTimer) / 1000) % 60);

        let scryfall = response.data;

        cache.setex(`${cardObject.card} set${cardObject.setCode}`, 86400, JSON.stringify(scryfall));

        switch ("card_faces" in scryfall) {

            case true:
                handleMultifaceCards(msg, seconds, scryfall, 'image');
                break;

            case false:
                cardHelpers.imageEmbed(
                    msg,
                    seconds,
                    scryfall.image_uris.normal,
                    scryfall.scryfall_uri,
                    scryfall.name
                );
                break;
        }
    })
    .catch((error) => {
        msg.channel.send(error.response.data.details);
    });
}

function cardLegality(msg, scryfallBaseUrl, cardName) {
    let startTimer = new Date().getTime();

    axios.get(`${scryfallBaseUrl}/cards/named`, {
        params: {
            fuzzy: cardName
        }
    })
    .then((response) => {
        // Number of seconds it took to complete the get request
        // displayed as a float.
        let seconds = parseFloat(((new Date().getTime() - startTimer) / 1000) % 60);

        let scryfall = response.data;

        cache.setex(`${cardName} legal`, 86400, JSON.stringify(scryfall));

        let thumbnail;

        if ('card_faces' in scryfall) {
            thumbnail = scryfall.card_faces[0].image_uris.small
        } else {
            thumbnail = scryfall.image_uris.small
        }

        let object = {
            url: scryfall.scryfall_uri,
            name: scryfall.name,
            image: thumbnail,
            legalities: scryfall.legalities
        }

        cardHelpers.legalEmbed(msg, seconds, object);
    })
    .catch((error) => {
        msg.channel.send(error.response.data.details);
    });
}

module.exports = { checkCache };