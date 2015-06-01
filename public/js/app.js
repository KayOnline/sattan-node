var Login = (function(jq) {
	
	var url = '/login';
	var type = 'POST';
	var dataType = 'json';

	return {
		init : function() {
			
		},
		login: function() {
			var params = {
				email : jq('#inputEmail').val(),
				password: jq('#inputPassword').val()
			};
			$.ajax({
			  	type: type,
				 url: url,
				data: params,
				success: function(data) {
					if (data.code == 0) {
						window.location.href = "/index";
					} else {
						alert(data.msg);
					}
				},
				dataType: dataType
			});
		}
	}
})($);

$("#sb").on('click', Login.login);
