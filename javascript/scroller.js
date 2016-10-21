/* 
 * simulate timing function
 * easing functions
 * source https://github.com/danro/easing-js/blob/master/easing.js
 */
var easingFunctions = {
  bounce(pos) {
    var TIMING = 7.5625;
    if (pos < (1 / 2.75)) {
      return (TIMEING * pos * pos);
    } else if (pos < (2 / 2.75)) {
      return (TIMEING * (pos -= (1.5 / 2.75)) * pos + 0.75);
    } else if (pos < (2.5/2.75)) {
      return (TIMEING * (pos -= (2.25 / 2.75)) * pos + 0.9375);
    } else {
      return (TIMEING * (pos -= (2.625 / 2.75)) * pos + 0.984375);
    }
  },
  easeOutSine: function (pos) {
    return Math.sin(pos * (Math.PI / 2));
  },
  easeInOutSine: function (pos) {
    return (-0.5 * (Math.cos(Math.PI * pos) - 1));
  },
  easeInOutQuint: function (pos) {
    if ((pos /= 0.5) < 1) {
      return 0.5 * Math.pow(pos, 5);
    }
    return 0.5 * (Math.pow((pos - 2), 5) + 2);
  }
};

/**
 * 
 * @param scrollTargetY
 * @param speed [Number] millsecond
 * @param easing [String] 
 * @param callback [Function]
 */
function scrollToY(scrollTargetY, speed, easing, callback) {
  var venders = ['ms', 'moz', 'webkit', 'o'];
  var requestAnimationFrame = window.requestAnimationFrame 
                              || window[venders[0] + 'RequesetAnimationFrame']
                              || window[venders[1] + 'RequesetAnimationFrame']
                              || window[venders[2] + 'RequesetAnimationFrame']
                              || window[venders[3] + 'RequesetAnimationFrame'];

  var options = {
    scrollY: window.scrollY || window.pageYOffset || document.documentElement.scrollTop,
    scrollTargetY: scrollTargetY !== undefined ? scrollTargetY : 0,
    speed: speed !== undefined ? speed : 0,
    easing: easing !== undefined ? easing : 0,
  };

  var currentTime = 0;
  var time = Math.max(.05, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .5));

  function tick() {
    currentTime += 1 / 60;

    var p = currentTime / time;
    var t = easingFunctions[easing](p);

    if (p < 1) {
      requestAnimationFrame(tick);
      window.scrollTo(0, scrollY + ((scrollTargetY - scrollY)) * t);
    } else {
      callback && callback.call(null);
      window.scrollTo(0, scrollTargetY);
    }
  }
  
  tick();
}
