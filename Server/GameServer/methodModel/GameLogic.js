var Constant = require('../dataModel/Constant.js');
var Tool = require('../tool/Tool.js');
const chalk = require('chalk');

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
    if (player.hand[idx].cost > cost)
        return { roomId : roomId, user : [player, enemy] } ;

    console.log("[玩家] " + player.name + " 出牌 : " + player.hand[idx].name, " 消耗：" + cost, " 剩下：", player.hand[idx].cost);

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
    [player, enemy] = playerNPCattack(player, enemy, enemyDef);

    // 3. 判斷卡片種類，如果是 npc 就放置場上，其他則丟入 stacks
    if (player.showCard.type == Constant.CARD_TYPE.NPC) {
        player = monsterSummon(player, card);
        console.log(card.name, " 召喚成功 ", "攻擊力:", card.atk, "耐久值:", card.getState("hp"));
    } else {
        [player, enemy] = dealDamage(player, enemy, card, enemyDef);

        player.grave.push(player.showCard); // 卡片放入墓的
    }

    // 獲得卡片防禦力
    player.cardDef += card.def;
    console.log('[玩家 '+player.name+' 獲得卡片防禦力!] 防禦力來到 ',player.def + player.cardDef);

    // 對方防禦回復
    enemy.cardDef = 0;
    console.log('[對手 '+enemy.name+' 防禦歸零');

    // 5. 補牌
    player.hand[idx] = player.deck.draw();

    // 6. 若有 showCard 則清空
    if (player.showCard != null)
        player.showCard = null;

    // 7. 將血量歸零的ＮＰＣ送回牌組
    console.log("[怪物堆數量]", player.field.length);
    for (let i = 0 ; i < player.field.length ; i++) {
        if (player.field[i] == null)
            continue;

        console.log("[位置"+i+"的ＮＰＣ "+player.field[i].name+"] 耐久值剩下:"+player.field[i].getState("hp"));
        if (player.field[i].getState("hp") <= 0) {
            console.log('[位置'+i+'的ＮＰＣ: '+player.field[i].name+'] 耐久值到達上限，即將回到牌組');
            player = shuffleCardBack2Deck(player, player.field[i], i);
            player.field[i] = null;
            player.fieldDist -= parseInt(Math.pow(2,i));
        }
    }


    console.log("[玩家] ", player.name, "(牌組數量:"+player.deck.size+" 墓地數量:"+player.grave.length+" 除外區數量:"+player.banish.length+")");
    console.log("[玩家 場上 "+player.field.length+"] ｜ ", Tool.isEmpty(player.field[0]) ? "undefined" : player.field[0].name, " ｜ ",
                                Tool.isEmpty(player.field[1]) ? "undefined" : player.field[1].name, " ｜ ",
                                Tool.isEmpty(player.field[2]) ? "undefined" : player.field[2].name, " ｜");
    console.log("[玩家 場上 "+enemy.field.length+"] ｜ ", Tool.isEmpty(enemy.field[0]) ? "undefined" : enemy.field[0].name, " ｜ ",
                                Tool.isEmpty(enemy.field[1]) ? "undefined" : enemy.field[1].name, " ｜ ",
                                Tool.isEmpty(enemy.field[2]) ? "undefined" : enemy.field[2].name, " ｜");
    console.log("[對方] ", enemy.name, "(牌組數量:"+enemy.deck.size+" 墓地數量:"+enemy.grave.length+" 除外區數量:"+enemy.banish.length+")");
    console.log("\n＝＝＝ [計算結束] ＝＝＝\n");
    return { roomId : roomId, user : [player, enemy] } ;
}


function calcardDmg(player, card, enemyDef) {
    let val = 0;
    switch(card.type) {
        case Constant.CARD_TYPE.WHITE_MAGIC :
        case Constant.CARD_TYPE.BLACK_MAGIC :
            val = (player.matk + card.atk + player.cardDmg) - enemyDef;
            console.log('玩家 '+player.name + " (matk:"+ player.matk +") 使用" + card.name + " (matk:" + card.atk + ") " + "攻擊對手 (def:"+ enemyDef +") 造成傷害：", Math.max(0, val));
            return val;
        case Constant.CARD_TYPE.MELLEE :
        case Constant.CARD_TYPE.RANGE :
            val = (player.atk + card.atk + player.cardDmg) - enemyDef;
            console.log('玩家 '+player.name + " (atk:"+ player.atk +") 使用" + card.name + " (atk:" + card.atk + ") " + "攻擊對手 (def:"+ enemyDef +") 造成傷害：", Math.max(0, val));
            return val;
        default:
        case Constant.CARD_TYPE.POISON :
        case Constant.CARD_TYPE.NPC :
        case Constant.CARD_TYPE.DECORATION :
            val = (card.atk + player.cardDmg) - enemyDef;
            console.log('玩家 '+player.name + " 使用 「獨立卡片」" + card.name + "(" + card.atk + ")" + "攻擊對手("+ enemyDef +") 造成傷害：", Math.max(0, val));
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

    console.log('[搜尋 ', card.name,' 召喚位置]：', idx);

    // 召喚 ＮＰＣ
    player = monsterSummon_ack(player, card, idx);

    return player;
}

function monsterSummon_ack(player, card, idx) {
    console.log("    [開始召喚 "+card.name+"] 位置", idx , '...');
    if (idx > 2) return player;

    player.field[idx] = card;
    player.field[idx].setState("hp", card.cost);
    player.fieldDist += parseInt(Math.pow(2,idx));
    return player;
}

function playerNPCattack(player, enemy, enemyDef) {
    for (let i = 0 ; i < player.field.length ; i++) {
        if (player.field[i] == null)
            continue;

        [player, enemy] = dealDamage(player, enemy, player.field[i], enemyDef);
        player.field[i].addState("hp", -1); // 生命值減1
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

    // console.log('取得召喚位置 ＮＰＣ分佈 :', player.fieldDist);

    if (player.fieldDist < 4) return 2; // 001 010 011
    else if (player.fieldDist < 6) return 1; // 100 101
    else if (player.fieldDist < 7) return 0; // 110
    else return -1; // 111
}


module.exports = GameLogic;