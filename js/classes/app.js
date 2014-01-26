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
					console.log(block);
					if(index == 1){
						var before = $(block).prev();
						console.log(before);
						$(block).insertBefore($(before[0]));
					}
				});
			}
		});
	}
});