$(document).ready(function(){
	var employeeId = sessionStorage.getItem('employeeId');
	$('#employeeId').val(employeeId);
	$("#employeeId").prop("readonly", true);
	initialise();
});


function initialise(){
	$(function(){
        $("#geocomplete").geocomplete({
          map: ".map_canvas",
          details: "form",
          types: ["geocode", "establishment"],
        });

        $("#showMap").click(function(){
        	$('#mapView').toggle();
        });
        $("textarea").blur(function(){
        	$("#geocomplete").trigger("geocode");
        });
    });

    $("#submitRequest").click(function(){
			var data = $('#cab-request input');
			var values = {};
			$(data).each(function(){
				values[this.name] = $(this).val();
			});
		 	sendData(values);
    });
}

function sendData(values){
	var request =  $.ajax({
            type: 'POST',
            url: '/LoggingRestApp/rest/user/cabRequest',
            dataType: 'json',
			data: JSON.stringify(values)
    });
	
	request.done(function(response){
		console.log(response);
	});
}