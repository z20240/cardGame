"use strict"; //使用strict mode(嚴格模式)
var Constant = require('./Constant.js');
var Room = require('./Room.js');
var Mode = require('../dataModel/Mode.js');
var _ = require('lodash');

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
        console.log("room ki", ki);
        for (let i = 0 ; i < ki.length ; i++) {
            let room = this._roomlist[ki[i]];
            if ( !Mode.checkGameStart(room.personList.length, room.mode ) )
                return false ;
        }
        return true;
    };

    getAvailableRoom() {
        let ki = Object.keys(this._roomlist);
        for (let i = 0 ; i < ki.length ; i++) {
            let room = this._roomlist[ki[i]];
            if ( !Mode.checkGameStart(room.personList.length, room.mode ) )
                return room;
        }
        return null;
    };

    getRoomById(id) { // roomid = roomIndx
        return this._roomlist[id];
    }

    getRoomByName(name) {
        let ki = Object.keys(this._roomlist);
        for (let i = 0 ; i < ki.length ; i++) {
            if (this._roomlist[ki[i]].name != name)
                continue;
            return this._roomlist[ki[i]];
        }
    }

    getRoomNumber() {
        return this._roomlist.length;
    }

    reomveRoomById(id) {
        let self = this;

        clearInterval(self._roomlist[id].energyTimerId); // 停止計時
        _.remove(self._roomlist, (ele) => { if (!ele) return false; return ele.id == id });
        return self._roomlist;
    }

    reomveRoomByName(name) {
        let self = this;
        let ki = Object.keys(self._roomlist);
        for (let i = 0 ; i < ki.length ; i++) {
            if (self._roomlist[ki[i]].name != name)
                continue;

            clearInterval(self._roomlist[ki[i]].energyTimerId); // 停止計時
            _.remove(self._roomlist, (ele) => { if (!ele) return false; return ele.nmae == name});
        }
        return self._roomlist;
    }

    newRoom(mode, name) {
        let newRoom = new Room(this._roomlist.length+1, name, mode);
        this._roomlist[newRoom.id] = newRoom;
        return newRoom;
    }

    playerLeft(uid, roomid) {
        let self = this;
        let room = this.getRoomById(roomid);

        if (!uid || !roomid) return ;

        for (let i = 0 ; i < room.personList.length ; i++) {
            console.log("list uid", room.personList[i].id, uid);
            console.log();
            if (room.personList[i].id != uid)
                continue;
            _.remove(room.personList, (ele) => { if (!ele) return false; return ele.id == uid });

            if (room.personList.length <= 0)
                self.reomveRoomById(roomid);
            return true ;
        }
        return false;
    }
}

exports = module.exports = RoomList;