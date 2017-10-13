var Constant = require('../dataModel/Constant.js');
var Tool = require('../tool/Tool.js');

var RoomDispatch = function(roomList, mode, player) {
    /* 進行配對，給予房間編號 */
    let room;

    console.log("roomList:", roomList);

    // 所有房間都滿了就要開新房間
    if (roomList.isFull()) {
        room = roomList.newRoom(mode, roomList.getRoomNumber()+1);
        console.log("Create Room" + room.id);
    } else { // 取得適合的房間
        room = roomList.getAvailableRoom();
        console.log("Join room" + room.id);
    }

    player.roomid = room.id;
    player.room = room; // 玩家所屬房間
    room.personList.push(player); // 加入房間
    console.log("[Room]", Tool.dumper(room, 4));
    return room;
}

module.exports = RoomDispatch;