var socket=io().connect('http://localhost:3000');
socket.on('connect',function(){
    console.log('Connected to server');
});
socket.on('disconnect', function(){
    console.log("client disconnected from server");
});
socket.on('newEmail',(email)=>{
    console.log(email);
});
// socket.emit('createMessage',{
//     from: 'Sagor Serv',
//     text: 'ss@gmail.com'
// });
socket.on('newMessage',(message)=>{
    console.log('Message', message);
    var li=$('<li></li>');
    li.text(`${message.from} : ${message.text}`);
    $('#message').append(li);
});

$( "#message-form" ).submit(function( event ) {
    event.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    });
});
