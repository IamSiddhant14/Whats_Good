const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000 ;

const http = require('http').createServer(app);
app.use(express.static(__dirname+'/public'))

app.get('/' , (req,res) => {
   res.sendFile(__dirname+'/index.html' )
})

http.listen( PORT , () =>{
//    console.log(`Listening on Port ${PORT}`)
})

const io = require('socket.io')(http);
io.on('connection' , (socket) => {//This event trigger as soon as a socket connects to this server , here this socket is the current connected socket
    
    // console.log("Connected...");

    socket.on('message' , (msg) =>{
        socket.broadcast.emit('message' , msg);
    })
})
