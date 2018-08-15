const path=require('path');
const express=require('express');

const port=process.env.PORT || 3000;

var publicDir=path.join(__dirname, '../public');
var app=express();
app.use(express.static(publicDir));

app.listen(port,()=>{
    console.log(`server is up on ${port}`);
})