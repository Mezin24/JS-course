'use strict';

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const scoreLabel0 = document.querySelector('#score--0');
const scoreLabel1 = document.querySelector('#score--1');
const currentLabel0 = document.querySelector('#current--0');
const currentLabel1 = document.querySelector('#current--1');

const dice = document.querySelector('.dice');

let currentScore, currentPlayer, score0, score1, isOver, scores;


function startGame() {
  score0 = 0;
  score1 = 0;
  currentScore = 0;
  currentPlayer = 0;
  isOver = false;
  scores = [0, 0]
  
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  
  scoreLabel0.textContent = 0;
  scoreLabel1.textContent = 0;
  currentLabel0.textContent = 0;
  currentLabel1.textContent = 0;
  // dice.classList.add('hidden');
  dice.style.display = 'none'
}
function switchPlayer() {
  currentPlayer = currentPlayer === 0 ? 1 : 0;
}
startGame();

///////////////////////////
// USER ROLLS DICE
btnRoll.addEventListener('click', () => {
  // dice.classList.remove('hidden');
  
  if (isOver) return;
  dice.style.display = 'block'

  const diceValue = Math.floor(Math.random() * 6 + 1);
  dice.setAttribute('src', `dice-${diceValue}.png`);

  if (diceValue !== 1) {
    currentScore += diceValue;
    document.querySelector(`#current--${currentPlayer}`).textContent =
      currentScore;
  } else {
    currentScore = 0;
    document.querySelector(`#current--${currentPlayer}`).textContent = 0;
    switchPlayer();
  }
});

///////////////////////////
// USER HOLDS SCORE
btnHold.addEventListener('click', () => {
  scores[currentPlayer] += currentScore

  document.querySelector(`#score--${currentPlayer}`).textContent = scores[currentPlayer];
  currentScore = 0;
  document.querySelector(`#current--${currentPlayer}`).textContent = 0;

  if (scores[currentPlayer] >= 100) {
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.add('player--winner');

    dice.style.display = 'none';
    isOver = true;
  } else {
    switchPlayer();
  }
});

///////////////////////////
// USER RESETS GAME
btnNew.addEventListener('click', startGame);
