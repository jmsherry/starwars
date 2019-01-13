import { unitRegex } from './utilities.js';


export default function move(craft, direction, gameSpeed) {
  if (!craft) {
    console.error(`No craft specified. Exiting...`);
    return;
  }
  const craftElement = craft.el;
  const isPlayer = craftElement.id === 'player';
  if (!craft.el) {
    console.error(`No craft element present. Exiting...`);
    return;
  }
  const possibleDirections = ["up", "down", "left", "right"];
  if (!possibleDirections.includes(direction.toLowerCase())) {
    console.log(`Direction '${direction}' not recognised`);
    return;
  }
  // console.log(`moving ${craft.name} ${direction}`);

  let directionProperty = null;
  let parsedPosition = null;
  const edgeTollerance = 500;
  
  if(direction === 'left' || direction === 'right') {
    directionProperty = 'left';
    let {left:currentXPosition} = craftElement.style;
    if (currentXPosition === "") {
      const {left:CSSLeft} = window.getComputedStyle(craftElement);
      currentXPosition = craftElement.style.left = CSSLeft;
    }
    parsedPosition = currentXPosition.match(unitRegex);
  } else {
    directionProperty = 'top';
    let {top:currentYPosition} = craftElement.style;
    if (currentYPosition === "") {
      const {top:CSSTop} = window.getComputedStyle(craftElement);
      currentYPosition = craftElement.style.top = CSSTop;
    }
    parsedPosition = currentYPosition.match(unitRegex);
  }
  // console.log('parsedPosition', parsedPosition);
  let number = Number(parsedPosition[1]);

  if (direction === "up" || direction === "left") {
    number -= craft.speed;
  } else if (direction === "down" || direction === "right") {
    number += craft.speed;
  }

  // Screen wrapping (could refactor)
  if (direction === "left" || direction === "right") {
    if(number > (window.innerWidth + edgeTollerance)) {
      number = 0;
      // if (!isPlayer) {
      //   console.log(`repositioning ${craft.name}`);
      //   console.log(`top was ${craftElement.style.top}`);
      //   craftElement.style.top = `${Math.floor(Math.random() * window.innerHeight)}px`;
      //   console.log(`top wais now ${craftElement.style.top}`);
      // }
    } else if (number < (0 - edgeTollerance)) {
      if (!isPlayer) {
        const oldTransition = craftElement.style.transition;
        craftElement.style.transition = '';
        // console.log(`repositioning ${craft.name}`);
        // console.log(`top was ${craftElement.style.top}`);
        craftElement.style.top = `${Math.floor(Math.random() * window.innerHeight)}px`;
        // console.log(`top was now ${craftElement.style.top}`);
        setTimeout(() => {
        craftElement.style.transition = oldTransition;
        }, gameSpeed);
      }
      number = window.innerWidth;
    }
  } else {
    if(number > (window.innerHeight + edgeTollerance)) {
      number = 0;
    } else if (number < (0 - edgeTollerance)) {
      number = window.innerHeight;
    }
  }
  craftElement.style[directionProperty] = `${number}px`;
  
}