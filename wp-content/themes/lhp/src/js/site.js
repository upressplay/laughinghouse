;(function(site, undefined){
	"use strict";


	// Cache Modules
	var trace = site.utilities.trace,
	utils = site.utils,
	breakPoint = "";

	function init() {
		
		var segment0 = utils.getSegments(0);
		var segment1 = utils.getSegments(1);

		var activeSection = "grid";

		trace.push('segment0 = '+segment0);
		if(segment1 == "about" || segment1 == "storytelling" || segment1 == "headlines" || segment1 == "investors" || segment1 == "talent" || segment1 == "terms" || segment1 == "privacy") {
			activeSection = segment1;
		}
		TweenMax.to($('#'+activeSection), 0.25, {opacity:1, onStart:utils.divDisplay, onStartParams:['#'+activeSection, 'block'], ease:"Power1.easeInOut", overwrite:2});

		

		if(/localhost|dev/gi.test(window.location.hostname) || window.location.hostname === '') {trace.output();}
		render();
		
    }

    function render() {
    	trace.push('render');

    	breakPoint = utils.getBreakPoint();
    	
    	if(breakPoint != "bp-small") {

            $( ".downIcon" ).mouseover(function(event) {
                TweenMax.to($(this).find('.downArrow'), 0.25, {top:"50%", ease:"Power1.easeInOut", overwrite:2});
            });

            $( ".downIcon" ).mouseout(function(event) {
                TweenMax.to($(this).find('.downArrow'), 0.25, {top:"40%", ease:"Power1.easeInOut", overwrite:2});
            });  

            $( ".arrow" ).mouseover(function(event) {
                TweenMax.to($(this).find('.arrowArrow'), 0.25, {left:"50%", ease:"Power1.easeInOut", overwrite:2});
            });

            $( ".arrow" ).mouseout(function(event) {
                TweenMax.to($(this).find('.arrowArrow'), 0.25, {left:"40%", ease:"Power1.easeInOut", overwrite:2});
            });    

        }
    }

	trace.push('yo');

	$(function(){
		init();

	});

	

})(window.site=window.site || {});
