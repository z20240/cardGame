"use strict"; //使用strict mode(嚴格模式)
var Constant = require('./Constant.js');
var Card = require('./Card.js');

class Deck {
    constructor (id, name, cards) {
        this._id = id ;
        this._name = name ;
        this._cards = cards;
        this._size = this._cards.length;
        this._state = []; // 附加狀態可以從這邊增加
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

    get size() {
        return this._cards.length;
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
        this._size = this.cards.length;
        return this._cards;
    }

    draw() {
        let card = this.cards.pop();
        this._size = this.cards.length;
        return card;
    }

    insert(_card) {
        this.cards.push(_card);
        this._size = this.cards.length;
        return this.cards;
    }

    getState(idx) {
        if (Tool.isEmpty(idx)) return null;

        return this._state[idx];
    }

    setState(idx, value) {
        if (Tool.isEmpty(idx)) return null;

        if (Tool.isEmpty(value)) {
            this._state[idx] = 1;
            return this._state[idx];
        }

        this._state[idx] = value;
        return this._state[idx];
    }

    addState(idx, value) {
        if (Tool.isEmpty(idx)) return null;

        if (Tool.isEmpty(value)) {
            this._state[idx] += 1;
            return this._state[idx];
        }

        this._state[idx] += value;
        return this._state[idx];
    }

    clearState(idx) {
        if (Tool.isEmpty(idx)) {
            this._state = [];
            this._state.length = 0;
            return;
        }

        this._state[idx] = null;
        return;
    }
}

exports = module.exports = Deck;