function handleTransform(scryfallObject) {

    let faceArray = [];

    for (let i = 0; i < scryfallObject.card_faces.length; i++) {
        let final = {
            name: scryfallObject.card_faces[i].name,
            image: scryfallCard.card_faces[i].image_uris.normal,
            cardUrl: scryfallCard.scryfall_uri,
        }

        faceArray.push(final);
    }

    return faceArray
}

module.exports = { handleTransform };