const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A client has connected');

    socket.broadcast.emit('chat_message', {
        usuario: 'INFO',
        mensaje: 'A new user has connected'
    });

    socket.on('chat_message', (data) => {
        io.emit('chat_message', data);
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
