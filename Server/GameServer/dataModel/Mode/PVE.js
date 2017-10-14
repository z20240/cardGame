var Constant = require('../../dataModel/Constant.js');

class PVE {
    constructor() {
    }

    checkGameStart(playerNum) {
        return (playerNum >= 1) ? true : false ;
    }
}

module.exports = PVE;