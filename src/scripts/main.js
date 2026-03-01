const Game = require('../modules/Game.class');

const game = new Game();

const field = document.querySelector('.game-field');
const scoreEl = document.querySelector('.game-score');
const startBtn = document.querySelector('.button.start');
const messageLose = document.querySelector('.message-lose');
const messageWin = document.querySelector('.message-win');
const messageStart = document.querySelector('.message-start');

function render() {
  field.innerHTML = '';

  game
    .getState()
    .flat()
    .forEach((value) => {
      const cell = document.createElement('div');

      cell.className = 'field-cell';

      if (value) {
        cell.textContent = value;
        cell.classList.add(`field-cell--${value}`);
      }

      field.appendChild(cell);
    });

  scoreEl.textContent = game.getScore();

  messageLose.classList.add('hidden');
  messageWin.classList.add('hidden');

  if (game.getStatus() === 'lose') {
    messageLose.classList.remove('hidden');
  }

  if (game.getStatus() === 'win') {
    messageWin.classList.remove('hidden');
  }
}

startBtn.addEventListener('click', () => {
  if (game.getStatus() === 'idle') {
    messageStart.classList.add('hidden');
    startBtn.textContent = 'Restart';
    startBtn.classList.remove('start');
    startBtn.classList.add('restart');
    game.start();
  } else {
    game.restart();
  }

  render();
});

document.addEventListener('keydown', (e) => {
  let moved = false;

  switch (e.key) {
    case 'ArrowLeft':
      moved = game.moveLeft();
      break;
    case 'ArrowRight':
      moved = game.moveRight();
      break;
    case 'ArrowUp':
      moved = game.moveUp();
      break;
    case 'ArrowDown':
      moved = game.moveDown();
      break;
    default:
      return;
  }

  if (moved) {
    render();
  }
});

render();
