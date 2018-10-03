const cardModes = require('./cardModes');

function handleCardFetch(msg) {

    let cardsFound = msg.content
        .match(/(\[\[[\w\s\'\.\,|/:🎲]+\]\])+/g);

    if (cardsFound) {

        cardsFound = cardsFound.map((card) => {
            let cardName = card.match(/([\w\s🎲]+)/g)[0];
            let mode = card.match(/([|]oracle|price|legal|rules|flavor)/g);
            let setCode = card.match(/([\w]+:[A-Za-z\d]+)/g)[0].split(':').pop().trim();

            if (cardName === '🎲') {
                return {
                    card: '',
                    mode: 'random',
                    setCode: ''
                }
            }

            if (mode) {
                mode = mode[0].replace('|', '').trim();
            } else {
                mode = '';
            }

            let final = {
                card: cardName,
                mode: mode,
                setCode: setCode
            }

            return final;
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