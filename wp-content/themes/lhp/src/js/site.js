;(function(site, undefined){
	"use strict";


	// Cache Modules
	var trace = site.utilities.trace,
	utils = site.utils,
	breakPoint = "";

	function init() {
		render();
    }

    function render() {
    	trace.push('render');

    	breakPoint = utils.getBreakPoint();
    	
    	if(breakPoint != "bp-small") {  

        }
    }

	trace.push('yo');

	$(function(){
		init();

	});

	

})(window.site=window.site || {});
