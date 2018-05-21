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

        $( '#site' ).scroll(function() {
            var scroll = $('#site').scrollTop();
            checkScroll(scroll);
        });

        render();    
    }

    function render() {

    	
        trace.log(id+" render utils.getBreakPoint = "+utils.getBreakPoint());

        dom.nav = $('#nav');
        dom.navLogo = $('#navLogo');
        dom.navLogoImg = $('.navLogoImg').find('path');
        dom.navButtons = $("#navButtons");
        dom.navMenuCloseBtn = $("#navMenuCloseBtn");    
        dom.navBtn = $(".navBtn"); 
        dom.socialBtn = $(".socialBtn"); 
        dom.navMenuBtn = $("#navMenuBtn");
        dom.navBtnRoll = $(".navBtnRoll");  

        breakPoint =  utils.getBreakPoint();

        if(breakPoint == "bp-large") {



        }

        dom.navMenuBtn.click(function(event) {
            openMenu();
        });

        dom.navMenuCloseBtn.click(function(event) {
            openMenu();
        });

    }
    
    /*
        checkScroll expands and collapses based on user scroll of the site
        integer scroll is the scroll postion of the page
     */
    function checkScroll(scroll) {

      
        var scrollMax = 40;
        var navOpenH = '10rem';
        var navCloseH = '10rem';
        var breakPoint = utils.getBreakPoint();

        if(breakPoint == "bp-medium") {
            scrollMax = 105;
            navOpenH = '7rem';
            navCloseH = '10rem';
        }

        if(breakPoint == "bp-large") {
            scrollMax = 105;
            navOpenH = '7rem';
            navCloseH = '10rem';
        }
        //trace.push("check_scroll scroll = "+scroll);

        if(scroll > scrollMax) {
            //trace.push("Mr White, what's the deal?");
            if(navCollapsed) return;
            navCollapsed = true;
            TweenMax.to(dom.nav, 0.25, {backgroundColor:"#fff", ease:"Power1.easeInOut", overwrite:2});
            if(breakPoint != "bp-small") {
                TweenMax.to(dom.navLogo, 0.25, {scale:0.55, transformOrigin:"50% 0%", ease:"Power1.easeInOut", overwrite:2});
                TweenMax.to(dom.nav, 0.25, {height:navOpenH, ease:"Power1.easeInOut", overwrite:2});
            }
            
        } else {
            if(!navCollapsed) return;
            navCollapsed = false;
            TweenMax.to(dom.nav, 0.25, {backgroundColor:"transparent",ease:"Power1.easeInOut", overwrite:2});
            if(breakPoint != "bp-small") {
                TweenMax.to(dom.navLogo, 0.25, {scale:1, ease:"Power1.easeInOut", overwrite:2});
                TweenMax.to(dom.nav, 0.25, {height:navCloseH, ease:"Power1.easeInOut", overwrite:2});
            } 
  
        }

    }

    /*
        openMenu opens and closes the mobile nav
     */
    function openMenu() {
        trace.push('openMenu');

        if(menuOpen) {
            menuOpen = false;
            TweenMax.to(dom.navLogoImg, 0.5, {fill:"#25293d", ease:"Power1.easeIn", overwrite:2});
            TweenMax.to(dom.navButtons, 0.5, {opacity:0, onComplete:utils.divDisplay, onCompleteParams:[undefined,"none",dom.navButtons], ease:"Power1.easeIn", overwrite:2});
            TweenMax.to(dom.navMenuCloseBtn, 0.5, {autoAlpha:0, ease:"Power1.easeIn", overwrite:2});
        } else {
            menuOpen = true;
            TweenMax.to(dom.navLogoImg, 0.5, {fill:"#fff", ease:"Power1.easeIn", overwrite:2});
            TweenMax.to(dom.navButtons, 0.5, {opacity:1, onStart:utils.divDisplay, onStartParams:[undefined,"block",dom.navButtons], ease:"Power1.easeIn", overwrite:2});
            TweenMax.to(dom.navMenuCloseBtn, 0.5, {autoAlpha:1, ease:"Power1.easeIn", overwrite:2});
            
        }
        

    }
    /*
        transition handles animations for when users reveal home page video
     */
    function transition() {
    	
    	trace.push(id+" transition color = "+color+" utils.device = "+utils.device);

    	if(color == "dark") {

    		color = "light";

    		TweenMax.to(dom.navLogoImg, 0.5, {fill:"#fff", ease:"Power1.easeIn", overwrite:2});

    		if(breakPoint != "bp-small") {
                TweenMax.to(dom.navBtn, 0.5, {color:"#fff", ease:"Power1.easeIn", overwrite:2});
                TweenMax.to(dom.navBtnRoll, 0.5, {backgroundColor:"#fff", ease:"Power1.easeIn", overwrite:2});
                TweenMax.to(dom.socialBtn, 0.5, {color:"#fff", ease:"Power1.easeIn", overwrite:2});               
            }

            TweenMax.to(dom.navMenuBtn, 0.5, {color:"#fff", borderColor:"#fff", ease:"Power1.easeIn", overwrite:2});

    	} else {

    		color = "dark";

            TweenMax.to(dom.navLogoImg, 0.5, {fill:"#25293d", ease:"Power1.easeIn", overwrite:2});

    		if(breakPoint != "bp-small") {
                TweenMax.to(dom.navBtn, 0.5, {color:"#25293d", ease:"Power1.easeIn", overwrite:2});
                TweenMax.to(dom.navBtnRoll, 0.5, {backgroundColor:"#25293d", ease:"Power1.easeIn", overwrite:2});
                TweenMax.to(dom.socialBtn, 0.5, {color:"#393f5d", ease:"Power1.easeIn", overwrite:2});
            }

            TweenMax.to(dom.navMenuBtn, 0.5, {color:"#25293d", borderColor:"#fff", ease:"Power1.easeIn", overwrite:2});
    	}
    }


	site.nav = {
		transition	: transition,
	};

	$(function(){
		init();
	});

})(window.site=window.site || {});
