$(".add-plant").on('click', function(e) {
	var searchVal = $("#enter-plant").val();
	e.preventDefault();
	console.log(searchVal);
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "/search",
		data: {"someData": searchVal}
	}).done(function(response) {
		console.log('response: ' + response);
		// $('#result').html(JSON.stringify(response))

	})
	return false;
});