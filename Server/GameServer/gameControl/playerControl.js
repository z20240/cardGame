var Constant = require('../dataModel/Constant.js');
var RoomList = require('../dataModel/RoomList.js');
var Person = require('../dataModel/Person.js');
var GameControl = require('../methodModel/GameControl.js');
var DeckList = require('../CardData/DeckList.js');
var Dumper = require('../tool/Dumper.js');

class PlayerControl {
    getUser(uid, name) {
        let player = new Person(uid,  name, Constant.JOB.SPELLER, 100, new DeckList()[0]);
        return player;
    }

    playCard(socket, io, gameInfo, room) {
        let gameObj = GameControl.playCard(gameInfo, room);
        io.in(gameInfo.roomId).emit('player show card', gameObj);
    }
}


module.exports = PlayerControl;