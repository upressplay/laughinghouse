;(function(obj, undefined){
	"use strict";

	var id = "talent",
	trace = site.utilities.trace,
    utils = site.utils,
    data = [],
    subsort = [],
    desc = [],
    nav = [],
    setStart = 0,
    setEnd = 7,
    setTotal = 8,
    currenSort = "",
    subSubClass = "",
    dom = {},
    sortData = [],
    breakPoint = "",
    activeHover;


	function init() {

        breakPoint =  utils.getBreakPoint();

        dom.talentDept = $( ".talentDept" );
        dom.talentDept.each(function( index ) {
            var entry = $(this);
            var id = entry.attr('data-id');
            //trace.push('talentDept id = '+id)
            desc.push({"entry":entry,"id":id});
        });

        dom.talentPerson = $( ".talentPerson" );
        dom.talentPerson.each(function( index ) {
            var entry = $(this);
            var sort = $(this).attr('data-sort');
            sort = sort.split(',');
            var id = entry.attr('data-id');
            var img = entry.attr('data-img');
            var bio = entry.attr('data-bio');
            var dept = entry.attr('data-dept');
            var title = entry.attr('data-title');
            var name = entry.attr('data-name');
            data.push({"index":index,"entry":entry,"sort":sort, "id":id, "img":img, "bio":bio, "dept":dept, "title":title, "name":name, "loaded":false });
            
            dom.talentImage = $(this).find('.talentImg');


            if(breakPoint === "bp-large") {
                dom.talentImage.mouseover(function(event) {
                    showHover($(this));   
                    
                });
                dom.talentImage.mouseout(function(event) {
                    hideHover();   
                });    
            }

            dom.talentImage.click(function(event) {
                var active = $(this).attr('data-active');
                var hover = $(this).find('.talentHover');

                trace.push("active  "+active);

                if(active == "true") {
                    hideHover();
                } else {
                    showHover($(this));   
                }
    
            });  
            

        });

        dom.sortBtn = $( ".sortBtn" );

        dom.sortBtn.each(function( index ) {
            var entry = $(this);
            var parent = entry.attr('data-parent');
            var id = entry.attr('data-id');
            var className = entry.attr('class');
            nav.push({"entry":entry,"parent":parent,"id":id,"class":className});
        });

        dom.sortSubBtn = $( ".sortSubBtn" );

        dom.sortSubBtn.each(function( index ) {
            var entry = $(this);
            var parent = entry.attr('data-parent');
            var id = entry.attr('data-id');
            var className = entry.attr('class');
            nav.push({"entry":entry,"parent":parent,"id":id,"class":className});
        });

        dom.sortSubSubBtn = $( ".sortSubSubBtn" );

        dom.sortSubSubBtn.each(function( index ) {
            var entry = $(this);
            var parent = entry.attr('data-parent');
            var id = entry.attr('data-id');
            var className = entry.attr('class');
            trace.push('parent = '+parent);
            subsort.push({"entry":entry,"parent":parent,"id":id});
            nav.push({"entry":entry,"parent":parent,"id":id,"class":className});
        });

        dom.talentSortNav = $('#talentSortNav');

        $( '#site' ).scroll(function() {
            var scroll = $('#site').scrollTop();
            trace.push(id+" scroll = "+scroll);
            checkScroll(scroll);
        });


        render();    
    }

    
    
    function hideHover() {

        trace.push('hideHover ');
        
        var hover = activeHover.find('.talentHover');

        TweenMax.to(hover, 0.5, {opacity:0, onComplete:utils.divDisplay, onCompleteParams:[undefined,'none',hover], ease:"Power1.easeInOut", overwrite:2}); 

        activeHover.attr('data-active',"false");  

        //activeHover = undefined;
    }

    function showHover(obj) {

        trace.push('showHover activeHover = '+activeHover);
        
        if(activeHover !== undefined) hideHover();

        activeHover = obj;

        var hover = activeHover.find('.talentHover');

        TweenMax.to(hover, 0.5, {opacity:1, onStart:utils.divDisplay, onStartParams:[undefined,'block',hover], ease:"Power1.easeInOut", overwrite:2}); 
        obj.attr('data-active',"true");
    }

    /*
        checkScroll pins talent nav to the top under the main nav
        integer scroll is the scroll postion of the page
     */
    
    function checkScroll(scroll) {
        var windowH = utils.getWindowHeight();
        var siteHolderH = utils.getHeight();
        trace.push();
        var footerH = $('#footer').outerHeight();
        var siteH = siteHolderH - footerH;
        // trace.push("siteH = "+siteH+"siteHolderH = "+siteHolderH+" footerH = "+footerH);
        var compare = siteH-windowH - 5;
        // trace.push("compare = "+compare+" siteH = "+siteH+" windowH = "+windowH);
        // trace.push("scroll = "+scroll+" >= compare = "+compare);
        if(scroll >= compare) {
            loadTalent();
        }

        var scrollMax = 40;
        var breakPoint = utils.getBreakPoint();
        if(breakPoint == "bp-medium") {
            scrollMax = 120;
        }

        if(breakPoint == "bp-large") {
            scrollMax = 150;
        }

        if(scroll >= scrollMax) {
            TweenMax.to(dom.talentSortNav, 0.25, {backgroundColor:"#fff", ease:"Power1.easeInOut", overwrite:2});
            dom.talentSortNav.css({
                "position":"fixed",
            });
            
        } else {
   
            TweenMax.to(dom.talentSortNav, 0.25, {backgroundColor:"transparent", ease:"Power1.easeInOut", overwrite:2});
            dom.talentSortNav.css({
                "position":"static",
            });
        }
    }   

    function render() {
    	
        trace.push(id+" render");

        dom.sortBtn.click(function(event) {
            var id = $(this).attr('data-id');
            var active = $(this).attr('data-active');
            if(active == "true") return;
            sort(id,'');
        });
        dom.sortBtn.mouseover(function(event) {
            var id = $(this).attr('data-id');
            var className = $(this).attr('class');
            var active = $(this).attr('data-active');
            if(active == "true") return;
            navRoll(id,$(this),className);
            
        });
        dom.sortBtn.mouseout(function(event) {
            var id = $(this).attr('data-id');
            var className = $(this).attr('class');
            var active = $(this).attr('data-active');
            if(active == "true") return;
            navRollOut(id,$(this),className);
        });

        dom.sortSubBtn.click(function(event) {
            var id = $(this).attr('data-id');
            var active = $(this).attr('data-active');
            if(active == "true") return;
            sort(id,'');
        });
        dom.sortSubBtn.mouseover(function(event) {
            var id = $(this).attr('data-id');
            var className = $(this).attr('class');
            var active = $(this).attr('data-active');
            if(active == "true") return;
            navRoll(id,$(this),className);
        });
        dom.sortSubBtn.mouseout(function(event) {
            var id = $(this).attr('data-id');
            var className = $(this).attr('class');
            var active = $(this).attr('data-active');
            if(active == "true") return;
            navRollOut(id,$(this),className);
        }); 
		
        // Uncomment this if you want to re-establish sub sub buttons functionality
        /*
        dom.sortSubSubBtn.click(function(event) {
            var id = $(this).attr('data-id');
            var parent = $(this).attr('data-parent');
            var active = $(this).attr('data-active');
            if(active == "true") return;
            sort(id,parent);
        });
        dom.sortSubSubBtn.mouseover(function(event) {
            var id = $(this).attr('data-id');
            var className = $(this).attr('class');
            var active = $(this).attr('data-active');
            if(active == "true") return;
            navRoll(id,$(this),className);
        });
        dom.sortSubSubBtn.mouseout(function(event) {
            var id = $(this).attr('data-id');
            var className = $(this).attr('class');
            var active = $(this).attr('data-active');
            if(active == "true") return;
            navRollOut(id,$(this),className);
        });


        dom.loadMoreBtn = $("#talentLoadMore");
        dom.loadMoreBtn.click(function(event) {
            loadTalent(id,parent);
        });*/

        
        dom.talentLink = $("#talentHolder a");
        dom.talentLink.click(function(event) {
            event.preventDefault();
            var href = $(this).attr('href');
            var id = href.split('/')[2];
            openBio(id);
            trace.push('id '+id);
        });

        var segment1 = utils.getSegments(1);
        var segment2 = utils.getSegments(2);

        //trace.push("segment1 = "+segment1+" segment2 = "+segment2);

        if(segment1 == id) {
            
            if(segment2 !== undefined) {

                var i;
                var bioSegment = false;

                for (i = 0; i < data.length; i++) {
                    //trace.push("segment2 = "+segment2+" data[i].id = "+data[i].id);
                    if(segment2 == data[i].id) {
                        bioSegment = true;
                        setSort('entertainment',false);
                        openBio(segment2);
                        
                    }
                }
                //trace.push('bioSegment = '+bioSegment);
                if(!bioSegment) setSort(segment2);
            } else {
                setSort('entertainment', true);
            }

        }

		
    }

    /*
        sort resets the sort state of the page and then passes the sort id to set Sort
        string sortId is the user selected name to sort talent
     */
    function sort( sortId, parent ) {

        //trace.push("sort sortId = "+sortId+" parent = "+parent);   

        TweenMax.to(dom.talentPerson, 0.5, {delay:0, opacity:0, onComplete:utils.divDisplay, onCompleteParams:[undefined,'none',dom.talentPerson], ease:"Power1.easeInOut", overwrite:2}); 

        TweenMax.to(dom.talentDept, 0.5, {delay:0, opacity:0, onComplete:utils.divDisplay, onCompleteParams:[undefined,'none',dom.talentDept], ease:"Power1.easeInOut", overwrite:2}); 

        for (var i = 0; i < subsort.length; i++) {
            //trace.push('parent = '+parent+" subsort[i].parent = "+subsort[i].parent);
            if(parent === "") {
                TweenMax.to(subsort[i].entry, 0.5, {opacity:0, onComplete:utils.divDisplay, onCompleteParams:[undefined,'none',subsort[i].entry], ease:"Power1.easeInOut", overwrite:2});      
            } 
        }

        setTimeout(function(){ setSort(sortId,true); }, 600);
    	
    }

    /*
        setSort establishes what entries to show, along with setting the nav active state
        string sortId id to sort talent
        boolean setUrl establishes pushstate of the browser url. When individual pages are initially loaded, setUrl is false so that when openBio is called setUrl calls don't overlap.
     */
    function setSort( sortId, setUrl ) {

        //trace.push("setSort sortId = "+sortId);   

        $('#talentSortSubNav').removeClass(subSubClass+'SubSub');

        subSubClass = sortId;

        var i;
        for (i = 0; i < nav.length; i++) {

            //trace.log("currenSort  ="+currenSort+" sortId = "+sortId+" nav[i].id = "+nav[i].id);
            if(currenSort == nav[i].id) {
                nav[i].entry.attr("data-active", "false");
                navRollOut(nav[i].id, nav[i].entry, nav[i].class);
            }
            if(sortId == nav[i].id) {
                nav[i].entry.attr("data-active", "true");
                navRoll(nav[i].id, nav[i].entry, nav[i].class);
                
            }
        }
        
        
        var parent = sortId;
        for (i = 0; i < subsort.length; i++) {
            //trace.push('sortId = '+sortId+" subsort[i].parent = "+subsort[i].parent);
            if(sortId == subsort[i].id) {
                parent = subsort[i].parent;  
                subSubClass = parent;  
                 
            }
        }

        for (i = 0; i < subsort.length; i++) {
            //trace.push('sortId = '+sortId+" subsort[i].parent = "+subsort[i].parent);
            if(parent == subsort[i].parent) {
                TweenMax.to(subsort[i].entry, 0.5, {opacity:1, onStart:utils.divDisplay, onStartParams:[undefined,'inline-block',subsort[i].entry], ease:"Power1.easeInOut", overwrite:2});    
                 
            }
        }

        $('#talentSortSubNav').addClass(subSubClass+'SubSub');
        
        for (i = 0; i < desc.length; i++) {
            //trace.push("desc sortId = "+sortId+" desc[i].id = "+desc[i].id);
            if(sortId === "") {
                sortId = "entertainment";
            } 
            if(sortId == desc[i].id) {
                TweenMax.to(desc[i].entry, 0.5, {opacity:1, onStart:utils.divDisplay, onStartParams:[undefined,'table-cell',desc[i].entry], ease:"Power1.easeInOut", overwrite:2}); 
            }
        }

        currenSort = sortId;
        setStart = -8;
        setEnd = -1;
        if(setUrl) utils.setUrl(id,sortId);
        
        
        loadTalent();
        
    }
    /*
        loadTalent sets setStart and setEnd, initializing the first set of enteries to load
     */
    function loadTalent() {

        setStart = setStart + setTotal;
        setEnd = setEnd + setTotal;
        if(setEnd >= data.length-1) {
            setEnd = data.length-1;
            setStart = setEnd - setTotal;
        }
        
        var i;
        var delay = 0;
        var totalSort = 0;
        sortData = [];
        for (i = 0; i < data.length; i++) {

            for (var s = 0; s < data[i].sort.length; s++) {
                trace.push("i = "+i+" currenSort = "+currenSort+" setStart = "+setStart+" setEnd = "+setEnd+" data[i].sort[s] = "+data[i].sort[s]);
                if(currenSort == data[i].sort[s]) {
                    sortData.push(data[i]);
                }
                
                //trace.push('data[i].sort = '+data[i].sort[s]);
            }  
        }

        for (i = 0; i < sortData.length; i++) {

            if(i >= setStart && i <= setEnd) {

                utils.divDisplay(undefined,'inline-block',sortData[i].entry); 

                TweenMax.to(sortData[i].entry, 0.5, {delay:delay, opacity:1, ease:"Power1.easeInOut", overwrite:2}); 

                delay = delay + 0.2;

                if(!sortData[i].loaded) {
                    loadImg(sortData[i].index);
                    data[sortData[i].index].loaded = true;
                }
                totalSort++;
            } 
        }
    }
    /*
        loadImg if an enteries image has not been loaded this function calls that
        integer id identifies what data array entry to look for image url and what div to append to
     */
    function loadImg( id ) {

        trace.push('talent load id = '+id);
        var new_content = new Image();  
        new_content.id = id;
        new_content.onload = function () {   
            loadedImg(this.id);

        }; 
        data[id].entry.find('.talentImgHolder').append('<img src="'+data[id].img+'">');
        // data[id].entry.find('.talentImg').css({'background-image':'data[id].img'});
        new_content.src = data[id].img;
    }

    /*
        loadedImg updates the data array loaded attribute
        integer id data array id
     */
    function loadedImg( id ) {
        trace.push('talent loaded id = '+id);
        data[id].loaded = true;
        TweenMax.to(data[id].entry.find('.talentImg'), 0.5, {autoAlpha:1, ease:"Power1.easeInOut", overwrite:2}); 
    }
    /*
        openBio builds and opens the talent overlay
        string bioId is the talent id and url
     */
    function openBio( bioId ) {

        var i;
        var s;
        for (i = 0; i < data.length; i++) {

            if(bioId == data[i].id) {
                trace.push("data[i].bio = "+data[i].bio);
                removeBio();
                $('body').append('<div id="talentBio"></div>');
                $('#talentBio').append('<div id="talentBioHolder"></div>');
                $('#talentBioHolder').append('<div id="talentBioCloseBtn"><span class="fa fa-times" aria-hidden="true"></span><span class="screen-reader-text">Close</span></div>');

                $('#talentBioHolder').append('<div id="talentBioImg"><img src="'+data[i].img+'"></div>');
                $('#talentBioHolder').append('<div id="talentBioInfo"></div>');
                $('#talentBioInfo').append('<div id="talentBioDept"></div>');
                for (s = 0; s < data[i].sort.length; s++) {
                    if(data[i].sort[s] !== "") {
                        
                        var btnString = data[i].sort[s];
                        
                        if(data[i].sort[s] == "entertainment"){
                            
                            btnString = btnString.charAt(0).toUpperCase() + btnString.substring(1);
                            trace.push('btnString = '+btnString);
                            btnString = " "+btnString;

                        }
                        var btnStringFinal =  '<span class="talentBioDeptBold">STX'+btnString+'</span>';

                        $('#talentBioDept').append('<div class="talentBioDeptBtn" data-id="'+data[i].sort[s]+'">'+btnStringFinal+'</div>');  
                    }
                    
                }
                $('#talentBioInfo').append('<div id="talentBioName">'+data[i].name+'</div>');
                $('#talentBioInfo').append('<div id="talentBioTitle">'+data[i].title+'</div>');
                $('#talentBioInfo').append('<div id="talentBioTxt">'+data[i].bio+'</div>');
               

                TweenMax.to($('#talentBio'), 0.5, {opacity:1, ease:"Power1.easeInOut", overwrite:2}); 

                utils.setUrl(id,data[i].id);

                $( '#site' ).css({"overflow-y":"hidden"});
            }
        }

        $('.talentBioDeptBtn').click(function(event) {
            var id = $(this).attr("data-id");
            sort(id);
            closeBio();
        });

        $('#talentBioCloseBtn').click(function(event) {
            closeBio();
        });

        $('#talentBioCloseBtn').mouseover(function(event) {
            TweenMax.to($(this), 0.25, {color:"#3A3F5D", ease:"Power1.easeInOut", overwrite:2});
        });

        $('#talentBioCloseBtn').mouseout(function(event) {
            TweenMax.to($(this), 0.25, {color:"#24293D", ease:"Power1.easeInOut", overwrite:2});
        }); 

    }
    /*
        closeBio closes and setsUrl to the current sort
     */
    function closeBio( ) {

        utils.setUrl(id,currenSort);

        TweenMax.to($('#talentBio'), 0.5, {opacity:0, onComplete:removeBio, ease:"Power1.easeInOut", overwrite:2}); 

        $( '#site' ).css({"overflow-y":"scroll"});
    }
    /*
        removeBio removes overlay from the dom
     */
    function removeBio( ) {
        $('#talentBio').remove();
    }
    /*
        navRoll establishes roll functionality to the talent nav
        string id data array id
        object btn button to animate roll state
        string type class type of button
     */
    function navRoll( id, btn, type ) {
        //trace.push("---------- navRoll btn = "+btn+" type = "+type);

        if(type =="sortBtn" || type == "sortSubBtn") {
            TweenMax.to(btn, 0.25, {color:"#24293d", ease:"Power1.easeInOut", overwrite:2});
            TweenMax.to(btn.find('.sortBtnRoll'), 0.25, {height:"100%", ease:"Power1.easeInOut", overwrite:2});
                
        } else {
            // Uncomment this if you want to re-establish sub sub buttons functionality
            //TweenMax.to(btn, 0.25, {color:"#FFF", ease:"Power1.easeInOut", overwrite:2});    
        }

        
    }

    /*
        navRollOut establishes roll functionality to the talent nav
        string id data array id
        object btn button to animate roll state
        string type class type of button
     */
    function navRollOut( id, btn, type ) {

        //trace.push("---------- navRoll id = "+id+" type = "+type);
        TweenMax.to(btn, 0.25, {color:"#676a78", ease:"Power1.easeInOut", overwrite:2});
        
        if(type =="sortBtn" || type == "sortSubBtn") {
            TweenMax.to(btn.find('.sortBtnRoll'), 0.25, {height:"0rem", ease:"Power1.easeInOut", overwrite:2});   
        }
    }
    
	// Public API definitions
	site.talent = {
	};

	$(function(){
		init();
	});
})(window.site=window.site || {});
