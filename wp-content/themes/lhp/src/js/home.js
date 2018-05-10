;(function(obj, undefined){
	"use strict";

	var id = "home",
	data = [],
	dom = {},
	trace = site.utilities.trace,
	utils = site.utils;

	function init() {
		data = grid_data;
		// render();
		$( ".videos" ).each(function( index ) {
			var entry = $(this);
			var id = entry.attr('id');
			$("#"+id).click(function(event) {
				var vid_id = entry.attr('vidId');
				var win = window.open("https://www.youtube.com/watch?v="+vid_id, '_blank');
				win.focus();
			});
		});
	}

	function render() {
		trace.push(id+" render");
		dom.videos = $( ".videos" );
		dom.videos.each(function( index ) {
			var entry = $(this);
			var id = entry.attr('id');
			$("#"+id).click(function(event) {
				var vid_id = entry.attr('vidId');
				openVideo(vid_id);
			});
		});

		var segment1 = utils.getSegments(1);
		trace.push("segment1 = "+segment1);
		if(segment1 === ""){
			TweenMax.delayedCall( 1, openVideo, [undefined,"PLoQzwOjEjuqiOEuUaxGZPpCF0BtVvP4y3"], site.home );
		}
		

	}
	function openVideo(vid_id, playlist) {
		trace.push("openVideo vid_id = "+vid_id+" playlist = "+playlist);   
		
		$('#site').append('<div id="videoOverlay"></div>');
		dom.videoOverlay = $( "#videoOverlay" );

		dom.videoOverlay.append('<div id="videoOverlayClose">X</div>');

		var youtubeUrl = "https://www.youtube.com/embed/"+vid_id+"?&autoplay=1";
		if(playlist !== undefined) youtubeUrl = "https://www.youtube.com/embed/videoseries?list="+playlist+"&autoplay=1";

		dom.videoOverlay.append('<div id="videoPlayerHolder"><div id="videoPlayer"><iframe width="100%" height="100%" src="'+youtubeUrl+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div></div>');

		dom.closeBtn = $( "#videoOverlayClose" );
		dom.closeBtn.click(function(event) {
			closeVideo();
		});

		TweenMax.to(dom.videoOverlay, 0.5, {opacity:1, ease:"Power1.easeIn", overwrite:2});

	}

	function closeVideo() {
		trace.push("closeVideo"); 

		TweenMax.to(dom.videoOverlay, 0.5, {opacity:0, onComplete:removeVideo, ease:"Power1.easeIn", overwrite:2});    
	}

	function removeVideo() {
		trace.push("removeVideo"); 

		dom.videoOverlay.remove();  
	}

	// Public API definitions
	site.home = {
		data:[],
		openVideo: openVideo
	};

	$(function(){
		init();
	});
})(window.site=window.site || {});
