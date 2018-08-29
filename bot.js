let creds = require('./credentials.json');
const Discord = require('discord.js');
const axios = require('axios');

const cardHelpers = require('./cardHelpers');
const cardImage = require('./cardImage');
const handleCardFetch = require('./handleCardFetch');

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
    }
});

client.login(creds['token'])