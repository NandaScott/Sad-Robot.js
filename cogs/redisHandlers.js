const redis = require('redis');
const client = redis.createClient(6379, '127.0.0.1');
const { promisify } = require('util');
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.setex).bind(client);
const delAsync = promisify(client.del).bind(client);

const forOneHour = 1000 * 60 * 60;

const cache = {
  get: getAsync,
  set: setAsync,
  del: delAsync,
};

client.on('ready', () => {
  console.log('Connected to redis.');
});

client.on('error', (err) => {
  console.error(err);
});

const getCard = (key) => cache.get(key);

const setCard = (key, value) =>
  cache.set(key, forOneHour, JSON.stringify(value));

const delCard = (key) => cache.del(key);

module.exports = { getCard, setCard, delCard };
