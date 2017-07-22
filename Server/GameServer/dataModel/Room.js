"use strict"; //使用strict mode(嚴格模式)
var Constant = require('./Constant.js');

class Room {
    constructor (id, name, mode) {
        this._id = id;
        this._count = 0;
        this._name = name;
        this._mode = mode;
        this._personList = [];
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
        return parseInt(this._mode);
    }
    get personList() { 
        return this._personList;
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

    getDueler(mode, waitingList, person) {
        switch(mode) {
            case Constant.BATTLE_MODE.PVE: return getPVE(person) ; // 跟電腦對戰
            case Constant.BATTLE_MODE.PVP: return getPVP(waitingList, person); // 跟一個玩家對戰
            case Constant.BATTLE_MODE.DRAFT: return getDraft(waitingList, person); // 跟三個玩家對戰
        }
    }

    getPersonById(id) {
        for(let i = 0 ; i < this.personList.length ; i++) {
            if (this.personList[i].id == id) return this.personList[i];
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
}

function getPVE(person) {
    return person;
}

function getPVP(waitingList, person) {
    let choosedPerson;
    waitingList.array.forEach(function(element, idx) {
        choosedPerson.push(element);
        delete waitingList[idx];
        return choosedPerson;
    }, this);
    waitingList.push(person);
    return [];
}

function getDraft(waitingList, person) {
    waitingList.array.forEach(function(element, idx) {
        choosedPerson.push(element);
        delete waitingList[idx];
        if (choosedPerson.length >= 3)
            return choosedPerson;
    }, this);
    waitingList.push(person);
    return [];
}


exports = module.exports = Room;