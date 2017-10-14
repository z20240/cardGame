var Constant = require('../../dataModel/Constant.js');


class Draft {
    constructor() {
    }

    checkGameStart(playerNum) {
        return (playerNum >= 4) ? true : false ;
    }
}

module.exports = Draft;