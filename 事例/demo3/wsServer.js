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
    broadCast(conn.nickName + 'come in');
    conn.on('text', function (str) {
        console.log('Received: ' + str);
        broadCast(str);
    });
    conn.on('close', function (code, reason) {
        console.log('Connection closed');
        broadCast(conn.nickName + 'left');
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













