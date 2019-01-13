import Player from './player.js';
import Enemy from './enemy.js';
// import move from './move.js';
// import fire from './fire.js';

export default function Game(options) {
// All keys on keyboard get a numeric id
const numberOfEnemies = options.enemies && options.enemies.number || 3;
let stagger = options.enemies && options.enemies.number || 50; // horizontal stagger between enemies

const enemies = [];
let player = null;
let gameSpeed = 0;
let movingIntervalPointer = null;

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

function setup() {
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
  // for (let i = 0; i < numberOfEnemies; i += 1) {
  //   const enemy = new Enemy({
  //     stagger,
  //     number: i,
  //   laser: {
  //     color: 'red'
  //   }
  //   }, {
  //     speed: gameSpeed
  //   });
  //   document.body.appendChild(enemy.el);
  //   enemies.push(enemy);
  // }

  // Start enemy moving towards the player
  // movingIntervalPointer = setInterval(function(){
  //   enemies.forEach(enemy => {
  //     enemy.move('left');
  //   });
  // }, gameSpeed);
}

document.addEventListener("keydown", function takeInput(e) {
  e = e || window.event;
  const keyPressed = e.key;
  switch (keyPressed) {
    case "Up": // IE/Edge specific value
    case "ArrowUp":
      player.move("up");
      break;
    case "Down": // IE/Edge specific value
    case "ArrowDown":
      player.move("down");
      break;
    case "Left": // IE/Edge specific value
    case "ArrowLeft":
      player.move("left");
      break;
    case "Right": // IE/Edge specific value
    case "ArrowRight":
      player.move("right");
      break;
    case "Enter":
      player.fire();
      break;
    case "e":
      player.destruct();
      break;

    default:
      console.log(`${keyPressed} was pressed`);
  }
});

  setup();

  return {
    player,
    enemies
  };
};