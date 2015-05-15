var Login = (function(jq) {
	
	var url = '/login';
	var type = 'POST';
	var dataType = 'json';

	return {
		login: function() {
			var params = {
				email : jq('#inputEmail').val(),
				passwd: jq('#inputPassword').val()
			};
			$.ajax({
			  	type: type,
				url: url,
				data: params,
				success: function(data) {
					console.info(data.title);
				},
				dataType: dataType
			});
		}
	}
})($);

$("#sb").on('click', Login.login);
