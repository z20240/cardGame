"use strict"; //使用strict mode(嚴格模式)
var Constant = require('./Constant.js');

class Room {
    constructor (id, name, mode) {
        this._id = id;
        this._count = 0;
        this._energyTimerId = 0;
        this._name = name;
        this._mode = mode;
        this._personList = [];
        this._state = [];
    }

    get id() {
        return parseInt(this._id);
    }
    get count() {
        return this._count;
    }
    get name() {
        return this._name;
    }
    get mode() {
        return this._mode;
    }
    get personList() {
        return this._personList;
    }

    get energyTimerId() {
        return this._energyTimerId;
    }

    set id(value) {
        this._id = value;
    }

    set count(value) {
        this._count = value;
    }

    set name(value) {
        this._name = value;
    }

    set mode(value) {
        this._mode = value;
    }

    set personList(value) {
        this._personList = value;
    }

    set energyTimerId(value) {
        this._energyTimerId = value;
    }

    getDueler(mode, waitingList, person) {
        switch(mode) {
            case Constant.BATTLE_MODE.PVE: return getPVE(person) ; // 跟電腦對戰
            case Constant.BATTLE_MODE.PVP: return getPVP(waitingList, person); // 跟一個玩家對戰
            case Constant.BATTLE_MODE.DRAFT: return getDraft(waitingList, person); // 跟三個玩家對戰
        }
    }

    getPersonById(uid) {
        for(let i = 0 ; i < this.personList.length ; i++) {
            if (this.personList[i].uid == uid) return this.personList[i];
        }
        return null;
    }

    getPersonByName(name) {
        for(let i = 0 ; i < this.personList.length ; i++) {
            if (this.personList[i].name == name) return this.personList[i];
        }
        return null;
    }

    getPersonByIdx(idx) {
        return this.personList[idx];
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

function getPVE(person) {
    return person;
}

function getPVP(waitingList, person) {
    let choosedPerson;
    waitingList.array.forEach(function(element, idx) {
        choosedPerson.push(element);
        waitingList.splice(idx, 1); // remove element
        return choosedPerson;
    }, this);
    waitingList.push(person);
    return [];
}

function getDraft(waitingList, person) {
    waitingList.array.forEach(function(element, idx) {
        choosedPerson.push(element);
        waitingList.splice(idx, 1); // remove element
        if (choosedPerson.length >= 3)
            return choosedPerson;
    }, this);
    waitingList.push(person);
    return [];
}


exports = module.exports = Room;