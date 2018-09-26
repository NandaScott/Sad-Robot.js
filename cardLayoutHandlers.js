
// Many of the card faces all have similar places for each attribute
// however we need to rewrite the `base` object in memory because
// otherwise we'll eventually have a very messy object in memory
// so we call this to generate it, then modify values as needed, if any
function generateBase(scryfallObject) {
    let base = {
        name: scryfallObject.name,
        image: scryfallObject.image_uris.border_crop,
        thumbnail: scryfallObject.image_uris.small,
        url: scryfallObject.scryfall_uri,
        power: ('power' in scryfallObject) ? scryfallObject.power : '',
        toughness: ('toughness' in scryfallObject) ? scryfallObject.toughness : '',
        cost: ('mana_cost' in scryfallObject) ? scryfallObject.mana_cost : '',
        usd: ('usd' in scryfallObject) ? scryfallObject.usd : 'N/A',
        eur: ('eur' in scryfallObject) ? scryfallObject.eur : 'N/A',
        tix: ('tix' in scryfallObject) ? scryfallObject.tix : 'N/A',
        legalities: scryfallObject.legalities,
        typeLine: scryfallObject.type_line,
        oracleText: scryfallObject.oracle_text,
        flavorText: ('flavor_text' in scryfallObject) ? scryfallObject.flavor_text : 'N/A'
    }

    return base;
}

function handleTransform(scryfallObject, returnArray=false) {
    if (returnArray) {
        let array = [];

        for (let i = 0; i < scryfallObject.card_faces.length; i++) {
            let base = {
                url: scryfallObject.scryfall_uri,
                usd: ('usd' in scryfallObject) ? scryfallObject.usd : 'N/A',
                eur: ('eur' in scryfallObject) ? scryfallObject.eur : 'N/A',
                tix: ('tix' in scryfallObject) ? scryfallObject.tix : 'N/A',
                legalities: scryfallObject.legalities,
                name: scryfallObject.card_faces[i].name,
                image: scryfallObject.card_faces[i].image_uris.border_crop,
                power: scryfallObject.card_faces[i].power,
                toughness: scryfallObject.card_faces[i].toughness,
                cost: scryfallObject.card_faces[i].mana_cost,
                typeLine: scryfallObject.card_faces[i].type_line,
                oracleText: scryfallObject.card_faces[i].oracle_text,
                thumbnail: scryfallObject.card_faces[i].image_uris.small,
                flavorText: ('flavor_text' in scryfallObject) ? scryfallObject.flavor_text : 'N/A'
            }

            array.push(base);
        }

        return array
    }

    let base = {
        url: scryfallObject.scryfall_uri,
        usd: ('usd' in scryfallObject) ? scryfallObject.usd : 'N/A',
        eur: ('eur' in scryfallObject) ? scryfallObject.eur : 'N/A',
        tix: ('tix' in scryfallObject) ? scryfallObject.tix : 'N/A',
        legalities: scryfallObject.legalities,
        name: scryfallObject.name,
        image: scryfallObject.card_faces[0].image_uris.border_crop,
        power: scryfallObject.card_faces[0].power,
        toughness: scryfallObject.card_faces[0].toughness,
        cost: scryfallObject.card_faces[0].mana_cost,
        typeLine: scryfallObject.card_faces[0].type_line,
        oracleText: scryfallObject.card_faces[0].oracle_text,
        thumbnail: scryfallObject.card_faces[0].image_uris.small,
        flavorText: ('flavor_text' in scryfallObject) ? scryfallObject.flavor_text : 'N/A'
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
                usd: ('usd' in scryfallObject) ? scryfallObject.usd : 'N/A',
                eur: ('eur' in scryfallObject) ? scryfallObject.eur : 'N/A',
                tix: ('tix' in scryfallObject) ? scryfallObject.tix : 'N/A',
                legalities: scryfallObject.legalities,
                typeLine: scryfallObject.card_faces[i].type_line,
                oracleText: scryfallObject.card_faces[i].oracle_text,
                flavorText: ('flavor_text' in scryfallObject) ? scryfallObject.flavor_text : 'N/A'
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
        usd: ('usd' in scryfallObject) ? scryfallObject.usd : 'N/A',
        eur: ('eur' in scryfallObject) ? scryfallObject.eur : 'N/A',
        tix: ('tix' in scryfallObject) ? scryfallObject.tix : 'N/A',
        legalities: scryfallObject.legalities,
        typeLine: scryfallObject.card_faces[i].type_line,
        oracleText: scryfallObject.card_faces[i].oracle_text,
        flavorText: ('flavor_text' in scryfallObject) ? scryfallObject.flavor_text : 'N/A'
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
                usd: ('usd' in scryfallObject) ? scryfallObject.usd : 'N/A',
                eur: ('eur' in scryfallObject) ? scryfallObject.eur : 'N/A',
                tix: ('tix' in scryfallObject) ? scryfallObject.tix : 'N/A',
                legalities: scryfallObject.legalities,
                typeLine: scryfallObject.card_faces[i].type_line,
                oracleText: scryfallObject.card_faces[i].oracle_text,
                flavorText: ('flavor_text' in scryfallObject) ? scryfallObject.flavor_text : 'N/A'
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
        usd: ('usd' in scryfallObject) ? scryfallObject.usd : 'N/A',
        eur: ('eur' in scryfallObject) ? scryfallObject.eur : 'N/A',
        tix: ('tix' in scryfallObject) ? scryfallObject.tix : 'N/A',
        legalities: scryfallObject.legalities,
        typeLine: scryfallObject.card_faces[0].type_line,
        oracleText: scryfallObject.card_faces[0].oracle_text,
        flavorText: ('flavor_text' in scryfallObject) ? scryfallObject.flavor_text : 'N/A'
    }

    return base
}

function handleNormal(scryfallObject, returnArray=false) {
    return generateBase(scryfallObject);
}

function handlePlanar(scryfallObject, returnArray=false) {
    return generateBase(scryfallObject);
}

function handleScheme(scryfallObject, returnArray=false) {
    return generateBase(scryfallObject);
}

function handleEmblem(scryfallObject, returnArray=false) {
    return generateBase(scryfallObject);
}

function handleLeveler(scryfallObject, returnArray=false) {
    return generateBase(scryfallObject);
}

function handleSaga(scryfallObject, returnArray=false) {
    return generateBase(scryfallObject);
}

function handleVanguard(scryfallObject, returnArray=false) {
    return generateBase(scryfallObject);
}

function handleMeld(scryfallObject, returnArray=false) {
    return generateBase(scryfallObject);
}

function handleToken(scryfallObject, returnArray=false) {
    return generateBase(scryfallObject);
}

function handleHost(scryfallObject, returnArray=false) {
    return generateBase(scryfallObject);
}

function handleAugment(scryfallObject, returnArray=false) {
    return generateBase(scryfallObject);
}

function handleDoubleFacedToken(scryfallObject, returnArray=false) {
    if (returnArray) {
        let array = [];

        for (let i = 0; i < scryfallObject.card_faces.length; i++) {
            let base = {
                url: scryfallObject.scryfall_uri,
                usd: ('usd' in scryfallObject) ? scryfallObject.usd : 'N/A',
                eur: ('eur' in scryfallObject) ? scryfallObject.eur : 'N/A',
                tix: ('tix' in scryfallObject) ? scryfallObject.tix : 'N/A',
                legalities: scryfallObject.legalities,
                name: scryfallObject.card_faces[i].name,
                image: scryfallObject.card_faces[i].image_uris.border_crop,
                power: scryfallObject.card_faces[i].power,
                toughness: scryfallObject.card_faces[i].toughness,
                cost: scryfallObject.card_faces[i].mana_cost,
                typeLine: scryfallObject.card_faces[i].type_line,
                oracleText: scryfallObject.card_faces[i].oracle_text,
                thumbnail: scryfallObject.card_faces[i].image_uris.small,
                flavorText: ('flavor_text' in scryfallObject) ? scryfallObject.flavor_text : 'N/A'
            }

            array.push(base);
        }

        return array
    }

    let base = {
        url: scryfallObject.scryfall_uri,
        usd: ('usd' in scryfallObject) ? scryfallObject.usd : 'N/A',
        eur: ('eur' in scryfallObject) ? scryfallObject.eur : 'N/A',
        tix: ('tix' in scryfallObject) ? scryfallObject.tix : 'N/A',
        legalities: scryfallObject.legalities,
        name: scryfallObject.name,
        image: scryfallObject.card_faces[0].image_uris.border_crop,
        power: scryfallObject.card_faces[0].power,
        toughness: scryfallObject.card_faces[0].toughness,
        cost: scryfallObject.card_faces[0].mana_cost,
        typeLine: scryfallObject.card_faces[0].type_line,
        oracleText: scryfallObject.card_faces[0].oracle_text,
        thumbnail: scryfallObject.card_faces[0].image_uris.small,
        flavorText: ('flavor_text' in scryfallObject) ? scryfallObject.flavor_text : 'N/A'
    }

    return base;
}

module.exports = {
    handleTransform,
    handleFlip,
    handleSplit,
    handleNormal,
    handlePlanar,
    handleScheme,
    handleEmblem,
    handleLeveler,
    handleSaga,
    handleVanguard,
    handleMeld,
    handleToken,
    handleHost,
    handleAugment,
    handleDoubleFacedToken
};