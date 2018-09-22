function handleTransform(scryfallObject, returnArray=false) {
    let base = {
        url: scryfallObject.scryfall_uri,
        usd: ('usd' in scryfallObject) ? scryfallObject.usd : '',
        eur: ('eur' in scryfallObject) ? scryfallObject.eur : '',
        tix: ('tix' in scryfallObject) ? scryfallObject.tix : '',
        legalities: scryfallObject.legalities,
        name: '',
        image: '',
        power: '',
        toughness: '',
        cost: '',
        typeLine: '',
        oracleText: ''
    }

    if (returnArray) {
        let array = [];

        for (let i = 0; i < scryfallObject.card_faces.length; i++) {

            base.name = scryfallObject.card_faces[i].name,
            base.image = scryfallObject.card_faces[i].image_uris.normal,
            base.power = scryfallObject.card_faces[i].power,
            base.toughness = scryfallObject.card_faces[i].toughness,
            base.cost = scryfallObject.card_faces[i].mana_cost,
            base.typeLine = scryfallObject.card_faces[i].type_line,
            base.oracleText = scryfallObject.card_faces[i].oracle_text

            array.push(base);
        }

        return array
    }

    return base
}

function handleFlip(scryfallObject, returnArray=false) {
    let base = {
        name: scryfallObject.name,
        image: scryfallObject.image_uris.normal,
        url: scryfallObject.scryfall_uri,
        power: ('power' in scryfallObject) ? scryfallObject.power : '',
        toughness: ('toughness' in scryfallObject) ? scryfallObject.toughness : '',
        cost: ('mana_cost' in scryfallObject) ? scryfallObject.mana_cost : '',
        usd: ('usd' in scryfallObject) ? scryfallObject.usd : '',
        eur: ('eur' in scryfallObject) ? scryfallObject.eur : '',
        tix: ('tix' in scryfallObject) ? scryfallObject.tix : '',
        legalities: scryfallObject.legalities,
        typeLine: '',
        oracleText: ''
    }

    if (returnArray) {
        let array = [];

        for (let i = 0; i < scryfallObject.card_faces.length; i++) {
            base.typeLine = scryfallObject.card_faces[i].type_line
            base.oracleText = scryfallObject.card_faces[i].oracle_text

            array.push(base);
        }

        return array;
    }

    return base
}

function handleSplit(scryfallObject, returnArray=false) {
    let base =  {
        name: scryfallObject.name,
        image: scryfallObject.image_uris.normal,
        url: scryfallObject.scryfall_uri,
        power: ('power' in scryfallObject) ? scryfallObject.power : '',
        toughness: ('toughness' in scryfallObject) ? scryfallObject.toughness : '',
        cost: ('mana_cost' in scryfallObject) ? scryfallObject.mana_cost : '',
        usd: ('usd' in scryfallObject) ? scryfallObject.usd : '',
        eur: ('eur' in scryfallObject) ? scryfallObject.eur : '',
        tix: ('tix' in scryfallObject) ? scryfallObject.tix : '',
        legalities: scryfallObject.legalities,
        typeLine: '',
        oracleText: ''
    }

    if (returnArray) {
        let array = [];

        for (let i=0; i < scryfallObject.card_faces.length; i++) {
            base.typeLine = scryfallObject.card_faces[i].type_line
            base.oracleText = scryfallObject.card_faces[i].oracle_text

            array.push(base);
        }

        return array;
    }

    return base
}

function handleNormal(scryfallObject, returnArray=false) {
    let base =  {
        name: scryfallObject.name,
        image: scryfallObject.image_uris.border_crop,
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