"use strict"; //使用strict mode(嚴格模式)
var Constant = require('./Constant.js');
var Card = require('./Card.js');

class Deck {
    constructor (id, name, cards) {
        this._id = id ;
        this._name = name ;
        this._cards = cards;
    }

    get id() {
        return this._id ;
    }

    get name() { 
        return this._name ;
    }

    get cards() {
        return this._cards;
    }

    set id(value) { 
        this._id = value ;
    }

    set name(value) { 
        this._name = value ;
    }

    set cards(value) {
        this._cards = value;
    }

    shuffle() {
        let min = 0;
        let max = this._cards.length;
        let rnd = Math.floor(Math.random()*(max - min) + min);
        for (let i = this._cards.length - 1 ; i > 0 ; i--) {
            let index = Math.floor(Math.random()*(i - min) + min);
            // Simple swap
            [this._cards[i], this._cards[index]] = [this._cards[index], this._cards[i]];
        }
        return this._cards;
    }

    draw() {
        return this._cards.pop();
    }

    insert(_card) {
        return this._cards.push(_card);
    }
}

exports = module.exports = Deck;