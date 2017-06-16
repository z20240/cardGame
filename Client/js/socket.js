var socket = io("http://127.0.0.1:3000/");
$(function() {
    $('#form-chat').submit(function(event) {
        var data = {
            username : $('#username').val(),
            message : $('#text-chat').val()
        };

        if (data.username !== '' && data.message !== '') {
            socket.emit('new message', data);
            $('#text-chat').val('');
        }
        event.preventDefault();
    });
    socket.on('chat message', function(msg) {
        var li = "<li><strong>"+ msg.username + " : </strong>"+ msg.message +"</li>" ;
        $('.chat-box').append(li);
        $('.chat-box').animate({scrollTop: $('.chat-box').prop('scrollHeight')}, 500);
    });
    socket.on('user add', function(msg) {
        var li = "<li><strong>"+ msg + "</strong></li>" ;
        $('.chat-box').append(li);
    });
});