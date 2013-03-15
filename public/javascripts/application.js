	$(function(){
		$("#ventureSlideshow").slidesjs({
			width: 600,
			height: 300,
			play: {
				active: true,
				interval: 6000,
				effect: "fade",
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
		
		$("#coworking span, #coworking button, #signUp").click(function() {
			window.location.href = "http://tbwv.org/VQOlUj";
			return false;
		});
		
		$("#explore").click(function() {
			$("html,body").animate({ scrollTop: $("#welcome").offset().top}, 250);
		});
		
	});




function changeVentureBlurb(number){
	$("#blurb").html($("[index='blurb"+number+"']").html());
}
