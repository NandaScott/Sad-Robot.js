let config = require('./config.json');
const Discord = require('discord.js');

const handleCardFetch = require('./handleCardFetch');
const helpText = require('./helpText');
const adminUtils = require('./adminUtils');
const bannedUsers = require('./bannedUsers.json');

const client = new Discord.Client();

client.on('ready', () => {
    console.log('Logged in!');
});

client.on('message', async (msg) => {
    // Ignore ourself and other bots
    if (msg.author.bot) return;

    // Ignore banned users
    if (adminUtils.search(msg.author.id, bannedUsers.users)) {
        return;
    }

    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

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
    }

    switch (msg.content.toLowerCase()) {
        default:
            handleCardFetch.handleCardFetch(msg);
            break;
        case 'good bot':
            msg.reply('Thank you!');
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