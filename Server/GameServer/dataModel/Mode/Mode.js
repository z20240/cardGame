var Constant = require('../../dataModel/Constant.js');
const chalk = require('chalk');
var PVE = require('./PVE');
var Dreft = require('./Draft');
var PVP = require('./PVP');

var Mode = {
    get(mode) {
        switch(mode) {
            case Constant.BATTLE_MODE.PVE :
                return new PVE();
            case Constant.BATTLE_MODE.DRAFT :
                return new Dreft();
            case Constant.BATTLE_MODE.PVP : default :
                return new PVP();
        }
    },
}

module.exports = Mode;