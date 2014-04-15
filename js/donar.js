$(document).ready(function() {
	
	var navegacion = {};	

	navegacion["donarcorto"] = "pages/donar/donarCorto.html";
	navegacion["donarlargo"] = "pages/donar/donarLargo.html";
	

	$('#cuerpoContenido > p').css("font-size", $('#tamanioLetra').slider("option", "value"));

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
					$("#wrapper").height(altura1 < altura2 ? altura2 : altura1);					
					$("#suscribir").leanModal({ top : 100, overlay : 0.4, closeButton: ".modal_close" });
					//$('#cuerpoContenido').html('CAMBIO');
					
				});
				
			});
		});
	});
	

	
});
