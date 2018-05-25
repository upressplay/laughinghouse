;(function(obj, undefined){
	"use strict";

	var id = "videos",
	data = [],
	dom = {},
	trace = site.utilities.trace,
	utils = site.utils,
	current = 0,
	next = 0,
	currentPost = {},
	nextPost = {};

	function init() {
		
		render();
	}

	function render() {
		trace.log(id+" render");

		
	}

	function addPost(entry) {

		trace.log("addPost entry = "+entry);

		var id = entry.attr('data-postid');
		trace.log("addPost id = "+id);
		data.push({"id":id});

		entry.click(function(event) {
			event.stopPropagation();
	  		event.preventDefault();
	  		
			var id = entry.attr('data-postid');

			trace.log('click = '+id);
			loadPost(id);
			
		});

		dom.postClose = $('#'+id).find( ".postClose" );
		dom.postClose.click(function(event) {
			var entry = $(this);
			var id = entry.attr('data-postid');
			trace.log('click closePost');
			closePost(id);
		});

	}
	function loadPost(id) {

		trace.log("loadPost id = "+id);

		for (var i = 0; i < data.length; i++) { 
    		if(id == data[i].id) {
    			current = i;
			}
		}

		var post = $('#'+id);
		nextPost = post;
		var cat = post.attr('data-cat');

		var img = $('#'+id).attr('data-hires');
		var vidid = post.attr('data-vidid');
		var playlist = post.attr('data-playlist');

		if(cat == "videos") {

			var youtubeUrl = "https://www.youtube.com/embed/"+vidid+"?&autoplay=1";
			if(playlist !== undefined && playlist !== "") youtubeUrl = "https://www.youtube.com/embed/videoseries?list="+playlist+"&autoplay=1";

			post.append('<div class="videoPlayerHolder"><div class="videoPlayer"><iframe width="100%" height="100%" src="'+youtubeUrl+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div></div>');

			openPost(id);
			return;

		}

		
		trace.log("img = "+img);
        var new_content = new Image();  
        new_content.id = id;
        new_content.onload = function () {   
            site.videos.openPost(this.id);

        }; 
        post.find('.headerImg').append('<img src="'+img+'">');

        new_content.src = img;

        


	}
	function openPost(id) {

		trace.log('openPost id = '+id);
		nextPost.css({"display":"table"});
		TweenMax.to(nextPost, 0.5, {opacity:1, ease:"Power1.easeIn", overwrite:2});	
		currentPost = nextPost;
	}

	function closePost(id) {
		trace.log("closePost"); 

		TweenMax.to(currentPost, 0.5, {opacity:0, onComplete:site.videos.hidePost, ease:"Power1.easeIn", overwrite:2}); 

	}

	function hidePost() {
		trace.log("hidePost"); 
		currentPost.find('.videoPlayerHolder').remove();
		currentPost.css({"display":"none"}); 

	}


	function buildVidPlayer() {

	}
	function openVideo(id) {
		var vidid;
		var playlist;

		for (var i = 0; i < data.length; i++) { 
    		if(id == data[i].id) {
    			current = i;
				vidid = data[i].vidid;
				playlist = data[i].playlist;
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

		closePost();

		TweenMax.delayedCall( 0.5, site.videos.openVideo, [data[next].id]); 

	}

	// Public API definitions
	site.videos = {
		data:[],
		openVideo: openVideo,
		gotoNext:gotoNext,
		openPost:openPost,
		hidePost:hidePost
	};

	$(function(){
		init();
	});
})(window.site=window.site || {});
