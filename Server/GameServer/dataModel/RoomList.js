"use strict"; //使用strict mode(嚴格模式)
var Constant = require('./Constant.js');
var Room = require('./Room.js');

class RoomList {
    constructor () {
        this._id = 0;
        this._roomlist = [];
    }

    get id() { return this._id };
    get roomlist() { return this._roomlist };

    set id(value) { this._id = value };
    set roomlist(value) { this._roomlist = value };

    isFull() {
        let ki = Object.keys(this._roomlist);
        for (let i = 0 ; i < ki.length ; i++) {
            if (this._roomlist[ki[i]].personList.length < this._roomlist[ki[i]].mode)
                return false ;
        }
        return true;
    };

    getAvailableRoom() {
        let ki = Object.keys(this._roomlist);
        for (let i = 0 ; i < ki.length ; i++) {
            if (this._roomlist[ki[i]].personList.length < this._roomlist[ki[i]].mode)
                return this._roomlist[ki[i]];
        }
        return null;
    };

    getRoomByName(name) { // roomName = roomIndx
        return this._roomlist[name];
    }

    getRoomById(id) {
        let ki = Object.keys(this._roomlist);
        for (let i = 0 ; i < ki.length ; i++) {
            if (this._roomlist[ki[i]].id == id)
                return this._roomlist[ki[i]];
        }
    }

    newRoom(mode, name) {
        // let newRoom = Room.createNew(this._roomlist.length+1, name, mode);
        let newRoom = new Room(this._roomlist.length+1, name, mode);
        this._roomlist[name] = newRoom;
        return newRoom;
    }

    personLeft(name) {
        let ki = Object.keys(this._roomlist);
        for (let i = 0 ; i < ki.length ; i++) {
            let persons = this._roomlist[ki[i]].personList;
            for (let j = 0 ; j < persons.length ;j++) {
                if (persons[i] != name) 
                    continue;
                delete persons[i];
                break;
            }
            if (persons.length > 0)
                continue;
            delete this._roomlist[ki[i]];
        }
        return this;
    }
}

exports = module.exports = RoomList;