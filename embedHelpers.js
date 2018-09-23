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

    if (Array.isArray(object)) {

        let embed = new Discord.RichEmbed()
            .setURL(object[0].url)
            .setTitle(`**${object[0].name}**`)
            .setThumbnail(object[0].image)
            .addField('USD', object[0].usd)
            .addField('EUR', object[0].eur)
            .addField('TIX', object[0].tix)
            .setColor(blue)
            .setFooter(`Fetch took: ${seconds} seconds.`);

        msg.channel.send({ embed });
        return;
    }

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

    let url, name, thumbnail, legalities;

    if (Array.isArray(object)) {
        url = object[0].url;
        name = object[0].name;
        thumbnail = object[0].thumbnail;
        legalities = object[0].legalities;
    } else {
        url = object.url;
        name = object.name;
        thumbnail = object.thumbnail;
        legalities = object.legalities;
    }

    let embed = new Discord.RichEmbed()
        .setURL(url)
        .setTitle(`**${name}**`)
        .setThumbnail(thumbnail)
        .setColor(0x1b6f9)
        .setFooter(`Fetch took: ${seconds} seconds.`)

    for (let key in legalities) {
        if (legalities.hasOwnProperty(key)) {

            let emoji;

            switch (legalities[key]) {
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
                (legalities[key].charAt(0).toUpperCase() + legalities[key].slice(1)).replace('_', ' ') + ` ${emoji}`,
                true
            );
        }
    }

    msg.channel.send({ embed });
}

function rulesEmbed(msg, seconds, object) {

    let embed = new Discord.RichEmbed()
        .setURL(object.url)
        .setTitle(`**${object.name}**`)
        .setThumbnail(object.thumbnail)
        .setColor(blue)
        .setFooter(`Fetch took: ${seconds} seconds.`);

    for (let i=0; i < object.rulingsList.length; i++) {
        embed.addField(object.rulingsList[i].published_at, object.rulingsList[i].comment);
    }

    msg.channel.send({ embed });
}

module.exports = { imageEmbed, oracleEmbed, priceEmbed, legalEmbed, rulesEmbed };