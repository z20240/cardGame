var Constant = require('../../dataModel/Constant.js');


class PVP {
    constructor() {
    }

    checkGameStart(playerNum) {
        return (playerNum >= 2) ? true : false ;
    }
}

module.exports = PVP;