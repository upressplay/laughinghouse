;(function(obj, undefined){
	"use strict";

	var id = "nav",
	color = "dark",
	trace = site.utilities.trace,
    utils = site.utils,
    menuOpen = false,
    dom = {},
    navCollapsed = false,
    breakPoint = "";

	function init() {

        render();    
    }

    function render() {

    	
        trace.log(id+" render utils.getBreakPoint = "+utils.getBreakPoint());

        dom.navButtons = $("#navButtons");
        dom.navMenuCloseBtn = $("#navMenuCloseBtn");    
        dom.navMenuBtn = $("#navMenuBtn");


        dom.navMenuBtn.click(function(event) {
            openMenu();
        });

        dom.navMenuCloseBtn.click(function(event) {
            openMenu();
        });

    }

    /*
        openMenu opens and closes the mobile nav
     */
    function openMenu() {
        trace.push('openMenu');

        if(menuOpen) {
            menuOpen = false;
            TweenMax.to(dom.navButtons, 0.5, {opacity:0, onComplete:utils.divDisplay, onCompleteParams:[undefined,"none",dom.navButtons], ease:"Power1.easeIn", overwrite:2});
            TweenMax.to(dom.navMenuCloseBtn, 0.5, {autoAlpha:0, ease:"Power1.easeIn", overwrite:2});
        } else {
            menuOpen = true;
            TweenMax.to(dom.navButtons, 0.5, {opacity:1, onStart:utils.divDisplay, onStartParams:[undefined,"block",dom.navButtons], ease:"Power1.easeIn", overwrite:2});
            TweenMax.to(dom.navMenuCloseBtn, 0.5, {autoAlpha:1, ease:"Power1.easeIn", overwrite:2});
            
        }
        

    }

	site.nav = {
	};

	$(function(){
		init();
	});

})(window.site=window.site || {});
