import move from './move.js';
import fire from './fire.js';
import explode from './explode.js';

export default function Player(options, gameInfo) {
  const playerEl = document.createElement('div');
  playerEl.id = 'player';
  const playerStyles = playerEl.style;
  playerStyles.backgroundImage = `url(${options.craftImage || 'https://s3-eu-west-1.amazonaws.com/thejumpstarwarsgame/ortho-right-side.jpg'})`;
  const transitionStr = `all ${Math.floor(gameInfo.speed / 1000)}s linear`;
  // console.log('transitionStr', transitionStr);
  playerStyles.transition = transitionStr;
  playerStyles.top = options.startPosition && options.startPosition.top || '0px';
  playerStyles.left = options.startPosition && options.startPosition.left || '0px';

  this.score = 0;
  this.name = options.name || 'Player 1';
  this.el = playerEl;
  this.speed = 100;
  this.laser = Object.assign({
    speed: 1000,
    color: 'lime'
  }, options.laser);
  this.getGameSpeed = function(){
    return gameInfo.speed;
  };
}

Player.prototype = {
  move(dir="right") {
    move(this, dir, this.getGameSpeed());
  },
  fire() {
    fire(this);
  },
  destruct(){
    explode(this);
    const event = new CustomEvent('game_over', { 
      detail: {
        player: this
      }
    });
    document.dispatchEvent(event);
  }
};