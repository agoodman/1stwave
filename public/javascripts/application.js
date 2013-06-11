/**
 * First Wave Venture Center
 *
 * Modified by Ken@GyroscopeStudios.com
 * June 10, 2013
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

	$("<select />").appendTo("nav");

	$("<option />", {
		"selected":"selected",
		"value":"",
		"text":"Go to..."
	}).appendTo("nav select");

	$("nav a").each(function () {
		var el = $(this);
		$("<option />", {
			"value":el.attr("href"),
			"text":el.text()
		}).appendTo("nav select");
	});

	$("nav select").change(function () {
		window.location = $(this).find("option:selected").val();
	});

	googleCalendar();

});

function changeVentureBlurb(number) {
	$("#displayedVentureBlurb").html($("[index='blurb" + number + "']").html());
}

function googleCalendar() {

	var googleCalendarId = "events@tampabaywave.org";
	var googleCalendarApiKey = "AIzaSyDWH4WIwXKRZrQNfeeVK_BZ81X2diux4Qc";
	var maxGcalEvents = 2;
	var dateLowerlimit = "";
	var tokenArray = ["start", "init"];
	var tokenIndex = 1;

	function getDateLowerLimit() {
		var todayDate;
		if (dateLowerlimit == "") {
			todayDate = new Date();
			dateLowerlimit = todayDate.getFullYear() + "-" + (todayDate.getMonth() < 10 ? '0' : '') + (todayDate.getMonth() + 1) + "-" + (todayDate.getDate() < 10 ? '0' : '') + todayDate.getDate() + "T00:00:00+00:00"
		} else {
			todayDate = new Date(dateLowerlimit)
		}
	}

	function getFormattedDate(dateTime, withZone) {
		var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var dd = new Date(dateTime);
		timeZone = (dateTime.indexOf("+") != -1) ? "[GMT" + dateTime.substring(dateTime.indexOf("+")) + "]" : "";
		if (withZone) return "<span class='gcal-datetime'>" + dd.getDate() + " " + monthNames[dd.getMonth()] + " " + dd.getHours() + ":" + (dd.getMinutes() < 10 ? '0' : '') + dd.getMinutes() + "</span><br/><span class='gcal-tzone'>" + timeZone + "</span>";
		return dd.getDate() + " " + monthNames[dd.getMonth()] + " " + dd.getHours() + ":" + (dd.getMinutes() < 10 ? '0' : '') + dd.getMinutes()
	}

	$(window).load(function () {
		$('#cal').empty().append('<ul class="events" id="cal-events"></ul>');
		$('#cal').append('<div class="cal-rpointer">&gt;</div>');
		$('.cal-rpointer').click(function () {
			(tokenIndex >= (tokenArray.length - 1)) ? (tokenIndex = (tokenArray.length - 1)) : tokenIndex++;
			loadTumbo()
		});
		$('#cal').append('<div class="cal-lpointer">&lt;</div>');
		$('.cal-lpointer').click(function () {
			(tokenIndex <= 0) ? tokenIndex = 0 : tokenIndex--;
			loadTumbo()
		});
		loadTumbo()
	});

	function loadTumbo() {
		var apiPostURL = "https://www.googleapis.com/calendar/v3/calendars/" + googleCalendarId + "/events";
		$('#cal-events').empty().append('<li class="event-listing loader">Loading</li>');
		getDateLowerLimit();
		var dataBox = {
			orderBy:"startTime",
			singleEvents:"true",
			timeMin:dateLowerlimit,
			fields:"items,nextPageToken",
			key:googleCalendarApiKey,
			maxResults:maxGcalEvents
		};
		var pageToken = tokenArray[tokenIndex];
		if (null == pageToken || pageToken == "undefined" || pageToken == "") {
			$('#cal-events').empty().append('<li class="event-listing"><h4>Error .. Reload page!</h4></li>');
			return
		}
		if (pageToken == "init") {
			callAPI(apiPostURL, dataBox)
		} else if (pageToken == "start") {
			$('#cal-events').empty().append('<li class="event-listing"><h4>Previous events are completed!</h4></li>')
		} else if (pageToken == "end") {
			$('#cal-events').empty().append('<li class="event-listing"><h4>No more events found!</h4></li>')
		} else {
			dataBox['pageToken'] = pageToken;
			callAPI(apiPostURL, dataBox)
		}
	}

	function callAPI(apiPostURL, dataBox) {
		$.ajax({
			url:apiPostURL,
			type:"GET",
			data:dataBox,
			async:true,
			cache:true,
			dataType:"jsonp",
			success:function (data) {
				showTumbo(data)
			},
			error:function (html) {
				alert(html)
			},
			beforeSend:setHeader
		})
	}

	function showTumbo(data) {
		$('#cal-events').empty().append('<li class="event-listing"></li>');
		var eventArray = data.items;
		if (tokenIndex == (tokenArray.length - 1)) {
			tokenArray.push((null == data.nextPageToken) ? "end" : data.nextPageToken)
		}
		var eventHTML = "";

		for (var i = 0; i < eventArray.length; i++) {
			var startDate = eventArray[i].start.date || eventArray[i].start.dateTime,
					endDate = eventArray[i].end.date || eventArray[i].end.dateTime,
					summary = eventArray[i].summary,
					description = eventArray[i].description,
			// htmlLink = eventArray[i].htmlLink,
					event_location = eventArray[i].location;
			// eventHTML += '<a href="' + htmlLink + '">';

			if (null != summary && summary != "undefined" && summary != "") {
				eventHTML += '<li class="event-listing"><h4>' + summary + '</h4>'
			}

			if (null != startDate && startDate != "undefined" && startDate != "") {
				eventHTML += "<h5>" + getFormattedDate(startDate, true) + "</h5>"
			}
			if (null != event_location && event_location != "undefined" && event_location != "") {
				eventHTML += "<p>" + event_location + "</p>"
			}

			if (null != description && description != "undefined" && description != "") {
				eventHTML += "<p>" + description + "</p></li>"
			}
			// eventHTML += "</a>";
		}

		$('#cal-events').empty().append(eventHTML)
	}

	function setHeader(xhr) {
		if (xhr && xhr.overrideMimeType) {
			xhr.overrideMimeType("application/j-son;charset=UTF-8")
		}
	}
}

