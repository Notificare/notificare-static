$( document ).ready(function() {
	
	var isHandheld = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
	
	var isPhone = (/iphone|ipod/i.test(navigator.userAgent.toLowerCase()));
	
	//Menu Active
	$(function(){
		function stripTrailingSlash(str) {
			if(str.substr(-1) == '/') {
				return str.substr(0, str.length - 1);
			}
			return str;
		}

		var url = window.location.pathname;  
		var activePage = stripTrailingSlash(url);

		$('.nav li a').each(function(){  
			var currentPage = stripTrailingSlash($(this).attr('href'));

			if (activePage == currentPage) {
				$(this).parent().addClass('active'); 
			} 
		});
	});
	
	if(isHandheld){
		$('body').on('touchmove', function(e) {
			if($('body').scrollTop() < 80){
				$('#header').removeClass('headroom--pinned');
			}else{
				$('#header').addClass('headroom--pinned');
			}
		});
	
	} else {
		$(window).on('scroll', function(e) {
			if($('body').scrollTop() < 80){
				$('#header').removeClass('headroom--pinned');
			}else{
				$('#header').addClass('headroom--pinned');
			}
		});
	}
	
	
	
	if(isPhone){
		var featurettes = $('.home').find('.featurette');
		$.each( featurettes, function( index, featurette ) {
			if(index == 1){
				var content = $(featurette).children();
				$.each( content, function( index, block ) {
					if(index == 1){
						var before = $(block).prev();
						$(block).insertBefore($(before[0]));
					}
				});
			}
		});
	}

	if($('body').hasClass('home')){
		var blocks = $('.marketing .row').find('.blocks');
		var objs = [];
		$.each( blocks, function(k , v){
			objs.push(k);
		});
		
		var rands = array_rand(objs, (blocks.length - 3));
		
		$.each( rands, function(k , v){
			blocks[v].remove();
		});
	}
	

	
	function array_rand( input, num_req ) {	// Pick one or more random entries out of an array
		// 
		// +   original by: _argos

		var Indexes = [];
		var Ticks = num_req || 1;
		var Check = {
			Duplicate	: function ( input, value ) {
				var Exist = false, Index = 0;
				while ( Index < input.length ) {
					if ( input [ Index ] === value ) {
						Exist = true;
						break;
					}
					Index++;
				}
				return Exist;
			}
		};

		if ( input instanceof Array && Ticks <= input.length ) {
			while ( true ) {
				var Rand = Math.floor ( ( Math.random ( ) * input.length ) );
				if ( Indexes.length === Ticks ) { break; }
				if ( !Check.Duplicate ( Indexes, Rand ) ) { Indexes.push ( Rand ); }
			}
		} else {
			Indexes = null;
		}

		return ( ( Ticks == 1 ) ? Indexes.join ( ) : Indexes );
	}

	
	window.setTimeout(function(){
		var form = $('.SG_widget_form');
		var field = $('.SG_widget_form').find('.SG_widget_form_input');
		var button = $('.SG_widget_form').find('.SG_widget_form_submit');
		button.addClass('btn');
		button.addClass('btn-blue');
		$('.SG_widget_form').find('table').remove();
		$('.SG_widget_form').append($(field));
		$('.SG_widget_form').append($(button));
	}, 500);
	
});