function toArray(elements) {
	if (elements.length) {
	  return [].slice.call(elements);	
	}
	console.warn('elements can not convert to array');
	return [];  
}

function getElementVerticalDistance(element) {
  if(arguments.length !== 1) { throw ArgumentError('wrong arguments length, expected 1, but received' + arguments.length) }
  var elmRect = element.getBoundingClientRect();
  
  var elmX = elmRect.top;
  
  return window.scrollY + elmX;
}

function main() {

	document.addEventListener('DOMContentLoaded', function() {

	})

	document.querySelector('.toc-content').addEventListener('click', e => {
	  e.preventDefault();
	  for(let target = e.target; target && target != this; target=target.parentNode) {
	    if(target.matches('a[href]')) {
	      var attr = target.getAttribute('href');

	      var targetSection = document
	          .querySelector('main')
	          .querySelector(`[id="${attr.substring(1)}"]`);
	      var dist = getElementVerticalDistance(targetSection);
	      scrollToY(dist, 50, 'easeInOutQuint', () => location.hash = attr);

	      break;
	    }
	  }
	});
}

main();