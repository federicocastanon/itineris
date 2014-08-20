$(document).ready(function() {
	$.blockUI({
		css : {
			backgroundColor : '#0078AD',
			color : '#fff',
			top : '20%',
			left : '30%'
		},
		message : '<img src="css/images/loading.gif" /> '
	});
	$.get("header.html", function(msg) {
		$('#header').html(msg);
		$.get("footer.html", function(footCont) {
			$('#footer').html(footCont);
			$("#fondoHeader").height($("#header").height() - $("#menu").height() - 1);
			var altura1 = $("html").height() - $("#header").height() - $("#footer").height() - 5;
			//el 5 es por el padding
			var altura2 = $("#cuerpoGrande").height() * 1.1;
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
			$('#cuerpoContenido > p').css("font-size", $('#tamanioLetra').slider("option", "value"));
			var altura1 = $("html").height() - $("#header").height() - $("#footer").height() - 5;
			//el 5 es por el padding
			var altura2 = $("#cuerpo").height() * 1.1 + $("#cuerpoGrande").height() * 1.1;
			//el cuerpo crece con el contenido, al wrapper hay que hacerlo crecer
			$("#wrapper").height(altura1 < altura2 ? altura2 : altura1);
		}
	});
	$('#cuerpoContenido > p').css("font-size", $('#tamanioLetra').slider("option", "value"));

	var a = window.location.toString();
	var name = a.substring(a.indexOf("=") + 1);
	cargarCuerpo(name);
	
});
var navegacion = {};
navegacion["listaCert"] = "pages/adicionales/listacertificacioncalidad.html";


function cargarCuerpo(nombre) {
	$('#cuerpoGrande').fadeOut('slow', function() {
		$.get(navegacion[nombre], function(msg) {
			$('#cuerpoGrande').html(msg);
			$('#cuerpoGrande').fadeIn('slow');
			//tomar tamaÃ±o letra elegido
			$('#cuerpoContenido > p').css("font-size", $('#tamanioLetra').slider("option", "value"));
			var altura1 = $("html").height() - $("#header").height() - $("#footer").height() - 5;
			//el 5 es por el padding
			var altura2 =$("#cuerpoGrande").height() * 1.1;
			//el cuerpo crece con el contenido, al wrapper hay que hacerlo crecer
			$("#wrapper").height(altura1 < altura2 ? altura2 : altura1);

			

		});
	});
}