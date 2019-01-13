import move from './move.js';
import fire from './fire.js';
import explode from './explode.js';

export default function Player(options, gameInfo) {
  const playerEl = document.createElement('div');
  playerEl.id = 'player';
  const playerStyles = playerEl.style;
  playerStyles.backgroundImage = `url(${options.craftImage || 'https://s3-eu-west-1.amazonaws.com/thejumpstarwarsgame/ortho-right-side.jpg'})`;
  const transitionStr = `all ${Math.floor(gameInfo.speed / 1000)}s linear`;
  console.log('transitionStr', transitionStr);
  playerStyles.transition = transitionStr;
  playerStyles.top = options.startPosition && options.startPosition.top || '0px';
  playerStyles.left = options.startPosition && options.startPosition.left || '0px';

  this.score = 0;
  this.name = options.name || 'Player 1';
  this.el = playerEl;
  this.speed = 500;
  this.laser = options.laser || {
    speed: 1000,
    color: 'lime'
  };
}

Player.prototype = {
  move(dir) {
    move(this, dir);
  },
  fire() {
    fire(this);
  },
  destruct(){
    explode(this);
  }
};