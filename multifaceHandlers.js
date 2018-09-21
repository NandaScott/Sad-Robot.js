function handleTransform(scryfallObject) {

    let faceArray = [];

    for (let i = 0; i < scryfallObject.card_faces.length; i++) {
        let final = {
            name: scryfallObject.card_faces[i].name,
            image: scryfallObject.card_faces[i].image_uris.normal,
            cardUrl: scryfallObject.scryfall_uri,
        }

        faceArray.push(final);
    }

    return faceArray
}

function handleFlip(scryfallObject) {
    return {
        name: scryfallObject.name,
        image: scryfallObject.image_uris.normal,
        cardUrl: scryfallObject.scryfall_uri
    }
}

function handleSplit(scryfallObject) {
    return {
        name: scryfallObject.name,
        image: scryfallObject.image_uris.normal,
        cardUrl: scryfallObject.scryfall_uri
    }
}

module.exports = { handleTransform, handleFlip, handleSplit };