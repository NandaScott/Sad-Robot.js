const axios = require('axios');

module.exports = {
  promiseception() {
    return new Promise((res, rej) => {
      axios
        .get('http://api.scryfall.com/cards/random')
        .then((resp) => res(resp.data))
        .catch((err) => {
          rej(err.response.data);
        });
    });
  },
};
