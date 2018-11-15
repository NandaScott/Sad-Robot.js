let config = require('./config.json');
const Discord = require('discord.js');

const handleCardFetch = require('./handleCardFetch');
const helpText = require('./helpText');
const adminUtils = require('./adminUtils');
const bannedUsers = require('./bannedUsers.json');
const prefix = require('./handlePrefixes');

const client = new Discord.Client();

client.on('ready', () => {
    console.log('Logged in!');
    prefix.setDefaultPrefix();
});

client.on('message', async (msg) => {
    // Ignore ourself and other bots
    if (msg.author.bot) return;

    // Ignore banned users
    if (adminUtils.search(msg.author.id, bannedUsers.users)) {
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
                    user.send(helpText.helpText);
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
            prefix.main(msg, args);
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
            prefix.resetPrefix(msg);
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

client.login(config.token)