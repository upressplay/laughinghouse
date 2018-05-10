/**
 * @module swipe
 *
 * @description
 * <p>Listens to the "touchstart" and "touchend" events and fires custom swipe[direction] events based on the start and end X and Y offsets.</p>
 * <p>X direction fires 'swipeleft' or 'swiperight'.</p>
 * <p>Y direction fires 'swipeup' or 'swipedown'.</p>
 * <p>If both X and Y events fire a combined swipeYX ('swipeupleft', 'swipedownright', etc.) event is also fired.</p>
 * <p>All events bubble from original touchstart event target.</p>
 * <p>Only listens to first touch in changedTouches array. Does not have any special handling for multi-touch events/tracking.</p>
 *
 * @example
 * dom.gallery
 * 	.on('swipeleft', function(e){
 * 		dom.sliders.gallery.gotoSlide('next');
 * 	})
 * 	.on('swiperight', function(e){
 * 		dom.sliders.gallery.gotoSlide('prev');
 * 	});
 * 
 */
;(/** @lends module:swipe */ function(n, undefined){
	"use strict";

	var trace = {push: function() {}},	// define trace if not loaded (set in init)
		debug = false,

		touchstartX = 0,
		touchstartY = 0,
		touchendX = 0,
		touchendY = 0,
		swipeTarget = null,	// event target from touchstart
		threshold = 30;	// minimum number of pixels different from start to stop before a "swipe" is triggered in any given direction

	window.addEventListener('touchstart', function(event) {
		touchstartX = event.changedTouches[0].screenX;
		touchstartY = event.changedTouches[0].screenY;
		swipeTarget = event.target;
	}, false);

	window.addEventListener('touchend', function(event) {
		touchendX = event.changedTouches[0].screenX;
		touchendY = event.changedTouches[0].screenY;
		handleGesure();
	}, false); 

	/**
	 * Initializer
	 *
	 * @private
	 */
	function init(){
		// Set module cache after all files have loaded (makes file load order unimportant)
		trace = n.utilities && n.utilities.trace ? n.utilities.trace : {push: function() {}};	// catch in case trace isn't loaded
		debug = n.debug || false;	// listen for global debug flag
	}

	/**
	 * interprets the x and Y differences to fire corrsponding swipe event(s)
	 *
	 * @private
	 */
	function handleGesure() {
		var swipeDir = null,
			swipeX = null,
			swipeY = null,

			diffX = touchstartX-touchendX,
			diffY = touchendY-touchstartY;

		if (Math.abs(diffX) > threshold) {
			swipeX = diffX < 0 ? 'right' : 'left';
		}
		if (Math.abs(diffY) > threshold) {
			swipeY = diffY < 0 ? 'up' : 'down';
		}

		if(swipeX && swipeY) {
			swipeDir = swipeY+swipeX;
		}

		if(swipeX) {
			if(debug) trace.push('swipe'+swipeX+' triggered on ',swipeTarget);

			/**
			 * swipeX event
			 * @event module:swipe#swipeleft
			 */
			/** 
			 * swipeX event
			 * @event module:swipe#swiperight
			 */
			triggerEvent(swipeTarget, 'swipe'+swipeX, {bubbles: true});
		}
		if(swipeY) {
			if(debug) trace.push('swipe'+swipeY+' triggered on ',swipeTarget);
			/**
			 * swipeY event
			 * @event module:swipe#swipeup
			 */
			/** 
			 * swipeY event
			 * @event module:swipe#swipedown
			 */
			triggerEvent(swipeTarget, 'swipe'+swipeY, {bubbles: true});
		}
		if(swipeDir) {
			if(debug) trace.push('swipe'+swipeDir+' triggered on ',swipeTarget);
			/**
			 * swipeYX event
			 * @event module:swipe#swipeupleft
			 */
			/** 
			 * swipeYX event
			 * @event module:swipe#swipeupright
			 */
			/** 
			 * swipeYX event
			 * @event module:swipe#swipedownleft
			 */
			/** 
			 * swipeYX event
			 * @event module:swipe#swipedownright
			 */
			triggerEvent(swipeTarget, 'swipe'+swipeDir, {bubbles: true});
		}
	}

	/**
	 * Set the threshold value for minimum difference in start and stop values before firing a swipe event
	 * @arg  {number}  t  number of pixels
	 */
	function setThreshold(t) {
		threshold = t;
	}

	/**
	 * polyfill to trigger an event so I don't need jQuery
	 * @arg  {object}  el         element to apply event to
	 * @arg  {string}  eventName  name of the event
	 * @arg  {Object}  options    optional parameters to attach to the event
	 * 
	 * @private
	 */
	function triggerEvent(el, eventName, options) {
		var event;
		if (window.CustomEvent) {
			event = new CustomEvent(eventName, options);
		} else {
			event = document.createEvent('Event');
			event.initEvent(eventName, true, true, options);
		}
		el.dispatchEvent(event);
	}

	/**
	 * Turn debugging on/off for this module specifically
	 * @arg  {bool}  bool
	 */
	function setDebug(bool) {
		debug = bool;
	}

	// Public API
	n.utilities = n.utilities || {};
	n.utilities.swipe = {
		setThreshold : setThreshold,
		setDebug : setDebug
	};

	$(function(){
		init();
	});

})(window.site=window.site || {});