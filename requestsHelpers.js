const axios = require('axios');

const scryfallBaseUrl = 'https://api.scryfall.com';

function cardsByName(paramsObject) {
    return axios.get(`${scryfallBaseUrl}/cards/named`, {
        params: {
            fuzzy: paramsObject.card
        }
    })
    .then((response) => {
        return response;
    })
    .catch((error) => {
        return error;
    });
}

module.exports = { cardsByName };