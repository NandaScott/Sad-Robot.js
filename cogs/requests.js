const axios = require('axios');

const baseURL = 'https://api.scryfall.com';

const name = (params) => {
  return axios
    .get(`${baseURL}/cards/named`, { params: params })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const rulings = ({ cardId }) => {
  return axios.get(`${baseURL}/cards/${cardId}/rulings`).catch((err) => {
    console.log(err);
    throw err;
  });
};

const autocomplete = (params) => {
  return axios
    .get(`${baseURL}/cards/autocomplete`, { params: params })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const random = () => {
  return axios.get(`${baseURL}/cards/random`).catch((err) => {
    console.log(err);
    throw err;
  });
};

const codeAndNumber = (code, number) => {
  return axios.get(`${baseURL}/cards/${code}/${number}/en`).catch((err) => {
    console.log(err);
    throw err;
  });
};

const allSets = () => {
  return axios.get(`${baseURL}/sets`).catch((err) => {
    console.log(err);
    throw err;
  });
};

const allPrints = (name) => {
  const params = {
    q: `!"${name}"`,
    unique: 'prints',
  };
  return axios
    .get(`${baseURL}/cards/search`, { params: params })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

module.exports = {
  name,
  rulings,
  autocomplete,
  random,
  codeAndNumber,
  allSets,
  allPrints,
};
