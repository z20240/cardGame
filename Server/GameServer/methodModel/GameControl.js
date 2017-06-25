var Constant = require('../dataModel/Constant.js');
var Dumper = require('../methodModel/Dumper.js');

const MAX_COST = 10;

var GameControl = {
    gameStart : function(io, socket, roomId, roomList) {
        let room = roomList.getRoomByName(roomId);
        console.log('In game control');
        // 開始計費
        setInterval(doCostCounter, 2500, io, socket, {roomId: roomId, user: room.getPersonList()});
    },

    counter : function(io, socket, gameInfo, roomList) {
        let gameObj = doCountTimer(gameInfo, roomList);
        socket.in(gameInfo.roomId).emit('add timer', gameObj);
    },

    playCard : function(io, socket, gameInfo, roomList) {
        let room = roomList.getRoomByName(gameInfo.roomId);
        let player = room.getPersonById(gameInfo.playerId);
        let enemy = room.getPersonById(gameInfo.enemyId);
        let handIdx = gameInfo.handIdx;
        let gameObj = playCard(room, player, enemy, handIdx);
        io.in(gameInfo.roomId).emit('player show card', gameObj);
    }
}

function doCostCounter(io, socket, gameRoom) {
    socket.in(gameRoom.roomId).emit('cost timer');
    return;
}


function doCountTimer(gameInfo, roomList) {
    let room = roomList.getRoomByName(gameInfo.roomId);
    let player = room.getPersonById(gameInfo.user[0]);
    let enemy = room.getPersonById(gameInfo.user[1]);
    player.cost = Math.min((player.cost+1), MAX_COST);
    enemy.cost = Math.min((enemy.cost+1), MAX_COST);
    // console.log("player", player);
    // console.log("enemy", enemy);
    return { roomId : gameInfo.roomId, user : [player, enemy] };
}


// 玩家出牌
function playCard(room, player, enemy, idx) {
    let cost = player.getCost();
    let roomId = room.getName();
    let card = "";
    console.log("player", player);
    console.log( "enemy", enemy);

    let enemyDef = enemy.getDef() + enemy.getCardDef();
    let dmg = 0;
    // 1. 檢查費用夠不夠，不夠就直接 return;
    if (player.hand[idx].cost > cost)
        return { roomId : roomId, user : [player, enemy] } ;

    // 2. 扣費、出牌
    card = player.hand[idx];
    player.cost -= card.cost;
    player.grave.push(card);
    player.hand[idx] = null;

    // 3. 出牌處理效果(之後做 call method)

    // 4. 處理傷害 (call method)
    dmg = calcardDmg(player, card, enemyDef);

    for(let i = 0 ; i < dmg ; i++) { // 噴牌
        enemy.grave.push(enemy.deck.draw());
        // enemy.grave.push(enemy.deck.cards.pop());
    }

    // 對方防禦回復
    enemy.cardDef = 0;

    // 5. 補牌
    player.hand[idx] = player.deck.draw();
    // player.hand[idx] = player.deck.cards.pop();

    return { roomId : roomId, user : [player, enemy] } ;
}


function calcardDmg(player, card, enemyDef) {
    switch(card.type) {
        case Constant.CARD_TYPE.WHITE_MAGIC :
        case Constant.CARD_TYPE.BLACK_MAGIC :
            return (player.matk + card.atk + player.cardDmg) - enemyDef;
        case Constant.CARD_TYPE.MELLEE :
        case Constant.CARD_TYPE.RANGE :
            return (player.atk + card.atk + player.cardDmg) - enemyDef;
        default:
        case Constant.CARD_TYPE.POISON :
        case Constant.CARD_TYPE.NPC :
        case Constant.CARD_TYPE.DECORATION :
            return (card.atk + player.cardDmg) - enemyDef;
    }
}

module.exports = GameControl;