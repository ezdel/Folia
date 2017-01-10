$("#searchButton").on('click', function(e) {
	e.preventDefault();
	var searchVal = $("#searchForm").val();
	//console.log(searchVal);
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "/search",
		data: {"someData": searchVal}
	}).done(function(response) {
		console.log(response, 'response')
		$('#result').html(JSON.stringify(response))

	})
	return false;
});


// Current date

$("#logDate").on('click', function(e) {
	e.preventDefault();
	// var searchVal = $("#searchForm").val();
	$.ajax({
		type: "POST",
		dataType: "Date",
		url: "/date",
		data: {"newDate": Date}
	}).done(function(response) {
		console.log('response', response);
		$('#result').html(response);

	})
	return false;
});