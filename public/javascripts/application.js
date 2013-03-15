	$(function(){
		$("#ventureSlideshow").slidesjs({
			width: 600,
			height: 300,
			play: {
				active: false,
				interval: 8000,
				effect: "slide",
				auto: true
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
	$("#displayedVentureBlurb").html($("[index='blurb"+number+"']").html());
}
