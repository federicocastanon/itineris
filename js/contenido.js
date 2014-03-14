$(document).ready(function() {
	var navegacion = {};
	//formacion

	navegacion["autoDet"] = "pages/autoDet.html";
	navegacion["apoyos"] = "pages/apoyos.html";
	navegacion['planiPersona'] = "pages/planiPersona.html";
	navegacion['mecaExclIncl'] = "pages/mecaExclIncl.html";
	navegacion["derechos"] = "pages/derechos.html";
	navegacion['calVida'] = "pages/calVida.html";
	navegacion['habBas'] = "pages/habBas.html";
	

	$('#linksNavegacion > ul > .linkNavegacion').each(function(index) {
		$(this).click(function() {

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
					var altura1 = $("html").height() - $("#header").height() - $("#footer").height() - 5;
					//el 5 es por el padding
					var altura2 = $("#cuerpo").height() * 1.1;
					//el cuerpo crece con el contenido, al wrapper hay que hacerlo crecer
					$("#wrapper").height(altura1 < altura2 ? altura2 : altura1);					
					
					//$('#cuerpoContenido').html('CAMBIO');
					
				});
				
			});
		});
	});
	

	
});
