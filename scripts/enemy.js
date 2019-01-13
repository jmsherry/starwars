import move from './move.js';
import fire from './fire.js';
import explode from './explode.js';

export default function Enemy(options, gameInfo) {
  const enemyEl = document.createElement('div');
  enemyEl.classList.add('enemy');
  enemyEl.style.backgroundImage = `url(${options.craftImage || 'http://www.galacticempiredatabank.com/TIEfighter.JPG'})`
  enemyEl.style.top = (window.innerHeight / 100) * Math.floor( Math.random() * 100 ) + 'px';
  enemyEl.style.left = window.innerWidth - options.number * options.stagger + 'px';
  const transitionStr = `left, top ${Math.floor(gameInfo.speed / 1000)}s linear`;
  console.log('transitionStr', transitionStr);
  enemyEl.style.transition = transitionStr;
  
  this.el = enemyEl;
  this.name = `Enemy #${options.number}`;
  this.speed = 100;
  this.laser = options.laser || {
    speed: 1000,
    color: 'red'
  }
}

Enemy.prototype = {
  move(dir) {
    move(this, dir || "left");
  },
  fire() {
    fire(this);
  },
  destruct(){
    explode(this);
  }
};