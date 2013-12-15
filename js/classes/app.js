$( document ).ready(function() {
	
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
	
	$('body').on('touchmove', function(e) {
		if($('body').scrollTop() < 5){
			$('#header').removeClass('headroom--pinned');
		}
	});
	
	
	$(window).on('scroll', function(e) {
		if($('body').scrollTop() < 5){
			
			$('#header').removeClass('headroom--pinned');
		}
	});
	
});