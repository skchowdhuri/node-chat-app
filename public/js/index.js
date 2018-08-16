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
socket.emit('createMeassage',{
    name: 'Sagor Serv',
    email: 'ss@gmail.com'
});
socket.on('newMessage',(message)=>{
    console.log('Message', message);
})
