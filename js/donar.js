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
			$("#wrapperDonar").height(altura1 < altura2 ? altura2 : altura1);
			//el 5 es por el padding
			$('#logo').click(function() {
				window.location.href = "home.html";
			});
		});

	});

	
	var navegacion = {};

	navegacion["donarPrincipal"] = "pages/donar/donarPrincipal.html";
	navegacion["donarcorto"] = "pages/donar/donarCorto.html";
	navegacion["donarlargo"] = "pages/donar/donarLargo.html";

	

$('#tamanioLetra').slider({
		min : 11,
		max : 43,
		value : 12,
		step : 5,
		change : function(event, ui) {
			$('#cuerpoContenido > p').css("font-size", $('#tamanioLetra').slider("option", "value"));
			$('.campoForm').css("font-size", $('#tamanioLetra').slider("option", "value"));
			var altura1 = $("html").height() - $("#header").height() - $("#footer").height() - 5;
			//el 5 es por el padding
			var altura2 = $("#cuerpoDonar").height() * 1.1;
			//el cuerpo crece con el contenido, al wrapper hay que hacerlo crecer
			$("#wrapperDonar").height(altura1 < altura2 ? altura2 : altura1);
		}
	});
	$('#cuerpoContenido > p').css("font-size", $('#tamanioLetra').slider("option", "value"));

	$('#titulo').click(function() {

		var linkS = $('.linkSeleccionado');

		$(linkS).removeClass("linkSeleccionado");
		$(this).addClass("linkSeleccionado");
		linkS = this;

		$('#cuerpo').fadeOut('slow', function() {
			$('#cuerpo > #tituloSeccion').html($(linkS).html());

			$.get(navegacion[$(linkS).attr("rel")], function(msg) {
				$('#cuerpoContenido').html(msg);
				$('#cuerpo').fadeIn('slow');
				//tomar tamaño letra elegido
				$('#cuerpoContenido > p').css("font-size", $('#tamanioLetra').slider("option", "value"));
				$('.listaD > li').css("font-size", $('#tamanioLetra').slider("option", "value"));
				var altura1 = $("html").height() - $("#header").height() - $("#footer").height() - 5;
				//el 5 es por el padding
				var altura2 = $("#cuerpo").height() * 1.1;
				//el cuerpo crece con el contenido, al wrapper hay que hacerlo crecer
				$("#wrapperDonar").height(altura1 < altura2 ? altura2 : altura1);

				//$('#cuerpoContenido').html('CAMBIO');

			});

		});
	});

	$('#linksNavegacion > ul > .linkNavegacion').each(function(index) {
		$(this).click(function() {

			var linkS = $('.linkSeleccionado');

			$(linkS).removeClass("linkSeleccionado");
			$(this).addClass("linkSeleccionado");
			linkS = this;

			$('#cuerpo').fadeOut('slow', function() {

				$.get(navegacion[$(linkS).attr("rel")], function(msg) {
					$('#cuerpoContenido').html(msg);
					$('#cuerpo').fadeIn('slow');
					//tomar tamaño letra elegido
					$('#cuerpoContenido > p').css("font-size", $('#tamanioLetra').slider("option", "value"));
					var altura1 = $("html").height() - $("#header").height() - $("#footer").height() - 5;
					//el 5 es por el padding
					var altura2 = $("#cuerpo").height() * 1.1;
					//el cuerpo crece con el contenido, al wrapper hay que hacerlo crecer
					$("#wrapperDonar").height(altura1 < altura2 ? altura2 : altura1);
					$("#suscribir").leanModal({
						top : 100,
						overlay : 0.4,
						closeButton : ".modal_close"
					});
					//$('#cuerpoContenido').html('CAMBIO');

				});

			});
		});
	});
$.unblockUI();
});
