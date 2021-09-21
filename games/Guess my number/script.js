'use strict';

const input = document.querySelector('.guess');
const btnCheck = document.querySelector('.check');
const btnAgain = document.querySelector('.again');
const labelNumber = document.querySelector('.number');
const labelMessage = document.querySelector('.message');
const labelScore = document.querySelector('.score');
const labelHighscore = document.querySelector('.highscore');

// create a random number between 1 and 20
function createRandom() {
    return Math.floor(Math.random() * 20) + 1;
}
function startGame() {
    randomNumber = createRandom();
    currentScore = 5;
    console.log(randomNumber)
    labelMessage.textContent = 'Start guessing...';
    labelScore.textContent = currentScore
    labelNumber.textContent = '?'
    document.body.style.backgroundColor = '#222'
    input.value = '';
    isOver = false
}
let randomNumber, currentScore;
let isOver = false
startGame();

btnCheck.addEventListener('click', () => {
    let currentNumber = +input.value;

    if (!currentNumber || isOver) return
    
    if (currentNumber > randomNumber) {
        labelMessage.textContent = '🔝 too much'
        labelScore.textContent = --currentScore;
    } else if (currentNumber < randomNumber) {
        labelMessage.textContent = '🔙 too little'
        labelScore.textContent = --currentScore;
        
    } else {
        labelMessage.textContent = '🔥 CORRECT'
        document.body.style.backgroundColor = '#60b347'
        labelNumber.textContent = randomNumber
        let highScore = +labelHighscore.textContent
        isOver = true

        if (currentScore > highScore) labelHighscore.textContent = currentScore
    }
    input.value = '';

    if (currentScore === 0) {
        labelMessage.textContent = 'The game os over!'
        isOver = true
    }
    
})  
btnAgain.addEventListener('click', () => {
    startGame();
})