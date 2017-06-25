"use strict"; //使用strict mode(嚴格模式)
var Constant = require('./Constant.js');
var Deck = require('./Deck.js');

var Person = {
    createNew : function(id, job, name, lv, deck) {
        let person = {};
        let attr = JobAttr(job);
        person.id = id ;
        person.name = name ;
        person.job = job ;
        person.atk = attr["atk"];
        person.matk = attr["matk"];
        person.def = attr["def"];
        person.cardDmg = 0;
        person.cardDef = 0;
        person.cost = 0;
        person.lv = lv ;
        person.hand = [];
        person.grave = [];
        person.banish = [];
        person.showCard = null; 

        person.deck = Deck.createNew(deck.id, deck.name, deck.cards);
        
        person.deck.shuffle();  // 玩家牌組洗牌
        console.log("deck size", person.deck.cards.length, deck.cards.length);
        for (let i = 0 ; i < 3 ; i++) { // 起手三張牌
            person.hand.push(person.deck.draw());  // 玩家手牌
        }
        person.monsterZone = [0, 0 , 0]; // 怪物區初始化


        person.getId = function() { return this.id };
        person.getName = function() { return this.name };
        person.getJob = function() { return this.job };
        person.getLv = function() { return this.lv };
        person.getDeck = function() { return this.deck };
        person.getshowCard = function(card) { return this.card };
        person.getAtk = function() { return this.atk };
        person.getMatk = function() { return this.matk };
        person.getDef = function() { return this.def };
        person.getCardDmg = function() { return this.cardDmg };
        person.getCardDef = function() { return this.cardDef };
        person.getCost = function() { return this.cost };
        
        person.setId = function(id) { this.id = id };
        person.setName = function(name) { this.name = name };
        person.setJob = function(job) { this.job = job };
        person.setLv = function(lv) { this.lv = lv };
        person.setshowCard = function(card) { this.card = card ; };
        person.setCost = function(cost) { this.cost = cost };
        
        person.setCardDmg = function(cardDmg) { this.cardDmg = cardDmg };
        person.setCardDef = function(cardDef) { this.cardDef = cardDef };
        return person;
    }
};

function JobAttr(job) {
    switch(job) {
        case Constant.JOB.WORRIOR: return { "atk": 2, "matk": 1, "def": 3 };  // 戰士
        case Constant.JOB.SPELLER: return { "atk": 0, "matk": 4, "def": 2 };  // 咒術師
        case Constant.JOB.NECROMANCER: return { "atk": 1, "matk": 2, "def": 3 };  // 死靈師
        case Constant.JOB.ASSASSIN: return { "atk": 4, "matk": 0, "def": 2 }; // 刺客
        case Constant.JOB.PRIEST: return { "atk": 2, "matk": 2, "def": 2 };   // 祭司
        default:
        case Constant.JOB.NONE: return { "atk": 0, "matk": 0, "def": 0 }; // 中立
    }
}


exports = module.exports = Person;