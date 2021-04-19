let appQuestion = document.querySelector('.app__question');
let appResult = document.querySelector('.app__result');
let appScore = document.querySelector('.app_scrore span');
let timeMain = document.querySelector('.time__main');
let resultModal = new bootstrap.Modal(document.querySelector('#resultModal'));
let btnTrue = document.querySelector('#btnTrue');
let btnFalse = document.querySelector('#btnFalse');
let resultScore = document.querySelector('.result-score');

let question;
let timeRunning;
let score = 0;
let level;
let time;

let click = 0;

//Setting

level = 1;
time = 10;

//Helper

let randomNumber = (level) => {
    return Math.ceil(Math.random() * level * 10);
};

let randomPercent = () => {
    return Math.ceil(Math.random() * 100);
};

let randomOperator = () => {
    switch (Math.ceil(Math.random() * 3)) {
        case 0:
            return '+';
        case 1:
            return '-';
        case 2:
            return '*';
        case 3:
            return '/';
    }
};

let roundPerfect = (number) => {
    return Math.round(number * 100) / 100;
};

let playLevel = (level) => {
    renderQuestion(randomNumber(level), randomNumber(level));
};

//Animation

let timeAnimation = () => {
    let percent = 100;
    timeRunning = setInterval(() => {
        time--;
        percent -= 10;
        timeMain.style.width = percent + '%';
        if (time === 0) {
            clearInterval(timeRunning);
            checkToNext();
        }
    }, 1000);
};

//Render

let renderScore = (s) => {
    appScore.innerText = s;
};

let renderQuestion = (a, b) => {
    question = `${a} ${randomOperator()} ${b}`;
    appQuestion.innerText = question;

    if (randomPercent() < 50) {
        appResult.innerText = roundPerfect(eval(a + randomOperator() + b));
    } else {
        appResult.innerText = roundPerfect(eval(question));
    }
};

//Handle action

let checkToNext = () => {
    let nextPlay = () => {
        playLevel(level);
        clearInterval(timeRunning);
        time = 10;
        timeMain.style.transition = 'unset';
        timeMain.style.width = '100%';
        timeAnimation();
        timeMain.style.transition = '1s ease-out 0s';
        click = 0;
    };

    let endGame = () => {
        clearInterval(timeRunning);
        time = 10;
        timeMain.style.transition = 'unset';
        timeMain.style.width = '100%';
        resultScore.innerText = score;
        score = 0;
        resultModal.show();
    };

    if (time === 0) {
        if (score > 0 && click > 0) {
            nextPlay();
        } else {
            endGame();
        }
    } else {
        if (score > 0) {
            nextPlay();
        } else {
            endGame();
        }
    }
};

btnTrue.onclick = () => {
    click++;
    if (
        roundPerfect(eval(appQuestion.innerText)) ===
        Number(appResult.innerText)
    ) {
        score++;
        checkToNext();
    } else {
        score--;
        checkToNext();
    }

    renderScore(score);
};

btnFalse.onclick = () => {
    click++;
    if (
        roundPerfect(eval(appQuestion.innerText)) ===
        Number(appResult.innerText)
    ) {
        score--;
        checkToNext();
    } else {
        score++;
        checkToNext();
    }

    renderScore(score);
};

// Play
playLevel(1);
timeAnimation();
