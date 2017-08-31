var navegacion = {};

navegacion["cyt"] = "pages/cyt/cytprincipal.html";
navegacion["cytini"] = "pages/cyt/inicial.html";
navegacion['cytsupcli'] = "pages/cyt/superclinica.html";
navegacion['cytfaciauto'] = "pages/cyt/facilitadores.html";
navegacion["cytsensi"] = "pages/cyt/sensibilizacion.html";

var titulos = {};

titulos["cyt"] = "Cursos y Talleres";
titulos["cytini"] = "Curso Inicial";
titulos['cytsupcli'] = "Llevamos la inclusión a tu escuela";
titulos['cytfaciauto'] = "Curso de Desarrollo de grupos de autogestores";
titulos["cytsensi"] = "Sensibilización para alumnos";

$(document).ready(function() {
	$.blockUI({
		css : {
			backgroundColor : '#3B3B3B',
			color : '#fff',
			top : '20%',
			left : '20%',
			width : '0px',
			height : '0px',
			border: '0px'
		},
		overlayCSS : {
			backgroundColor : '#D1CCCD',
			opacity : 1,
			cursor : 'wait'
		},
		message : '<img src="css/images/loading.gif" /> '
	});
	$.get("header.html", function(msg) {
		$('body').removeClass('oculto');
		$('#header').html(msg);
		$.get("footer.html", function(footCont) {
			$('#footer').html(footCont);
			$("#fondoHeader").height($("#header").height() - $("#menu").height() - 5);
			var altura1 = $("html").height() - $("#header").height() - $("#footer").height() - 5;
			//el 5 es por el padding
			var altura2 = $("#cuerpo").height() * 1.1 + $("#cuerpoGrande").height() * 1.1 + $("#cuerpoDonar").height() * 1.1;
			//el cuerpo crece con el contenido, al wrapper hay que hacerlo crecer
			$("#wrapper").height(altura1 < altura2 ? altura2 : altura1);
			//el 5 es por el padding
			$('#logo').click(function() {
				window.location.href = "index.html";
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

			var altura1 = $("html").height() - $("#header").height() - $("#footer").height() - 5;
			//el 5 es por el padding
			var altura2 = $("#cuerpo").height() * 1.1 + $("#cuerpoGrande").height() * 1.1;
			//el cuerpo crece con el contenido, al wrapper hay que hacerlo crecer
			$("#wrapper").height(altura1 < altura2 ? altura2 : altura1);
			$('#suscribir').leanModal({
					top: 100,
					overlay: 0.4,
					closeButton: ".modal_close"
				});
		}
	});
	$('.ui-slider-handle').attr('tabindex', 30);

	$('#cuerpoContenido > p').css("font-size", $('#tamanioLetra').slider("option", "value"));
	$('.listaD > li').css("font-size", $('#tamanioLetra').slider("option", "value"));

	$('#titulo').click(function() {

		linkS = this;
		cargarCuerpoCyT($(linkS).attr("rel"));
		$(this).addClass("linkSeleccionado");
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
	cargarCuerpoCyT(name);

	$('.linkNavegacion').each(function(index) {
		$(this).click(function() {

			linkS = this;

			cargarCuerpoCyT($(linkS).attr("rel"));
			$(this).addClass("linkSeleccionado");
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
function cargarCuerpoCyT(nombre) {
	if (nombre.length < 15) {
		var linkS = $('.linkSeleccionado');

		$(linkS).removeClass("linkSeleccionado");
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
				$('#suscribir').leanModal({
					top: 100,
					overlay: 0.4,
					closeButton: ".modal_close"
				});
				//$('#cuerpoContenido').html('CAMBIO');

			});
		});
	}
}