function fetchCard(msg) {
  return new Promise((res, rej) => {
    let cardsFound = msg.content.match(/(\[\[[\w\s\'\.\,|/:🎲]+\]\])+/g);

    if (cardsFound) {
      cardsFound = cardsFound.map((card) => {
        let cardName = card.match(/([\w\s🎲\,\'\.]+)/g)[0];
        let mode = card.match(/([|\s]oracle|price|legal|rules|flavor|unique)/g);
        let setCode = card.match(/([\w]+:[A-Za-z\d]+)/g);

        if (cardName.match(/🎲+/g)) {
          return {
            card: '',
            mode: 'random',
            setCode: '',
          };
        }

        if (mode) {
          mode = mode[0].replace('|', '').trim();
        } else {
          mode = '';
        }

        if (setCode) {
          setCode = setCode[0].split(':').pop().trim();
        } else {
          setCode = '';
        }

        let final = {
          card: cardName,
          mode: mode,
          setCode: setCode,
        };

        return final;
      });

      cardsFound.forEach((val) => {
        switch (val.mode) {
          default:
            break;
        }
      });
    }
  });
}
