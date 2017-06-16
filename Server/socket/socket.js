var Constant = require('../dataModel/Constant.js');
var RoomList = require('../dataModel/RoomList.js');
var Person = require('../dataModel/Person.js');
var roomList = RoomList.createNew();

var personCount = 0;
function sockets(io) {
    io.on('connection', function(socket) {
        console.log('is Connected');
        
        // io.emit('user add', "a pserson join");
        
        socket.on('add user', function(name) {
            socket.personName = name;
            let person = Person.createNew(personCount++, 2, name, 100);
            // console.log('test', name, person);
            /* 進行配對，給予房間編號 */
            if (roomList.isFull()) { // 所有房間都滿了就要開新房間
                let roomId = roomList.getRoomList().length+1;
                let room = roomList.newRoom(Constant.MODE.PVP, "Room"+roomId);
                socket.roomId = roomId;
                room.getPersonList().push(person);
                socket.join(roomId);
                io.in(roomId).emit('add user', {user: room.getPersonList(), person :person, roomId: roomId});
                console.log(name, "Create Room" + roomId, roomList);
            } else { // 加入房間
                let room = roomList.getAvailableRoom();
                let roomId = room.getId();
                socket.roomId = roomId;
                room.getPersonList().push(person);
                socket.join(roomId);
                io.in(roomId).emit('add user', {user: room.getPersonList(), person :person, roomId: roomId});
                console.log("Join room" + roomId, roomList);
                console.log("tsee", printPerson(roomList.getRoomList()));
            }
        });

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

function printPerson(roomlist) {
    for (let r = 0 ; r < roomlist.length ; r++) {
        console.log("Room " + r, roomlist[r].getPersonList());
    }
}

module.exports = sockets;