const axios = require('axios');

const scryfallBaseUrl = 'https://api.scryfall.com';

function cardsByName(paramsObject) {
    return axios.get(`${scryfallBaseUrl}/cards/named`, {
        params: {
            fuzzy: paramsObject.card,
            set: paramsObject.setCode
        }
    })
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        return error.response.data;
    });
}

function cardsByNameSet(paramsObject) {
    return axios.get(`${scryfallBaseUrl}/cards/named`,  {
        params: {
            fuzzy: paramsObject.card,
            set: paramsObject.setCode
        }
    })
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        return error.response.data;
    });
}

function cardRulesById(cardId) {
    return axios.get(`${scryfallBaseUrl}/cards/${cardId}/rulings`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.response.data;
        });
}

function autocompleteName(paramsObject) {
    return axios.get(`${scryfallBaseUrl}/cards/autocomplete`,  {
        params: {
            q: paramsObject.card
        }
    })
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        return error.response.data;
    });
}

function uniquePrints(paramsObject) {
    return axios.get(`${scryfallBaseUrl}/cards/search`,  {
        params: {
            q: `!"${paramsObject.card}"`,
            unique: 'prints'
        }
    })
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        return error.response.data;
    });
}

function randomCard() {
    return axios.get(`${scryfallBaseUrl}/cards/random`)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        return error.response.data;
    });
}

module.exports = {
    cardsByName,
    cardsByNameSet,
    cardRulesById,
    autocompleteName,
    uniquePrints,
    randomCard
};