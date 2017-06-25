"use strict"; //使用strict mode(嚴格模式)
var Constant = require('./Constant.js');
var Room = require('./Room.js');

var RoomList = {
    createNew : function() {
        let list = {};
        list.id = 0;
        list.roomList = [];
        list.getId = function() { return this.id };
        list.getRoomList = function() { return list.roomList };
        list.setId = function(id) { list.id = id };
        list.setRoomList = function(roomList) { list.roomList = roomList };

        list.isFull = function() {
            let ki = Object.keys(list.roomList);
            for (let i = 0 ; i < ki.length ; i++) {
                if (list.roomList[ki[i]].getPersonList().length < list.roomList[ki[i]].getMode())
                    return false ;
            }
            return true;
        };

        list.getAvailableRoom = function() {
            let ki = Object.keys(list.roomList);
            for (let i = 0 ; i < ki.length ; i++) {
                if (list.roomList[ki[i]].getPersonList().length < list.roomList[ki[i]].getMode())
                    return list.roomList[ki[i]];
            }
            return null;
        };

        list.getRoomByName = function(name) { // roomName = roomIndx
            return list.roomList[name];
        }

        list.getRoomById = function(id) {
            let ki = Object.keys(list.roomList);
            for (let i = 0 ; i < ki.length ; i++) {
                if (list.roomList[ki[i]].id == id)
                    return list.roomList[ki[i]];
            }
        }

        list.newRoom = function(mode, name) {
            let newRoom = Room.createNew(list.roomList.length+1, name, mode);
            list.roomList[name] = newRoom;
            return newRoom;
        }

        list.personLeft = function(name) {
            let ki = Object.keys(list.roomList);
            for (let i = 0 ; i < ki.length ; i++) {
                let persons = list.roomList[ki[i]].getPersonList();
                for (let j = 0 ; j < persons.length ;j++) {
                    if (persons[i] != name) 
                        continue;
                    delete persons[i];
                    break;
                }
                if (persons.length > 0)
                    continue;
                delete list.roomList[ki[i]];
            }
            return list;
        }

        return list;
    }
};

exports = module.exports = RoomList;