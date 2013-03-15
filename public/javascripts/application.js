	$(function(){
		$("#ventureSlideshow").slidesjs({
			width: 600,
			height: 300,
			play: {
				active: false,
				interval: 6000,
				effect: "fade",
				auto:false
			},
			navigation : {
				active: false
			},
			pagination: {
				active: false
			},
			callback: {
				complete: function(number){
					changeVentureBlurb(number);
				},
				loaded: function(number){
					changeVentureBlurb(number);
				}
			}
		});
		
		$("nav a").click(function(){
			$("html,body").animate({
			    scrollTop: $($(this).attr("href")).offset().top-100
			 }, 250);
			return false;
		});
		
		
		
	});




function changeVentureBlurb(number){
	$("#blurb").html($("[index='blurb"+number+"']").html());
}
