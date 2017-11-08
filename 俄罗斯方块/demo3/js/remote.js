/**
 * Created by DT274 on 2017/11/3.
 */
var Remote = function (socket) {
    //游戏对象
    var game;
    //绑定键盘事件
    var bindEvents = function () {
        socket.on('init', function (data) {
            start(data.type, data.dir);
        });

        socket.on('next', function (data) {
            game.performNext(data.type, data.dir);
        });

        socket.on('rotate', function (data) {
            game.rotate();
        });

        socket.on('left', function (data) {
            game.left();
        });

        socket.on('right', function (data) {
            game.right();
        });

        socket.on('down', function (data) {
            game.down();
        });

        socket.on('fall', function (data) {
            game.fall();
        });

        socket.on('line', function (data) {
            game.checkClear();
            game.addScore(data);
        });

        socket.on('fixed', function (data) {
            game.fixed();
        });

        socket.on('time', function (data) {
            game.setTime(data);
        });

        socket.on('lose', function (data) {
            game.gameOver(false);
        });

        socket.on('addTailLines', function (data) {
            game.addTailLines(data);
        });
    };


    var start = function (type, dir) {
        var doms = {
            gameDiv: document.getElementById('remote-game'),
            nextDiv: document.getElementById('remote-next'),
            timeDiv: document.getElementById('remote-time'),
            scoreDiv: document.getElementById('remote-score'),
            resultDiv: document.getElementById('remote-gameover')
        };

        game = new Game();
        game.init(doms, type, dir);
    };
    bindEvents();
};