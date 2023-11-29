//custom flexslider start
jQuery(document).ready(function(e) {

//Public Utility Tab custom js
var len =jQuery('body').find('.utilityTabContainer');
if(len.length==1){
  var hashval = window.location.hash;
  console.log(hashval);
  if(hashval!=''){
    var hash_val = hashval.split("#");
    jQuery('ul.resp-tabs-list li').each(function (i) {
      jQuery(this).removeClass('resp-tab-active');
      if(jQuery(this).attr('data')==hash_val[1]){
        jQuery(this).addClass('resp-tab-active');
      }
    });
    jQuery('div.resp-tabs-container .resp-tab-content').each(function (i) {
      var pos = jQuery(this).index();
      jQuery(this).removeClass('resp-tab-content-active');
      jQuery(".resp-accordion").eq(pos).removeClass('resp-tab-active');
      jQuery(this).hide();
      if(jQuery(this).attr('id')==hash_val[1]){
        jQuery(this).addClass('resp-tab-content-active');
        jQuery(this).show();
        jQuery(".resp-accordion").eq(pos).addClass('resp-tab-active');
      }
    });
  }
} 

//=========================	    
jQuery('.thumb-bottom-scroll').flexslider({
        animation: "fade",
		controlNav: false,
		animationLoop: false,
		slideshow: false,
        sync: ".thumb-bottom-crucel"
}),
jQuery('.thumb-bottom-crucel').flexslider({
        animation: "slide",
		controlNav: false,
		animationLoop: false,
		slideshow: false,
		itemWidth: 210,
		//itemMargin: 5,
        asNavFor: ".thumb-bottom-scroll"
     }),
//=========================	

jQuery('.thumb-bottom').flexslider({
        animation: "fade",
        controlNav: "thumbnails",
        start: function(slider){
          jQuery('body').removeClass('loading');
        }
      });
//=========================		  
jQuery('.no-thumb').flexslider({
        animation: "fade",
        controlNav: false,
        start: function(slider){
          jQuery('body').removeClass('loading');
        }
      });
//=========================		  
jQuery('.thumb-right').flexslider({
        animation: "fade",
        controlNav: "thumbnails",
        start: function(slider){
          jQuery('body').removeClass('loading');
        }
      });
//=========================	
jQuery('.thumb-left').flexslider({
        animation: "fade",
        controlNav: "thumbnails",
        start: function(slider){
          jQuery('body').removeClass('loading');
        }
      });

//=========================	

	//Main slider components start
	jQuery(".full-cntrl-center-caption-blank").flexslider({
		animation: "slide",
		directionNav: true,
		prevText: "Previous",
		nextText: "Next",
		pausePlay: true,
		pauseText: "Pause",
		playText: "Play",
		controlNav: true
        }),	
	jQuery(".flexslider").flexslider({
		animation: "slide",
		directionNav: true,
		prevText: "Previous",
		nextText: "Next",
		pausePlay: true,
		pauseText: "Pause",
		playText: "Play",
		controlNav: false
       });

//Directory pagination
jQuery("body").find('.dir_next, .dir_prev').click(function(e){
  e.preventDefault();

  var data = jQuery(this).attr('data');
  var btn = jQuery(this);
  var page = jQuery(this).parent().siblings('.count').find('span').html();
  var slug = jQuery(this).parents('.directory').attr('data');
  jQuery.ajax({
    method: "POST",
    url: ajaxurl,
    data: { action: "more_dir", paged: page, tax_slug: slug, type: data }
  })
  .done(function( response ) {
    var obj = JSON.parse(response);
    jQuery("div[data='"+slug+"']").find("tbody").html(obj.html);
    jQuery("div[data='"+slug+"']").find(".paged").html(obj.paged);
    if(obj.last==1)
    {
      jQuery("div[data='"+slug+"']").find(".dir_next").hide();
    }else
    {
      jQuery("div[data='"+slug+"']").find(".dir_next").show();
    }
    if(obj.first==1)
    {
      jQuery("div[data='"+slug+"']").find(".dir_prev").show();
    }else
    {
      jQuery("div[data='"+slug+"']").find(".dir_prev").hide();
    }
      jQuery('body').trigger('targetExternalLinks');
  });
});

//Who's Who pagination
jQuery("body").find('.ww_next, .ww_prev').click(function(e){
  e.preventDefault();
  var data = jQuery(this).attr('data');
  var btn = jQuery(this);
  var page = jQuery(this).parent().siblings('.count').find('span').html();
  var slug = jQuery(this).parents('.whoswho').attr('data');
  jQuery.ajax({
    method: "POST",
    url: ajaxurl,
    data: { action: "more_ww", paged: page, tax_slug: slug, type: data }
  })
  .done(function( response ) {
    var obj = JSON.parse(response);
    jQuery("div[data='"+slug+"']").find("tbody").html(obj.html);
    jQuery("div[data='"+slug+"']").find(".paged").html(obj.paged);
    if(obj.last==1)
    {
      jQuery("div[data='"+slug+"']").find(".ww_next").hide();
    }else
    {
      jQuery("div[data='"+slug+"']").find(".ww_next").show();
    }
    if(obj.first==1)
    {
      jQuery("div[data='"+slug+"']").find(".ww_prev").show();
    }else
    {
      jQuery("div[data='"+slug+"']").find(".ww_prev").hide();
    }
      jQuery('body').trigger('targetExternalLinks');
  });
});

});