var Constant = require('../dataModel/Constant.js');
var RoomList = require('../dataModel/RoomList.js');
var Person = require('../dataModel/Person.js');
var RoomDispatch = require('../methodModel/RoomDispatch.js');
var GameControl = require('../methodModel/GameControl.js');
var DeckList = require('../CardData/DeckList.js');
var Dumper = require('../methodModel/Dumper.js');

var roomList = RoomList.createNew();
// var roomList = new RoomList();

var personCount = 0;
function sockets(io) {
    io.on('connection', function(socket) {
        console.log('is Connected');
        
        socket.on('add user', function(name) {
            let roomId;
            socket.personName = name;
            let person = Person.createNew(personCount++, 2, name, 100, DeckList.createNew()[0]);
            [roomList, roomId] = RoomDispatch(io, socket, roomList, person);
            if ( roomList.getRoomByName(roomId).getPersonList().length == 2 ) // 雙人對戰時，兩人開始
                GameControl.gameStart(io, socket, roomId, roomList);
        });

        // socket.on('game start', function(roomId) {
        //     console.log('Game start');
        //     GameControl.gameStart(io, socket, roomId, roomList);
        // });

        socket.on('play card', function(gameInfo) {
            GameControl.playCard(io, socket, gameInfo, roomList);
        }) ;

        // left
        socket.on('disconnect', function() {
            let name = socket.personName;
            let roomlist = roomList.personLeft(name);
            let roomId = socket.roomId;
            console.log(roomId, name + " left.");
            socket.to(roomId).emit('user left', {roomId: roomId, name: name});
        });
    });
}



module.exports = sockets;