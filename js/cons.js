var navegacion = {};

navegacion["auditoriaycerti"] = "pages/consultoria/auditoriaycerti.html";
navegacion["capaysuper"] = "pages/consultoria/capaysuper.html";
navegacion['consultoria'] = "pages/consultoria/consultoriaprincipal.html";
navegacion['desaproy'] = "pages/consultoria/desaproy.html";
navegacion["escalas"] = "pages/consultoria/escalas.html";
navegacion["optimizacion"] = "pages/consultoria/optimizacion.html";

var titulos = {};

titulos["auditoriaycerti"] = "Auditoria y Certificación de Calidad";
titulos["capaysuper"] = "Capacitación y Supervisión";
titulos['consultoria'] = "Consultoría para Organizaciones";
titulos['desaproy'] = "Desarrollo de proyectos ";
titulos["escalas"] = "Escalas y cuestionarios";
titulos["optimizacion"] = "Programa de optimización institucional";

$(document).ready(function() {

	$.blockUI({
		css : {
			backgroundColor : '#0078AD',
			color : '#fff',
			top : '20%',
			left : '30%'
		},overlayCSS : {
			backgroundColor : '#3B3B3B',
			opacity : 1,
			cursor : 'wait'
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
			$('#cuerpoContenido > p').css("font-size", $('#tamanioLetra').slider("option", "value"));
			$('.listaD > li').css("font-size", $('#tamanioLetra').slider("option", "value"));
			$('.campoForm').css("font-size", $('#tamanioLetra').slider("option", "value"));
			var altura1 = $("html").height() - $("#header").height() - $("#footer").height() - 5;
			//el 5 es por el padding
			var altura2 = $("#cuerpo").height() * 1.1 + $("#cuerpoGrande").height() * 1.1;
			//el cuerpo crece con el contenido, al wrapper hay que hacerlo crecer
			$("#wrapper").height(altura1 < altura2 ? altura2 : altura1);
		}
	});
	$('.ui-slider-handle').attr('tabindex', 30);

	$('#cuerpoContenido > p').css("font-size", $('#tamanioLetra').slider("option", "value"));
	$('.listaD > li').css("font-size", $('#tamanioLetra').slider("option", "value"));

	$('#titulo').click(function() {

		var linkS = $('.linkSeleccionado');

		$(linkS).removeClass("linkSeleccionado");
		$(this).addClass("linkSeleccionado");
		linkS = this;

		cargarCuerpoCons($(linkS).attr("rel"));
		$(this).blur();
	});
	$('#titulo').keypress(function(e) {
		if (e.which == 13) {//Enter key pressed
			$(this).click();
			$(this).focus();
			//Trigger search button click event
		}
	});

	var a = window.location.toString();
	var name = a.substring(a.indexOf("=") + 1);
	cargarCuerpoCons(name);

	$('.linkNavegacion').each(function(index) {
		$(this).click(function() {

			var linkS = $('.linkSeleccionado');

			$(linkS).removeClass("linkSeleccionado");
			$(this).addClass("linkSeleccionado");
			linkS = this;
			cargarCuerpoCons($(linkS).attr("rel"));

			$(this).blur();
		});
		$(this).keypress(function(e) {
			if (e.which == 13) {//Enter key pressed
				$(this).click();
				$(this).focus();
				//Trigger search button click event
			}
		});
	});
});

function cargarCuerpoCons(nombre) {
	if (nombre.length < 15) {
		$('#cuerpo').fadeOut('slow', function() {
			$('#cuerpo > #tituloSeccion').html(titulos[nombre]);

			$.get(navegacion[nombre], function(msg) {
				$('#cuerpoContenido').html(msg);
				$('#cuerpo').fadeIn('slow');
				//tomar tamaño letra elegido
				$('#cuerpoContenido > p').css("font-size", $('#tamanioLetra').slider("option", "value"));
				$('.listaD > li').css("font-size", $('#tamanioLetra').slider("option", "value"));
				var altura1 = $("html").height() - $("#header").height() - $("#footer").height() - 5;
				//el 5 es por el padding
				var altura2 = $("#cuerpo").height() * 1.1;
				//el cuerpo crece con el contenido, al wrapper hay que hacerlo crecer
				$("#wrapper").height(altura1 < altura2 ? altura2 : altura1);

				//$('#cuerpoContenido').html('CAMBIO');

			});
		});
	}
}