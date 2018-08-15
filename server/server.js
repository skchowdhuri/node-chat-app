const path=require('path');
const express=require('express');

//SOCKET IO
const http=require('http');
const socketIO=require('socket.io');
const server=http.createServer();
const io=socketIO(server);
io.on('connection',function(client){
    console.log('New user connected');
});

const port=process.env.PORT || 3000;

var publicDir=path.join(__dirname, '../public');
var app=express();
app.use(express.static(publicDir));

server.listen(port,()=>{
    console.log(`server is up on ${port}`);
})