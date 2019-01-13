import StarWarsShooter from './shooter.js';

document.addEventListener('DOMContentLoaded', () => {
  const shooter = StarWarsShooter({
    difficulty: 'easy',
    enemies: 1 //,
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
        break;
      case "Down": // IE/Edge specific value
      case "ArrowDown":
        // move the player, with the player's move method
        break;
      case "Left": // IE/Edge specific value
      case "ArrowLeft":
        // move the player, with the player's move method
        break;
      case "Right": // IE/Edge specific value
      case "ArrowRight":
        // move the player, with the player's move method
        break;
      case "Enter":
        // use the player's fire method
        break;
      case "e":
        player.destruct();
        break;

      default:
        console.log(`${keyPressed} was pressed`);
    }
  });
});