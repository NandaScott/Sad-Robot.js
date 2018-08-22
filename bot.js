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
        setTimeout(() => {

            let startTimer = new Date().getTime();

            axios.get(`${scryfallBaseUrl}/cards/named`, {
                params: {
                    fuzzy: cardsFound[i]
                }
            })
            .then(function success(response) {
                // Number of seconds it took to complete the get request
                // displayed as a float.
                let seconds = parseFloat(((new Date().getTime() - startTimer) / 1000) % 60);

                let scryfall = response.data;

                switch ("card_faces" in scryfall) {

                    case true:
                        for (let i = 0; i < scryfall.card_faces.length; i++) {
                            let embed = new Discord.RichEmbed()
                                .setImage(scryfall.card_faces[i].image_uris.normal)
                                .setURL(scryfall.scryfall_uri)
                                .setTitle(`**${scryfall.card_faces[i].name}**`)
                                .setColor(0x1b6f9)
                                .setFooter(`Fetch took: ${seconds} seconds.`);

                            msg.channel.send({ embed })
                        }
                        break;

                    case false:
                        let embed = new Discord.RichEmbed()
                            .setImage(scryfall.image_uris.normal)
                            .setURL(scryfall.scryfall_uri)
                            .setTitle(`**${scryfall.name}**`)
                            .setColor(0x1b6f9)
                            .setFooter(`Fetch took: ${seconds} seconds.`);
        
                        msg.channel.send({ embed });
                        break;
                }
            })
            .catch(function fail(error) {
                msg.channel.send(error.response.data.details);
            });
        }, 100);
    }
});

client.login(creds['token'])