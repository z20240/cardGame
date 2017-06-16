$(function() {
    $('#connectionDuel').click(function() {
        loadPage('game.html');
    })
});

function loadPage(page) {
    $('.index').load(page, function(){
        console.log("Load success :", page);
    });
}