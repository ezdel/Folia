$(".add-plant-button").on('click', function(e) {
	e.preventDefault();
	var searchVal = $("#enter-plant").val();
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "/search",
		data: {"someData": searchVal}
	}).done(function(response) {
		console.log(response, 'response')
		$("#enter-plant").val("");

	})
	return false;
});


// Current date

$("#dateButton").on('click', function(e) {
	e.preventDefault();
	$.ajax({
		type: "POST",
		dataType: "Date",
		url: "/date",
		data: {"newDate": Date}
	}).done(function(response) {
		console.log('response', response);

	})
	return false;
});