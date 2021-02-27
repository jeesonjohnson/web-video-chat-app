const express = require('express');     //import express
const http = require('http');
const socket = require('socket.io');
require('dotenv').config()          //using .env file

var app = express();
const server = http.createServer(app);
const io = socket(server);
var id=234234234243;          //It would be your meeting id

app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', (req, res)=>{
    res.render('call', {callID:id});
    
})


io.on('connection', socketio =>{
    socketio.on('join-room', (callID, user, id)=>{
        // console.log(callID, user)
        socketio.join(callID)
        socketio.emit('message', {
        user: null,
        id: id,
        message: `Hi ${user}, Welcome to ByteCall`
        });    //Welcome message for us
        socketio.to(callID).broadcast.emit('connected-user',{
            user: user,
            id: id,
            message: `${user} joined the meeting!`
        })
        socketio.on('chatting',msg =>{
        // console.log(msg)
            io.to(callID).emit('message', msg);
        })
        socketio.on('disconnect', ()=>{
            io.to(callID).emit('disconnect-user', {
                user: user,
                id: id,
                message: `${user} just disconnected!`
        })
    })

    })



})


const PORT = process.env.PORT || 3000;   //server run port
server.listen(PORT, 
    ()=>{
        console.log(`Server started at: http://127.0.0.1:${PORT}`);
    })