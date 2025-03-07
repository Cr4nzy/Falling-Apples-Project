let score = 0;
let timeLeft = 30; // Time limit in seconds
let gameActive = true;

const gameContainer = document.getElementById("gameContainer");
const basket = document.getElementById("basket");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const gameOverText = document.getElementById("gameOver");
const restartBtn = document.getElementById("restartBtn");

let basketX = window.innerWidth / 2 - 40;

// Move basket left and right
document.addEventListener("keydown", (event) => {
    if (!gameActive) return;
    if (event.key === "ArrowLeft" && basketX > 0) {
        basketX -= 20;
    } else if (event.key === "ArrowRight" && basketX < window.innerWidth - 80) {
        basketX += 20;
    }
    basket.style.left = `${basketX}px`;
});

// Create falling apples
function createApple() {
    if (!gameActive) return;
    const apple = document.createElement("div");
    apple.classList.add("apple");
    apple.style.left = `${Math.random() * (window.innerWidth - 30)}px`;
    apple.style.top = "0px";
    gameContainer.appendChild(apple);

    let appleFall = setInterval(() => {
        if (!gameActive) {
            clearInterval(appleFall);
            apple.remove();
            return;
        }

        let appleY = parseInt(apple.style.top) + 5;
        apple.style.top = `${appleY}px`;

        // Check if apple reaches basket
        if (appleY > window.innerHeight - 100) {
            let appleX = parseInt(apple.style.left);
            if (appleX > basketX - 40 && appleX < basketX + 80) {
                score++;
                scoreDisplay.textContent = score;
                apple.remove();
                clearInterval(appleFall);
            }
        }

        // Remove apples that fall beyond screen
        if (appleY > window.innerHeight) {
            apple.remove();
            clearInterval(appleFall);
        }
    }, 50);
}

// Generate apples every second
let appleInterval = setInterval(createApple, 1000);

// Timer countdown
function startTimer() {
    const countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            clearInterval(appleInterval);
            endGame();
        }
    }, 1000);
}

// End game function
function endGame() {
    gameActive = false;
    gameOverText.style.display = "block";
    restartBtn.style.display = "block";
}

// Restart game function
restartBtn.addEventListener("click", () => {
    score = 0;
    timeLeft = 30;
    gameActive = true;
    basketX = window.innerWidth / 2 - 40;

    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    gameOverText.style.display = "none";
    restartBtn.style.display = "none";

    startTimer();
    appleInterval = setInterval(createApple, 1000);
});

// Start the game
startTimer();
