const cardImage = require('./cardImage');

const scryfallBaseUrl = 'https://api.scryfall.com';

function handleCardFetch(msg) {
    let cardsFound = msg.content
    .match(/\[\[\b[\w\s\'\.|]+\b\]\]/g)
    .map((card) => {
        let parts = card.match(/[\w\s]+/g);

        return {
            card: parts[0],
            mode: parts[1]
        };
    });

    for (let i = 0; i < cardsFound.length; i++) {
        setTimeout(() => {

            let startTimer = new Date().getTime();

            switch (cardsFound[i].mode) {
                default:
                    cardImage.cardImage(msg, scryfallBaseUrl, cardsFound[i].card);
                    break;
            }
        }, 100);
    }
}

module.exports = { handleCardFetch };