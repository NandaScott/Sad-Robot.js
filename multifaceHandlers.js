function handleTransform(scryfallObject, returnArray=false) {
    if (returnArray) {
        let array = [];

        for (let i = 0; i < scryfallObject.card_faces.length; i++) {
            let base = {
                url: scryfallObject.scryfall_uri,
                usd: ('usd' in scryfallObject) ? scryfallObject.usd : '',
                eur: ('eur' in scryfallObject) ? scryfallObject.eur : '',
                tix: ('tix' in scryfallObject) ? scryfallObject.tix : '',
                legalities: scryfallObject.legalities,
                name: scryfallObject.card_faces[i].name,
                image: scryfallObject.card_faces[i].image_uris.border_crop,
                power: scryfallObject.card_faces[i].power,
                toughness: scryfallObject.card_faces[i].toughness,
                cost: scryfallObject.card_faces[i].mana_cost,
                typeLine: scryfallObject.card_faces[i].type_line,
                oracleText: scryfallObject.card_faces[i].oracle_text,
                thumbnail: scryfallObject.card_faces[i].image_uris.small
            }

            array.push(base);
        }

        return array
    }

    let base = {
        url: scryfallObject.scryfall_uri,
        usd: ('usd' in scryfallObject) ? scryfallObject.usd : '',
        eur: ('eur' in scryfallObject) ? scryfallObject.eur : '',
        tix: ('tix' in scryfallObject) ? scryfallObject.tix : '',
        legalities: scryfallObject.legalities,
        name: scryfallObject.name,
        image: scryfallObject.card_faces[0].image_uris.border_crop,
        power: scryfallObject.card_faces[0].power,
        toughness: scryfallObject.card_faces[0].toughness,
        cost: scryfallObject.card_faces[0].mana_cost,
        typeLine: scryfallObject.card_faces[0].type_line,
        oracleText: scryfallObject.card_faces[0].oracle_text,
        thumbnail: scryfallObject.card_faces[0].image_uris.small
    }

    return base;
}

function handleFlip(scryfallObject, returnArray=false) {

    if (returnArray) {
        let array = [];

        for (let i = 0; i < scryfallObject.card_faces.length; i++) {
            let base = {
                name: scryfallObject.card_faces[i].name,
                image: scryfallObject.image_uris.border_crop,
                thumbnail: scryfallObject.image_uris.small,
                url: scryfallObject.scryfall_uri,
                power: ('power' in scryfallObject.card_faces[i]) ? scryfallObject.card_faces[i].power : '',
                toughness: ('toughness' in scryfallObject.card_faces[i]) ? scryfallObject.card_faces[i].toughness : '',
                cost: ('mana_cost' in scryfallObject.card_faces[i]) ? scryfallObject.card_faces[i].mana_cost : '',
                usd: ('usd' in scryfallObject) ? scryfallObject.usd : '',
                eur: ('eur' in scryfallObject) ? scryfallObject.eur : '',
                tix: ('tix' in scryfallObject) ? scryfallObject.tix : '',
                legalities: scryfallObject.legalities,
                typeLine: scryfallObject.card_faces[i].type_line,
                oracleText: scryfallObject.card_faces[i].oracle_text
            }

            array.push(base);
        }

        return array;
    }

    let base = {
        name: scryfallObject.card_faces[i].name,
        image: scryfallObject.image_uris.border_crop,
        thumbnail: scryfallObject.image_uris.small,
        url: scryfallObject.scryfall_uri,
        power: ('power' in scryfallObject.card_faces[i]) ? scryfallObject.card_faces[i].power : '',
        toughness: ('toughness' in scryfallObject.card_faces[i]) ? scryfallObject.card_faces[i].toughness : '',
        cost: ('mana_cost' in scryfallObject.card_faces[i]) ? scryfallObject.card_faces[i].mana_cost : '',
        usd: ('usd' in scryfallObject) ? scryfallObject.usd : '',
        eur: ('eur' in scryfallObject) ? scryfallObject.eur : '',
        tix: ('tix' in scryfallObject) ? scryfallObject.tix : '',
        legalities: scryfallObject.legalities,
        typeLine: scryfallObject.card_faces[i].type_line,
        oracleText: scryfallObject.card_faces[i].oracle_text
    }

    return base;
}

function handleSplit(scryfallObject, returnArray=false) {

    if (returnArray) {
        let array = [];

        for (let i=0; i < scryfallObject.card_faces.length; i++) {
            let base = {
                name: scryfallObject.card_faces[i].name,
                image: scryfallObject.image_uris.border_crop,
                thumbnail: scryfallObject.image_uris.small,
                url: scryfallObject.scryfall_uri,
                power: ('power' in scryfallObject.card_faces[i]) ? scryfallObject.card_faces[i].power : '',
                toughness: ('toughness' in scryfallObject.card_faces[i]) ? scryfallObject.card_faces[i].toughness : '',
                cost: ('mana_cost' in scryfallObject.card_faces[i]) ? scryfallObject.card_faces[i].mana_cost : '',
                usd: ('usd' in scryfallObject) ? scryfallObject.usd : '',
                eur: ('eur' in scryfallObject) ? scryfallObject.eur : '',
                tix: ('tix' in scryfallObject) ? scryfallObject.tix : '',
                legalities: scryfallObject.legalities,
                typeLine: scryfallObject.card_faces[i].type_line,
                oracleText: scryfallObject.card_faces[i].oracle_text
            }

            array.push(base);
        }

        return array;
    }

    let base = {
        name: scryfallObject.card_faces[0].name,
        image: scryfallObject.image_uris.border_crop,
        thumbnail: scryfallObject.image_uris.small,
        url: scryfallObject.scryfall_uri,
        power: ('power' in scryfallObject.card_faces[0]) ? scryfallObject.card_faces[0].power : '',
        toughness: ('toughness' in scryfallObject.card_faces[0]) ? scryfallObject.card_faces[0].toughness : '',
        cost: ('mana_cost' in scryfallObject.card_faces[0]) ? scryfallObject.card_faces[0].mana_cost : '',
        usd: ('usd' in scryfallObject) ? scryfallObject.usd : '',
        eur: ('eur' in scryfallObject) ? scryfallObject.eur : '',
        tix: ('tix' in scryfallObject) ? scryfallObject.tix : '',
        legalities: scryfallObject.legalities,
        typeLine: scryfallObject.card_faces[0].type_line,
        oracleText: scryfallObject.card_faces[0].oracle_text
    }

    return base
}

function handleNormal(scryfallObject, returnArray=false) {
    let base = {
        name: scryfallObject.name,
        image: scryfallObject.image_uris.border_crop,
        thumbnail: scryfallObject.image_uris.small,
        url: scryfallObject.scryfall_uri,
        power: ('power' in scryfallObject) ? scryfallObject.power : '',
        toughness: ('toughness' in scryfallObject) ? scryfallObject.toughness : '',
        cost: ('mana_cost' in scryfallObject) ? scryfallObject.mana_cost : '',
        usd: ('usd' in scryfallObject) ? scryfallObject.usd : '',
        eur: ('eur' in scryfallObject) ? scryfallObject.eur : '',
        tix: ('tix' in scryfallObject) ? scryfallObject.tix : '',
        legalities: scryfallObject.legalities,
        typeLine: scryfallObject.type_line,
        oracleText: scryfallObject.oracle_text
    }

    return base;
}

module.exports = { handleTransform, handleFlip, handleSplit, handleNormal };