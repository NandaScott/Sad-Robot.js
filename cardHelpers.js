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
    let pt;

    if (object.power != '') {
        pt = `${object.power}/${object.toughness}`;
    } else {
        pt = '';
    }

    let embed = new Discord.RichEmbed()
        .setThumbnail(object.image)
        .setURL(object.url)
        .setTitle(`**${object.name}**`)
        .setDescription(`
            ${object.name} ${object.cost}
            ------
            ${object.typeLine}
            ------
            ${object.oracleText}

            ${pt}
            `)
        .setColor(0x1b6f9)
        .setFooter(`Fetch took: ${seconds} seconds.`);

    msg.channel.send({ embed });
}

module.exports = { imageEmbed, oracleEmbed };