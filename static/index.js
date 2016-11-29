$(function(e){
    console.log("Running");
    var socket = io.connect();
    var $messageForm = $('#chat-form');
    var $messageInput = $('#message-input');
    var $chatArea = $('#chat-area');
    var $myName = $("#my-name");
   
    $("#example")
        .popover({ title: 'Twitter Bootstrap Popover', content: "It's so simple to create a tooltop for my website!" })
        .blur(function () {
            $(this).popover('hide');
    });
    
    $messageForm.submit(function(e){
        e.preventDefault();
        console.log($myName.val());
        socket.emit('send message', { 
            "sender": $myName.val(),
            "text": $messageInput.val()
        });
    });

    socket.on('new message', function(data){
        if (document.getElementById('my-name').value == data.sender) {
            console.log("got the sender");
            $chatArea.append('<div class="msgBox bs-callout sent"><h4>'+data.sender+'</h4>'+data.text+'</div><br>');
        } else {
            console.log("cannot get the sender");
            $chatArea.append('<div class="msgBox bs-callout receive"><h4>'+data.sender+'</h4>'+data.text+'</div><br>');
        }
        $chatArea.animate({ scrollTop: $chatArea.prop("scrollHeight")}, 400);
    });
});