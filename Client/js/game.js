const MAX_COST = 10;
var g_gameObj;
var g_yourName;

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
    g_yourName = playerName;

    socket.on('add user',function(data){
        initUserConfiguration(data);
    });

    socket.on('cost timer', function(data) {
        g_gameObj = data;
        let playerlist = getPlayerPos(g_gameObj);
        console.log('cost timer', playerlist.player, playerlist.enemy);
        drawGround(playerlist.player, playerlist.enemy);
    });

    socket.on('player show card', function(data) {
        console.log("player show card", data);
        g_gameObj = data;
        let playerlist = getPlayerPos(data);
        drawGround(playerlist.player, playerlist.enemy);

        if (playerlist.player._deck.length <= 0) {
            alert("you lose!");
        }

        if (playerlist.enemy._deck.length <= 0) {
            alert("you win!");
        }
    });

    socket.on('user left', function(data) {
        console.log("user left", data);
        if ($('#enemyPlayer').text() == data._name) {$('#enemyPlayer').text("");}
    });        
});


// 玩家入場時的初始設定
function initUserConfiguration(data) {
    let playerlist = getPlayerPos(data);
    let you = playerlist.player;
    let enemy = playerlist.enemy
    let enemyName = "";

    console.log("add user", data);
    enemyName = (playerlist.enemy != null ? enemy._name : "");

    $('#enemyPlayer').text(enemyName);

    if (data.user.length == 2) { // 雙人模式時
        drawGround(you, enemy);
    }
}


$('#handcard1').click(function() {
    let data = g_gameObj;
    // console.log("g_gameObj", g_gameObj);
    let playerlist = getPlayerPos(data);
    socket.emit("play card", { roomId : data.roomId, playerId : playerlist.player._id, enemyId : playerlist.enemy._id, handIdx : 0 });
    // playCard(playerlist.player, playerlist.enemy, 0);
    return;
});
$('#handcard2').click(function() {
    let data = g_gameObj;
    console.log("g_gameObj", g_gameObj);
    let playerlist = getPlayerPos(data);
    socket.emit("play card", { roomId : data.roomId, playerId : playerlist.player._id, enemyId : playerlist.enemy._id, handIdx : 1 });
    // playCard(playerlist.player, playerlist.enemy, 1);
    return;
});
$('#handcard3').click(function() {
    let data = g_gameObj;
    console.log("g_gameObj", g_gameObj);
    let playerlist = getPlayerPos(data);
    socket.emit("play card", { roomId : data.roomId, playerId : playerlist.player._id, enemyId : playerlist.enemy._id, handIdx : 2 });
    // playCard(playerlist.player, playerlist.enemy, 2);
    return;
});


function getPlayerPos(data) {
    // let playerName = $('#you').text();
    let playerName = g_yourName;
    console.log("playerName", playerName);
    if (typeof(data.user[1]) === 'undefined') {
        return { player: data.user[0], enemy: null};
    } else if (data.user[0]._name == playerName) {
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
    $('#you').text(player._name);

    $('#hand_name1').text(player._hand[0]._name);
    $('#hand_name2').text(player._hand[1]._name);
    $('#hand_name3').text(player._hand[2]._name);

    $('#hand_cost1').text(player._hand[0]._cost);
    $('#hand_cost2').text(player._hand[1]._cost);
    $('#hand_cost3').text(player._hand[2]._cost);
    
    $('#hand_atk1').text(player._hand[0]._atk);
    $('#hand_atk2').text(player._hand[1]._atk);
    $('#hand_atk3').text(player._hand[2]._atk);

    $('#hand_def1').text(player._hand[0]._def);
    $('#hand_def2').text(player._hand[1]._def);
    $('#hand_def3').text(player._hand[2]._def);


    let persentCost = parseInt(player._cost*100/MAX_COST);
    $(".progress-bar").css('width', persentCost + '%').attr('aria-valuenow', player._cost);


    $('#playerAtk').text(player._atk);
    $('#playerMatk').text(player._matk);
    $('#playerDef').text(player._def);
    $('#playerCardAtk').text(player._cardDmg);
    $('#playerCardDef').text(player._cardDef);

    $('#playerDeckSize').text(player._deck._cards.length);
    $('#playerBanishSize').text(player._banishlength);
    $('#playerGraveSize').text(player._grave.length);

    if (player._field[0] != null)
        $('#player_mob1').text(player._field[0]._name);
    if (player._field[1] != null)
        $('#player_mob2').text(player._field[1]._name);
    if (player._field[2] != null)
        $('#player_mob3').text(player._field[2]._name);

    if (enemy._field[0] != null)
        $('#enemy_mob1').text(enemy._field[0]._name);
    if (enemy._field[1] != null)
        $('#enemy_mob2').text(enemy._field[1]._name);
    if (enemy._field[2] != null)
        $('#enemy_mob3').text(enemy._field[2]._name);

    $('#enemyAtk').text(enemy._atk);
    $('#enemyMatk').text(enemy._matk);
    $('#enemyCardAtk').text(enemy._cardDmg);
    $('#enemyDef').text(enemy._def);
    $('#enemyCardDef').text(enemy._cardDef);

    $('#enemyDeckSize').text(enemy._deck._cards.length);
    $('#enemyBanishSize').text(enemy._banish.length);
    $('#enemyGraveSize').text(enemy._grave.length);

    $('#enemyPlayer').text(enemy._name);
    
}