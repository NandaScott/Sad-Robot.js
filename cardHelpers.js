const Discord = require('discord.js');

const blue = 0x1b6f9;

function imageEmbed(msg, seconds, object) {

    let embed = new Discord.RichEmbed()
        .setImage(object.image)
        .setURL(object.cardUrl)
        .setTitle(`**${object.name}**`)
        .setColor(blue)
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

function priceEmbed(msg, seconds, object) {
    let embed = new Discord.RichEmbed()
        .setURL(object.url)
        .setTitle(`**${object.name}**`)
        .setThumbnail(object.image)
        .addField('USD', object.usd)
        .addField('EUR', object.eur)
        .addField('TIX', object.tix)
        .setColor(0x1b6f9)
        .setFooter(`Fetch took: ${seconds} seconds.`);
    
    msg.channel.send({ embed });
}

function legalEmbed(msg, seconds, object) {
    let embed = new Discord.RichEmbed()
        .setURL(object.url)
        .setTitle(`**${object.name}**`)
        .setThumbnail(object.image)
        .setColor(0x1b6f9)
        .setFooter(`Fetch took: ${seconds} seconds.`)

    for (let key in object.legalities) {
        if (object.legalities.hasOwnProperty(key)) {

            let emoji;

            switch (object.legalities[key]) {
                case 'legal':
                    emoji = '✅';
                    break;
                case 'not_legal':
                    emoji = '❌';
                    break;
                case 'restricted':
                    emoji = '⛔';
                    break;
                case 'banned':
                    emoji = '⛔';
                    break;
            }

            embed.addField(
                key.charAt(0).toUpperCase() + key.slice(1),
                (object.legalities[key].charAt(0).toUpperCase() + object.legalities[key].slice(1)).replace('_', ' ') + ` ${emoji}`,
                true
            );
        }
    }

    msg.channel.send({ embed });
}

module.exports = { imageEmbed, oracleEmbed, priceEmbed, legalEmbed };