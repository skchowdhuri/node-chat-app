const path=require('path');
const express=require('express');

//SOCKET IO
const http=require('http');
const socketIO=require('socket.io');

//generalImport
var {generateMessage,generateLocationMessage}=require('./utils/message')

const port=process.env.PORT || 3000;

var publicDir=path.join(__dirname, '../public');
var app=express();
const server=http.createServer(app);
const io=socketIO(server);
app.use(express.static(publicDir));

io.on('connection',(socket)=>{

    //create at the time of connect
    socket.emit('newMessage', generateMessage('Admin', 'Welcome user from "Sagor"'));
    socket.broadcast.emit('newMessage',generateMessage('Admin','New user added'));
    console.log('New user connected');
    socket.emit('newEmail',{
        name: 'Sagor',
        email: 'hh@gmail.com'
    });
    socket.on('createMessage',(message)=>{
        console.log('message',message);
        io.emit('newMessage',generateMessage(message.from, message.text));
        //callback();
    });
    socket.on('disconnect', function(){
        console.log('User Disconnected');
    });
    socket.on('sendLocationInfo', (location)=>{
        io.emit('newLocationMessage', generateLocationMessage('Admin',location.lat,location.lng));
    })
});
server.listen(port,()=>{
    console.log(`server is up on ${port}`);
});