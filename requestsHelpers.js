const axios = require('axios');

const scryfallBaseUrl = 'https://api.scryfall.com';

function cardsByName(paramsObject) {
    return axios.get(`${scryfallBaseUrl}/cards/named`, {
        params: {
            fuzzy: paramsObject.card
        }
    })
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        return error.response.data
    });
}

module.exports = { cardsByName };