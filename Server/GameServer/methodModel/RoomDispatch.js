var Constant = require('../dataModel/Constant.js');
var Dumper = require('../methodModel/Dumper.js');

var RoomDispatch = function(io, socket, roomList, person) {
    // console.log('test', name, person);
    /* 進行配對，給予房間編號 */
    let roomInfo;
    if (roomList.isFull()) { // 所有房間都滿了就要開新房間
        roomInfo = NewRoom(roomList);       
        console.log("Create Room" + roomInfo.roomId);
    } else { // 加入房間
        roomInfo = JoinRoom(roomList);
        console.log("Join room" + roomInfo.roomId);
        // console.log("tsee", Dumper(roomList.getRoomList(), 4));
    }

    socket.roomId = roomInfo.roomId;
    
    console.log("[Room]", Dumper(roomInfo.room, 4));
    roomInfo.room.getPersonList().push(person);
    socket.join(roomInfo.roomId);
    io.in(roomInfo.roomId).emit('add user', {user: roomInfo.room.getPersonList(), roomId: roomInfo.roomId});
    return roomList;
}

var NewRoom = function(roomList) {
    let roomId = roomList.getRoomList().length+1;
    let room = roomList.newRoom(Constant.BATTLE_MODE.PVP, roomId);
    return {room: room, roomId: roomId};
}

var JoinRoom = function(roomList) {
    let room = roomList.getAvailableRoom();
    let roomId = room.getId();
    return {room: room, roomId: roomId};
}

module.exports = RoomDispatch;