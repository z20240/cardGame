var Constant = require('../dataModel/Constant.js');
var Dumper = require('../methodModel/Dumper.js');

const MAX_COST = 10;

var GameControl = {
    gameStart : function(io, socket, roomId, roomList) {
        let room = roomList.getRoomByName(roomId);
        console.log('In game control');
        // 開始計費
        setInterval(doCountTimer, 2500, io, socket, roomId, roomList);
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

function doCountTimer(io, socket, roomId, roomList) {
    let str;
    let room = roomList.getRoomByName(roomId);
    for (let i = 0 ; i < room.getPersonList().length ; i++) {
        room.getPersonList()[i].cost = Math.min((room.getPersonList()[i].cost+1), MAX_COST);
        str += ("player_" + i + " : " + room.getPersonList()[i].cost + "    ");
    }
    console.log(str);
    io.in(roomId).emit('cost timer', {user: room.getPersonList(), roomId: roomId});
    return { roomId : roomId, user : room.getPersonList() };
}


// 玩家出牌
function playCard(room, player, enemy, idx) {
    let cost = player.getCost();
    let roomId = room.getName();
    let card = null;
    // console.log("player", player);
    // console.log( "enemy", enemy);

    let enemyDef = enemy.getDef() + enemy.getCardDef();
    let dmg = 0;
    // 1. 檢查費用夠不夠，不夠就直接 return;
    console.log(idx, "  player_cost:", player.hand[idx].cost, " card_cost:", cost);
    if (player.hand[idx].cost > cost)
        return { roomId : roomId, user : [player, enemy] } ;

    // 2. 扣費、出牌
    card = player.hand[idx];
    player.cost -= card.cost;
    player.grave.push(card);
    player.hand[idx] = null;

    // 3. 出牌處理效果(之後做 call method)

    // 4-1. 處理傷害 (call method)
    dmg = calcardDmg(player, card, enemyDef);

    for(let i = 0 ; i < dmg ; i++) { // 噴牌
        enemy.grave.push(enemy.deck.draw());
        // enemy.grave.push(enemy.deck.cards.pop());
    }

    // 4-2. 獲得卡片防禦力
    player.cardDef += card.def;

    // 對方防禦回復
    enemy.cardDef = 0;

    // 5. 補牌
    player.hand[idx] = player.deck.draw();
    // player.hand[idx] = player.deck.cards.pop();

    return { roomId : roomId, user : [player, enemy] } ;
}


function calcardDmg(player, card, enemyDef) {
    let val = 0;
    switch(card.type) {
        case Constant.CARD_TYPE.WHITE_MAGIC :
        case Constant.CARD_TYPE.BLACK_MAGIC :
            val = (player.matk + card.atk + player.cardDmg) - enemyDef;
            console.log("(player_matk)" + player.matk + " + (card_atk)" + card.atk + " - (enemyDef)" + enemyDef + " = " + val);
            return val;
        case Constant.CARD_TYPE.MELLEE :
        case Constant.CARD_TYPE.RANGE :
            val = (player.atk + card.atk + player.cardDmg) - enemyDef;
            console.log("(player_atk)" + player.atk + " + (card_atk)" + card.atk + " - (enemyDef)" + enemyDef + " = " + val);
            return val;
        default:
        case Constant.CARD_TYPE.POISON :
        case Constant.CARD_TYPE.NPC :
        case Constant.CARD_TYPE.DECORATION :
            val = (card.atk + player.cardDmg) - enemyDef;
            console.log("(card_atk)" + card.atk + " - (enemyDef)" + enemyDef + " = " + val);
            return ;
    }
}

module.exports = GameControl;