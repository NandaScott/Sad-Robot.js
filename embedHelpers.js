const Discord = require('discord.js');

const blue = 0x1b6f9;

function imageEmbed(msg, seconds, object) {

    let embed = new Discord.RichEmbed()
        .setImage(object.image)
        .setURL(object.url)
        .setTitle(`**${object.name}**`)
        .setColor(blue)
        .setFooter(`Fetch took: ${seconds} seconds.`);

    msg.channel.send({ embed });
}

function oracleEmbed(msg, seconds, object) {

    let pt;

    let embed = new Discord.RichEmbed()
        .setColor(0x1b6f9)
        .setFooter(`Fetch took: ${seconds} seconds.`);

    if (Array.isArray(object)) {

        embed
            .setThumbnail(object[0].thumbnail)
            .setURL(object[0].url)
            .setTitle(`**${object[0].name}**`);

        let descriptions = [];

        for (let i=0; i < object.length; i++) {
            if (object[i].power != '') {
                pt = `${object[i].power}/${object[i].toughness}`;
            } else {
                pt = '';
            }

            let oracleFormat = `
            ${object[i].name} ${object[i].cost}
            ${'--'.repeat(object[i].typeLine.length)}
            ${object[i].typeLine}
            ${'--'.repeat(object[i].typeLine.length)}
            ${object[i].oracleText}

            ${pt}`;

            descriptions.push(oracleFormat);
        }

        let divider = '\n===============';

        embed.setDescription(descriptions.join(divider));
    } else {
        if (object.power != '') {
            pt = `${object.power}/${object.toughness}`;
        } else {
            pt = '';
        }

        let oracleFormat = `
        ${object.name} ${object.cost}
        ${'--'.repeat(object.typeLine.length)}
        ${object.typeLine}
        ${'--'.repeat(object.typeLine.length)}
        ${object.oracleText}

        ${pt}`;

        embed.setDescription(oracleFormat);
        embed.setThumbnail(object.thumbnail);
    }

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