const redis = require('redis');
const asyncRedis = require('async-redis');
const cache = redis.createClient(6379, '127.0.0.1');
const asyncCache = asyncRedis.createClient(6379, '127.0.0.1');

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
    if (checkPrivelege(msg)) {
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

const checkPrefix = async (msg) => {
    let reply = await asyncCache.get(msg.channel.guild.id);

    if (reply === null) {
        return await asyncCache.get('defaultPrefix');
    }

    return reply;
}

function resetPrefix(msg) {
    if (checkPrivelege(msg)) {
        cache.del(msg.channel.guild.id, (err, reply) => {
            if (err) console.log(err);

            msg.channel.send(`Prefix has been reset to default.`);
        });
    }
}

function checkPrivelege(msg) {
    if (!msg.member.roles.some(r => ['Administrator', 'Moderator'].includes(r.name))) {
        msg.channel.send('Sorry, you don\'t have permissions to use this.');
        return false;
    }

    return true;
}

module.exports = { main, setDefaultPrefix, checkPrefix, resetPrefix };