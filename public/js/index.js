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
    var formatttedTime=moment(message.createdAt).format('h:mm a');
    console.log('Message', message);
    var li=$('<li></li>');
    li.text(`${message.from} (${formatttedTime}) : ${message.text}`);
    $('#message').append(li);
});
socket.on('newLocationMessage', (message)=>{
    var formatttedTime=moment(message.createdAt).format('h:mm a')
    var li=$('<li></li>');
    var a=$('<a target="_blank">My Current Location</a>');
    li.text(`${message.from} (${formatttedTime}) : `);
    a.attr('href', message.url);
    li.append(a);
    $('#message').append(li);
})

$( "#message-form" ).submit(function( event ) {
    event.preventDefault();
    var messageTextBox= $('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(){
       messageTextBox.val('');
    });
});

var locationButton=$('#send-location');

locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation not found');
    }
    locationButton.attr('disabled', 'disabled').text('Sending Location....');
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send Location');
        console.log(position);
        var crd=position.coords;
        socket.emit('sendLocationInfo',{
            lat: crd.latitude,
            lng: crd.longitude
        });
    }, function(){
        alert('Unable to fetch location info');
        locationButton.removeAttr('disabled').text('Send Location');
    });
});
