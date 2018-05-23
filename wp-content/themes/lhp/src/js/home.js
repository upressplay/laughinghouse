;(function(obj, undefined){
	"use strict";

	var id = "home",
	data = [],
	dom = {},
	trace = site.utilities.trace,
	utils = site.utils;

	function init() {
		
		render();
	}

	function render() {
		

	}

	// Public API definitions
	site.home = {
		data:[]
	};

	$(function(){
		init();
	});
})(window.site=window.site || {});
