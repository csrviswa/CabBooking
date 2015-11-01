var analytics = (function(){

	function initialise(){
		$(document).ajaxComplete(function(event,xhr,settings){
			console.log(xhr);
			console.log(event);
			console.log(settings);
			var url = settings.url.split('/');
			var service = url[url.length -1];
			console.log(service);
			if(settings.type == "POST" && service != "postLog"){
				var obj = {
					data : JSON.parse(settings.data),
					event : service,
					time: new Date(),
					user: sessionStorage.getItem('employeeId'),
					status : xhr.status
				};
				console.log(obj);	
				postLog(obj);			
			}
		});
	}
	function postLog(obj){
		var request =  $.ajax({
	            type: 'POST',
	            url: 'http://192.168.56.1:8080/LoggingRestApp/rest/user/postLog',
	            dataType: 'json',
				data: JSON.stringify(obj)
	    });
		
		request.done(function(response){
			console.log(response);
		});
	}
	return{
		initialise: function(){
			initialise();
		}
	};

})();