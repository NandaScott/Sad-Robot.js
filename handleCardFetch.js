const cardModes = require('./cardModes');

const scryfallBaseUrl = 'https://api.scryfall.com';

function handleCardFetch(msg) {
    let cardsFound = msg.content
    .match(/(\[\[[\w\s\'\.\,|:]+\]\])+/g)
    .map((card) => {
        let parts = card.match(/[\w\s\,\'\.:]+/g);

        if (parts.length < 2) {
            return {
                card: parts[0].trim(),
                mode: '',
                setCode: ''
            }
        }

        if (parts[1].includes('set:')) {
            return {
                card: parts[0].trim(),
                mode: 'set',
                setCode: parts[1].split(':').pop().trim()
            }
        }

        return {
            card: parts[0].trim(),
            mode: parts[1].trim(),
            setCode: ''
        };
    });

    for (let i = 0; i < cardsFound.length; i++) {
        setTimeout(() => {

            switch (cardsFound[i].mode) {
                default:
                    cardModes.checkCache(msg, scryfallBaseUrl, cardsFound[i], 'image');
                    break;
                case 'oracle':
                    cardModes.checkCache(msg, scryfallBaseUrl, cardsFound[i], 'oracle');
                    break;
                case 'price':
                    cardModes.checkCache(msg, scryfallBaseUrl, cardsFound[i], 'price');
                    break;
                case 'set':
                    cardModes.checkCache(msg, scryfallBaseUrl, cardsFound[i], 'set');
                    break;
                case 'legal':
                    cardModes.checkCache(msg, scryfallBaseUrl, cardsFound[i], 'legal');
                    break;
            }
        }, 100);
    }
}

module.exports = { handleCardFetch };