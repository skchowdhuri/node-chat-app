const path=require('path');
const express=require('express');

//SOCKET IO
const http=require('http');
const socketIO=require('socket.io');

const port=process.env.PORT || 3000;

var publicDir=path.join(__dirname, '../public');
var app=express();
const server=http.createServer(app);
const io=socketIO(server);
app.use(express.static(publicDir));

io.on('connection',(socket)=>{
    console.log('New user connected');
    socket.on('disconnect', function(){
        console.log('User Disconnected');
    });
    socket.emit('newEmail',{
        name: 'Sagor',
        email: 'hh@gmail.com'
    });
    socket.on('createMeassage',(message)=>{
        console.log('message',message);
        io.emit('newMessage',{
            name: 'Sagor',
            message:'Hy! whats upp!!',
            createdAt: new Date().getTime()
        })
    });
});
server.listen(port,()=>{
    console.log(`server is up on ${port}`);
});