import move from './move.js';
import fire from './fire.js';
import explode from './explode.js';

export default function Enemy(options, gameInfo) {
  const enemyEl = document.createElement('div');
  enemyEl.classList.add('enemy');
  enemyEl.style.backgroundImage = `url(${options.craftImage || 'https://s3-eu-west-1.amazonaws.com/thejumpstarwarsgame/TIEfightern.jpg'})`
  enemyEl.style.top = (window.innerHeight / 100) * Math.floor( Math.random() * 100 ) + 'px';
  enemyEl.style.right = (options.number * options.stagger) + 'px';
  const transitionStr = `all ${Math.floor(gameInfo.speed / 1000)}s linear`;
  // console.log('transitionStr', transitionStr);
  enemyEl.style.transition = transitionStr;
  
  this.el = enemyEl;
  this.score = 0;
  this.name = `Enemy #${options.number}`;
  this.speed = 100;
  this.laser = Object.assign({
    speed: 10,
    color: 'red',
    rateOfFire: 5000
  }, options.laser)
  this.isFiring = false;
  this.firingInterval = null;
  this.getGameSpeed = function(){
    return gameInfo.speed;
  };
}

Enemy.prototype = {
  move(dir="left") {
    move(this, dir, this.getGameSpeed());
  },
  fire() {
    if (this.isFiring) {
      return;
    }
    this.isFiring = true;
    fire(this);
    this.firingInterval = setTimeout(() => {
      this.isFiring = false;
    }, this.laser.rateOfFire);
  },
  destruct(){
    explode(this);
    const i = this.squadron.findIndex(function(craft){
      return craft.name === this.name;
    }.bind(this));
    this.squadron = [...this.squadron.slice(0, i), ...this.squadron.slice(i+1)];
    console.log('squadron', this.squadron);
    if (this.squadron.length === 0) {
      const event = new CustomEvent('win', { 
        detail: {
          player: this
        }
      });
      document.dispatchEvent(event);
    }
  }
};