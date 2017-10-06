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
    console.log("[ == 檢查費用 ==]");
    console.log("卡片:"+player.hand[idx].name, " 玩家cost:", cost, " 卡片cost:", player.hand[idx].cost);
    if (player.hand[idx].cost > cost)
        return { roomId : roomId, user : [player, enemy] } ;

    // 1-1. 檢查若為ＮＰＣ，是否可召喚
    if (player.hand[idx].type == Constant.CARD_TYPE.NPC) {
        if (getSummonPlace(player, player.hand[idx]) < 0)
            return { roomId : roomId, user : [player, enemy] };
    }

    // 2-0. 扣費、出牌
    player.showCard = card = player.hand[idx];
    player.cost -= card.cost;
    player.hand[idx] = null;

    // 2-1. 出牌處理效果(之後做 call method)

    // 2-2. npc自動攻擊
    console.log("[ == npc自動攻擊] ==");
    [player, enemy] = playerNPCattack(player, enemy, enemyDef);

    // 3. 判斷卡片種類，如果是 npc 就放置場上，其他則丟入 stacks
    if (player.showCard.type == Constant.CARD_TYPE.NPC) {
        player = monsterSummon(player, card);
    } else {
        [player, enemy] = dealDamage(player, enemy, card, enemyDef);

        player.grave.push(player.showCard); // 卡片放入墓的
    }

    // 獲得卡片防禦力
    player.cardDef += card.def;

    // 對方防禦回復
    enemy.cardDef = 0;

    // 5. 補牌
    console.log('[補牌] pre 牌組數量', player.deck.cards.length);
    player.hand[idx] = player.deck.draw();
    console.log('[補牌] post 牌組數量', player.deck.cards.length);

    // 6. 若有 showCard 則清空
    if (player.showCard != null)
        player.showCard = null;

    // 7. 將血量歸零的ＮＰＣ送回牌組
    console.log("[怪物堆數量]", player.field.length);
    for (let i = 0 ; i < player.field.length ; i++) {
        if (player.field[i] == null)
            continue;
        console.log("["+i+"]", player.field[i].name, " hp:"+player.field[i].cost);
        if (player.field[i].cost <= 0) {
            player = shuffleCardBack2Deck(player, player.field[i], i);
            player.field[i] = null;
            player.fieldDist -= parseInt(Math.pow(2,i));
        }
    }

    console.log("＝＝＝ [計算結束] ＝＝＝");
    console.log("玩家：", player);
    console.log("敵方：", enemy);
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

function dealDamage(player, enemy, card, enemyDef) {
    // 4-1. 處理傷害 (call method)
    let dmg = calcardDmg(player, card, enemyDef);

    // 噴牌
    enemy = dealDamage_ack(enemy, dmg);
    return [player, enemy];
}

function dealDamage_ack(person, dmg) {
    for(let i = 0 ; i < dmg ; i++) { // 噴牌
        person.grave.push(person.deck.draw());
    }
    return person;
}

function monsterSummon(player, card) {
    let idx = getSummonPlace(player, card);

    console.log(' == [NPC 召喚] 位置', idx, ' ＮＰＣ 名稱:', card.name);

    // 召喚 ＮＰＣ
    player = monsterSummon_ack(player, card, idx);
    console.log("==========召喚完後,玩家狀態========");
    console.log(player);

    return player;
}

function monsterSummon_ack(player, card, idx) {
    console.log("    [開始NPC召喚] 位置", idx);
    if (idx > 2) return player;

    player.field[idx] = card;
    player.fieldDist += parseInt(Math.pow(2,idx));
    return player;
}

function playerNPCattack(player, enemy, enemyDef) {
    console.log("[ == NPC 攻擊] ==");
    for (let i = 0 ; i < player.field.length ; i++) {
        if (player.field[i] == null)
            continue;
        [player, enemy] = dealDamage(player, enemy, player.field[i], enemyDef);
        player.field[i].cost--; // 生命值減1
    }
    return [player, enemy];
}

function shuffleCardBack2Deck(player, card) {
    player.deck.insert(card);
    player.deck.shuffle();
    return player;
}

function getSummonPlace(player, card) {
    let val = 0;

    console.log('取得召喚位置 ＮＰＣ分佈 :', player.fieldDist);

    if (player.fieldDist < 4) return 2; // 001 010 011
    else if (player.fieldDist < 6) return 1; // 100 101
    else if (player.fieldDist < 7) return 0; // 110
    else return -1; // 111
}



module.exports = GameLogic;