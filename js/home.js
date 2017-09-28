jQuery.fn.animateAuto = function(prop, speed, callback) {
	var elem, valHeight, maxWidth;
	return this.each(function(i, el) { el = jQuery(el), maxWidth = el.width() - 37, elem = el.clone().css({
			"overflow" : "visible",
			"height" : "auto",
			"font-size" : "12px",
			"width" : maxWidth,
			"font-family" : "acLight"
		}).appendTo("body"); valHeight = elem.height(), elem.remove();
		var despl = $(el).height() - valHeight;
		var margin = despl + 'px 2% 0 2%';
		if(prop == 'both') {
			el.animate({
				"height" : height,
				"margin" : margin
			}, speed, callback);
		} else {
			el.animate({
				"height" : valHeight
			}, speed, callback);
		}

	});
};
function agrandar(objeto) {
	if($(objeto).children('p').prop('offsetHeight') < $(objeto).children('p').prop('scrollHeight') - 2 || $(objeto).children('p').prop('offsetWidth') < $(objeto).children('p').prop('scrollWidth') - 2) {
		// your element have overflow

		var elem, nuevaAltura, maxWidth, alturaVieja;
		$(objeto).children('p').each(function(i, el) { el = jQuery(el), maxWidth = el.width() - 37, alturaVieja = el.height() - 24, elem = el.clone().css({
				"overflow" : "visible",
				"height" : "auto",
				"font-size" : "12px",
				"width" : maxWidth,
				"font-family" : "acLight",
				"padding" : "0 29px 0 8px"
			}).appendTo("body"); nuevaAltura = elem.height(), elem.remove();

		});
		nuevaAltura = $(objeto).height() + nuevaAltura - alturaVieja;
		var despl = $(objeto).height() - nuevaAltura;
		var margin = despl + 'px 2% 0 2%';
		var padre = $(objeto);
		$(objeto).animate({
			height : nuevaAltura + 'px',
			"margin" : margin
		}, 1000);
		$(objeto).children('p').animateAuto("height", 1000);
	}
}

function linkear(linkId){
	$(linkId).click();
	//$(location).attr('href', link);
	//return true;
}


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
			$('.imagenPrincipal > ul').height($(".imagenPrincipal").height());
			$('.imagenPrincipal').unslider({
				speed : 1000, //  The speed to animate each slide (in milliseconds)
				delay : 7000, //  The delay between slide animations (in milliseconds)
				complete : function() {
					$('.imagenPrincipal > ul').height($(".imagenPrincipal").height());
				}, //  A function that gets called after every slide animation
				keys : true, //  Enable keyboard (left, right) arrow shortcuts
				dots : true, //  Display dot navigation
				fluid : false //  Support responsive design. May break non-responsive designs
			});
			var timer;
			var delay = 500;
			var ancho = $('#linkHome1').width() * 0.7;
				$('.imagenLinkHome').each(function(index) {
					$(this).css("max-width", ancho);
				});
			//setTimeout($.unblockUI, 20000);
			$.unblockUI();

			$(".agrandable").hover(function() {
				var elLink = $(this);
				timer = setTimeout(function() {
					agrandar(elLink);
				}, delay);
			}, function() {
				clearTimeout(timer);
				var clase = $(this).attr('class');
				var guardarAltura;
				if(clase == 'linkHome agrandable') {
					guardarAltura = '55%';
				} else {
					guardarAltura = '65%';
				}

				$(this).children('p').animate({
					height : guardarAltura
				}, 1000);
				$(this).animate({
					height : '90%',
					margin : '1% 2% 0 2%'
				}, 1000);
			});
		});
	});

	$('.linkHome').each(function(index) {
		$(this).click(function() {
			var link = $(this).find('.pie');
			var target = link.attr("target");

			if($.trim(target).length > 0) {
				window.open(link.attr("href"), target);
			} else {
				window.location = link.attr("href");
			}

			event.preventDefault();
		});
	});
	$('#linkHome1').each(function(){
		$(this).click(function() {
		window.location = 'http://www.revistanc.org.ar';
		});
	});
	$('#linkHome2').each(function(){
		$(this).click(function() {
		window.location = 'https://docs.google.com/forms/d/1_nTqzK1paAplm_TzXuYUt5nn88mVTaZmYKYmrgmXbxg/edit';
		});
	});
	$('#linkHome3').each(function(){
		$(this).click(function() {
		window.location = 'consultoria.html';
		});
	});
	$('#linkHome4').each(function(){
		$(this).click(function() {
		window.location = 'cursosytalleres.html?rel=cytsupcli';
		});
	});
	
});
