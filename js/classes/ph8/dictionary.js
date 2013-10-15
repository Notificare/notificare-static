/**
 * Singleton 
 */
pH8.Dictionary = (function() {
	/**
	 * Private var _instance, only one Dictionary instance needed
	 */
	var _instance = null;
	/**
	 * Private var _list holds the dictionary
	 */
	var _list = null;
	/**
	 * Public interface
	 */
	return function(language) {
		if (_instance !== null) {
			return _instance;
		}
		_instance = this;
		language = language || '';
		new Ajax.Request("/data/dictionary.json?language=" + language,{
			method: 'get',
			onSuccess: function(transport){
				_list = transport.responseJSON;
				document.fire("dictionary:loaded");
			}
		});
		this.isLoaded = function() {
			return (null !== _list);
		};
		this.getText = function(key) {
			if(_list[key]) {
				return _list[key];
			} else {
				return key;
			}
		};
	};
})();

/*
 * Mixin
 */
/**
 * @description mixin if you need dictionary support, calls the callback function as soon as the dictionary is available
 */
pH8.Mixin.needsDictionary = {
	/**
	 * Call this function in your initializer
	 * @param {Function} callback The function to call on successful dictionary load
	 * @param {String} language The language 
	 */
	waitForDictionary: function(callback, language){
		var dictionary = new pH8.Dictionary(language);
		if(dictionary.isLoaded()){
			callback();
		} else {
			document.observe("dictionary:loaded", callback);
		}
	}
}