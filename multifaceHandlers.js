const cardHelpers = require('./cardHelpers');

function handleTransform(msg, seconds, scryfallObject) {
    for (let i = 0; i < scryfallObject.card_faces.length; i++) {
        let final = {
            name: scryfallObject.card_faces[i].name,
            image: scryfallObject.card_faces[i].image_uris.normal,
            cardUrl: scryfallObject.scryfall_uri,
        }

        cardHelpers.imageEmbed(msg, seconds, final);
    }
}

function handleFlip(msg, seconds, scryfallObject) {
    final =  {
        name: scryfallObject.name,
        image: scryfallObject.image_uris.normal,
        cardUrl: scryfallObject.scryfall_uri
    }

    cardHelpers.imageEmbed(msg, seconds, final);
}

function handleSplit(msg, seconds, scryfallObject) {
    final = {
        name: scryfallObject.name,
        image: scryfallObject.image_uris.normal,
        cardUrl: scryfallObject.scryfall_uri
    }

    cardHelpers.imageEmbed(msg, seconds, final);
}

module.exports = { handleTransform, handleFlip, handleSplit };