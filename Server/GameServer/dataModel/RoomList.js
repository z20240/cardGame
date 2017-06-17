"use strict"; //使用strict mode(嚴格模式)
var Constant = require('./Constant.js');
var Room = require('./Room.js');

var RoomList = {
    createNew : function() {
        var list = {};
        list.id = 0;
        list.roomList = [];
        list.getId = function() { return this.id };
        list.getRoomList = function() { return list.roomList };
        list.setId = function(id) { list.id = id };
        list.setRoomList = function(roomList) { list.roomList = roomList };

        list.isFull = function() {
            for (let i = 0 ; i < list.roomList.length ; i++) {
                // console.log(i, list.roomList[i].getPersonList().length, list.roomList[i].getMode());
                if (list.roomList[i].getPersonList().length < list.roomList[i].getMode())
                    return false ;
            }
            return true;
        };

        list.getAvailableRoom = function() {
            for (let i = 0 ; i < list.roomList.length ; i++) {
                if (list.roomList[i].getPersonList().length < list.roomList[i].getMode())
                    return list.roomList[i];
            }
            return null;
        };

        list.getRoomByIdx = function(idx) {
            return list.roomList[idx];
        }

        list.getRoomById = function(id) {
            for (let i = 0 ; i < list.roomList.length ; i++) {
                if (list.roomList[i].id == id)
                    return list.roomList[i];
            }
        }

        list.newRoom = function(mode, name) {
            let newRoom = Room.createNew(list.roomList.length+1, name, mode);
            list.roomList.push(newRoom);
            return newRoom;
        }

        list.personLeft = function(name) {
            for (let i = 0 ; i < list.roomList.length ; i++) {
                let persons = list.roomList[i].getPersonList();
                for (let j = 0 ; j < persons.length ;j++) {
                    if (persons[i] != name) 
                        continue;
                    delete persons[i];
                    break;
                }
                if (persons.length > 0)
                    continue;
                delete list.roomList[i];
            }
            return list;
        }

        return list;
    }
};

exports = module.exports = RoomList;