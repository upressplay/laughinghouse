;(function(obj, undefined){
	"use strict";

	var id = "posts",
	data = [],
	dom = {},
	trace = site.utilities.trace,
	utils = site.utils,
	current = 0,
	next = 0,
	currentPost = {},
	nextPost = {},
	overlayOpen = false;

	function init() {
		
		render();
	}

	function render() {
		trace.log(id+" render");
		dom.videos = $( ".videos" );
		dom.videos.each(function( index ) {
			var entry = $(this);
			addPost(entry);
		});

		dom.gallery = $( ".gallery" );
		dom.gallery.each(function( index ) {
			var entry = $(this);
			addPost(entry);
		});

		dom.news = $( ".news" );
		dom.news.each(function( index ) {
			var entry = $(this);
			addPost(entry);
		});


		dom.postContent = $( ".postContent" );
		dom.postContent.on('swipeleft', function(e){
			site.posts.gotoNext('next');
		}).on('swiperight', function(e){
			site.posts.gotoNext('prev');
		});

		dom.share = $( ".share" );
		dom.share.each(function( index ) {
			var entry = $(this);
			var type = entry.attr('data-type');
			trace.log('share type = '+type);
			entry.click(function(event) {
				var entry = $(this);
		  		

				var url = entry.attr('data-url');
				var title = entry.attr('data-title');
				var desc = entry.attr('data-desc');
				var type = entry.attr('data-type');
				var options = {"url":url,"title":title,"desc":desc, "type":type};

				trace.log('share options = '+options);
				site.share.url(options);
				
			});
		});

		dom.postOverlay = $( "#postOverlay" );
		
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
			closeOverlay(id);
		});

		dom.rightArrow = $('#'+id).find( ".rightArrow" );
		dom.rightArrow.click(function(event) {
			gotoNext('next');
		});

		dom.leftArrow = $('#'+id).find( ".leftArrow" );
		dom.leftArrow.click(function(event) {
			gotoNext('back');
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
		var imgW = $('#'+id).attr('data-hires-w');
		var imgH = $('#'+id).attr('data-hires-h');
		var imgRatio = imgW/imgH;
		trace.log('imgRatio = '+imgRatio);

		var vidid = post.attr('data-vidid');
		var playlist = post.attr('data-playlist');

		if(!overlayOpen) openOverlay();

		if(cat == "videos") {

			var youtubeUrl = "https://www.youtube.com/embed/"+vidid+"?&autoplay=1";
			if(playlist !== undefined && playlist !== "") youtubeUrl = "https://www.youtube.com/embed/videoseries?list="+playlist+"&autoplay=1";

			post.prepend('<div class="videoPlayerHolder"><div class="videoPlayer"><iframe width="100%" height="100%" src="'+youtubeUrl+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div></div>');

			openPost(id);
			return;

		}

		
		trace.log("img = "+img);
        var new_content = new Image();  
        new_content.id = id;
        new_content.onload = function () {   
            site.posts.openPost(this.id);

        }; 
        var imgClass = "postHeaderImg";
        if(cat == "gallery") {
        	imgClass = "postImg";
        	if(imgRatio<1) imgClass = "postImgTall";
        }


        post.prepend('<div class="'+imgClass+'"><img src="'+img+'"></div>');

        new_content.src = img;

        


	}

	function openOverlay() {
		overlayOpen = true;
		trace.log('openOverlay');
		TweenMax.to(dom.postOverlay, 0.5, {opacity:1, onStart:utils.divDisplay, onStartParams:[undefined,'block',dom.postOverlay], ease:"Power1.easeIn", overwrite:2});	
	}

	function closeOverlay() {
		overlayOpen = false;
		trace.log('closeOverlay');
		TweenMax.to(dom.postOverlay, 0.5, {opacity:0, onComplete:utils.divDisplay, onCompleteParams:[undefined,'none',dom.postOverlay], ease:"Power1.easeIn", overwrite:2});
		closePost();	
	}

	function openPost() {

		trace.log('openPost');
		TweenMax.to(nextPost, 0.5, {opacity:1, onStart:utils.divDisplay, onStartParams:[undefined,'block',nextPost],ease:"Power1.easeIn", overwrite:2});	
		currentPost = nextPost;
	}

	function closePost() {
		trace.log("closePost "+currentPost); 
		TweenMax.to(currentPost, 0.5, {opacity:0, onComplete:site.posts.hidePost, ease:"Power1.easeIn", overwrite:2});
	}

	function hidePost() {
		trace.log("hidePost"); 
		currentPost.find('.videoPlayerHolder').remove();
		currentPost.find('.headerImg').remove();
		currentPost.find('.postHeaderImg').remove();
		currentPost.find('.postImg').remove();
		currentPost.css({"display":"none"}); 

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

		TweenMax.delayedCall( 0.5, site.posts.loadPost, [data[next].id]); 

	}

	// Public API definitions
	site.posts = {
		data:[],
		gotoNext:gotoNext,
		loadPost:loadPost,
		openPost:openPost,
		hidePost:hidePost
	};

	$(function(){
		init();
	});
})(window.site=window.site || {});
