var Constant = require('../dataModel/Constant.js');
var RoomList = require('../dataModel/RoomList.js');
var Person = require('../dataModel/Person.js');
var Mode = require('../dataModel/Mode.js');
var RoomDispatch = require('../methodModel/RoomDispatch.js');
var DeckList = require('../CardData/DeckList.js');
const chalk = require('chalk');

class RoomControl {

    constructor() {
        this.roomList = new RoomList();
    }

    get roomlist() { return this.roomList }

    addUser(socket, io, player) {
        let room;
        let self = this;
        socket.personName = player.name;
        socket.personId = player.uid;

        room = RoomDispatch(self.roomList, Constant.BATTLE_MODE.PVP, player);

        socket.roomId = room.id;
        socket.join(room.id);
        io.in(room.id).emit('add user', {user: room.personList, roomId: room.id});

        return room;
    }

    gameStart(socket, io, room, mode) {
        let self = this;

        // 如果不人數不符合，不可開始
        if ( !Mode.checkGameStart(room.personList.length, mode ) )
            return ;

        // 開始計費
        room.energyTimerId = setInterval(doCountTimer, 2500, socket, io, room);

    }

    userDisconnect(socket, io) {
        let self = this;
        console.log("房號", socket.roomId, "的", socket.personName + " 要離開了");
        let removeSuccess = self.roomList.playerLeft(socket.roomId, socket.personId);
        socket.to(socket.roomId).emit('user left', {roomId: socket.roomId, name: socket.personName, uid: socket.personId});
        console.log("房號", socket.roomId, "的", socket.personName + " 已經離開");
        console.log("查看房間的狀況", self.roomList.roomlist);
    }
}


function doCountTimer(socket, io, room) {
    let str = chalk.green("[room " + room.id + "]");

    for (let i = 0 ; i < room.personList.length ; i++) {
        room.personList[i].cost = Math.min((room.personList[i].cost+1), Constant.MAX_COST);
        str += (" player_" + i + " : " + room.personList[i].cost + "    ");
    }
    console.log(str);
    io.in(room.id).emit('cost timer', {user: room.personList, roomId: room.id});
    return { roomId : room.id, user : room.personList };
}


module.exports = RoomControl;