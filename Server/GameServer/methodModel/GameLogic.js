var Constant = require('../dataModel/Constant.js');
var Dumper = require('../tool/Dumper.js');

class GameLogic {
    static playCard(gameInfo, room) {
        let player = room.getPersonById(gameInfo.playerId);
        let enemy = room.getPersonById(gameInfo.enemyId);
        let handIdx = gameInfo.handIdx;
        let gameObj = playCard(room, player, enemy, handIdx);
        return gameObj;
    }
}

// 玩家出牌
function playCard(room, player, enemy, idx) {
    let cost, roomId, card, enemyDef, dmg;
    enemyDef = (enemy.def + enemy.cardDef);
    [roomId, card, dmg] = [room.id, null, 0];

    cost = player.cost;

    // 1. 檢查費用夠不夠，不夠就直接 return;
    console.log(idx, "  player_cost:", player.hand[idx].cost, " card_cost:", cost);
    if (player.hand[idx].cost > cost)
        return { roomId : roomId, user : [player, enemy] } ;

    // 2. 扣費、出牌
    card = player.hand[idx];
    player.cost -= card.cost;
    player.hand[idx] = null;

    // 2.1 判斷卡片種類，如果是 npc 就放置場上，其他則丟入 stacks
    player.showCard = card;

    // 召喚 ＮＰＣ
    if (player.showCard.type == Constant.CARD_TYPE.NPC) {
        if (!monsterSummon(card, player)) { // 若沒有位置則不召喚
            return { roomId : roomId, user : [player, enemy] } ;
        } else { // 召喚完成，將showCard清空
            player.showCard = null;
        }
    }

    // 3. 出牌處理效果(之後做 call method)

    // 4-1. 處理傷害 (call method)
    dmg = calcardDmg(player, card, enemyDef);
    for(let i = 0 ; i < dmg ; i++) { // 噴牌
        enemy.grave.push(enemy.deck.draw());
    }

    // 4-2. 獲得卡片防禦力
    player.cardDef += card.def;

    // 對方防禦回復
    enemy.cardDef = 0;

    // 5. 補牌
    player.hand[idx] = player.deck.draw();

    // 6. 若有 showCard 則清空
    if (player.showCard != null) {
        player.grave.push(player.showCard);
        player.showCard = null;
    }

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

function monsterSummon(card, player) {
    switch (player.fieldDist) {
    case 0 : // 000
    case 1 : // 001
    case 2 : // 010
    case 3 : // 011
        player.field[2] = card;
        player.fieldDist += 4;
        return 4;
    case 4 : // 100
    case 5 : // 101
        player.field[1] = card;
        player.fieldDist += 2;
        return 2;
    case 6 : // 110
        player.field[0] = card;
        player.fieldDist += 1;
        return 1;
    case 7 : // 111
        return 0;
    }
}
module.exports = GameLogic;