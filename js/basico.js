$(document).ready(function() {
	$.blockUI({ css: { backgroundColor: '#0078AD', color: '#fff', top: '20%', left: '30%'},
		message: '<img src="css/images/loading.gif" /> '  });
	$.get("header.html", function(msg) {
		$('#header').html(msg);
		$.get("footer.html", function(footCont) {
			$('#footer').html(footCont);
			$("#fondoHeader").height($("#header").height() - $("#menu").height() - 1);
			var altura1 = $("html").height() - $("#header").height() - $("#footer").height() - 5;
			//el 5 es por el padding
			var altura2 = $("#cuerpo").height() * 1.1 + $("#cuerpoGrande").height() * 1.1 + $("#cuerpoDonar").height() * 1.1;
			//el cuerpo crece con el contenido, al wrapper hay que hacerlo crecer
			$("#wrapper").height(altura1 < altura2 ? altura2 : altura1);
			//el 5 es por el padding
			$('#logo').click(function() {
				window.location.href = "home.html";
			});
			$.unblockUI();
		});

	});

	$('#tamanioLetra').slider({
		min : 11,
		max : 43,
		value : 16,
		step : 5,
		change : function(event, ui) {
			agrandarContacto();
		}
	});
	$('.ui-slider-handle').attr('tabindex',30);

});
function agrandarContacto(){
	$('#cuerpoContenido > p').css("font-size", $('#tamanioLetra').slider("option", "value"));
			$('.campoForm').css("font-size", $('#tamanioLetra').slider("option", "value"));
			var altura1 = $("html").height() - $("#header").height() - $("#footer").height() - 5;
			//el 5 es por el padding
			var altura2 = $("#cuerpo").height() * 1.1 + $("#cuerpoGrande").height() * 1.1;
			//el cuerpo crece con el contenido, al wrapper hay que hacerlo crecer
			$("#wrapper").height(altura1 < altura2 ? altura2 : altura1);
}


function mandarMail(){
		
	var emailToVal = 'info@itineris.com.ar';
	var nombre = $('#nombre').val();
	var organizacion = $('#organizacion').val();
	var telefono = $('#telefono').val();
	var mail = $('#mail').val();
	var consulta = $('#consulta').val();
	var hasError = false;
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		$(".error").hide();
		
		
		if(nombre == '') {
			$("#nombre").after('<span class="error">No olvide ingresar su nombre</span>');
			hasError = true;
		}
		
		
		if(mail == '') {
			$("#mail").after('<span class="error">No olvide ingresar su correo electrónico</span>');
			hasError = true;
		} else if(!emailReg.test(mail)) {	
			$("#mail").after('<span class="error">Es importante que ingrese una direccion de correo v&aacute;lida para que podamos ponernos en contacto con usted</span>');
			hasError = true;
		}
		var regex = /[0-9]|\./;
		
		if( telefono != '' && !regex.test(telefono)) {
			$("#telefono").after('<span class="error">Solo ponga n&uacute;meros en su teléfono!</span>');
			hasError = true;
		}
		
		
		if(hasError){
			agrandarContacto();
			return false;
		}
	
	
	
	
	
	var html = nombre + ' que de la organizacion ' + organizacion + ' cuyo teléfono es '+ telefono +' pregunta: \n' + consulta + '. Su correo es ' + mail;
	$.post("sendemail.php", {
		emailTo : emailToVal,
		emailFrom : mail,
		asunto : 'consulta de ' + nombre,
		cuerpo : html
	}, function(data) {

		if(data == 'enviado') {
			$("#tituloPrincipal").before('<div id="muchasGracias"></div><p>Su consulta fue enviada, le responderemos a la brevedad</p>');

		} else {
			$("#tituloPrincipal").before('<div id="ocurrioError"><h1>Atención!</h1><p>Ocurrió un error y su consulta no fue enviada! Por favor intente nuevamente o escribanos un correo a info@itineris.com.ar </p></div>');
		}
		agrandarContacto();
	});
	
}
function mandarInscripcion(){
		
	var emailToVal = 'info@itineris.com.ar';
	var nombre = $('#nombre').val();
	var organizacion = $('#organizacion').val();
	var telefono = $('#telefono').val();
	var mail = $('#mail').val();
	var curso = $('#curso').val();
	var hasError = false;
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		$(".error").hide();
		
		
		if(nombre == '') {
			$("#nombre").after('<span class="error">No olvide ingresar su nombre</span>');
			hasError = true;
		}
		
		
		if(mail == '') {
			$("#mail").after('<span class="error">No olvide ingresar su correo electrónico</span>');
			hasError = true;
		} else if(!emailReg.test(mail)) {	
			$("#mail").after('<span class="error">Es importante que ingrese una direccion de correo v&aacute;lida para que podamos ponernos en contacto con usted</span>');
			hasError = true;
		}
		var regex = /[0-9]|\./;
		
		if( telefono != '' && !regex.test(telefono)) {
			$("#telefono").after('<span class="error">Solo ponga n&uacute;meros en su teléfono!</span>');
			hasError = true;
		}
		
		
		if(hasError){
			agrandarContacto();
			return false;
		}
	
	
	var html = nombre + ' que de la organizacion ' + organizacion + ' cuyo teléfono es '+ telefono +' quiere inscribirse a : \n' + curso + '. Su correo es ' + mail;
	$.post("sendemail.php", {
		emailTo : emailToVal,
		emailFrom : mail,
		asunto : 'consulta de ' + nombre,
		cuerpo : html
	}, function(resu) {

		if(resu.type == 'success') {
			$("#suscripcion-header").before('<div id="muchasGracias"></div><p>Su inscripción fue enviada, le responderemos a la brevedad</p>');

		} else {
			$("#suscripcion-header").before('<div id="ocurrioError"><h1>Atención!</h1><p>Ocurrió un error y su inscripción no fue enviada! Por favor intente nuevamente o escribanos un correo a info@itineris.com.ar </p></div>');
		}
		agrandarContacto();
	});
}
