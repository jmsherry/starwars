/**
 * Detects if two elements are colliding
 *
 * Credit goes to BC on Stack Overflow, cleaned up a little bit
 *
 * @link http://stackoverflow.com/questions/5419134/how-to-detect-if-two-divs-touch-with-jquery
 * @param $div1
 * @param $div2
 * @returns {boolean}
 */

 function offset(el) {
    const { top, left } = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: top + scrollTop, left: left + scrollLeft };
}
function dimensions(el) {
  const { width, height } = el.getBoundingClientRect();
  return { width, height };
}
export function isColliding( $div1, $div2 ) {
	// Div 1 data
	var d1_offset             = offset($div1);
	var d1_height             = dimensions($div1).height;
	var d1_width              = dimensions($div1).width;
	var d1_distance_from_top  = d1_offset.top + d1_height;
	var d1_distance_from_left = d1_offset.left + d1_width;

	// Div 2 data
	var d2_offset             = offset($div2);
	var d2_height             = dimensions($div2).height;
	var d2_width              = dimensions($div2).width;
	var d2_distance_from_top  = d2_offset.top + d2_height;
	var d2_distance_from_left = d2_offset.left + d2_width;

	var not_colliding = ( d1_distance_from_top < d2_offset.top || d1_offset.top > d2_distance_from_top || d1_distance_from_left < d2_offset.left || d1_offset.left > d2_distance_from_left );

	// Return whether it IS colliding
	return ! not_colliding;
};

export function checkCollisions(laserEl, targets) {
  for (const target of targets) {
    if (isColliding(target.el, laserEl)) {
      target.destruct();
      laserEl.parentNode.removeChild(laserEl);
      return true; // can only kill 1 thing
    }
  }
}

export const unitRegex = /^(-?\d+(?:\.\d+)?)(.*)$/;