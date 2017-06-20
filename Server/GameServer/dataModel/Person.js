"use strict"; //使用strict mode(嚴格模式)
var Constant = require('./Constant.js');
var Deck = require('./Deck.js');

var Person = {
    createNew : function(id, number, name, lv, deck) {
        let person = {};
        person.id = id ;
        person.name = name ;
        person.number = number ;
        person.lv = lv ;
        person.hand = [];
        person.grave = [];
        person.banish = [];

        person.deck = Deck.createNew(deck.id, deck.name, deck.cards);
        
        person.deck.shuffle();  // 玩家牌組洗牌
        console.log("deck size", person.deck.cards.length, deck.cards.length);
        for (let i = 0 ; i < 3 ; i++) { // 起手三張牌
            person.hand.push(person.deck.draw());  // 玩家手牌
        }
        person.monsterZone = [0, 0 , 0]; // 怪物區初始化


        person.getId = function() { return this.id };
        person.getName = function() { return this.name };
        person.getNumber = function() { return this.number };
        person.getLv = function() { return this.lv };
        person.getDeck = function() { return this.deck };

        person.setId = function(id) { this.id = id };
        person.setName = function(name) { this.name = name };
        person.setNumber = function(number) { this.number = number };
        person.setLv = function(lv) { this.lv = lv };

        return person;
    }
};


exports = module.exports = Person;