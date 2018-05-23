;(function(obj, undefined){
	"use strict";

	var id = "gallery",
	data = [],
	dom = {},
	trace = site.utilities.trace,
	utils = site.utils;

	function init() {
		
		render();
	}

	function render() {
		trace.log(id+" render");

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



	}
	function openGallery(vidid, playlist) {
		trace.push("openGallery vidId = "+vidid+" playlist = "+playlist);   
		
		$('#site').append('<div id="galleryOverlay"></div>');
		dom.galleryOverlay = $( "#galleryOverlay" );

		dom.galleryOverlay.append('<div id="galleryOverlayClose">X</div>');

		var youtubeUrl = "https://www.youtube.com/embed/"+vidid+"?&autoplay=1";
		if(playlist !== undefined && playlist !== "") youtubeUrl = "https://www.youtube.com/embed/videoseries?list="+playlist+"&autoplay=1";

		dom.galleryOverlay.append('<div id="videoPlayerHolder"><div id="videoPlayer"><iframe width="100%" height="100%" src="'+youtubeUrl+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div></div>');

		dom.closeBtn = $( "#galleryOverlayClose" );
		dom.closeBtn.click(function(event) {
			closeGallery();
		});

		TweenMax.to(dom.galleryOverlay, 0.5, {opacity:1, ease:"Power1.easeIn", overwrite:2});

		dom.galleryOverlay.on('swipeleft', function(e){
			site.gallery.gotoNext('next');
		}).on('swiperight', function(e){
			site.gallery.gotoNext('prev');
		});

	}

	function closeGallery() {
		trace.push("closeGallery"); 

		TweenMax.to(dom.galleryOverlay, 0.5, {opacity:0, onComplete:removeGallery, ease:"Power1.easeIn", overwrite:2});    
	}

	function removeGallery() {
		trace.push("removeGallery"); 

		dom.galleryOverlay.remove();  
	}

	function gotoNext(direction){
		trace.log("gotoNext direction = "+direction);
		data.forEach(function( element ) {
			trace.log(element)
		});
	}

	// Public API definitions
	site.gallery = {
		data:[],
		openVideo: openGallery,
		gotoNext:gotoNext
	};

	$(function(){
		init();
	});
})(window.site=window.site || {});
