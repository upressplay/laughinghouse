;(function(obj, undefined){
	"use strict";

	var id = "story";

    function init() {
        var featuredStories = new site.ui.gallery.Gallery('featuredStories');
        var globalStories = new site.ui.posts.Posts("globalStories",".post",".postImg");
    }

	site.story = {
	
    };

	$(function(){
		init();
	});

})(window.site=window.site || {});
