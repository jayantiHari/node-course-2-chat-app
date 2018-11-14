const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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

  socket.emit('newMessage', {
    from: 'Andrew',
    text: 'See you soon'
  });

  socket.on('createMessage', (input) => {
    console.log('createMessage', input);

  });


  socket.on('disconnect', () => {
    console.log('New user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
