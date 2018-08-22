var creds = require('./credentials.json');
const axios = require('axios');

const Discord = require('discord.js');
const client = new Discord.Client();

const scryfallBaseUrl = 'https://api.scryfall.com';

client.on('ready', () => {
    console.log('Logged in!');
});

client.on('message', (msg) => {
    if (msg.author.id === client.user.id) {
        return
    }

    let cardsFound = msg.content
        .match(/\[\[\b[\w\s\'\.|]+\b\]\]/g)
        .map((card) => {
        return card.slice(2, card.indexOf(']]'));
    });

    for (let i = 0; i < cardsFound.length; i++) {
        setInterval(() => {
            axios.get(`${scryfallBaseUrl}/cards/named`, {
                params: {
                    fuzzy: cardsFound[i]
                }
            })
            .then((response) => {
                let scryfall = response.data;

                let embed = new Discord.RichEmbed()
                    .setImage(scryfall.image_uris.normal)
                    .setURL(scryfall.scryfall_uri)
                    .setTitle(`**${scryfall.name}**`)
                    .setColor(0x1b6f9);

                msg.channel.send({embed});
            })
            .catch((error) => {
                console.log(error.response.data);
                msg.channel.send(error.response.data.details)
            });
        }, 100);
    }
});

client.login(creds['token'])