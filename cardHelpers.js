const Discord = require('discord.js');

function imageEmbed(msg, seconds, image, url, name) {
    let embed = new Discord.RichEmbed()
        .setImage(image)
        .setURL(url)
        .setTitle(`**${name}**`)
        .setColor(0x1b6f9)
        .setFooter(`Fetch took: ${seconds} seconds.`);

    msg.channel.send({ embed });
}

function oracleEmbed(msg, seconds, object) {
    let embed = new Discord.RichEmbed()
        .setThumbnail(object.image)
        .setURL(object.url)
        .setTitle(`**${object.name}** ${object.cost}`)
        .setDescription(`
            ${object.typeLine}
            ${object.oracleText}

            ${object.power}/${object.toughness}
            `)
        .setColor(0x1b6f9)
        .setFooter(`Fetch took: ${seconds} seconds.`);

    msg.channel.send({ embed });
}

module.exports = { imageEmbed, oracleEmbed };