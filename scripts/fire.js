import { unitRegex, checkCollisions } from './utilities.js';

export default function fire(craft) {
  console.log(`${craft.name} is firing`);
  if (!craft) {
    console.error('No craft provided to fire function');
    return;
  }
  const craftEl = craft.el;

  // Find out if player to determine direction of fire
  const isPlayer = craftEl.id === 'player';
  const directionOfFire = isPlayer ? 'left' : 'right';

  // Measure craft's current position
  const {
    width: craftWidth,
    height: craftHeight,
    x: craftXcoord,
    y: craftYcoord
  } = craftEl.getBoundingClientRect();

  // Create a laser
  const laser = document.createElement('div');
  laser.classList.add('laser');
  laser.style.width = '100px';
  laser.style.height = '10px';
  laser.style.position = 'absolute';
  laser.style.top = craftYcoord + (craftHeight / 2) - 5  + 'px';
  if (directionOfFire === 'right') {
    laser.style[directionOfFire] = (window.innerWidth - craftXcoord) + craftWidth + 'px';
  } else {
    laser.style[directionOfFire] = craftXcoord + 'px';
  }
  laser.style.backgroundColor = craft.laser.color || 'red';
  // const transitionStr = `all 0.5s linear`;
  // laser.style.transition = transitionStr;

  // Add laser to the page
  document.body.appendChild(laser);
  
  // Move Laser
  function moveLaser(timestamp) {
    const laserSpeed = craft.laser.speed || 10;
    const currentPosition = Number(laser.style[directionOfFire].match(unitRegex)[1]);
    // console.log(currentPosition, `${currentPosition + laserSpeed}px`);
    laser.style[directionOfFire] = `${currentPosition + laserSpeed}px`;

    // if laser hits anything then gameover
    if (checkCollisions(laser, craft.targets)) {
      craft.score += 1;
      return;
    }

    // move or remove if off screen
    if (currentPosition + 2*laserSpeed < window.innerWidth) {
      window.requestAnimationFrame(moveLaser);
    } else {
      document.body.removeChild(laser);
    }
  }

  window.requestAnimationFrame(moveLaser);
};