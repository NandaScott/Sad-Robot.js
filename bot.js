var creds = require('./credentials.json');

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Logged in!');
});

client.on('message', (msg) => {
    if (msg.author.id == client.user.id) {
        return
    }

    let cards = msg.content
        .match(/\[\[\b[\w\s\'\.|]+\b\]\]/g)
        .map((card) => {
        return card.slice(2, card.indexOf(']]'));
    });

    msg.channel.send(cards);
});

client.login(creds['token'])