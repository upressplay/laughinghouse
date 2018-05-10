;(function(obj, undefined){
	"use strict";

	var id = "posts",
	trace = site.utilities.trace,
	utils = site.utils;


    var Posts = function(id,postClass,postImgClass) {
        this.id = id;
        this.postClass = postClass;
        this.postImgClass = postImgClass;
        this.data = [];
        this.setStart = 0;
        this.setEnd = -1;
        this.setTotal = 3;
        this.breakPoint = utils.getBreakPoint();
        this.loading = false;
        this.toLoad = 3;
        this.postLoaded = 0;
        this.loadMoreBtn = $("#"+id).find( ".postsLoadMore" );

        if(this.breakPoint == "bp-small") {
            this.setStart = 0;
            this.setEnd = 0;
            this.setTotal = 1;    
        }

        trace.push('this.breakPoint = '+this.breakPoint);
        if(this.breakPoint == "bp-medium") {
            this.setStart = 0;
            this.setEnd = 0;
            this.setTotal = 2;    
        }

        var thisobj = this;
      	/*this.loadMoreBtn.click(function(event) {
            thisobj.load(); 
        });*/   

        $( '#site' ).scroll(function() {
            var scroll = $('#site').scrollTop();
            thisobj.check_scroll(scroll);
        });

        setTimeout(function(){ thisobj.build(); }, 100);
    };
    

    Posts.prototype.check_scroll = function(scroll) {

        //trace.push(this.id+' check_scroll scroll = '+scroll+" utils.getHeight() = "+utils.getHeight());
        
    };

    Posts.prototype.build = function() {

    	//trace.push(this.id+' build');
        var thisobj = this;

        $( "#"+this.id ).find( this.postClass ).each(function( index ) {
            var entry = $(this);
            var img = entry.attr('data-img');
            //trace.push(this.id+' img = '+img)
            thisobj.data.push({"entry":entry,"img":img,"loaded":false});
        });

        this.load();
    };

    Posts.prototype.load = function() {

        //trace.push(this.id+" load");

        if(this.loading) return;
        this.loading = true;
        this.setEnd = this.setEnd + this.setTotal;
        this.postLoaded = 0;

        for (var i = 0; i < this.data.length; i++) {
        	if(i <= this.setEnd && !this.data[i].loaded) {
	        	this.creatImg(i);   	
        	}
        }
    };

    Posts.prototype.creatImg = function( id, img ) {

        var thisobj = this; 
        var new_img = new Image();  
        new_img.id = id;
        new_img.onload = function () {   
            thisobj.loaded(this.id);

        }; 
        this.data[id].entry.find(this.postImgClass).append('<img src="'+this.data[id].img+'">');

    	new_img.src = this.data[id].img;     	

        
    };
    Posts.prototype.loaded = function(id) {

    	this.postLoaded++;
    	if(this.postLoaded == this.setTotal) {
    		this.loading = false;
    		if(this.setEnd == this.data.length-1) {
    			TweenMax.to(this.loadMoreBtn, 0.25, {opacity:0, onComplete:utils.divDisplay, onCompleteParams:[undefined,'none',this.loadMoreBtn],ease:"Power1.easeInOut", overwrite:2});
	
    		}

    	}
        trace.push(this.id+" loaded id = "+id);
        this.data[id].loaded = true;
        TweenMax.to(this.data[id].entry, 0.25, {opacity:1, onStart:utils.divDisplay, onStartParams:[undefined,'inline-block',this.data[id].entry],ease:"Power1.easeInOut", overwrite:2});
    };

    function render() {
    	
        trace.push(id+" render");


    }

    function loadMore(id) {
    	trace.push("loadMore id = "+id);
    }

    
	// Public API definitions
    site.ui = site.ui || {};// // 
	site.ui.posts = {
        Posts:Posts
	};

})(window.site=window.site || {});
