;(function(obj, undefined){
	"use strict";

	var id = "utils",
	trace = site.utilities.trace,
	maxWidth = 1600,
    screenBpSm = 750,
    screenBpMd = 1270,
    screenBpLg = 1600;


    function getSegments(id) {

        //trace.push("getSegments")
        var segments = window.location.pathname.split( '/' );

        for (var i = 0; i < segments.length; i++) {
            //trace.push( "segments[i] = "+segments[i] )
        }
        return segments[id];
    }

    function setUrl( seg1, seg2, seg3 ) {

        if (!history.pushState) return;
        var url = "/"+seg1;
        if(seg2 !== undefined && seg2 !== "") url = url + "/" + seg2;
        if(seg3 !== undefined && seg3 !== "") url = url + "/" + seg3;

        history.pushState(null, null, url);

        trace.push("set_url seg1 = "+seg1+" seg2 = "+seg2+" seg3 = "+seg3);

       	//getSegments();

    }

    function queryString(name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }

    function getWidth() {
        var width = Math.round($( window ).innerWidth());
        return width;
    }

    function getWindowHeight() {
       var height = Math.round($( window ).outerHeight());
       return height;
    }

    function getHeight() {
       var height = Math.round($( "#siteHolder" ).outerHeight());
       return height;
    }

    function getPercent() {
        var width = getWidth();
        var percent = width/screenBpSm;

        if ( width > screenBpSm && width <= screenBpMd ) {
            percent = width/screenBpMd;
        }

        if ( width > screenBpMd) {
            percent = width/screenBpLg;
        }

        //trace.push('width = '+width+' screenBpLg = '+screenBpLg+' percent = '+percent);
        return percent;
    }

    

    function divDisplay(id,display,obj) {
        trace.log("divDisplay id = "+id+" display = "+display+" obj "+obj)
        if(id != undefined) obj = $(id);
        obj.css({
            "display":display
            });
    }
    function getTouch() {
        var isTouchDevice = 'ontouchstart' in document.documentElement; 
        return isTouchDevice;   
    }
    function getBreakPoint() {

        var breakPoint = "";

        //trace.push("getDevice pixelDepth = "+pixelDepth+" getWidth = "+getWidth+" getHeight = "+getHeight+" isTouchDevice = "+isTouchDevice);

        //trace.push("getWidth = "+getWidth()+" screenBpSm = "+screenBpSm+" screenBpMd = "+screenBpMd+" screenBpLg = "+screenBpLg);

        var width = getWidth();

        if ( width <= screenBpSm ) {
            //trace.push('bp-small');
            breakPoint = 'bp-small';
            return breakPoint;
        }
        if ( width > screenBpSm && width <= screenBpMd ) {
            //trace.push('bp-small');
            breakPoint = 'bp-medium';
            return breakPoint;
        }

        if ( width > screenBpMd) {
            //trace.push('bp-small');
            breakPoint = 'bp-large';
            return breakPoint;
        }
    
    }

	site.utils = {
		getSegments: getSegments,
		divDisplay: divDisplay,
        getBreakPoint:getBreakPoint,
        getTouch:getTouch,
		getWidth: getWidth,
		getHeight: getHeight,
        getWindowHeight:getWindowHeight,
        setUrl:setUrl,
        getPercent:getPercent,
        screenBpSm:screenBpSm,
        screenBpMd:screenBpMd,
        screenBpLg:screenBpLg
	};

})(window.site=window.site || {});
