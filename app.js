
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
users = [];
connections = [] ;
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  connections.push(socket);
  console.log('Connected : %s sockets connected',connections.length);
  socket.on('disconnect', function(){
  connections.splice(connections.indexOf(socket),1);
  console.log('Disconnected : %s sockets left',connections.length);
  });
});


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});