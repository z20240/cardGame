"use strict"; //使用strict mode(嚴格模式)
var Constant = require('./Constant.js');

class Card {
    constructor(data) {
        this._id = data.id;
        this._name = data.name;
        this._cost = data.cost;
        this._atk = data.atk;
        this._def = data.def;
        this._desc = data.desc;
        this._effect_object = data.effect_object;
        this._type = data.type;
        this._effect_type = data.effect_type;
        this._suit_job = data.suit_job;
        this._rarity = data.rarity;
    }

    get id() { 
        return parseInt(this._id);
    }

    get name() { 
        return this._name;
    }

    get cost() { 
        return parseInt(this._cost);
    }

    get atk() { 
        return parseInt(this._atk);
    }

    get def() { 
        return parseInt(this._def);
    }

    get desc() { 
        return this._desc;
    }

    get effect_object() { 
        return this._effect_object;
    }

    get type() { 
        return parseInt(this._type);
    }

    get effect_type() { 
        return this._effect_type;
    }

    get suit_job() { 
        return this._suit_job;
    }

    get rarity() { 
        return parseInt(this._rarity);
    }

    set id(value) { 
        this._id = value;
    }

    set name(value) { 
        this._name = value;
    }

    set cost(value) { 
        this._cost = value;
    }

    set atk(value) { 
        this._atk = value;
    }

    set def(value) { 
        this._def = value;
    }

    set desc(value) { 
        this._desc = value;
    }

    set effect_object(value) { 
        this._effect_object = value;
    }

    set type(value) { 
        this._type = value;
    }

    set effect_type(value) { 
        this._effect_type = value;
    }

    set suit_job(value) { 
        this._suit_job = value;
    }

    set rarity(value) { 
        this._rarity = value;
    }
}

exports = module.exports = Card;