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
		$('#result').html(JSON.stringify(response.commonName))

	})
	return false;
});

// NEW STUFF
$("#calculate").on('click', function(e) {
	e.preventDefault();
	var searchVal = $("#searchForm").val();
	//console.log(searchVal);
	$.ajax({
		type: "POST",
		dataType: "String",
		// url: "/all",
		data: {"someData": searchVal}
	}).done(function(response) {
		console.log(response, 'response')
		$('#result').html(response)

	})
	return false;
});