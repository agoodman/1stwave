	$(function(){
		$("#ventureSlideshow").slidesjs({
			width: 600,
			height: 300,
			play: {
				active: true,
				interval: 6000,
				effect: "fade",
				auto:true
			},
			navigation : {
				active: true
			},
			pagination: {
				active: true
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
	$("#displayedVentureBlurb").html($("[index='blurb"+number+"']").html());
}
