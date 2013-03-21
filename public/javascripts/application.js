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
		
		
		var e = {
			zoom: 16,
			center: new google.maps.LatLng(27.947339, -82.460533),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		
		var map=new google.maps.Map(document.getElementById("map"),e);
		var markerOpts = {
			position: new google.maps.LatLng(27.947339, -82.460533),
		}
		var marker = new google.maps.Marker(markerOpts);
		marker.setMap(map);
		
	});

function changeVentureBlurb(number){
	$("#displayedVentureBlurb").html($("[index='blurb"+number+"']").html());
}








