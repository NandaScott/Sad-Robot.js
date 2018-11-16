
// Many of the card faces all have similar places for each attribute
// however we need to rewrite the `base` object in memory because
// otherwise we'll eventually have a very messy object in memory
// so we call this to generate it, then modify values as needed, if any
function generateBase(scryfallObject) {
    let base = {
        name: ('name' in scryfallObject) ? scryfallObject.name : '',
        url: ('scryfall_uri' in scryfallObject) ? scryfallObject.scryfall_uri : '',
        power: ('power' in scryfallObject) ? scryfallObject.power : '',
        toughness: ('toughness' in scryfallObject) ? scryfallObject.toughness : '',
        cost: ('mana_cost' in scryfallObject) ? scryfallObject.mana_cost : '',
        usd: ('usd' in scryfallObject) ? scryfallObject.usd : 'N/A',
        eur: ('eur' in scryfallObject) ? scryfallObject.eur : 'N/A',
        tix: ('tix' in scryfallObject) ? scryfallObject.tix : 'N/A',
        legalities: ('legalities' in scryfallObject) ? scryfallObject.legalities : '',
        typeLine: ('type_line' in scryfallObject) ? scryfallObject.type_line : '',
        oracleText: ('oracle_text' in scryfallObject) ? scryfallObject.oracle_text : '',
        flavorText: ('flavor_text' in scryfallObject) ? scryfallObject.flavor_text : 'N/A'
    }

    if ('image_uris' in scryfallObject) {
        base.image = ('border_crop' in scryfallObject.image_uris) ? scryfallObject.image_uris.border_crop : '';
        base.thumbnail = ('small' in scryfallObject.image_uris) ? scryfallObject.image_uris.small : '';
    } else {
        base.image = '';
        base.thumbnail = '';
    }

    return base;
}

function handleDoubleFaceCard(scryfallObject, returnArray=false) {
    if (returnArray) {
        let array = [];

        for (let i = 0; i < scryfallObject.card_faces.length; i++) {
            let base = generateBase(scryfallObject);

            base.name = scryfallObject.card_faces[i].name,
            base.image = scryfallObject.card_faces[i].image_uris.border_crop,
            base.power = ('power' in scryfallObject.card_faces[i]) ? scryfallObject.card_faces[i].power : '',
            base.toughness = ('toughness' in scryfallObject.card_faces[i]) ? scryfallObject.card_faces[i].toughness : '',
            base.cost = scryfallObject.card_faces[i].mana_cost,
            base.typeLine = scryfallObject.card_faces[i].type_line,
            base.oracleText = scryfallObject.card_faces[i].oracle_text,
            base.thumbnail = scryfallObject.card_faces[i].image_uris.small,
            base.flavorText = ('flavor_text' in scryfallObject.card_faces[i]) ? scryfallObject.flavor_text : 'N/A'

            array.push(base);
        }

        return array
    }

    let base = generateBase(scryfallObject);

    base.name = scryfallObject.card_faces[0].name,
    base.image = scryfallObject.card_faces[0].image_uris.border_crop,
    base.power = ('power' in scryfallObject.card_faces[0]) ? scryfallObject.card_faces[0].power : '',
    base.toughness = ('toughness' in scryfallObject.card_faces[0]) ? scryfallObject.card_faces[0].toughness : '',
    base.cost = scryfallObject.card_faces[0].mana_cost,
    base.typeLine = scryfallObject.card_faces[0].type_line,
    base.oracleText = scryfallObject.card_faces[0].oracle_text,
    base.thumbnail = scryfallObject.card_faces[0].image_uris.small,
    base.flavorText = ('flavor_text' in scryfallObject.card_faces[0]) ? scryfallObject.flavor_text : 'N/A'

    return base;
}

function handleTransform(scryfallObject, returnArray=false) {
    return handleDoubleFaceCard(scryfallObject, returnArray);
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
    return handleDoubleFaceCard(scryfallObject, returnArray);
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