'use strict';

const input = document.querySelector('.guess');
const btnCheck = document.querySelector('.check');
const btnAgain = document.querySelector('.again');
const labelNumber = document.querySelector('.number');
const labelMessage = document.querySelector('.message');
const labelScore = document.querySelector('.score');
const labelHighscore = document.querySelector('.highscore');

function createRandom() {
  return Math.floor(Math.random() * 20) + 1;
}

function startGame() {
  randomNumber = createRandom();
  currentScore = 10;
  console.log(randomNumber);
  labelMessage.textContent = 'Start guessing...';
  labelScore.textContent = currentScore;
  labelNumber.textContent = '?';
  document.body.style.backgroundColor = '#222';
  input.value = '';
  isOver = false;
}
function wrongAnswer(num) {
  labelMessage.textContent =
    num > randomNumber ? '🔝 too much' : '🔙 too little';
  labelScore.textContent = --currentScore;
}

let randomNumber, currentScore;
let highscore = 0;
let isOver = false;
startGame();

btnCheck.addEventListener('click', () => {
  let currentNumber = +input.value;

  if (!currentNumber) labelMessage.textContent = '⛔ No mumber!';

  if (!currentNumber || isOver) return;

  if (currentNumber > randomNumber) {
    wrongAnswer(currentNumber);
  } else if (currentNumber < randomNumber) {
    wrongAnswer(currentNumber);
  } else {
    labelMessage.textContent = '🔥 CORRECT';
    document.body.style.backgroundColor = '#60b347';
    labelNumber.textContent = randomNumber;
    isOver = true;

    if (currentScore > highscore) {
      highscore = currentScore;
      labelHighscore.textContent = highscore;
    }
  }
  input.value = '';

  if (currentScore === 0) {
    labelMessage.textContent = 'The game is over!';
    isOver = true;
  }
});
btnAgain.addEventListener('click', () => {
  startGame();
});
