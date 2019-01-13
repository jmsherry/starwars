import Player from './player.js';
import Enemy from './enemy.js';
// import move from './move.js';
// import fire from './fire.js';

export default function Game(options) {
// All keys on keyboard get a numeric id
const numberOfEnemies = options.enemies || 3;
let stagger = options.enemies && options.enemies.number || 50; // horizontal stagger between enemies

let enemies = [];
let player = null;
let gameSpeed = 0;
let movingIntervalPointer = null;
let modal = null;

    // Set speed of enemy approach according to difficulty setting
  console.log(`Selecting '${options.difficulty}' as a setting`)
  switch (options.difficulty) {
    case 'easy':
      gameSpeed = 1000;
      break;
    case 'medium':
      gameSpeed = 800;
      break;
    case 'hard':
      gameSpeed = 500;
      break;
    default:
      gameSpeed = 1000;
  }

function clearBoard () {
  clearInterval(movingIntervalPointer);
  const enemiesEls = document.querySelectorAll('.enemy');
  const playerEl = document.getElementById('player');
  const laserEls = document.querySelectorAll('.laser');
  const modal = document.querySelector('.modal');
  if (playerEl) {
    playerEl.parentNode.removeChild(playerEl);
  }
  laserEls.forEach(laserEl => {
    laserEl.parentNode.removeChild(laserEl);
  });
  enemiesEls.forEach(enemyEl => {
    enemyEl.parentNode.removeChild(enemyEl);
  });
  enemies = [];
  player = null;
  if (modal) {
    modal.parentNode.removeChild(modal);
  }
}

function setup() {
  clearBoard();
  // Create & add player to the page
  player = new Player({
    name: options.player && options.player.name,
    craftImage: options.playerShipImage,
    laser: {
      color: 'lime',
      speed: 100
    }
  }, {
    speed: gameSpeed
  });
  document.body.appendChild(player.el);

  // Create & add enemies to the page
  for (let i = 0; i < numberOfEnemies; i += 1) {
    const enemy = new Enemy({
      stagger,
      number: i,
      craftImage: options.enemyShipImage,
    laser: {
      color: 'red'
    }
    }, {
      speed: gameSpeed
    });
    document.body.appendChild(enemy.el);
    enemy.targets = [player];
    enemies.push(enemy);
  }

  player.targets = enemies;
  enemies.forEach(enemy => {
    enemy.squadron = enemies;
  });

  // Start enemy moving towards the player
  movingIntervalPointer = setInterval(function(){
    enemies.forEach(enemy => {
      enemy.move('left');
      enemy.fire();
    });
  }, gameSpeed);
}

document.addEventListener("game_over", function endGame(e) {
  const modal = document.createElement('div');
  const player = e.detail.player;
  const score = player.score;
  const summary = score > 0 ? `Nice try! You scored ${score}` : `${score}?? What's wrong with you? Have you got glaucoma?!!`
  modal.innerHTML = `
    <h1>Game Over</h1>
    <p>${summary}</p>
  `;
  var playAgainButton = document.createElement('button');
  playAgainButton.textContent = 'Play again?';
  playAgainButton.addEventListener('click', function(){
    setup();
  });
  modal.appendChild(playAgainButton);
  modal.classList.add('modal');
  document.body.appendChild(modal);
});

document.addEventListener("win", function endGame(e) {
  const modal = document.createElement('div');
  const player = e.detail.player;
  const score = player.score;
  const summary = 'Congratulations!! You won the game!!!';
  modal.innerHTML = `
    <h1>Victory!!!</h1>
    <p>${summary}</p>
  `;
  var playAgainButton = document.createElement('button');
  playAgainButton.textContent = 'Play again?';
  playAgainButton.addEventListener('click', function(){
    setup();
  });
  modal.appendChild(playAgainButton);
  modal.classList.add('modal');
  document.body.appendChild(modal);
});

  setup();

  return {
    player,
    enemies
  };
};