import { unitRegex } from './utilities.js';
export default function move(craft, direction) {
  if (!craft) {
    console.error(`No craft specified. Exiting...`);
    return;
  }
  const craftElement = craft.el;
  if (!craft.el) {
    console.error(`No craft element present. Exiting...`);
    return;
  }
  const possibleDirections = ["up", "down", "left", "right"];
  if (!possibleDirections.includes(direction.toLowerCase())) {
    console.log(`Direction '${direction}' not recognised`);
    return;
  }
  console.log(`moving ${craft.name} ${direction}`);

  let directionProperty = null;
  let parsedPosition = null;
  
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
  console.log('parsedPosition', parsedPosition);
  let number = Number(parsedPosition[1]);

  if (direction === "up" || direction === "left") {
    number -= craft.speed;
  } else if (direction === "down" || direction === "right") {
    number += craft.speed;
  }
  craftElement.style[directionProperty] = `${number}px`;
}