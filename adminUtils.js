const Discord = require('discord.js');
const fs = require('fs');

let config = require('./config.json');

function getFeedback(msg, args) {
    let guild = (msg.channel.type === 'dm') ? 'DM' : msg.guild.name;

    let embed = new Discord.RichEmbed()
        .setTitle('New feedback message')
        .setColor(0xff1c1c)
        .setDescription(`
        Username: ${msg.author.username}
        ID: ${msg.author.id}
        Timestamp: ${msg.createdAt}
        Guild name: ${guild}

        ${args.join(' ')}`);
    let client = msg.channel.client;

    client.fetchUser(config.myId)
        .then((user) => {
            user.send({ embed })
                .then((message) => {
                    message.react('🚷')
                        .then((sentReaction) => {
                            const filter = (reaction, user) => reaction.emoji.name === '🚷' && user.id === config.myId;
                            message.awaitReactions(filter, { time: 5000 })
                                .then((collected) => {
                                    if (collected.size > 0) {
                                        banUser(msg);
                                        sentReaction.remove(message.author.id);
                                    }
                                })
                                .catch((error) => {console.log(error)});
                        });
                })
                .catch((err) => {
                    console.log(err);
                });

            msg.channel.send('Feedback sent.');
        })
}

function banUser(msg) {
    fs.readFile('bannedUsers.json', (err, data) => {
        let client = msg.channel.client;

        if (err) {
            client.fetchUser(config.myId)
                .then((user) => {
                    user.send(`Failed to ban user ${msg.author.username}\n${err}`);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        let bannedUsersFile = JSON.parse(data);

        bannedUsersFile.users.push({ id: msg.author.id, username: msg.author.username });
    
        let newUsers = JSON.stringify(bannedUsersFile, null, 4);
    
        fs.writeFile('./bannedUsers.json', newUsers, (err) => {
            if (err) {
                client.fetchUser(config.myId)
                    .then((user) => {
                        user.send(`Failed to write user to file\n${err}`);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
    
            client.fetchUser(config.myId)
                .then((user) => {
                    user.send(`Successfully banned user ${msg.author.username}`);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    });
}

function search(key, array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === key) {
            return true;
        }
    }
}

module.exports = { getFeedback, search };