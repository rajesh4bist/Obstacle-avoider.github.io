const player = document.getElementById('player');
const gameArea = document.getElementById('game-area');
const scoreDiv = document.getElementById('score');

// Game variables
let score = 0;
let playerX = 225;
let playerY = 350;
let obstacles = [];
let coins = [];
let gameSpeed = 3;
let gameIsOver = false;

// Add event listener to move player
document.addEventListener('keydown', movePlayer);

// Start game
startGame();

// Start game function
function startGame() {
    score = 0;
    playerX = 225;
    playerY = 350;
    obstacles = [];
    coins = [];
    gameSpeed = 3;
    gameIsOver = false;
    scoreDiv.textContent = 'Score: ' + score;

    // Create initial obstacles and coins
    for (let i = 0; i < 3; i++) {
        createObstacle();
        createCoin();
    }

    // Start game loop
    requestAnimationFrame(updateGame);
}

// Create obstacle function
function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = Math.random() * (gameArea.offsetWidth - 50) + 'px';
    obstacle.style.animationDuration = gameSpeed + 's';
    gameArea.appendChild(obstacle);
    obstacles.push(obstacle);
}

// Create coin function
function createCoin() {
    const coin = document.createElement('div');
    coin.classList.add('coin');
    coin.style.left = Math.random() * (gameArea.offsetWidth - 25) + 'px';
    coin.style.animationDuration = gameSpeed + 's';
    gameArea.appendChild(coin);
    coins.push(coin);
}

// Move player function
function movePlayer(event) {
    switch (event.keyCode) {
        case 37: // Left arrow
            if (playerX > 0) {
                playerX -= 50;
                player.style.left = playerX + 'px';
            }
            break;
        case 39: // Right arrow
            if (playerX < gameArea.offsetWidth - player.offsetWidth) {
                playerX += 50;
                player.style.left = playerX + 'px';
            }
            break;
    }
}

// Update game function
function updateGame() {
    if (gameIsOver) return;

    // Move obstacles and coins
    for (let i = 0; i < obstacles.length; i++) {
        let obstacle = obstacles[i];
        obstacle.style.top = obstacle.offsetTop + gameSpeed + 'px';

        // Check for collision with player
        if (isCollision(player, obstacle)) {
            gameOver();
            return;
        }

        // Remove obstacle if it goes off screen
        if (obstacle.offsetTop > gameArea.offsetHeight) {
            obstacle.remove();
            obstacles.splice(i, 1);
            createObstacle();
            score++;
            scoreDiv.textContent = 'Score: ' + score;
            if (score % 5 == 0) {
                gameSpeed++;
            }
        }
    }

    for (let i = 0; i < coins.length; i++) {
        let coin = coins[i];
        coin.style.top = coin.offsetTop + gameSpeed + 'px';

        // Check for collection by player
        if (isCollision(player, coin)) {
            coin.remove();
            coins.splice(i, 1);
            createCoin();
            score += 2;
            scoreDiv.textContent = 'Score: ' + score;
        }

        // Remove coin if it goes off screen
        if (coin.offsetTop > gameArea.offsetHeight) {
            coin.remove();
            coins.splice(i, 1);
            createCoin();
        }
    }

    // Request next frame
    requestAnimationFrame(updateGame);
}

// Game over function
function gameOver() {
    gameIsOver = true;

    // Remove all obstacles and coins
    obstacles.forEach(obstacle => obstacle.remove());
    obstacles = [];
    coins.forEach(coin => coin.remove());
    coins = [];

    // Show game over message
    const gameOverMessage = document.createElement('div');
    gameOverMessage.classList.add('game-over');
    gameOverMessage.textContent = 'Game Over';
    gameArea.appendChild(gameOverMessage);

    // Show play again button
    const playAgainButton = document.createElement('button');
    playAgainButton.classList.add('play-again');
    playAgainButton.textContent = 'Play Again';
    gameOverMessage.appendChild(playAgainButton);

    // Add event listener to play again button
    playAgainButton.addEventListener('click', startGame);
}

// Check for collision function
function isCollision(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !(
        (aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) ||
        (aRect.right < bRect.left) || (aRect.left > bRect.right)
    );
}


