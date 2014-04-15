$(document).ready(function() {
	$.get("../../header.html", function(msg) {
		$('#header').html(msg);
		$.get("../../footer.html", function(footCont) {
			$('#footer').html(footCont);
			$("#fondoHeader").height($("#header").height() - $("#menu").height() - 1);
			var altura1 = $("html").height() - $("#header").height() - $("#footer").height() - 5;
			//el 5 es por el padding
			var altura2 = $("#cuerpo").height() * 1.1 + $("#cuerpoGrande").height() * 1.1;
			//el cuerpo crece con el contenido, al wrapper hay que hacerlo crecer
			$("#wrapper").height(altura1 < altura2 ? altura2 : altura1);
			//el 5 es por el padding
			$('#logo').click(function() {
				window.location.href = "/itineris/home.html";
			});
		});

	});

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
			var altura2 = $("#cuerpo").height() * 1.1 + $("#cuerpoGrande").height() * 1.1;
			//el cuerpo crece con el contenido, al wrapper hay que hacerlo crecer
			$("#wrapper").height(altura1 < altura2 ? altura2 : altura1);
		}
	});
	navegacion["pedro"] = "pedro.html";
	navegacion["pff"] = "programaFormacion.html";
	navegacion['congRosa'] = "congresoRosario.html";
	
	
	$('#linksNavegacion > ul > .linkNavegacion').each(function(index) {
		$(this).click(function() {

			var linkS = $('.linkSeleccionado');

			$(linkS).removeClass("linkSeleccionado");
			$(this).addClass("linkSeleccionado");
			linkS = this;

			$('#cuerpoNoticia').fadeOut('slow', function() {				
				
				$.get(navegacion[$(linkS).attr("rel")], function(msg) {
					$('#cuerpoNoticia').html($(msg).find('#cuerpoNoticia').html());
					$('#cuerpoNoticia').fadeIn('slow');
					//tomar tamaÃ±o letra elegido
					
					var altura1 = $("html").height() - $("#header").height() - $("#footer").height() - 5;
					//el 5 es por el padding
					var altura2 = $("#cuerpo").height() * 1.1;
					//el cuerpo crece con el contenido, al wrapper hay que hacerlo crecer
					$("#wrapper").height(altura1 < altura2 ? altura2 : altura1);					
					
					
					
				});
				
			});
		});
	});

});
