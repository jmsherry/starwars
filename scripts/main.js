import StarWarsShooter from './shooter.js';

document.addEventListener('DOMContentLoaded', () => {
  const shooter = StarWarsShooter({
    difficulty: 'easy',
    enemies: 3 // ,
    // enemyShipImage: 'https://images.freshop.com/5181/cd987dff8920b920722981024cefd891_medium.png',
    // playerShipImage: 'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/tomato.png'
  });

  const { player } = shooter;

  document.addEventListener("keydown", function takeInput(e) {
    e = e || window.event;
    const keyPressed = e.key;
    switch (keyPressed) {
      case "Up": // IE/Edge specific value
      case "ArrowUp":
        // move the player, with the player's move method
        player.move("up");
        break;
      case "Down":
      case "ArrowDown":
        // move the player, with the player's move method
        player.move("down");
        break;
      case "Left":
      case "ArrowLeft":
        // move the player, with the player's move method
        player.move("left");
        break;
      case "Right":
      case "ArrowRight":
        // move the player, with the player's move method
        player.move("right");
        break;
      case "Enter":
        // use the player's fire method
        player.fire();
        break;

      default:
        console.log(`${keyPressed} was pressed`);
    }
  });
});