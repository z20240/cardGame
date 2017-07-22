var Constant = require('../dataModel/Constant.js');
var Dumper = require('../methodModel/Dumper.js');

var RoomDispatch = function(io, socket, roomList, person) {
    /* 進行配對，給予房間編號 */
    let roomInfo;
    console.log("roomList:", roomList);
    if (roomList.isFull()) { // 所有房間都滿了就要開新房間
        roomInfo = NewRoom(roomList);       
        console.log("Create Room" + roomInfo.roomId);
    } else { // 加入房間
        roomInfo = JoinRoom(roomList);
        console.log("Join room" + roomInfo.roomId);
    }

    socket.roomId = roomInfo.roomId;
    
    console.log("[Room]", Dumper(roomInfo.room, 4));
    roomInfo.room.personList.push(person);
    socket.join(roomInfo.roomId);
    io.in(roomInfo.roomId).emit('add user', {user: roomInfo.room.personList, roomId: roomInfo.roomId});
    return [roomList, roomInfo.roomId];
}

var NewRoom = function(roomList) {
    let roomId = roomList.roomlist.length+1;
    let room = roomList.newRoom(Constant.BATTLE_MODE.PVP, roomId);
    return {room: room, roomId: roomId};
}

var JoinRoom = function(roomList) {
    let room = roomList.getAvailableRoom();
    let roomId = room.id;
    return {room: room, roomId: roomId};
}

module.exports = RoomDispatch;