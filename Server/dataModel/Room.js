"use strict"; //使用strict mode(嚴格模式)

var Constant = require('./Constant.js');

var Room = {
    createNew : function(id, name, mode) {
        var room = {};
        room.id = id;
        room.name = name;
        room.mode = mode;
        room.personList = [];

        room.getId = function() { return parseInt(this.id) };
        room.getName = function() { return this.name };
        room.getMode = function() { return parseInt(this.mode) };
        room.getPersonList = function() { return this.personList };
        room.setId = function(id) { this.id = id };
        room.setName = function(name) { this.name = name };
        room.setMode = function(mode) { this.mode = mode };
        room.setPersonList = function(personList) { this.personList = personList };

        room.getDueler = function(mode, waitingList, person) {
            switch(mode) {
                case Constant.MODE.PVE: return getPVE(person) ; // 跟電腦對戰
                case Constant.MODE.PVP: return getPVP(waitingList, person); // 跟一個玩家對戰
                case Constant.MODE.DRAFT: return getDraft(waitingList, person); // 跟三個玩家對戰
            }
        }

        room.getPersonById = function(id) {
            for(let i = 0 ; i < room.personList.length ; i++) {
                if (room.personList[i].id == id) return room.personList[i];
            }
            return null;
        }

        room.getPersonByIdx = function(idx) {
            return room.personList[idx];
        }

        return room;
    }
};

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