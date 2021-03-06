const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public' );
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
//websocket server
var io = socketIO(server);

//middleware
app.use(express.static(publicPath));

//listener for user connection
io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
      io.emit('newMessage', generateMessage(message.from, message.text));
  });


  socket.on('disconnect', () => {
    console.log('New user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
