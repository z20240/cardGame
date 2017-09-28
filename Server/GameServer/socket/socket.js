var PlayerControl = require('../gameControl/playerControl.js');

var playerControl = new PlayerControl();
var personCount = 0;

function game(io) {
    io.on('connection', (socket) => {
        console.log('is Connected');
        
        // user in
        socket.on('add user', (name) => {
            personCount++;
            playerControl.addUser(socket, io, name, personCount);
        });

        // playcard
        socket.on('play card', (gameInfo) => {
            playerControl.playCard(socket, io, gameInfo)
        }) ;

        // left
        socket.on('disconnect', () => {
            playerControl.userDisconnect(socket, io)
        });
    });
}

module.exports = game;