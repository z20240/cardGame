"use strict"; //使用strict mode(嚴格模式)
var Constant = require('./Constant.js');
var Deck = require('./Deck.js');

class Person {
    constructor (id, name,job, lv, deck) {
        let attr = this.JobAttr(job);
        this._id = id ;            // 玩家編號
        this._roomid = 0;          // 所屬的房間ID(一開始不會有，加入房間後設置)
        this._name = name ;        // 名稱
        this._job = job ;          // 職業
        this._atk = attr["atk"];   // 物理攻擊
        this._matk = attr["matk"]; // 魔法攻擊
        this._def = attr["def"];   // 玩家的防禦力
        this._cardDmg = 0;     // 卡片所給予的傷害點數
        this._cardDef = 0;     // 卡片所給予玩家的防禦力
        this._cost = 0;        // 玩家目前費用
        this._lv = lv ;        // 玩家等級
        this._hand = [];       // 手牌
        this._grave = [];      // 墓的
        this._banish = [];     // 除外區
        this._field = [null, null, null];       // 場上
        this._fieldDist = 0;       // 場上的怪物分布狀況
        this._showCard = null; // 這次出的卡片
        this._stack = []; // 效果陣列
        this._deck = new Deck(deck.id, deck.name, deck.cards);
        this._state = []; // 附加狀態可以從這邊增加

        this._deck.shuffle();  // 玩家牌組洗牌
        console.log("deck size", this._deck.size, deck.size);
        for (let i = 0 ; i < 3 ; i++) { // 起手三張牌
            this._hand.push(this._deck.draw());  // 玩家手牌
        }
        this._monsterZone = [0, 0 , 0]; // 怪物區初始化
    }


    get roomid() { return this._id };
    get id() { return this._id };
    get name() { return this._name };
    get job() { return this._job };
    get atk() { return this._atk };
    get matk() { return this._matk };
    get def() { return this._def };
    get cardDmg() { return this._cardDmg };
    get cardDef() { return this._cardDef };
    get cost() { return this._cost };
    get lv() { return this._lv };
    get hand() { return this._hand };
    get grave() { return this._grave };
    get banish() { return this._banish };
    get field() { return this._field };
    get fieldDist() { return this._fieldDist };
    get showCard() { return this._card };
    get stack() { return this._stack };
    get deck() { return this._deck };


    set id(value) { this._id = value };
    set roomid(value) { this._roomid = value };
    set name(value) { this._name = value };
    set job(value) { this._job = value };
    set atk(value) { this._atk = value };
    set matk(value) { this._matk = value };
    set def(value) { this._def = value };
    set cardDmg(value) { this._cardDmg = value };
    set cardDef(value) { this._cardDef = value };
    set cost(value) { this._cost = value };
    set lv(value) { this._lv = value };
    set hand(value) { this._hand = value };
    set grave(value) { this._grave = value };
    set banish(value) { this._banish = value };
    set field(value) { this._field = value };
    set fieldDist(value) { this._fieldDist = value };
    set showCard(value) { this._card = value };
    set stack(value) { this._stack = value };
    set deck(value) { this._deck = value };


    JobAttr(job) {
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


exports = module.exports = Person;