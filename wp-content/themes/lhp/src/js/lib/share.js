;(function(obj, undefined){
	"use strict";

	var id = "share",
    trace = site.utilities.trace,
    hashtag = "LaughingHouse";

	function init() {

        render();    
    }

    function render() {

    	
        

    }

    function url(options) {


        for (var prop in options) {
          trace.log("options." + prop + " = " + options[prop]);
        }
        var title = "Yo, Mr White!";

        if(options.desc == "" || options.desc == undefined || options.desc == null) options.desc = title;

        options.desc = options.desc.replace(/(<([^>]+)>)/ig,"").replace(/”/g,"").replace(/“/g,"");

        trace.log("options.desc = "+options.desc);

        var share_url = encodeURIComponent(options.url);
        var share_txt = options.title+" "+options.desc;
        var network_url;

        if(options.type == "linkedin") {
            network_url = "https://www.linkedin.com/shareArticle?mini=true&url="+share_url;
            window.open(network_url, "linkedin_share", "width=600, height=400");
        }

        if(options.type == "facebook") {
            network_url = "https://www.facebook.com/sharer/sharer.php?u="+share_url;
            window.open(network_url, "facebook_share", "width=600, height=400");
        }

        if(options.type == "tumblr") {
            
            network_url = 'https://www.tumblr.com/share/link?url='+share_url;
            trace.log('tumblr network_url ========= '+network_url)
            window.open(network_url, "tumblr_share", "width=500, height=600");

        }
        

        if(options.type == "twitter") {

            var character_max = 240;
            var characters_over = 0;
            var message_string = share_txt + " " +share_url+ " " + hashtag;

            if(message_string.length > character_max) {
                characters_over = message_string.length - character_max + 3;
                share_txt = share_txt.substring(0, share_txt.length - characters_over);
                share_txt = share_txt + "...";
                trace.log("share_txt = "+share_txt+" characters_over = "+characters_over+" message_string.length = "+message_string.length)
            }
            trace.log('twitter share_url ========= '+share_url)
            network_url = "http://twitter.com/share?text="+share_txt+"&url="+share_url;
            trace.log('twitter network_url ========= '+network_url)
            window.open(network_url, "twitter_share", "width=600, height=400");
        }

        if(options.type == "google") {
            network_url = "https://plus.google.com/share?url="+share_url;
            window.open(network_url, "google_share", "width=600, height=600");
        }

        if(options.type == "pinterest") {
            network_url = "http://pinterest.com/pin/create/button/?url="+share_url+"&description="+share_txt+"&media="+img;
            window.open(network_url, "pintrest_share", "width=600, height=600");
        }       
        

    }
   

	site.share = {
		url	: url,
	};

	$(function(){
		init();
	});

})(window.site=window.site || {});
