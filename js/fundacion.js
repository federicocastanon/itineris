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
		value : 12,
		step : 5,
		change : function(event, ui) {
			$('#cuerpoContenido > p').css("font-size", $('#tamanioLetra').slider("option", "value"));
			$('.listaD > li').css("font-size", $('#tamanioLetra').slider("option", "value"));
			var altura1 = $("html").height() - $("#header").height() - $("#footer").height() - 5;
			//el 5 es por el padding
			var altura2 = $("#cuerpo").height() * 1.1 + $("#cuerpoGrande").height() * 1.1;
			//el cuerpo crece con el contenido, al wrapper hay que hacerlo crecer
			$("#wrapper").height(altura1 < altura2 ? altura2 : altura1);
		}
	});
	$('.ui-slider-handle').attr('tabindex',30);


	var navegacion = {};

	navegacion["fundacion"] = "pages/fundacion/fundacionprincipal.html";
	navegacion["benefactores"] = "pages/fundacion/benefactores.html";
	navegacion['carpetatecnica'] = "pages/fundacion/carpetatecnica.html";
	navegacion['estructura'] = "pages/fundacion/estructura.html";
	navegacion["historia"] = "pages/fundacion/historia.html";

	$('#cuerpoContenido > p').css("font-size", $('#tamanioLetra').slider("option", "value"));
	$('.listaD > li').css("font-size", $('#tamanioLetra').slider("option", "value"));
	var altura1 = $("html").height() - $("#header").height() - $("#footer").height() - 5;
	//el 5 es por el padding
	var altura2 = $("#cuerpoGrande").height() * 1.1;
	//el cuerpo crece con el contenido, al wrapper hay que hacerlo crecer
	$("#wrapper").height(altura1 < altura2 ? altura2 : altura1);

	$('#titulo').click(function() {

		var linkS = $('.linkSeleccionado');

		$(linkS).removeClass("linkSeleccionado");
		$(this).addClass("linkSeleccionado");
		linkS = this;

		$('#cuerpoGrande').fadeOut('slow', function() {
			$('#cuerpoGrande > #tituloSeccion').html($(linkS).html());

			$.get(navegacion[$(linkS).attr("rel")], function(msg) {
				$('#cuerpoContenido').html(msg);
				$('#cuerpoGrande').fadeIn('slow');
				//tomar tamaño letra elegido
				$('#cuerpoContenido > p').css("font-size", $('#tamanioLetra').slider("option", "value"));
				$('.listaD > li').css("font-size", $('#tamanioLetra').slider("option", "value"));
				var altura1 = $("html").height() - $("#header").height() - $("#footer").height() - 5;
				//el 5 es por el padding
				var altura2 = $("#cuerpoGrande").height() * 1.1;
				//el cuerpo crece con el contenido, al wrapper hay que hacerlo crecer
				$("#wrapper").height(altura1 < altura2 ? altura2 : altura1);

				//$('#cuerpoContenido').html('CAMBIO');

			});
		});
		$(this).blur();
	});
	$('#titulo').keypress(function(e) {
		if(e.which == 13) {//Enter key pressed
			$(this).click();
			$(this).focus();
			//Trigger search button click event
		}
	});

	$('.linkNavegacion').each(function(index) {
		$(this).click(function() {

			var linkS = $('.linkSeleccionado');

			$(linkS).removeClass("linkSeleccionado");
			$(this).addClass("linkSeleccionado");
			linkS = this;
			var nombreLink = $(linkS).attr("rel");

			$('#cuerpoGrande').fadeOut('slow', function() {
				$('#cuerpoGrande > #tituloSeccion').html($(linkS).html());

				$.get(navegacion[$(linkS).attr("rel")], function(msg) {
					$('#cuerpoContenido').html(msg);

					if(nombreLink == 'estructura') {
						$('#cuerpoGrande').css({
							"min-width" : "850px"
						});
						$('#wrapper').css({
							"min-width" : "1260px"
						});
					} else {
						$('#cuerpoGrande').css({
							"min-width" : "650px"
						});
						$('#wrapper').css({
							"min-width" : "960px"
						});
					}

					$('#cuerpoGrande').fadeIn('slow');
					//tomar tamaño letra elegido
					$('#cuerpoContenido > p').css("font-size", $('#tamanioLetra').slider("option", "value"));
					$('.listaD > li').css("font-size", $('#tamanioLetra').slider("option", "value"));
					var altura1 = $("html").height() - $("#header").height() - $("#footer").height() - 5;
					//el 5 es por el padding
					var altura2 = $("#cuerpoGrande").height() * 1.1;
					//el cuerpo crece con el contenido, al wrapper hay que hacerlo crecer
					$("#wrapper").height(altura1 < altura2 ? altura2 : altura1);

					//$('#cuerpoContenido').html('CAMBIO');

				});
			});
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
