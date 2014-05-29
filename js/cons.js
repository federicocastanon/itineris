$(document).ready(function() {
	$.blockUI({ css: { backgroundColor: '#0078AD', color: '#fff', top: '20%', left: '30%'},
		message: '<img src="css/images/loading.gif" /> '  });
	var navegacion = {};	

	navegacion["auditoriaycerti"] = "pages/consultoria/auditoriaycerti.html";
	navegacion["capaysuper"] = "pages/consultoria/capaysuper.html";
	navegacion['consultoria'] = "pages/consultoria/consultoriaprincipal.html";
	navegacion['desaproy'] = "pages/consultoria/desaproy.html";
	navegacion["escalas"] = "pages/consultoria/escalas.html";
	navegacion["optimizacion"] = "pages/consultoria/optimizacion.html";

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
					var altura1 = $("html").height() - $("#header").height() - $("#footer").height() - 5;
					//el 5 es por el padding
					var altura2 = $("#cuerpo").height() * 1.1;
					//el cuerpo crece con el contenido, al wrapper hay que hacerlo crecer
					$("#wrapper").height(altura1 < altura2 ? altura2 : altura1);					
					
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
	
$.unblockUI();
	
});
