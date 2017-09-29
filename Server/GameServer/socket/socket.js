var roomControl = require('../gameControl/roomControl.js');

var roomControl = new roomControl();

function game(io) {
    io.on('connection', (socket) => {
        console.log('is Connected');

        // user in
        socket.on('add user', (playerInfo) => {
            playerControl.getUser(socket, io, playerInfo.name, playerInfo.uid);
            roomControl.addUser(socket, io, name, personCount);
        });

        // playcard
        socket.on('play card', (gameInfo) => {
            roomControl.playCard(socket, io, gameInfo)
        }) ;

        // left
        socket.on('disconnect', () => {
            roomControl.userDisconnect(socket, io)
        });
    });
}

module.exports = game;