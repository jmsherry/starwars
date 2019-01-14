export default function destroy(craft, options = {}) {
  console.log('destroying', craft.name);
  const craftEl = craft.el;
  const styles = craftEl.style;

  styles.backgroundImage = "url(./images/explosion.gif)";
  styles.opacity = '0.5';
  styles.borderRadius = '50%';
  // const {
  //   width: craftWidth,
  //   height: craftHeight,
  //   x: craftXcoord,
  //   y: craftYcoord
  // } = craftEl.getBoundingClientRect();

  // const craftOrigin = {
  //   x: craftXcoord + craftWidth / 2,
  //   y: craftYcoord + craftHeight / 2
  // };

  var settings = Object.assign(
    {
      // particleClass: "particle",
      // origin: craftOrigin, // { x: 0, y: 0 },
      // particles: 550,
      // radius: window.innerWidth,
      complete: function(timeoutLength) {
        console.log('complete');
        setTimeout(() => {
        this.style.opacity = 0;
        this.parentNode.removeChild(this);
        }, timeoutLength);
      }
    },
    options
  );

  // for (let i = 0; i < settings.particles; i+=1) {
  //   // Create and append particle
  //   const particle = document.createElement("div");
  //   particle.classList.add(settings.particleClass);
  //   const particleStyle = particle.style;
  //   particleStyle.position = "absolute";
  //   particleStyle.opacity = "1";
  //   craftEl.appendChild(particle);

  //   // Put particle in position
  //   const { height: particleHeight, width: particleWidth} = particle.getBoundingClientRect();
  //   particleStyle.top = craftOrigin.y - Math.floor(particleHeight / 2);
  //   particleStyle.left = craftOrigin.x - Math.floor(particleWidth / 2);

  //   // Animate particle
  //   const duration = Math.floor(Math.random() * 3) + 1;

  //   particleStyle.transitionDuration =
  //     duration + "s";
  //   particleStyle.transitionProperty = "margin-top, margin-left, opacity";
  //   particleStyle.marginTop =
  //     Math.floor(Math.random() * settings.radius) - settings.radius / 2 + "px";
  //   particleStyle.marginLeft =
  //     Math.floor(Math.random() * settings.radius) - settings.radius / 2 + "px";
  //   particleStyle.opacity = 0.5;
  // }
  settings.complete.call(craftEl, 2500);
}