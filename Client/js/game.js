const MAX_COST = 10;
var cost = 0;
$(function() {
    let name = randomName();
    let enemy = "";
    name = prompt("請輸入暱稱", name);

    if(name=="" || name==null){
        name = randomName();
    }

    console.log(name);

    // 告訴 server 玩家進入了
    socket.emit("add user", name);

    $('#you').text(name); // 你的名字

    socket.on('add user',function(data){
        $('#enemyPlayer').text(enemy);
        console.log("add user", data);
        if (data.user[0].name == name) {enemy = (typeof(data.user[1]) !== "undefined" ? data.user[1].name : "") ;}
        else {enemy = data.user[0].name;}
        
        if (data.user.length == 2) { // 雙人模式時
            socket.emit("game start", data);
        }

    });

    socket.on('user left', function(data) {
        console.log("user left", data);
        if ($('#enemyPlayer').text() == data.name) $('#enemyPlayer').text("");
    });

    setInterval("DoCostCounter()", 2500);    
});




function DoCostCounter() {
    cost++;
    console.log("cost", cost);
    let persentCost = parseInt(cost*100/MAX_COST);
    $(".progress-bar").css('width', persentCost + '%').attr('aria-valuenow', cost);
}

function randomName() {
    let charater = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9"];
    let name = "";
    for (let i = 0 ; i < 6 ; i++) {
        name += charater[Math.floor(Math.random() * (charater.length))];
    }
    return name;
}