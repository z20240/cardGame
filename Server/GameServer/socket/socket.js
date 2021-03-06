var RoomControl = require('../gameControl/roomControl.js');
var PlayerControl = require('../gameControl/playerControl.js');
var Mode = require('../dataModel/Mode/Mode.js');
const chalk = require('chalk');

var roomControl = new RoomControl();
var playerControl = new PlayerControl();

function game(io) {
    io.on('connection', (socket) => {
        console.log('is Connected');

        // user in
        socket.on('add user', (playerInfo) => {
            let uid, name, mode;
            [uid, name, mode] = [playerInfo.uid, playerInfo.name, playerInfo.mode];

            // 這部分之後由 lobby server 傳進來
            let player = playerControl.getUser(uid, name);
            let room = roomControl.addUser(socket, io, player);

            console.log("mode", room.mode);

            // 如果不人數不符合，不可開始
            if (!room.mode.checkGameStart(room.personList.length))
                return ;

            // 達成開始遊戲的門檻
            roomControl.gameStart(socket, io, room, mode);
        });

        // playcard
        socket.on('play card', (gameInfo) => {
            let room = roomControl.roomlist.getRoomById(gameInfo.roomId);
            playerControl.playCard(socket, io, gameInfo, room);
        }) ;

        // left
        socket.on('disconnect', () => {
            roomControl.userDisconnect(socket, io)
        });
    });
}

module.exports = game;