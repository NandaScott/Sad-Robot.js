const redis = require('redis');
const cache = redis.createClient(6379, '127.0.0.1');
const util = require('util');

function setServerPrefix(msg, args) {
    cache.set(msg.channel.guild.id, args[0], (err, reply) => {
        if (err) {
            msg.channel.send('There was an issue with writing your prefix.');
        } else {
            cache.get(msg.channel.guild.id, (err, reply) => {
                msg.channel.send(`Your server's prefix has been set to \`${reply}\``);
            });
        }
    });
}

function getServerPrefix(msg) {
    cache.get(msg.channel.guild.id, (err, reply) => {
        if (err) {
            msg.channel.send('There was an issue with getting your server\'s prefix.');
        }
        else if (reply === null) {
            msg.channel.send('You have not yet set a custom prefix for this server.');
            return;
        } else {
            msg.channel.send(`Your server's prefix has been set to \`${reply}\``);
        }
    });
}

function main(msg, args) {
    if (args.length > 1) {
        msg.channel.send('Please only provide the prefix.')
    }
    else if (args.length == 0) {
        getServerPrefix(msg);
    }
    else if (args.length == 1) {
        setServerPrefix(msg, args);
    }
}

function setDefaultPrefix() {
    cache.set('defaultPrefix', '?', (err, reply) => {
        if (err) console.error(err);

        cache.get('defaultPrefix', (err, reply) => {
            if (err) console.error(err);

            console.log(`Default prefix has been set to \`${reply}\``);
        });
    });
}

async function checkPrefix(msg) {
    cache.get(msg.channel.guild.id);
}

module.exports = { main, setDefaultPrefix, checkPrefix };