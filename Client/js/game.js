const MAX_COST = 10;
var g_gameObj;

$(function() {
    let playerName = randomName();
    let job = getJob();
    let enemy = "";
    playerName = prompt("請輸入暱稱", playerName);

    if(playerName == "" || playerName==null){
        playerName = randomName();
    }

    console.log("playerName", playerName);

    // 告訴 server 玩家進入了
    socket.emit("add user", playerName);

    $('#you').text(playerName); // 你的名字

    socket.on('add user',function(data){
        initUserConfiguration(data);
    });

    socket.on('cost timer', function() {
        socket.emit('cost timer', {roomId : g_gameObj.roomId, user : [g_gameObj.user[0].id, g_gameObj.user[1].id]});
    });

    socket.on('add timer', function(data) {
        g_gameObj = data;
        let playerlist = getPlayerPos(g_gameObj);
        console.log('add timer', playerlist.player, playerlist.enemy);
        drawGround(playerlist.player, playerlist.enemy);
    });

    socket.on('player show card', function(data) {
        console.log("player show card", data);
        g_gameObj = data;
        let playerlist = getPlayerPos(data);
        drawGround(playerlist.player, playerlist.enemy);
    });

    socket.on('user left', function(data) {
        console.log("user left", data);
        if ($('#enemyPlayer').text() == data.name) {$('#enemyPlayer').text("");}
    });        
});


// 玩家入場時的初始設定
function initUserConfiguration(data) {
    let playerlist = getPlayerPos(data);
    let you = playerlist.player;
    let enemy = playerlist.enemy
    let enemyName = "";

    console.log("add user", data);
    enemyName = (playerlist.enemy != null ? enemy.name : "");

    $('#enemyPlayer').text(enemyName);

    if (data.user.length == 2) { // 雙人模式時
        ;
        // socket.emit("game start", data);
        socket.emit("game start", data.roomId);
        g_gameObj = data;
        drawGround(you, enemy);
    }
}


$('#handcard1').click(function() {
    let data = g_gameObj;
    // console.log("g_gameObj", g_gameObj);
    let playerlist = getPlayerPos(data);
    socket.emit("play card", { roomId : data.roomId, playerId : playerlist.player.id, enemyId : playerlist.enemy.id, handIdx : 0 });
    // playCard(playerlist.player, playerlist.enemy, 0);
    return;
});
$('#handcard2').click(function() {
    let data = g_gameObj;
    console.log("g_gameObj", g_gameObj);
    let playerlist = getPlayerPos(data);
    socket.emit("play card", { roomId : data.roomId, playerId : playerlist.player.id, enemyId : playerlist.enemy.id, handIdx : 1 });
    // playCard(playerlist.player, playerlist.enemy, 1);
    return;
});
$('#handcard3').click(function() {
    let data = g_gameObj;
    console.log("g_gameObj", g_gameObj);
    let playerlist = getPlayerPos(data);
    socket.emit("play card", { roomId : data.roomId, playerId : playerlist.player.id, enemyId : playerlist.enemy.id, handIdx : 2 });
    // playCard(playerlist.player, playerlist.enemy, 2);
    return;
});


function getPlayerPos(data) {
    let playerName = $('#you').text();
    console.log("playerName", playerName);
    if (typeof(data.user[1]) === 'undefined') {
        return { player: data.user[0], enemy: null};
    } else if (data.user[0].name == playerName) {
        return { player: data.user[0], enemy: data.user[1] };
    } else {
        return { player: data.user[1], enemy: data.user[0] };
    }
} 


function randomName() {
    let charater = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9"];
    let name = "";
    for (let i = 0 ; i < 6 ; i++) {
        name += charater[Math.floor(Math.random() * (charater.length))];
    }
    return name;
}


function getJob() {
    return 1; // worrior
}


function drawGround(player, enemy) {
    if (typeof(player) == 'undefined' || typeof(enemy) == 'undefined') // 雙人模式
        return ;

    $('#hand_name1').text(player.hand[0].name);
    $('#hand_name2').text(player.hand[1].name);
    $('#hand_name3').text(player.hand[2].name);

    $('#hand_cost1').text(player.hand[0].cost);
    $('#hand_cost2').text(player.hand[1].cost);
    $('#hand_cost3').text(player.hand[1].cost);
    
    $('#hand_atk1').text(player.hand[0].atk);
    $('#hand_atk2').text(player.hand[1].atk);
    $('#hand_atk3').text(player.hand[2].atk);

    $('#hand_def1').text(player.hand[0].def);
    $('#hand_def2').text(player.hand[1].def);
    $('#hand_def3').text(player.hand[2].def);

    let persentCost = parseInt(player.cost*100/MAX_COST);
    $(".progress-bar").css('width', persentCost + '%').attr('aria-valuenow', player.cost);


    $('#playerAtk').text(player.atk);
    $('#playerMatk').text(player.matk);
    $('#playerDef').text(player.def);
    $('#playerCardAtk').text(player.cardDmg);
    $('#playerCardDef').text(player.cardDef);

    $('#playerDeckSize').text(player.deck.cards.length);
    $('#playerBanishSize').text(player.banishlength);
    $('#playerGraveSize').text(player.grave.length);


    $('#enemyAtk').text(enemy.atk);
    $('#enemyMatk').text(enemy.matk);
    $('#enemyDef').text(enemy.def);
    $('#enemyCardAtk').text(enemy.cardDmg);
    $('#enemyCardDef').text(enemy.cardDef);

    $('#enemyDeckSize').text(enemy.deck.cards.length);
    $('#enemyBanishSize').text(enemy.banish.length);
    $('#enemyGraveSize').text(enemy.grave.length);
    
}