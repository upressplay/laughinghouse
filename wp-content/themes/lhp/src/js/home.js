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
		trace.log(id+" render");
		dom.videos = $( ".videos" );
		dom.videos.each(function( index ) {
			var entry = $(this);
			var id = entry.attr('id');
			$("#"+id).click(function(event) {
				var vidid = entry.attr('data-vidid');
				var playlist = entry.attr('data-playlist');
				openVideo(vidid,playlist);
			});
		});

		dom.gallery = $( ".gallery" );
		dom.gallery.each(function( index ) {
			var entry = $(this);
			var id = entry.attr('id');
			$("#"+id).click(function(event) {
				var vidid = entry.attr('data-vidid');
				var playlist = entry.attr('data-playlist');
				openGallery(vidid,playlist);
			});
		});

		var segment1 = utils.getSegments(1);
		trace.push("segment1 = "+segment1);
		if(segment1 === ""){
			TweenMax.delayedCall( 1, openVideo, [undefined,"UUNARSoer9Ix86pMwP1EpTLQ"], site.home );
		}
		

	}
	function openVideo(vidid, playlist) {
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
