var express = require('express');
var app = express();

app.use('/static', express.static(__dirname + '/static')); 

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var users = [];
var connections = [];

server.listen(process.env.PORT || 3000);
console.log('server started');
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
//turning on sockets
io.sockets.on('connection', function (socket) {
    connections.push(socket);
    console.log('Connected, No of socket connected %s ',connections.length);
    //disconnected
    socket.on('disconnect',function (data) {
        connections.splice(connections.indexOf(socket),1);
        console.log('Disonnected, No of socket connected %s ',connections.length);
    })
    //send message
    socket.on('send message', function (data) {
        console.log(data);
        io.sockets.emit('new message',data);
    });
});
