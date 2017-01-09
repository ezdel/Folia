$(".add-plant").on('click', function() {
	var searchVal = $("#enter-plant").val();
	console.log(searchVal);
	$.ajax({
		type: "POST",
		dataType: "JSONP",
		url: "/search",
		data: {"someData": searchVal},
		success: function(response) {			
			
		}
	})
	return false;
});


$("#loginButton").on('click', function() {
	$.ajax({
		type: "POST",
		dataType: "string",
		url: "/login",
		data: {"someData": searchVal},
		success: function(response) {			
			
		}
	})
	return false;
});