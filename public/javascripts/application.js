	$(function(){
		$("#ventureSlideshow").slidesjs({
			width: 600,
			height: 300,
			play: {
				active: true,
				interval: 2000,
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
			console.log($(this).attr("href"));
			$("html,body").animate({
			    scrollTop: $($(this).attr("href")).offset().top
			 }, 250);
			return false;
		});
		
		
		
	});




function changeVentureBlurb(number){
	$("#displayedVentureBlurb").html($("#blurb"+number).html());
}
