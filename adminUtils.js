const Discord = require('discord.js');

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

    client.fetchUser('129819240654962688')
        .then((user) => {
            user.send({ embed });
            msg.channel.send('Feedback sent.');
        })
}

module.exports = { getFeedback };