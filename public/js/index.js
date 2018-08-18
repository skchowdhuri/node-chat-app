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
socket.on('newLocationMessage', (message)=>{
    var li=$('<li></li>');
    var a=$('<a target="_blank">My Current Location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#message').append(li);
})

$( "#message-form" ).submit(function( event ) {
    event.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    });
});

var locationButton=$('#send-location');

locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation not found');
    }
    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        var crd=position.coords;
        socket.emit('sendLocationInfo',{
            lat: crd.latitude,
            lng: crd.longitude
        });
    }, function(){
        alert('Unable to fetch location info');
    });
});
