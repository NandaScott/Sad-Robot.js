const cardHelpers = require('./cardHelpers');
const axios = require('axios');

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

        switch ("card_faces" in scryfall) {

            case true:

                for (let i = 0; i < scryfall.card_faces.length; i++) {
                    cardHelpers.imageEmbed(
                        msg,
                        seconds,
                        scryfall.card_faces[i].image_uris.normal,
                        scryfall.scryfall_uri,
                        scryfall.card_faces[i].name
                    );
                }
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

        switch ("card_faces" in scryfall) {

            case true:

                for (let i = 0; i < scryfall.card_faces.length; i++) {

                    let power, toughness;

                    if ('power' in scryfall.card_faces[i]) {
                        power = scryfall.card_faces[i].power;
                        toughness = scryfall.card_faces[i].toughness;
                    } else {
                        power = '';
                        toughness = '';
                    }

                    let object = {
                        image: scryfall.card_faces[i].image_uris.small,
                        url: scryfall.scryfall_uri,
                        name: scryfall.card_faces[i].name,
                        cost: scryfall.card_faces[i].mana_cost,
                        typeLine: scryfall.card_faces[i].type_line,
                        oracleText: scryfall.card_faces[i].oracle_text,
                        power: power,
                        toughness: toughness
                    }

                    cardHelpers.oracleEmbed(msg, seconds, object);
                }
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

        switch ("card_faces" in scryfall) {

            case true:

                for (let i = 0; i < scryfall.card_faces.length; i++) {
                    cardHelpers.imageEmbed(
                        msg,
                        seconds,
                        scryfall.card_faces[i].image_uris.normal,
                        scryfall.scryfall_uri,
                        scryfall.card_faces[i].name
                    );
                }
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

        let object = {
            url: scryfall.scryfall_uri,
            name: scryfall.name,
            image: scryfall.image_uris.small,
            legalities: scryfall.legalities
        }

        cardHelpers.legalEmbed(msg, seconds, object);
    })
    .catch((error) => {
        msg.channel.send(error.response.data.details);
    });
}

module.exports = { cardImage, oracleText, cardPrice, cardSet, cardLegality };