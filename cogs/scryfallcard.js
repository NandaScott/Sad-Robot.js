class ScryfallCard {
  constructor(scryfallCardObject) {
    // core fields
    this.id = scryfallCardObject.id;
    this.arenaId = scryfallCardObject.arena_id;
    this.lang = scryfallCardObject.lang;
    this.mtgoId = scryfallCardObject.mtgo_id;
    this.mtgoFoilId = scryfallCardObject.mtgo_foil_id;
    this.multiverseIds = scryfallCardObject.multiverse_ids;
    this.tcgplayerId = scryfallCardObject.tcgplayer_id;
    this.cardmarketId = scryfallCardObject.cardmarket_id;
    this.object = scryfallCardObject.object;
    this.oracleId = scryfallCardObject.oracle_id;
    this.printsSearchUri = scryfallCardObject.prints_search_uri;
    this.rulingsUri = scryfallCardObject.rulings_uri;
    this.scryfallUri = scryfallCardObject.scryfall_uri;
    this.uri = scryfallCardObject.uri;

    // gameplay fields
    this.allParts = scryfallCardObject.all_parts;
    this.cardFaces = scryfallCardObject.card_faces;
    this.cmc = scryfallCardObject.cmc;
    this.colorIdentity = scryfallCardObject.color_identity;
    this.colorIndicator = scryfallCardObject.color_indicator;
    this.colors = scryfallCardObject.colors;
    this.edhrecRank = scryfallCardObject.edhrec_rank;
    this.foil = scryfallCardObject.foil;
    this.handModifier = scryfallCardObject.hand_modifier;
    this.keywords = scryfallCardObject.keywords;
    this.layout = scryfallCardObject.layout;
    this.legalities = scryfallCardObject.legalities;
    this.lifeModifier = scryfallCardObject.life_modifier;
    this.loyalty = scryfallCardObject.loyalty;
    this.manaCost = scryfallCardObject.mana_cost;
    this.name = scryfallCardObject.name;
    this.nonfoil = scryfallCardObject.nonfoil;
    this.oracleText = scryfallCardObject.oracle_text;
    this.oversized = scryfallCardObject.oversized;
    this.power = scryfallCardObject.power;
    this.producedMana = scryfallCardObject.produced_mana;
    this.reserved = scryfallCardObject.reserved;
    this.toughness = scryfallCardObject.toughness;
    this.typeLine = scryfallCardObject.type_line;

    // print fields
    this.artist = scryfallCardObject.artist;
    this.booster = scryfallCardObject.booster;
    this.border_color = scryfallCardObject.border_color;
    this.card_back_id = scryfallCardObject.card_back_id;
    this.collector_number = scryfallCardObject.collector_number;
    this.content_warning = scryfallCardObject.content_warning;
    this.digital = scryfallCardObject.digital;
    this.flavor_name = scryfallCardObject.flavor_name;
    this.flavor_text = scryfallCardObject.flavor_text;
    this.frame_effects = scryfallCardObject.frame_effects;
    this.frame = scryfallCardObject.frame;
    this.full_art = scryfallCardObject.full_art;
    this.games = scryfallCardObject.games;
    this.highres_image = scryfallCardObject.highres_image;
    this.illustration_id = scryfallCardObject.illustration_id;
    this.image_uris = scryfallCardObject.image_uris;
    this.prices = scryfallCardObject.prices;
    this.printed_name = scryfallCardObject.printed_name;
    this.printed_text = scryfallCardObject.printed_text;
    this.printed_type_line = scryfallCardObject.printed_type_line;
    this.promo = scryfallCardObject.promo;
    this.promo_types = scryfallCardObject.promo_types;
    this.purchase_uris = scryfallCardObject.purchase_uris;
    this.rarity = scryfallCardObject.rarity;
    this.related_uris = scryfallCardObject.related_uris;
    this.released_at = scryfallCardObject.released_at;
    this.reprint = scryfallCardObject.reprint;
    this.scryfall_set_uri = scryfallCardObject.scryfall_set_uri;
    this.set_name = scryfallCardObject.set_name;
    this.set_search_uri = scryfallCardObject.set_search_uri;
    this.set_type = scryfallCardObject.set_type;
    this.set_uri = scryfallCardObject.set_uri;
    this.set = scryfallCardObject.set;
    this.story_spotlight = scryfallCardObject.story_spotlight;
    this.textless = scryfallCardObject.textless;
    this.variation = scryfallCardObject.variation;
    this.variation_of = scryfallCardObject.variation_of;
    this.watermark = scryfallCardObject.watermark;
    this.preview = scryfallCardObject.preview;

    // cardface objects
    // artist;
    // color_indicator;
    // colors;
    // flavor_text;
    // illustration_id;
    // image_uris;
    // loyalty;
    // mana_cost;
    // name;
    // object;
    // oracle_text;
    // power;
    // printed_name;
    // printed_text;
    // printed_type_line;
    // toughness;
    // type_line;
    // watermark;

    // related card objects
    // id;
    // object;
    // component;
    // name;
    // type_line;
    // uri;

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
    this.relevantParts.name = this.name;
    return this;
  }

  getCardFaces(index) {
    if (index) {
      this.relevantParts.cardFaces = [];
      this.relevantParts.cardFaces[index] = this.cardFaces[index];
    } else {
      this.relevantParts.cardFaces = this.cardFaces[0];
    }

    return this;
  }

  getUrl() {
    this.relevantParts.url = this.scryfallUri;
    return this;
  }

  getPower() {
    this.relevantParts.power = this.power;
    return this;
  }

  getToughness() {
    this.relevantParts.toughness = this.toughness;
    return this;
  }

  getCost() {
    this.relevantParts.cost = this.manaCost;
    return this;
  }

  getUSD() {
    this.relevantParts.usd = this.prices.usd;
    return this;
  }

  getUSDFoil() {
    this.relevantParts.usdFoil = this.prices.usd_foil;
    return this;
  }

  getEUR() {
    this.relevantParts.eur = this.prices.eur;
    return this;
  }

  getTIX() {
    this.relevantParts.tix = this.prices.tix;
  }

  getLegalities() {
    this.relevantParts.legalities = this.legalities;
    return this;
  }

  getTypeLine() {
    this.relevantParts.typeLine = this.typeLine;
    return this;
  }

  getOracleText() {
    this.relevantParts.oracleText = this.oracleText;
    return this;
  }

  getFlavorText() {
    this.relevantParts.flavorText = this.flavor_text;
    return this;
  }

  getImage() {
    this.relevantParts.image = this.image_uris.border_crop || '';
    return this;
  }

  getThumbnail() {
    this.relevantParts.thumbnail = this.image_uris.small || '';
    return this;
  }
}

module.exports = { ScryfallCard };
