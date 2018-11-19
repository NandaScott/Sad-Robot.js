let config = require('./config.json');
const Discord = require('discord.js');
const redis = require('redis');
const cache = redis.createClient(6379, '127.0.0.1');

const handleCardFetch = require('./mtg/handleCardFetch');
const helpText = require('./extra_utils/helpText');
const adminUtils = require('./admin/adminUtils');
const prefix = require('./extra_utils/handlePrefixes');

const client = new Discord.Client();

client.on('ready', () => {
    console.log('Logged in!');
    prefix.setDefaultPrefix(cache);

    cache.get('bannedUsers', (err, reply) => {
        if (err) console.log(err);

        if (reply === null) {
            console.log('No ban list found. Creating empty list.')
            let init = { users: [] };

            cache.set('bannedUsers', JSON.stringify(init));
        } else {
            console.log('Ban list found.')
        }
    });
});

client.on('message', async (msg) => {
    // Ignore ourself and other bots
    if (msg.author.bot) return;

    // Ignore banned users
    if (await adminUtils.search(msg.author.id)) {
        return;
    }

    let serverPrefix = await prefix.checkPrefix(msg)

    const args = msg.content.split(' ').slice(1);
    const command = msg.content.split(' ')[0].replace(serverPrefix, '');

    switch (command) {
        case 'feedback':
            adminUtils.getFeedback(msg, args);
            break;
        case 'help':
            client.fetchUser(msg.author.id)
                .then((user) => {
                    user.send(helpText.helpText(serverPrefix));
                })
                .catch((err) => {
                    console.error(err);
                });
            break;
        case 'ping':
            const m = await msg.channel.send('Ping?');
            m.edit(`Pong! Latency is ${m.createdTimestamp - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
            break;
        case 'prefix':
            prefix.main(cache, msg, args);
            break;
    }

    switch (msg.content.toLowerCase()) {
        default:
            handleCardFetch.handleCardFetch(msg);
            break;
        case 'good bot':
            msg.reply('Thank you!');
            break;
        case 'resetprefix':
            prefix.resetPrefix(cache, msg);
            break;
    }
});

client.on('guildMemberAdd', (member) => {
    const memberId = member.id;

    client.fetchUser(memberId)
        .then((user) => {
            user.send(helpText.greeting(member.guild.name));
        })
        .catch((err) => {
            console.error(err);
        })
});

client.on('guildCreate', (guild) => {
    guild.members.forEach((member) => {
        if (member.hasPermission('ADMINISTRATOR') && member.id != client.user.id) {
            member.send(helpText.onJoin(guild.name));
        }
    });
});

client.on('guildDelete', (guild) => {
    cache.del(guild.id, (err, reply) => {
        if (err) console.log(err);

        console.log(`Successfully removed prefix for server ${guild.id}`);
    });
});

client.login(config.token)