var Constant = require('../dataModel/Constant.js');
var Dumper = require('../tool/Dumper.js');

class Mode {
    constructor() {
    }

    static checkGameStart(playerNum, mode) {
        switch(mode) {
            case Constant.BATTLE_MODE.PVE :
                return (playerNum == 1) ? true : false ;
            case Constant.BATTLE_MODE.DRAFT :
                return (playerNum >= 4) ? true : false ;
            case Constant.BATTLE_MODE.PVP : default :
                return (playerNum == 2) ? true : false ;
        }
    }

}

module.exports = Mode;