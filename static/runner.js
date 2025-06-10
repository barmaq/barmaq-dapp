// Упрощённая реализация T-Rex Runner
// Источник: https://github.com/wayou/t-rex-runner

(function() {
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");

    var gameStarted = false;  // Флаг для отслеживания состояния игры

    var trex = {
        x: 50,
        y: 100,
        vy: 0,
        gravity: 1,
        jumpPower: -15,
        onGround: true
    };

    var obstacles = [];
    var score = 0;

    function drawTrex() {
        ctx.fillStyle = "black";
        ctx.fillRect(trex.x, trex.y, 20, 20);
    }

    function drawObstacles() {
        ctx.fillStyle = "green";
        obstacles.forEach(ob => {
            ctx.fillRect(ob.x, ob.y, ob.width, ob.height);
        });
    }

    function updateTrex() {
        trex.y += trex.vy;
        trex.vy += trex.gravity;
        if (trex.y >= 100) {
            trex.y = 100;
            trex.vy = 0;
            trex.onGround = true;
        }
    }

    function spawnObstacle() {
        if (Math.random() < 0.02) {
            obstacles.push({ x: 600, y: 110, width: 10, height: 40 });
        }
    }

    function updateObstacles() {
        obstacles.forEach(ob => ob.x -= 5);
        obstacles = obstacles.filter(ob => ob.x + ob.width > 0);
    }

    function detectCollision() {
        for (let ob of obstacles) {
            if (
                trex.x < ob.x + ob.width &&
                trex.x + 20 > ob.x &&
                trex.y < ob.y + ob.height &&
                trex.y + 20 > ob.y
            ) {
                return true;
            }
        }
        return false;
    }

    function drawScore() {
        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.fillText("Score: " + score, 500, 20);
    }

    function drawStartScreen() {
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Press SPACE to start", canvas.width/2, canvas.height/2);
        drawTrex();  // Отображаем динозавра на стартовом экране
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!gameStarted) {
            drawStartScreen();
            requestAnimationFrame(gameLoop);
            return;
        }

        updateTrex();
        updateObstacles();
        spawnObstacle();

        drawTrex();
        drawObstacles();
        drawScore();

        score++;
        if (detectCollision()) {
            gameStarted = false;  // Сбрасываем флаг при проигрыше
            score = 0;  // Сбрасываем счет
            obstacles = [];  // Очищаем препятствия
            alert("Game over! Final score: " + score);
            requestAnimationFrame(gameLoop);  // Возвращаемся к стартовому экрану
        } else {
            requestAnimationFrame(gameLoop);
        }
    }

    window.addEventListener("keydown", function(e) {
        if (e.code === "Space") {
            if (!gameStarted) {
                gameStarted = true;  // Начинаем игру при нажатии пробела
                return;
            }
            if (trex.onGround) {
                trex.vy = trex.jumpPower;
                trex.onGround = false;
            }
        }
    });

    gameLoop();  // Запускаем игровой цикл (начнется со стартового экрана)
})();
