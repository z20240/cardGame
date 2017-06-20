"use strict"; //使用strict mode(嚴格模式)
var Constant = require('./Constant.js');

var Card = {
    createNew : function(data) {
        let card = {};
        card.id = data.id;
        card.name = data.name;
        card.cost = data.cost;
        card.atk = data.atk;
        card.def = data.def;
        card.desc = data.desc;
        card.effect_object = data.effect_object;
        card.type = data.type;
        card.effect_type = data.effect_type;
        card.suit_job = data.suit_job;
        card.rarity = data.rarity;

        card.getId = function() { return parseInt(this.id) };
        card.getName = function() { return this.name };
        card.getCost = function() { return parseInt(this.cost) };
        card.getAtk = function() { return parseInt(this.atk) };
        card.getDef = function() { return parseInt(this.def) };
        card.getDesc = function() { return this.desc };
        card.getEffect_object = function() { return this.effect_object };
        card.getType = function() { return parseInt(this.type) };
        card.getEffect_type = function() { return this.effect_type };
        card.getSuit_job = function() { return this.suit_job };
        card.getRarity = function() { return parseInt(this.rarity) };

        return card;
    }
};

exports = module.exports = Card;