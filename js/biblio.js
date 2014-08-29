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
	$('#cuerpoGrande').css({
		"min-width" : "75%"
	});
	$('#wrapper').css({
		"min-width" : "1260px"
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
			var valor = $('#tamanioLetra').slider("option", "value");
			$('#cuerpoContenido > p').css("font-size", valor);
			$('.texto').css("font-size", valor);
			$('.descripcionDocumento').css("font-size", valor);
			$('.tituloDocumento').css("font-size", valor);
			$('.descargaDocumento').css("font-size", valor);
			//$('.documento').height(valor * valor / 2);
			var altura1 = $("html").height() - $("#header").height() - $("#footer").height() - 5;
			//el 5 es por el padding
			var altura2 = $("#cuerpo").height() * 1.1 + $("#cuerpoGrande").height() * 1.1;
			//el cuerpo crece con el contenido, al wrapper hay que hacerlo crecer
			$("#wrapper").height(altura1 < altura2 ? altura2 : altura1);
		}
	});
	$('.ui-slider-handle').attr('tabindex', 30);

	var navegacion = {};

	navegacion["desta"] = "pages/biblioteca/destacados.html";
	navegacion["nove"] = "pages/biblioteca/novedades.html";
	navegacion["calVi"] = "pages/biblioteca/calidadDeVida.html";
	navegacion['autoDet'] = "pages/biblioteca/autodeterminacion.html";
	navegacion['derechos'] = "pages/biblioteca/derechos.html";
	navegacion["inclu"] = "pages/biblioteca/inclusion.html";
	navegacion["traInst"] = "pages/biblioteca/trabajoinstitucional.html";
	navegacion["autoGes"] = "pages/biblioteca/autogestion.html";
	navegacion["familias"] = "pages/biblioteca/familias.html";

	var valor = $('#tamanioLetra').slider("option", "value");
	$('#cuerpoContenido > p').css("font-size", valor);
	$('.texto').css("font-size", valor);
	$('.descripcionDocumento').css("font-size", valor);
	$('.tituloDocumento').css("font-size", valor);
	$('.descargaDocumento').css("font-size", valor);
	//$('.documento').height(valor * valor / 2);

	$('.linkNavegacion').each(function(index) {
		$(this).click(function() {

			var linkS = $('.linkSeleccionado');

			$(linkS).removeClass("linkSeleccionado");
			$(this).addClass("linkSeleccionado");
			linkS = this;

			$('#cuerpoGrande').fadeOut('slow', function() {
				$('#cuerpoGrande > #tituloSeccion').html($(linkS).html());

				$.get(navegacion[$(linkS).attr("rel")], function(msg) {
					$('#cuerpoContenido').html(msg);

					if($(linkS).attr("rel") == "desta") {
						$('#cuerpoGrande').css({
							"min-width" : "75%"
						});
						$('#wrapper').css({
							"min-width" : "1260px"
						});
						Books.init();
					} else {
						$('#cuerpoGrande').css({
							"min-width" : "650px"
						});
						$('#wrapper').css({
							"min-width" : "960px"
						});
					}

					//tomar tamaño letra elegido
					var valor = $('#tamanioLetra').slider("option", "value");
					$('#cuerpoContenido > p').css("font-size", valor);
					$('.texto').css("font-size", valor);
					$('.descripcionDocumento').css("font-size", valor);
					$('.tituloDocumento').css("font-size", valor);
					$('.descargaDocumento').css("font-size", valor);
					//$('.documento').height(valor * valor / 2);
					var altura1 = $("html").height() - $("#header").height() - $("#footer").height() - 5;
					//el 5 es por el padding
					$('#cuerpoGrande').fadeIn('slow', function() {

					});
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
var Books = (function() {

	function init() {
		var $books = $('#bk-list > li > div.bk-book'), booksCount = $books.length;
		$books.each(function() {

			var $book = $(this), $other = $books.not($book), $parent = $book.parent(), $page = $book.children('div.bk-page'), $bookview = $parent.find('button.bk-bookview'), $content = $page.children('div.bk-content'), current = 0;

			$parent.find('button.bk-bookback').on('click', function() {

				$bookview.removeClass('bk-active');

				if($book.data('flip')) {

					$book.data({
						opened : false,
						flip : false
					}).removeClass('bk-viewback').addClass('bk-bookdefault');

				} else {

					$book.data({
						opened : false,
						flip : true
					}).removeClass('bk-viewinside bk-bookdefault').addClass('bk-viewback');

				}

			});

			$bookview.on('click', function() {

				var $this = $(this);

				$other.data('opened', false).removeClass('bk-viewinside').parent().css('z-index', 0).find('button.bk-bookview').removeClass('bk-active');
				if(!$other.hasClass('bk-viewback')) {
					$other.addClass('bk-bookdefault');
				}

				if($book.data('opened')) {
					$this.removeClass('bk-active');
					$book.data({
						opened : false,
						flip : false
					}).removeClass('bk-viewinside').addClass('bk-bookdefault');
				} else {
					$this.addClass('bk-active');
					$book.data({
						opened : true,
						flip : false
					}).removeClass('bk-viewback bk-bookdefault').addClass('bk-viewinside');
					$parent.css('z-index', booksCount);
					current = 0;
					$content.removeClass('bk-content-current').eq(current).addClass('bk-content-current');
				}

			});
			if($content.length > 1) {

				var $navPrev = $('<span class="bk-page-prev">&lt;</span>'), $navNext = $('<span class="bk-page-next">&gt;</span>');

				$page.append($('<nav></nav>').append($navPrev, $navNext));

				$navPrev.on('click', function() {
					if(current > 0) {--current;
						$content.removeClass('bk-content-current').eq(current).addClass('bk-content-current');
					}
					return false;
				});

				$navNext.on('click', function() {
					if(current < $content.length - 1) {++current;
						$content.removeClass('bk-content-current').eq(current).addClass('bk-content-current');
					}
					return false;
				});
			}

		});
	}

	return {
		init : init
	};

})();
