var Constant = require('../dataModel/Constant.js');
var RoomList = require('../dataModel/RoomList.js');
var Person = require('../dataModel/Person.js');
var RoomDispatch = require('../methodModel/RoomDispatch.js');
var GameControl = require('../methodModel/GameControl.js');
var DeckList = require('../CardData/DeckList.js');
var Dumper = require('../tool/Dumper.js');

class PlayerControl {

    constructor() {
        this.roomList = new RoomList();
    }

    addUser(socket, io, name, uid) {
        let roomId;
        let self = this;
        socket.personName = name;
        let person = new Person(uid, 2, name, 100, new DeckList()[0]);
        console.log("add User roomList:", self.roomList, name);
        
        [self.roomList, roomId] = RoomDispatch(io, socket, self.roomList, person);
        
        if ( self.roomList.getRoomByName(roomId).personList.length == 2 ) // 雙人對戰時，兩人開始
            GameControl.gameStart(io, socket, roomId, self.roomList);
    }

    playCard(socket, io, gameInfo) {
        let self = this;
        GameControl.playCard(io, socket, gameInfo, self.roomList);
    }

    userDisconnect(socket, io) {
        let self = this;
        let roomlist = self.roomList.personLeft(socket.personName);
        socket.to(socket.roomId).emit('user left', {roomId: socket.roomId, name: socket.personName});
        console.log(socket.roomId, socket.personName + " left.");
    }
}

module.exports = PlayerControl;