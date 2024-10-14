let isBallVisible = false;
let timeLeft = 20;
let timerInterval;
const ballElemId = "ball";
const btnToggleId = "btnToggle";
const timerElemId = "timer";
let clickCounter = 0;
let shapeIndex = 0;
let highScore = 0;
let shapeIndex2 = 0;

function toggle() {
    const ball = document.getElementById(ballElemId);
    const btnToggleElem = document.getElementById(btnToggleId);

    if (isBallVisible) {
        ball.style.display = "none";
        btnToggleElem.innerText = "start game";
        clearInterval(timerInterval);
        resetTimer();
        hideTimer();
        showText();
        hidePoints();
        showBtnC();
        showScore();
        showColorBtn();
    } else {
        ball.style.display = "block";
        btnToggleElem.innerText = "hide the ball";
        showTimer();
        startTimer();
        hideText();
        showPoints();
        hideBtnC();
        hideScore();
        hideColorBtn();
    }

    isBallVisible = !isBallVisible;
}

function moveBall() {
    const ball = document.getElementById(ballElemId);
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    do {
        randomX = getRandomNumber(screenWidth - ball.offsetWidth);
        randomY = getRandomNumber(screenHeight - ball.offsetHeight);
        ball.style.left = randomX + "px";
        ball.style.top = randomY + "px";
        ballRect = ball.getBoundingClientRect();
    } while (isBallInForbiddenArea(ballRect));

    clickCounter++;
    document.getElementById('clickCounter').innerText = 'points : ' + clickCounter;
}

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

function startTimer() {
    timeLeft = 20;
    document.getElementById(timerElemId).innerText = 'Time left: ' + timeLeft;
    timerInterval = setInterval(function () {
        timeLeft--;
        document.getElementById(timerElemId).innerText = 'Time left: ' + timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            document.getElementById(timerElemId).innerText = 'Time is up!';
            hideBall();
            resetPoints();
            alert("time is over");
        }
    }, 1000);
}

function resetTimer() {
    timeLeft = 20;
    document.getElementById(timerElemId).innerText = 'Time left: ' + timeLeft;
}

function hideBall() {
    const ball = document.getElementById(ballElemId);
    ball.style.display = 'none';
    const btnToggleElem = document.getElementById(btnToggleId);

    isBallVisible = false;



    btnToggleElem.innerText = "show the ball";


    if (clickCounter > highScore) {
        highScore = clickCounter;
        document.getElementById('highScore').innerText = 'high score: ' + highScore;
    }

    resetPoints();
}

function hideTimer() {
    const timer = document.getElementById(timerElemId);
    timer.style.display = 'none';
}

function showTimer() {
    const timer = document.getElementById(timerElemId);
    timer.style.display = 'block';
}

function hideText() {
    const text = document.getElementById("h1");
    text.style.display = 'none';
}

function showText() {
    const text = document.getElementById("h1");
    text.style.display = 'block';
}

function showPoints() {
    const points = document.getElementById("clickCounter");
    points.style.display = 'block';
}

function hidePoints() {
    const points = document.getElementById("clickCounter");
    points.style.display = 'none';
}

function getBallElement() {
    return document.getElementById("ball");
}

function changeBallStyel() {
    const ball = getBallElement();

    if (shapeIndex === 0) {
        ball.style.borderRadius = '50px';

    } else if (shapeIndex === 1) {
        ball.style.borderRadius = '0px';

    } else if (shapeIndex === 2) {
        ball.style.borderRadius = '50% 50% 0 0';
    }

    showBall();
    shapeIndex = (shapeIndex + 1) % 3;
}

function changeBallColor() {
    const ball = getBallElement();

    if (shapeIndex2 === 0) {
        ball.style.backgroundColor = 'white';
    }

    else if (shapeIndex2 === 1) {
        ball.style.backgroundColor = 'blue';
    }

    else if (shapeIndex2 === 2) {
        ball.style.backgroundColor = 'green';
    }

    showBall();
    shapeIndex2 = (shapeIndex2 + 1) % 3;
}

function hideColorBtn() {
    const btn = document.getElementById("changeBall2");
    btn.style.display = 'none';
}

function showColorBtn() {
    const btn = document.getElementById("changeBall2");
    btn.style.display = 'block';
}

function showBall() {
    const ball = getBallElement();
    ball.style.display = 'block';
}

function hideBtnC() {
    const btn = document.getElementById("changeBall");
    btn.style.display = 'none';
}

function showBtnC() {
    const btn = document.getElementById("changeBall");
    btn.style.display = 'block';
}

function resetPoints() {
    clickCounter = 0;
    document.getElementById('clickCounter').innerText = 'points: ' + clickCounter;
}

function isBallInForbiddenArea(ballRect) {
    const timerRect = document.getElementById(timerElemId).getBoundingClientRect();
    const btnToggleRect = document.getElementById(btnToggleId).getBoundingClientRect();
    const clickCounterRect = document.getElementById('clickCounter').getBoundingClientRect();

    return (
        (ballRect.right > timerRect.left && ballRect.left < timerRect.right && ballRect.bottom > timerRect.top && ballRect.top < timerRect.bottom) ||
        (ballRect.right > btnToggleRect.left && ballRect.left < btnToggleRect.right && ballRect.bottom > btnToggleRect.top && ballRect.top < btnToggleRect.bottom) ||
        (ballRect.right > clickCounterRect.left && ballRect.left < clickCounterRect.right && ballRect.bottom > clickCounterRect.top && ballRect.top < clickCounterRect.bottom)
    );
}

function hideScore() {
    const score = document.getElementById("highScore");
    score.style.display = 'none';
}

function showScore() {
    const score = document.getElementById("highScore");
    score.style.display = 'block';
}

