Home = Class.create({
	initialize: function(element, options){
		Object.extend(this, pH8.Mixin.needsTemplates);
		Object.extend(this, pH8.Mixin.needsDictionary);
		Object.extend(this, pH8.Mixin.needsConfig);

		this.element = $(element);
		this.options = Object.extend({
			maxresults: 5,
			language: pH8.currentLanguage
		}, options || {});

		this.waitForTemplates(this.options.templates, this.onTemplatesLoaded.bind(this));
		this.waitForDictionary(this.onDictionaryLoaded.bind(this), this.options.language);
		this.waitForConfig(this.onConfigLoaded.bind(this));
		
	},
	onTemplatesLoaded: function(){
		this.templatesLoaded = true;
		this.onReady();
	},
	/**
	 * Gets called when the dictionary is loaded
	 */
	onDictionaryLoaded: function(){
		this.dictionary = new pH8.Dictionary();
		this.dictionaryLoaded = true;
		this.onReady();
	},
	/**
	 * handle loaded config
	 */
	onConfigLoaded: function(){
		var tempConfig = new pH8.Config();
		this.config = new Hash();
		$H(tempConfig.getList()).each(function(pair){
			this.config.set(pair.key, new Hash());
			$H(pair.value).each(function(secondPair){
					this.config.get(pair.key).set(secondPair.value, secondPair.key);
			}.bind(this));
		}.bind(this));
		this.configLoaded = true;
		this.onReady();
	},
	/**
	 * The all the dependancies are loaded, apply this method
	 */
	onReady: function(){
		if(this.dictionaryLoaded && this.configLoaded){
			this.setEventDelegates();

			
			if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
				//do nothing
				console.log('herererererer');
			}else{
				
				this.blocks = [];
				var point = 1;
				this.options.blocks.each(function(e){
					//this.element.down(e).hide();
					this.blocks.push( {element: this.element.down(e), animated: false, point: point} );
					point = parseInt(point) + parseInt(700);
					
					var contentCheck = this.element.down(e).down('.block-content-rotator');
					var tabsCheck = this.element.down(e).down('.block-loader-rotator');

					if(contentCheck && tabsCheck){

						var content = contentCheck.childElements();
						var tabs = tabsCheck.childElements();
						
						content.each(function(e,i){ /*e.hide();*/ });			
						tabs.each(function(e,i){ /*e.hide();*/ });					
						
					}

				}.bind(this));
				
				this.animation = 0;
				//Start here
				//Event.observe(window, 'scroll', this.getBlocks.bind(this));
				
				//if(document.documentElement.clientHeight > 700){
					this.getBlocks();
				//}				
			}

		}
	},
	/**
	 * Loops over delegates and create event listeners for it
	 */
	setEventDelegates: function(){
		$H(this.delegates).each(function(pair){
			if(pair.key == 'blur'){
				$H(pair.value).each(function(couple){
					this.setEventListenerOnElement(couple.key, pair.key, couple.value);
				}.bind(this));
			}else{
				this.element.observe(pair.key, Event.delegate(this.delegates[pair.key]).bindAsEventListener(this));
				
			}
		}.bind(this));
	},
	/**
	 * Helper function to set a EventListener to a event
	 * @param cssQuery
	 * @param eventType
	 * @param listener
	 */
	setEventListenerOnElement: function(cssQuery, eventType, listener){
		var element = this.element.down(cssQuery);
		if(element){
			element.observe(eventType, listener.bindAsEventListener(this));
		}
	},
	/**
	 * Event delegates
	 */
	delegates: {
		'click': {
			'.btn-plan-pricing': function(e){
				e.stop();
				//console.log('herererer');
			}
		}
	},
	getBlocks: function(e){

		this.blocks.each(function(e,i){

			//if (i == this.animation && !e.animated && (document.body.offsetHeight + document.body.scrollTop) >= document.body.scrollHeight-20) {

				e.animated = true;

				e.element.appear({
					duration: 1.0, 
					from: 0, 
					to: 1,
					afterFinish: this.startBlock.bind(this,e)
				});
			//}
			
		}.bind(this));
		
		
		this.startBlock.bind(this,e);
	},
	startBlock: function(e,elm){
		this.animation++;
		var contentCheck = elm.element.down('.block-content-rotator');
		var tabsCheck = elm.element.down('.block-loader-rotator');
		
		if(contentCheck && tabsCheck){

			var content = contentCheck.childElements();
			var tabs = tabsCheck.childElements();

			content.each(function(e,i){	
				e.appear({
					duration: 1.0, 
					from: 0, 
					to: 1,
					afterFinish: this.endBlock.bind(this,[elm.element, i+1, content.length]),
					delay: i * 1
				});
				
			}.bind(this));
			
			tabs.each(function(e,i){

				e.appear({
					duration: 1.0, 
					from: 0, 
					to: 1,
					delay: i * 1
				});
				
			}.bind(this));			
		}



	},
	endBlock: function(args){
		if(args[1]==args[2]){
			new TabRotator(args[0], {
				contentElementSelector: '.block-content-rotator',
				tabsElementSelector: '.block-loader-rotator',
				parameterName: 'itemID',
				interval: 5,
				animateLoader: false,
				animatingLoaderClass: 'campaign-loader-animating',
				animationClassPrefix: 'state-',
				animationFrames: 1,
				animationDuration: 1
			});
		}
	}
});