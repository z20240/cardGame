$(function() {
    $('#connectionDuel').click(function() {
        loadPage('game.html');
    });
    
    $('#createCardDataBase').click(function() {
        createCardDataBase();
    });
    
});

function loadPage(page) {
    $('.index').load(page, function(){
        console.log("Load success :", page);
    });
}

function createCardDataBase() {
    let url = "http://127.0.0.1:3000/cardMethod";
    $.ajax({
        type : "GET",
        url  : url + "/importCardList",
        dataType: "json",
        success : function(res) { console.log("DONE!", res);},
        error :  function(err) { console.log("An error occur in importCardList error!", err);},

    });
}