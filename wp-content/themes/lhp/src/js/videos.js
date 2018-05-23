;(function(obj, undefined){
	"use strict";

	var id = "videos",
	data = [],
	dom = {},
	trace = site.utilities.trace,
	utils = site.utils,
	current = 0,
	next = 0;

	function init() {
		
		render();
	}

	function render() {
		trace.log(id+" render");
		dom.videos = $( ".videos" );
		dom.videos.each(function( index ) {
			var entry = $(this);
			var id = entry.attr('id');

			data.push({"id":id, "vidid":entry.attr('data-vidid'),"playlist":entry.attr('data-playlist')});

			$("#"+id).click(function(event) {
				var id = entry.attr('id');
				openVideo(id);
			});
		});
		

	}

	function setVideo(id) {

	}

	function openVideo(id) {

		for (var i = 0; i < data.length; i++) { 
    		if(id == data[i].id) {
    			current = i;
				var vidid = data[i]['vidid'];
				var playlist = data[i]['playlist'];
			}
		}


		trace.push("openVideo vidId = "+vidid+" playlist = "+playlist);   
		
		$('#site').append('<div id="videoOverlay"></div>');
		dom.videoOverlay = $( "#videoOverlay" );

		dom.videoOverlay.append('<div id="videoOverlayClose">X</div>');

		var youtubeUrl = "https://www.youtube.com/embed/"+vidid+"?&autoplay=1";
		if(playlist !== undefined && playlist !== "") youtubeUrl = "https://www.youtube.com/embed/videoseries?list="+playlist+"&autoplay=1";

		dom.videoOverlay.append('<div id="videoPlayerHolder"><div id="videoPlayer"><iframe width="100%" height="100%" src="'+youtubeUrl+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div></div>');

		dom.closeBtn = $( "#videoOverlayClose" );
		dom.closeBtn.click(function(event) {
			closeVideo();
		});

		TweenMax.to(dom.videoOverlay, 0.5, {opacity:1, ease:"Power1.easeIn", overwrite:2});

		dom.videoOverlay.on('swipeleft', function(e){
			site.videos.gotoNext('next');
		}).on('swiperight', function(e){
			site.videos.gotoNext('prev');
		});

	}

	function closeVideo() {
		trace.push("closeVideo"); 

		TweenMax.to(dom.videoOverlay, 0.5, {opacity:0, onComplete:removeVideo, ease:"Power1.easeIn", overwrite:2});    
	}

	function removeVideo() {
		trace.push("removeVideo"); 

		dom.videoOverlay.remove();  
	}

	function gotoNext(direction){
		trace.log("gotoNext direction = "+direction);
		if(direction == "next") {
			next = current +1;
		} else {
			next = current -1;
		}
		if(next < 0) next = data.length-1;
		if(next > data.length-1) next = 0;

		closeVideo();

		TweenMax.delayedCall( .5, site.videos.openVideo, [data[next]["id"]]); 

	}

	// Public API definitions
	site.videos = {
		data:[],
		openVideo: openVideo,
		gotoNext:gotoNext
	};

	$(function(){
		init();
	});
})(window.site=window.site || {});
