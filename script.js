// Game variables
var gameArea, basket, scoreboard, timer;
var score, timeLeft, createGoldInterval;

function startGame() {
    // Reset game variables
    gameArea = document.getElementById('gameArea');
    basket = document.getElementById('basket');
    scoreboard = document.getElementById('scoreboard');
    timer = document.getElementById('timer');
    score = 0;
    timeLeft = 60; // 60 seconds

    // Clear any existing gold elements
    var golds = document.getElementsByClassName('gold');
    while (golds[0]) {
        golds[0].parentNode.removeChild(golds[0]);
    }

    // Move the basket with arrow keys
    window.addEventListener('keydown', function(e) {
        var basketLeft = parseInt(window.getComputedStyle(basket).getPropertyValue('left'));
        if (e.key == 'ArrowLeft' && basketLeft > 0) {
            basket.style.left = basketLeft - 10 + 'px';
        }
        if (e.key == 'ArrowRight' && basketLeft < (gameArea.offsetWidth - basket.offsetWidth)) {
            basket.style.left = basketLeft + 10 + 'px';
        }
    });

    // Create gold pieces that fall from the sky
    function createGold() {
        var gold = document.createElement('div');
        gold.classList.add('gold');
        gold.style.left = Math.random() * (gameArea.offsetWidth - 20) + 'px';
        gold.style.animationDuration = Math.random() * 2 + 3 + 's'; // Random fall speed
        gold.style.width = Math.random() * 20 + 10 + 'px'; // Random width
        gold.style.height = gold.style.width; // Height equals width
        gameArea.appendChild(gold);
    }

    // Detect when the basket collects a gold piece
    setInterval(function() {
        var basketTop = parseInt(window.getComputedStyle(basket).getPropertyValue('top'));
        var basketLeft = parseInt(window.getComputedStyle(basket).getPropertyValue('left'));
        var golds = document.getElementsByClassName('gold');
        for (var i = 0; i < golds.length; i++) {
            var goldTop = parseInt(window.getComputedStyle(golds[i]).getPropertyValue('top'));
            var goldLeft = parseInt(window.getComputedStyle(golds[i]).getPropertyValue('left'));
            if (goldTop + parseInt(golds[i].style.height) > basketTop && goldLeft + parseInt(golds[i].style.width) > basketLeft && goldLeft < basketLeft + 50) {
                gameArea.removeChild(golds[i]);
                score++;
                scoreboard.textContent = 'Score: ' + score;
                // Increase difficulty
                if (score % 10 == 0) { // Every 10 points
                    basket.style.width = parseInt(basket.style.width) - 5 + 'px'; // Decrease basket size
                }
            }
        }
    }, 10);

    // Create a new gold piece every second
    createGoldInterval = setInterval(createGold, 1000);
}

// Call startGame to start the game
startGame();

// Update the timer
setInterval(function() {
    if (timeLeft > 0) {
        timeLeft--;
        timer.textContent = 'Time: ' + timeLeft;
    } else {
        // End the game
        clearInterval(createGoldInterval);
        alert('Game over! Your score is ' + score + '.');
        // Ask the user if they want to restart the game
        if (window.confirm('Press OK or Enter to restart the game.')) {
            startGame();
        }
    }
}, 1000);
