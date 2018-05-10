/**
 * @module trace
 * 
 * @description 
 * <p>The Trace module is used in place of console.log() so it can be turned on and off based on environment and suppress errors on older browsers that don't support console when it is closed (IE).</p>
 * <p>This version will store all elements passed to it when output is off so it can be retreived when debugging in a QA/Prod environment.</p>
 *
 * @example
 * // Turn on output for localhost,dev environment, or when running local
 * if(/localhost|dev/gi.test(window.location.hostname) || window.location.hostname === '') {trace.output();}
 * 
 * // Push string, array, object, or a comma delimited combination thereof to trace
 * trace.push('hello world');
 * trace.push('hello','world','how you doin\'?');
 * trace.push(['this','is','an','array'],'this is a string',{'this':'object'});
 * 
 * // in console you can dump the contents of trace in a production or QA environment using
 * trace.dump();
 * 
 */
 
;(/** @lends module:trace */ function(n, undefined){
	"use strict";


	var op = false,
		queue = [];

	/**
	 * Adds entries to a queue for writing to the console.
	 * @arg {...*} content DOM element, text node, array of elements and text nodes, HTML string, or jQuery object to log to the console.
	 */
	function push(){
		var arr;

		for (var i=0,len=arguments.length;i<len;i++) {
			arr = arguments[i];
			queue.push(arr);
		}
		if(op){
			dump();
		}
	}

	/**
	 * Dumps the contents of the log queue to the console at once and empties the queue.
	 */
	function dump(){
		var arr;

		for(var i=0,len=queue.length;i<len;i++) {
			arr = queue[i];
			log(arr);
		}
		queue = [];
	}

	/**
	 * Turns automatic logging to the console on and initiates a dump of anything in the queue.
	 */
	function output() {
		op = true;
		dump();
	}

	/**
	 * Replacement function for browser's console.log in the event the browser doesn't support it
	 * @arg  {*}  data  element to post to log
	 *
	 * @private
	 */
	
	function log(data){
		console.log(data);
	}

	// Public API definitions
	n.utilities = n.utilities || {};
	n.utilities.trace = {
		push : push,
		output : output,
		dump : dump,
		log : log
	};

	// If browser doesn't support console, create a dummy object/function to call so it doesn't break
	if (!window.console){
		console = {
			log: function() {}
		};
	}
})(window.site=window.site || {});
