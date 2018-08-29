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

module.exports = { cardImage };