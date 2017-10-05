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

    // 2-0. 扣費、出牌
    player.showCard = card = player.hand[idx];
    player.cost -= card.cost;
    player.hand[idx] = null;

    // 2-1. 出牌處理效果(之後做 call method)

    // 3. 判斷卡片種類，如果是 npc 就放置場上，其他則丟入 stacks
    if (player.showCard.type == Constant.CARD_TYPE.NPC) {
        // 若沒有位置則不召喚
        let idx = getSummonPlace(card, player);

        if (idx < 0) { // 無處可召喚
            player.showCard = null;
            return { roomId : roomId, user : [player, enemy] } ;
        }

        // 喚醒所有的召喚獸
        player.field.forEach(mob => { awakeMonster(mob); }, this);

        // 召喚 ＮＰＣ
        monsterSummon(player, card, idx)
    } else {
        // 4-1. 處理傷害 (call method)
        dmg = calcardDmg(player, card, enemyDef);

        // 噴牌
        enemy = dealDamage(enemy, dmg);

        // 4-2. 獲得卡片防禦力
        player.cardDef += card.def;

        // 卡片放入墓的
        player.grave.push(player.showCard);
    }

    // 對方防禦回復
    enemy.cardDef = 0;

    // 5. 補牌
    player.hand[idx] = player.deck.draw();

    // 6. 若有 showCard 則清空
    if (player.showCard != null)
        player.showCard = null;

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
            return val;
    }
}

function dealDamage(person, dmg) {
    for(let i = 0 ; i < dmg ; i++) { // 噴牌
        person.grave.push(person.deck.draw());
    }
    return person;
}

function monsterSummon(player, card, idx) {
    if (idx > 2) return;

    card.sleep = true;
    player.field[idx] = card;
    player.fieldDist += parseInt(Math.pow(2,idx));
}

function getSummonPlace(card, player) {
    let val = 0;
    if (player.fieldDist < 4) return 2; // 001 010 011
    else if (player.fieldDist < 6) return 1; // 100 101
    else if (player.fieldDist < 7) return 0; // 110
    else return -1; // 111
}

function awakeMonster(mob) {
    if (!mob) return;
    console.log("mob", mob);
    mob.sleep = false;
}
module.exports = GameLogic;