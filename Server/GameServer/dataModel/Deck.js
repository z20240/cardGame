"use strict"; //使用strict mode(嚴格模式)
var Constant = require('./Constant.js');
var Card = require('./Card.js');

var Deck = {
    createNew : function(id, name, cards) {
        let deck = {};
        deck.id = id ;
        deck.name = name ;
        deck.cards = cards;
        
        deck.getId = function() { return this.id };
        deck.getName = function() { return this.name };
        deck.setId = function(id) { this.id = id };
        deck.setName = function(name) { this.name = name };

        deck.shuffle = function() {
            let min = 0;
            let max = this.cards.length;
            let rnd = Math.floor(Math.random()*(max - min) + min);
            for (let i = this.cards.length - 1 ; i > 0 ; i--) {
                let index = Math.floor(Math.random()*(i - min) + min);
                // Simple swap
                [this.cards[i], this.cards[index]] = [this.cards[index], this.cards[i]];
            }
            return this.cards;
        }

        deck.draw = function() {
            return this.cards.pop();
        }

        deck.insert = function(card) {
            return this.cards.push(card);
        }

        return deck;
    }
};


exports = module.exports = Deck;