const cardModes = require('./cardModes');

function handleCardFetch(msg) {

    let cardsFound = msg.content
        .match(/(\[\[[\w\s\'\.\,|/:🎲]+\]\])+/g);

    if (cardsFound) {

        cardsFound = cardsFound.map((card) => {
            let parts = card.match(/[\w\s\,\'\.:/🎲]+/g);

            if (parts[0] === '🎲') {
                return {
                    card: '',
                    mode: 'random',
                    setCode: ''
                }
            }

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
                        cardModes.checkCache(msg, cardsFound[i], 'image');
                        break;
                    case 'oracle':
                        cardModes.checkCache(msg, cardsFound[i], 'oracle');
                        break;
                    case 'price':
                        cardModes.checkCache(msg, cardsFound[i], 'price');
                        break;
                    case 'set':
                        cardModes.checkCache(msg, cardsFound[i], 'set');
                        break;
                    case 'legal':
                        cardModes.checkCache(msg, cardsFound[i], 'legal');
                        break;
                    case 'rules':
                        cardModes.checkCache(msg, cardsFound[i], 'rules');
                        break;
                    case 'flavor':
                        cardModes.checkCache(msg, cardsFound[i], 'flavor');
                        break;
                    case 'unique':
                        cardModes.checkCache(msg, cardsFound[i], 'unique');
                        break;
                    case 'random':
                        cardModes.checkCache(msg, cardsFound[i], 'random');
                        break;
                }
            }, 100);
        }

    }
}

module.exports = { handleCardFetch };