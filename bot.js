let creds = require('./credentials.json');
const Discord = require('discord.js');

const handleCardFetch = require('./handleCardFetch');
const helpText = require('./helpText');

const client = new Discord.Client();

client.on('ready', () => {
    console.log('Logged in!');
});

client.on('message', (msg) => {
    if (msg.author.id === client.user.id) {
        return
    }

    switch (msg.content.toLowerCase()) {
        default:
            handleCardFetch.handleCardFetch(msg);
            break;
        case 'good bot':
            msg.reply('Thank you!');
            break;
        case '!help':
            msg.channel.send(helpText.helpText);
            break;
    }
});

client.login(creds['token'])