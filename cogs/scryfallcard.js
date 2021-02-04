class ScryfallCard {
  constructor(scryfallCardObject) {
    this.card = scryfallCardObject;

    this.layouts = [
      'normal',
      'split',
      'flip',
      'transform',
      'modal_dfc',
      'meld',
      'leveler',
      'saga',
      'adventure',
      'planar',
      'scheme',
      'vanguard',
      'token',
      'double_faced_token',
      'emblem',
      'augment',
      'host',
      'art_series',
      'double_sided',
    ];

    this.relevantParts = {};
  }

  getName() {
    switch (this.card.layout) {
      case 'transform':
        this.relevantParts.name = this.card.card_faces[0].name;
        break;
      case 'modal_dfc':
        this.relevantParts.name = this.card.card_faces[0].name;
        break;
      case 'meld':
        this.relevantParts.name = this.card.card_faces[0].name;
        break;
      case 'double_faced_token':
        this.relevantParts.name = this.card.card_faces[0].name;
        break;
      default:
        this.relevantParts.name = this.card.name;
        break;
    }
    return this;
  }

  getUrl() {
    this.relevantParts.url = this.card.scryfall_uri;
    return this;
  }

  getPower() {
    this.relevantParts.power = this.card.power;
    return this;
  }

  getToughness() {
    this.relevantParts.toughness = this.card.toughness;
    return this;
  }

  getCost() {
    this.relevantParts.cost = this.card.manaCost;
    return this;
  }

  getUSD() {
    this.relevantParts.usd = this.card.prices.usd;
    return this;
  }

  getUSDFoil() {
    this.relevantParts.usdFoil = this.card.prices.usd_foil;
    return this;
  }

  getEUR() {
    this.relevantParts.eur = this.card.prices.eur;
    return this;
  }

  getTIX() {
    this.relevantParts.tix = this.card.prices.tix;
  }

  getLegalities() {
    this.relevantParts.legalities = this.card.legalities;
    return this;
  }

  getTypeLine() {
    this.relevantParts.typeLine = this.card.typeLine;
    return this;
  }

  getOracleText() {
    this.relevantParts.oracleText = this.card.oracleText;
    return this;
  }

  getFlavorText() {
    this.relevantParts.flavorText = this.card.flavor_text;
    return this;
  }

  getImage() {
    switch (this.card.layout) {
      case 'transform':
        this.relevantParts.image = this.card.card_faces[0].image_uris.border_crop;
        break;
      case 'modal_dfc':
        this.relevantParts.image = this.card.card_faces[0].image_uris.border_crop;
        break;
      case 'meld':
        this.relevantParts.image = this.card.card_faces[0].image_uris.border_crop;
        break;
      case 'double_faced_token':
        this.relevantParts.image = this.card.card_faces[0].image_uris.border_crop;
        break;
      default:
        this.relevantParts.image = this.card.image_uris.border_crop;
        break;
    }
    return this;
  }

  getThumbnail() {
    switch (this.card.layout) {
      case 'transform':
        this.relevantParts.thumbnail = this.card.card_faces[0].image_uris.small;
        break;
      case 'modal_dfc':
        this.relevantParts.thumbnail = this.card.card_faces[0].image_uris.small;
        break;
      case 'meld':
        this.relevantParts.thumbnail = this.card.card_faces[0].image_uris.small;
        break;
      case 'double_faced_token':
        this.relevantParts.thumbnail = this.card.card_faces[0].image_uris.small;
        break;
      default:
        this.relevantParts.thumbnail = this.card.image_uris.small;
        break;
    }
    return this;
  }
}

module.exports = { ScryfallCard };
