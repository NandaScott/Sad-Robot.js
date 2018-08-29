const cardModes = require('./cardModes');

const scryfallBaseUrl = 'https://api.scryfall.com';

function handleCardFetch(msg) {
    let cardsFound = msg.content
    .match(/(\[\[[\w\s\'\.\,|]+\]\])+/g)
    .map((card) => {
        let parts = card.match(/[\w\s\,\'\.]+/g);

        if (parts.length < 2) {
            return {
                card: parts[0].trim(),
                mode: ''
            }
        }

        return {
            card: parts[0].trim(),
            mode: parts[1].trim()
        };
    });

    for (let i = 0; i < cardsFound.length; i++) {
        setTimeout(() => {
            let startTimer = new Date().getTime();

            switch (cardsFound[i].mode) {
                default:
                    cardModes.cardImage(msg, scryfallBaseUrl, cardsFound[i].card);
                    break;
                case 'oracle':
                    cardModes.oracleText(msg, scryfallBaseUrl, cardsFound[i].card);
                    break;
                case 'price':
                    cardModes.cardPrice(msg, scryfallBaseUrl, cardsFound[i].card);
                    break;
            }
        }, 100);
    }
}

module.exports = { handleCardFetch };