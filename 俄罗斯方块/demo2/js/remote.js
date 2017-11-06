/**
 * Created by DT274 on 2017/11/3.
 */
var Remote = function () {
    //游戏对象
    var game;
    //时间间隔
    var INTERVAL = 200;
    //定时器
    var timer = null;
    //时间计数器
    var timeCount = 0;
    //时间
    var time = 0;

    //绑定键盘事件
    var bindEvents = function () {
        document.getElementById('left').onclick = function () {
            game.left();
        };
        document.getElementById('right').onclick = function () {
            game.right();
        };
        document.getElementById('down').onclick = function () {
            game.down();
        };
        document.getElementById('rotate').onclick = function () {
            game.rotate();
        };
        document.getElementById('fall').onclick = function () {
            game.fall();
        };
        document.getElementById('fixed').onclick = function () {
            game.fixed();
        };
        document.getElementById('performNext').onclick = function () {
            game.performNext(2, 2);
        };
        document.getElementById('checkClear').onclick = function () {
            game.checkClear();
        };
        document.getElementById('checkGameOver').onclick = function () {
            game.checkGameOver();
        };
        document.getElementById('setTime').onclick = function () {
            game.setTime(20);
        };
        document.getElementById('addScore').onclick = function () {
            game.addScore(1);
        };
        document.getElementById('gameover').onclick = function () {
            game.gameOver(true);
        };
        document.getElementById('addTailLines').onclick = function () {
            game.addTailLines([[0, 1, 0, 1, 0, 1, 0, 1, 0, 1]]);
        };
    };

    var move = function () {
        timeFunc();
        if (!game.down()) {
            game.fixed();
            var line = game.checkClear();
            if (line) {
                game.addScore(line);
            }
            var gameOver = game.checkGameOver();
            if (gameOver) {
                game.gameOver(false);
                stop();
            } else {
                game.performNext(generateType(), generateNext());
            }
        }
    };
    //随机生成干扰行
    var genrateBottomLine = function (lineNum) {
        var lines = [];
        for (var i = 0; i < lineNum; i++) {
            var line = [];
            for (var j = 0; j < 10; j++) {
                line.push(Math.ceil(Math.random() * 2 - 1));
            }
            lines.push(line);
        }
        return lines;
    };

    //计时函数
    var timeFunc = function () {
        timeCount = timeCount + 1;
        if (timeCount == 5) {
            timeCount = 0;
            time = time + 1;
            game.setTime(time);

            if (time % 10 == 0) {
                game.addTailLines(genrateBottomLine(1))
            }
        }
    };
    //随机生成一个方块种类
    var generateType = function () {
        return Math.ceil(Math.random() * 7) -1;
    };

    //随机生成一个旋转次数
    var generateNext = function () {
        return Math.ceil(Math.random() * 4) -1;
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

    //结束
    var stop = function () {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        document.onkeydown = null;
    };

    //导出api
    this.start = start;
    this.bindEvents = bindEvents;
};