const Discord = require('discord.js');
const redis = require('redis');
const cache = redis.createClient(6379, '127.0.0.1');

let config = require('./config.json');

/*
This function handles everything for the feedback command.
First it sends a DM to specifically me, with an embed of everything
needed. After it will mark that embed with a reaction and wait for an hour.
After that hour, if I have also added that reaction it will ban that user
and write out the id and name of that user to a file. That file is checked before
every single command is tracked, and if they are in that file they get ignored.
Since this uses the user id, this is permanent across discord.
The bot will then remove the reaction, to prevent accidental bannings.
*/
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
            msg.channel.send('Feedback sent.');

            return user.send({ embed });
        })
        .then((message) => {
            return message.react('🚷');
        })
        .then((sentReaction) => {
            const filter = (reaction, user) => reaction.emoji.name === '🚷' && user.id === config.myId;
            return sentReaction.message.awaitReactions(filter, { time: 1000 * 60 * 60 });
        })
        .then((collected) => {
            if (collected.size > 0) {
                banUser(msg);
            }
        })
        .catch((err) => {
            console.error(err);
        })
}

function banUser(msg, redis_client) {
    cache.get('bannedUsers', (err, reply) => {
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

        let bannedUsers = JSON.parse(reply);

        bannedUsers.user.push({
            id: msg.author.id,
            username: msg.author.username,
            bannedAt: Date()
        });

        let newUsers = JSON.stringify(bannedUsers);

        cache.set('bannedUsers', newUsers, (err, reply) => {
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
        })
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