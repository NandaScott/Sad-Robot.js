const redis = require('redis');
const { errorDM } = require('../bot');

const cache = redis.createClient(6379, '127.0.0.1');

cache.on('ready', () => {
  console.log('Connected to redis.');
});

cache.on('error', (err) => {
  console.error(err);
});

const checkCache = (msg, paramsObject, embedType) => {
  const key = `${paramsObject.card} ${embedType}${paramsObject.setCode}`;

  cache.get(key, (err, reply) => {
    if (err) {
      errorDM(err);
    } else if (reply === null) {
      // make API call
    } else {
      // send Discord message
    }
  });
};
