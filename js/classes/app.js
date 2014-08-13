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

	
//	window.setTimeout(function(){
//		var form = $('.SG_widget_form');
//		var field = $('.SG_widget_form').find('.SG_widget_form_input');
//		var button = $('.SG_widget_form').find('.SG_widget_form_submit');
//		button.addClass('btn');
//		button.addClass('btn-blue');
//		$('.SG_widget_form').find('table').remove();
//		$('.SG_widget_form').append($(field));
//		$('.SG_widget_form').append($(button));
//	}, 500);


    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    $('.btn-order').click(function(e) {
		$('#modal-signup').modal('show');
		var plan = $(this).attr("rel"),
        href = $(this).attr("href");
		url_components = href.split("/"),
		planname = url_components[url_components.length - 1],
		$('.modal-title').html('Your choice: <strong>' + planname + '</strong>');
        var $form = $( '#signup' );
        $form.find( "input[name='plan']" ).val(plan);
        //reset any values
        $form.find( "input[name='firstname'], input[name='lastname'], input[name='telephone'], input[name='pass1'], input[name='pass2'], input[name='email'], input[name='company']" ).val('');
        $( "#signup-alert-error").hide();
        $( "#signup-alert-success").hide();
        return false;
	});


    $('.currency-change').change(function(e) {
        if($(this).val() == 'EUR'){
            $('.dollar').hide();
            $('.euro').show();
        } else {
            $('.euro').hide();
            $('.dollar').show();
        }
    });

    $('.notificare-form').each(function() {
        new NotificareForm(this, {
            type: $(this).data('type'),
            redirect: $(this).data('redirect')
        });
    });

    $('.signup-form-button').click(function(e) {
        e.preventDefault();
        // Get some values from elements on the page:
        var $form = $( '#signup' ),
            firstName = $form.find( "input[name='firstname']" ).val(),
            lastName = $form.find( "input[name='lastname']" ).val(),
            country = $form.find( "select[name='country']" ).val(),
            company = $form.find( "input[name='company']" ).val(),
            telephone = $form.find( "input[name='telephone']" ).val(),
            pass1 = $form.find( "input[name='pass1']" ).val(),
            pass2 = $form.find( "input[name='pass2']" ).val(),
            email = $form.find( "input[name='email']" ).val(),
            plan = $form.find( "input[name='plan']" ).val(),
            url = $form.attr( "action");

        $( ".icon-spinner").show();

        if(email && firstName && lastName && country && company && pass1 && pass2){

            if (pass1 != pass2) {
                $( "#signup-alert-error" ).html( 'Error: Passwords don\'t match' );
                $( "#signup-alert-error").show();
                $( ".icon-spinner").hide();
            } else if (!validateEmail(email)) {
                $( "#signup-alert-error" ).html( 'Error: Not a valid email address' );
                $( "#signup-alert-error").show();
                $( ".icon-spinner").hide();
            } else {
                var request = $.ajax({
                    url: url,
                    type: "POST",
                    data: JSON.stringify({account: {
                        name: firstName + ' ' + lastName,
                        email: email,
                        password: pass1,
                        plan: plan,
                        billing_info: {
                            company: company,
                            first_name: firstName,
                            last_name: lastName,
                            country: country,
                            phone: telephone
                        },
                        preferences:{
                            currency: $('.currency-change').val()
                        }
                    }}),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json"
                });

                request.done(function( msg ) {
                    $( "#signup-alert-success" ).html( 'Account created successfully. Please check your mail box. We have sent you an activation link to confirm your interest in this account and start your free 30 day trial.'  );
                    $( "#signup-alert-error").hide();
                    $( "#signup-alert-success").show();
                    $( "#signup-alert-info").hide();
                    $( ".icon-spinner").hide();
                    $form.find( "input[name='firstname'], input[name='lastname'], input[name='telephone'], input[name='pass1'], input[name='pass2'], input[name='email'], input[name='company']" ).val('');
                });

                request.fail(function( jqXHR, textStatus ) {
                    $( "#signup-alert-error" ).html( 'Error: ' + jqXHR.responseJSON.errors);
                    $( "#signup-alert-error").show();
                    $( ".icon-spinner").hide();
                });
            }

        } else {
            $( "#signup-alert-error" ).html( 'Error: Please insert all mandatory fields' );
            $( "#signup-alert-error").show();
            $( ".icon-spinner").hide();
        }


    });
});