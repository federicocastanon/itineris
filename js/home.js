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
	if($(objeto).children('p').prop('offsetHeight') < $(objeto).children('p').prop('scrollHeight')  || $(objeto).children('p').prop('offsetWidth') < $(objeto).children('p').prop('scrollWidth')) {
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


$(document).ready(function() {

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
	

	$(".agrandable").hover(function() {
		var elLink = $(this);
		timer = setTimeout(function() {
			agrandar(elLink);
		}, delay);
	}, function() {
		clearTimeout(timer);
		var clase = $(this).attr('class');
		var guardarAltura;
		if(clase == 'linkHome agrandable'){
			guardarAltura = '45%';
		}else{
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
