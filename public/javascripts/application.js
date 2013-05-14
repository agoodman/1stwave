/**
 * First Wave Venture Center
 * File: application.js
 *
 * Modified by Ken@GyroscopeStudios.com
 * May 2, 2013
 */

$(function () {
	$("#ventureSlideshow").slidesjs({
		width:600,
		height:300,
		play:{
			active:true,
			interval:6000,
			effect:"fade",
			auto:true
		},
		navigation:{
			active:false
		},
		pagination:{
			active:false
		},
		callback:{
			complete:function (number) {
				changeVentureBlurb(number);
			},
			loaded:function (number) {
				changeVentureBlurb(number);
			}
		}
	});

	$("nav a").click(function () {
		$("html,body").animate({
			scrollTop:$($(this).attr("href")).offset().top - 100
		}, 250);
		return false;
	});

	$("#coworking span, #coworking button, #signUp").click(function () {
		// window.location.href = "http://tbwv.org/VQOlUj";
		window.location.href = "http://tbwv.org/15APcZ8";
		return false;
	});

	$("#newsletter").click(function () {
		window.location.href = "http://eepurl.com/v8-ov";
		return false;
	});

	$("#explore").click(function () {
		$("html,body").animate({ scrollTop:$("#welcome").offset().top}, 250);
	});


	var e = {
		zoom:16,
		center:new google.maps.LatLng(27.947339, -82.460533),
		mapTypeId:google.maps.MapTypeId.ROADMAP,
		draggable:false,
		disableDoubleClickZoom:true
	};

	var map = new google.maps.Map(document.getElementById("map"), e);
	var markerOpts = {
		position:new google.maps.LatLng(27.947339, -82.460533),
	}
	var marker = new google.maps.Marker(markerOpts);
	marker.setMap(map);

	// Create the dropdown base
	$("<select />").appendTo("nav");

// Create default option "Go to..."
	$("<option />", {
		"selected": "selected",
		"value"   : "",
		"text"    : "Go to..."
	}).appendTo("nav select");

// Populate dropdown with menu items
	$("nav a").each(function() {
		var el = $(this);
		$("<option />", {
			"value"   : el.attr("href"),
			"text"    : el.text()
		}).appendTo("nav select");
	});

	$("nav select").change(function() {
		window.location = $(this).find("option:selected").val();
	});

});

function changeVentureBlurb(number) {
	$("#displayedVentureBlurb").html($("[index='blurb" + number + "']").html());
}








