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
			var altura2 = $("#cuerpo").height() * 1.1 + $("#cuerpoGrande").height() * 1.1;
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
			var altura2 = ($("#cuerpo").height() + 200 ) * 1.1 + $("#cuerpoGrande").height() * 1.1;
			//el cuerpo crece con el contenido, al wrapper hay que hacerlo crecer
			$("#wrapper").height(altura1 < altura2 ? altura2 : altura1);
		}
	});

	var a = window.location.toString();
	var name = a.substring(a.indexOf("=") + 1);
	cargarCuerpo(name);

	$('.linkNavegacion').each(function(index) {
		$(this).click(function() {

			var linkS = $('.linkSeleccionado');

			$(linkS).removeClass("linkSeleccionado");
			$(this).addClass("linkSeleccionado");
			linkS = this;
			cargarCuerpo($(linkS).attr("rel"));
			$(this).blur();
		});
		$(this).keypress(function(e) {
			if(e.which == 13) {//Enter key pressed
				$(this).click();
				$(this).focus();
				//Trigger search button click event
			}
		});
	});
});
var navegacion = {};
navegacion["pedro"] = "pages/noticias/pedro.html";
navegacion["pff"] = "pages/noticias/programaFormacion.html";
navegacion['congRosa'] = "pages/noticias/congresoRosario.html";
navegacion['declaRosa'] = "pages/noticias/declaracionRosario.html";

function cargarCuerpo(nombre) {
	if(nombre.length < 15) {
		$('#cuerpo').fadeOut('slow', function() {
			$.get(navegacion[nombre], function(msg) {
				$('#cuerpoNoticia').html(msg);
				$('#cuerpo').fadeIn('slow');

				//tomar tamaÃ±o letra elegido

				$('#cuerpoContenido > p').css("font-size", $('#tamanioLetra').slider("option", "value"));

				var altura1 = $("html").height() - $("#header").height() - $("#footer").height() - 5;
				//el 5 es por el padding
				var altura2 = ($("#cuerpo").height() + 200 ) * 1.1;
				//el cuerpo crece con el contenido, al wrapper hay que hacerlo crecer
				$("#wrapper").height(altura1 < altura2 ? altura2 : altura1);

			});
		});
	}
}