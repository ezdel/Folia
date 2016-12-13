$("#searchButton").on('click', function() {
	var searchVal = $("#searchForm").val();
	console.log(searchVal);
	$.ajax({
		type: "POST",
		dataType: "string",
		url: "/search",
		data: {"someData": searchVal},
		success: function(response) {			
			
		}
	})
	return false;
});