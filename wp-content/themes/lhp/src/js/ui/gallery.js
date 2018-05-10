;(function(obj, undefined){
	"use strict";

	var id = "gallery",
	trace = site.utilities.trace,
    utils = site.utils;

    /**
     * Creates a self contained gallery obj
     * @param string id The container div to build Gallery
     * example: var latestNews = new site.ui.gallery.Gallery('latestNews');
     * <?php 
          $count = 0;
          foreach ( $featured as $f ) {
            $title_class = 'entryTitle';
            $title_length = strlen($f['title']);
            if($title_length < 10) $title_class = 'entryTitleLg';

            echo '<a href="'.$f['link'].'">
                    <div class="entry" data-id="'.$count.'" data-img="'.$cdn.$f['img'].'" data-loaded="false">
                      <div class="entryImg"></div>
                      <div class="entryInfo">
                        <div class="entryBack"></div>
                        <div class="entryText">
                          <div class="entrySub">'.$f['sub'].'</div>
                          <div class="'.$title_class.'">'.$f['title'].'</div>
                        </div> <!--entryText-->    
                      </div><!--entryInfo--> 
                    </div><!--entry-->
                  </a>';
            $count++;
          }
      ?> 
     */
    var Gallery = function(id) {
        this.id = id;
        this.data = [];
        this.setStart = -1;
        this.setEnd = -1;
        this.setTotal = -1;
        this.left = -1;
        this.breakPoint = utils.getBreakPoint();
        this.currenBP = utils.getBreakPoint();
        this.touchDevice = utils.getTouch();
        this.reset();

        /// adds click events for bp-large and bp-medium and swipe events for bp-small
        var thisobj = this;

        this.arrowLeft = $("#"+id).find( ".arrowLeft" );
        this.arrowRight = $("#"+id).find( ".arrowRight" );

        if(this.breakPoint =="bp-medium" || this.breakPoint == "bp-large") {
            
            this.arrowLeft.click(function(event) {
                thisobj.next('left'); 
            });
            
            this.arrowRight.click(function(event) {
                thisobj.next('right'); 
            });

        } else {

            $("#"+id).on('swipeleft', function(e){
                thisobj.next('right'); 
            });

            $("#"+id).on('swiperight', function(e){
                thisobj.next('left'); 
            });

        }
        
        $( window ).resize(function() { thisobj.resize(); });

        setTimeout(function(){ thisobj.build(); }, 100);
    };

	/**
     * Finds all .entry class divs and adds them to the data array then sets the first entry by calling this.next
     */
    Gallery.prototype.build = function() {
        //trace.log(this.id+' build');
        var thisobj = this;
        $( "#"+this.id ).find( ".entry" ).each(function( index ) {
            var entry = $(this);
            var loaded = entry.attr('data-loaded');
            var img = entry.attr('data-img');
            thisobj.data.push({"entry":entry,"loaded":loaded, "img":img});
        });

        this.next("right");
    };
    /**
     * next calculates the next set of entries to reveal along with setting the postion to animate to
     * string direction sets the direction in the sequence to animate to
     */

    Gallery.prototype.next = function(direction) {

        

        trace.push(this.id+"    next direction = "+direction);
        trace.push("breakPoint = "+this.breakPoint+" this.setStart = "+this.setStart+" this.setEnd = "+this.setEnd+" this.setTotal = "+this.setTotal+" this.data.length  = "+this.data.length+" this.left = "+this.left);

        if(direction == "left") {
            if(this.breakPoint == "bp-small") {
                this.setStart = this.setStart - this.setTotal;
                this.setEnd = this.setEnd - this.setTotal;

                if(this.setStart <= 0) {
                    this.setStart = 0;
                    this.setEnd = this.setStart + this.setTotal;
                }
            } else {
                this.setStart = this.setStart - this.setTotal;
                this.setEnd = this.setEnd - this.setTotal;

                if(this.setStart <= 0) {
                    this.setStart = 0;
                    this.setEnd = this.setStart + this.setTotal-1;

                }     
            }
            

        } else {

            if(this.breakPoint == "bp-small") {
                
                this.setEnd = this.setStart + this.setTotal;
                this.setStart = this.setEnd;
                if(this.setEnd >= this.data.length-1) {
                    this.setEnd = this.data.length-1;
                    this.setStart = this.setEnd;  
                    ////this.setStart = this.data.length - this.setTotal;
                } 
                
            } else {
                this.setStart = this.setStart + this.setTotal;
                this.setEnd = this.setEnd + this.setTotal;

                if(this.setEnd >= this.data.length-1) {
                    this.setEnd = this.data.length-1;
                    this.setStart = this.data.length - this.setTotal ;
                }   
            }
        }

        /// calculates the left postion to animate to
        var start;
        var width;
        var endLeft;

        if(this.breakPoint == "bp-small") {
            start = 0;
            width = 66.1;
            //this.left = start + width - (this.setEnd * width);
            this.left = start - (this.setStart * width);
        }
        if(this.breakPoint == "bp-medium") {
            start = 13;
            width = 33;
            this.left = start + (width * 2) - (this.setEnd * width);
        }
        if(this.breakPoint == "bp-large") {
            
            start = 14;
            width = 44.2;
            this.left = start + (width * 2) - (this.setEnd * width);
            trace.push("-------------- this.left = "+this.left+" = endLeft = "+endLeft+" start = "+start+" width = "+width);

        }

        // hides and reveals the arrow buttons
        if(this.breakPoint != "bp-small") {
            if(this.setStart <= 0) {
                TweenMax.to(this.arrowLeft, 0.25, {opacity:0, onComplete:utils.divDisplay, onCompleteParams:[undefined,'none',this.arrowLeft], ease:"Power1.easeInOut", overwrite:2});
            } else {
                TweenMax.to(this.arrowLeft, 0.25, {autoAlpha:1, onStart:utils.divDisplay, onStartParams:[undefined,'block',this.arrowLeft], ease:"Power1.easeInOut", overwrite:2});
            }

            if(this.setEnd >= this.data.length-1) {
                TweenMax.to(this.arrowRight, 0.25, {autoAlpha:0, onComplete:utils.divDisplay, onCompleteParams:[undefined,'none',this.arrowRight], ease:"Power1.easeInOut", overwrite:2});
            } else {
                TweenMax.to(this.arrowRight, 0.25, {autoAlpha:1, onStart:utils.divDisplay, onStartParams:[undefined,'block',this.arrowRight], ease:"Power1.easeInOut", overwrite:2});
            }    
        } else {
            utils.divDisplay(undefined,'none',this.arrowLeft); 
            utils.divDisplay(undefined,'none',this.arrowRight);   
        }
        

        trace.push("this.setStart = "+this.setStart+" this.setEnd = "+this.setEnd+" this.setTotal = "+this.setTotal+" this.left = "+this.left);


        this.set();
    };

    /**
     * loads any entries that have not been loaded yet
     * animates the background block of the info div
     * moves enteries to the right postion
     */
    Gallery.prototype.set = function() {
        trace.push(this.id+" set");

        var delay = 0;
        for (var i = 0; i < this.data.length; i++) {

            var end = this.setEnd;

            trace.push("i = "+i+" this.setStart= "+this.setStart+" this.setEnd = "+this.setEnd+" this.data[i].loaded = "+this.data[i].loaded);
            if(this.breakPoint == "bp-small") {
                end = this.setEnd+1;
                if(i >= this.setStart && i <= end && this.data[i].loaded == "false") {
                    this.load(i,this.data[i].img);   
                }
            } else {
                end = this.setEnd+1;
                if(end > this.data.length-1) end = this.data.length-1;
                if(i >= this.setStart && i <= end && this.data[i].loaded == "false") {
                    this.load(i,this.data[i].img);   
                }

                    
            }

            if(i >= this.setStart && i <= this.setEnd) {

                TweenMax.to(this.data[i].entry.find('.entryBack'), 0.5, {delay:delay, height:this.entryBackHActive()+"rem", ease:"Power1.easeInOut", overwrite:2});  
                delay = delay + 0.2;
            } else {
                TweenMax.to(this.data[i].entry.find('.entryBack'), 0.5, {delay:0, height:this.entryBackHInactive()+"rem", ease:"Power1.easeInOut", overwrite:2}); 
            }
            
            
            
        }

        TweenMax.to($('#'+this.id).find('.entriesHolder'), 0.5, {marginLeft:this.left+"rem", ease:"Power1.easeInOut", overwrite:2});


    };

    /**
     * loads the image
     * integer id identifies the entry in the data array
     * string img file path to img asset
     */

    Gallery.prototype.load = function(id,img) {

        trace.push(this.id+" load img = "+img);
        var thisobj = this;
        var new_content = new Image();  
        new_content.id = id;
        new_content.onload = function () {   
            thisobj.loaded(this.id);

        }; 
        this.data[id].entry.find('.entryImg').html('<img src="'+img+'">');

        new_content.src = img;
    };

    /**
     * reveals the entry div once the image is loaded
     * integer id identifies the entry in the data array
     */

    Gallery.prototype.loaded = function(id) {

        trace.push(this.id+" loaded id = "+id);
        this.data[id].loaded = true;
        TweenMax.to(this.data[id].entry, 0.25, {autoAlpha:1, ease:"Power1.easeInOut", overwrite:2});
    };

    Gallery.prototype.resize = function() {

        //trace.push('resize');

        this.currenBP = utils.getBreakPoint();

        if(this.breakPoint == this.currenBP) {
            return;
        }
        this.breakPoint = this.currenBP;
        this.reset();
        this.next('right');
    };
    /*
        resets the values used to sort and navigate the gallery. Set at the beginning and on resize when the breakpoint changes
     */
    Gallery.prototype.reset = function() {

        //trace.push('reset');

        this.setStart = -3;
        this.setEnd = -1;
        this.setTotal = 3;

        this.left = 0;

        if(this.breakPoint == "bp-small") {
            this.setStart = -1;
            this.setEnd = 0;
            this.setTotal = 1;    
        }
    };


    /**
     * rem height for the info background div
     * @return integer rem value to animate the background div to
     */
    Gallery.prototype.entryBackHActive = function() {

        var value;
        if(this.breakPoint == "bp-small") {
            value =11;
        }
        if(this.breakPoint == "bp-medium") {
            value = 9;
        }
        if(this.breakPoint == "bp-large") {
            
            value = 9;
        }
        return value;
    };
    /**
     * rem height for the rest state of the info background div
     * @return integer rem value to animate the background div to
     */
    Gallery.prototype.entryBackHInactive = function() {

        var value;
        if(this.breakPoint == "bp-small") {
            value = 1;
        }
        if(this.breakPoint == "bp-medium") {
            value = 1;
        }
        if(this.breakPoint == "bp-large") {
            
            value = 1;
        }
        return value;
    };

	// Public API definitions
    site.ui = site.ui || {};// 
	site.ui.gallery = {
	   Gallery:Gallery
    };


})(window.site=window.site || {});
