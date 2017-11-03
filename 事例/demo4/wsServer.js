/**
 * Created by DT274 on 2017/11/3.
 */
var ws = require('nodejs-websocket');
var PORT = 3000;

var clientCount = 0;

var server = ws.createServer(function (conn) {
    console.log('New connection');
    clientCount++;
    conn.nickName = 'user' + clientCount;

    var message = {};
    message.type = 'enter';
    message.data = conn.nickName + ' come in';

    broadCast(JSON.stringify(message));
    conn.on('text', function (str) {
        console.log('Received: ' + str);
        var message = {};
        message.type = 'message';
        message.data = conn.nickName + 'says: ' + str;
        broadCast(JSON.stringify(message));
    });
    conn.on('close', function (code, reason) {
        console.log('Connection closed');
        var message = {};
        message.type = 'leave';
        message.data = conn.nickName + ' left';
        broadCast(JSON.stringify(message));
    });

    conn.on('error', function (error) {
        console.log('handle error');
        console.log(error);
    });
}).listen(PORT);

console.log('websokcet server listening is port ' + PORT);

function broadCast (str) {
    server.connections.forEach(function (connection) {
        connection.sendText(str);
    })
}













