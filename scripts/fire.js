import { unitRegex } from './utilities.js';
import { isColliding } from './utilities.js';

function checkCollision() {
  return false;
}

export default function fire(craft) {
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
  laser.style.width = '100px';
  laser.style.height = '10px';
  laser.style.position = 'absolute';
  laser.style.top = craftYcoord + (craftHeight / 2)  + 'px';
  laser.style[directionOfFire] = craftXcoord + craftWidth + 'px';
  laser.style.backgroundColor = craft.laser.color || 'red';

  // Add laser to the page
  document.body.appendChild(laser);
  
  // Move Laser
  let start = null;
  let i = 4;
  function moveLaser(timestamp) {
    const laserSpeed = craft.laser.speed || 10;
    if (!start) start = timestamp;
    let progress = timestamp - start;
    const currentPosition = Number(laser.style[directionOfFire].match(unitRegex)[1]);
    console.log(currentPosition, `${currentPosition + laserSpeed}px`);
    laser.style[directionOfFire] = `${currentPosition + laserSpeed}px`;
    if (checkCollision()) {
      craftEl.removeChild(laser);
    }
    console.log('animating laser', progress < window.innerWidth);
    console.log(progress);
    if (progress < window.innerWidth) {
      window.requestAnimationFrame(moveLaser);
    }
  }

  window.requestAnimationFrame(moveLaser);
};