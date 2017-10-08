"use strict"; //使用strict mode(嚴格模式)
var Constant = require('./Constant.js');
var Tool = require('../tool/Tool.js');
var _ = require('lodash');

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
        this._state = []; // 附加狀態可以從這邊增加
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

exports = module.exports = Card;