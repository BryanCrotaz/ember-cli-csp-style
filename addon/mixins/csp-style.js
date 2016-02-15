import Ember from 'ember';

var StyleObserver = Ember.Object.extend({
	target: null,
	property: null,
	cssName: null,
	unit: null,
	_cssStyle: null,

	_setup: Ember.on('init', function() {
		this.set('_cssStyle', this.get('target.element').style);
  	this._startObserving();
  	this._setStyle();
	}),

	_teardown: Ember.on('willDestroy', function() {
  	this.stop();
	}),

	_startObserving: function() {
		this.get('target').addObserver(this.get('property'), this, '_propertyDidChange');
	},

	stop: function() {
		var target = this.get('target');
		if (target)
		{
			target.removeObserver(this.get('property'), this, '_propertyDidChange');
	  	this._removeStyle();
			this.set('target', null);
		}
	},

	_propertyDidChange: function (/*target, property*/) {
		this._setStyle();
	},

	_setStyle: function() {
		var name = this.get('cssName');
		var unit = this.get('unit');
		var value = this._getValue();
		var cssStyle = this.get('_cssStyle');
		// add units to numeric value
		if (!isNaN(parseFloat(value)) && isFinite(value)) {
			value = value + unit;
		}
		// escape if necessary
		if (!(value instanceof Ember.Handlebars.SafeString)) {
			value = Ember.Handlebars.Utils.escapeExpression(value);
		}
		// ie9 gets upset if value is 'NaN'
		if (value === 'NaN') {
			value = '';
		}
		// set the property
		if (value != null)
		{
			cssStyle.setProperty(name, value);
		}
		else {
			cssStyle.removeProperty(name, value);
		}
	},

	_getValue: function() {
		var property = this.get('property');
		return this.get('target.'+property);
	},

	_removeStyle: function() {
		var name = this.get('cssName');
		var cssStyle = this.get('_cssStyle');
		cssStyle.removeProperty(name);
	}
});

var YesNoStyleObserver = StyleObserver.extend({
	yesNo: null,

	_getValue: function() {
		var value = this._super();
		var yesNo = this.get('yesNo');
		if (yesNo)
		{
			value = value ? yesNo.yes : yesNo.no;
		}
		return value;
	}
});

export default Ember.Mixin.create({
	
	concatenatedProperties: ['styleBindings'],
	_styleObservers: null,

	_regex: /^(([^\?:]+):)?([a-z0-9_\.-]+)(\[([a-z%]+)\])?(\?([a-z0-9_\.\-]*):([a-z0-9_\.\-]*))?$/i,

	doInit: Ember.on('willInsertElement', function() {
		this._refreshBindings();
	}),

	styleBindingsChanged: Ember.observer('styleBindings', function() {
		this._refreshBindings();
	}),

	doCleanup: Ember.on('willDestroyElement', function() {
		var observers = this.get('_styleObservers') || {};
		// remove all bindings
		for(var property in observers) {
			if (observers.hasOwnProperty(property)) {
				observers[property].stop();
				delete observers[property];
			}
		}
		this.set('_styleObservers', {});
	}),

	_refreshBindings: function() {

		var hashCode = function(s){
		  return s.split("").reduce(function(a,b){
		  	a=((a<<5)-a)+b.charCodeAt(0);
		  	return a&a;
		  },0);              
		};

		var styleBindings = this.get('styleBindings') || [];

		var observers = this.get('_styleObservers') || {};
		var foundBindings = {};

		// iterate the style bindings
		for (var i=0; i< styleBindings.length; i++) {
			var binding = styleBindings[i];

			var hash = hashCode(binding);
			// add the observer if it's not there already
			if (!observers[hash])
			{
				observers[hash] = this._createObserver(binding);
			}
			foundBindings[hash] = true;
		}

		// look for removed bindings
		for(var property in observers) {
			if (observers.hasOwnProperty(property)) {
				if (!foundBindings[property])
				{
					observers[property].stop();
					delete observers[property];
				}
			}
		}

		this.set('_styleObservers', observers);
	},

	_createObserver: function(binding) {
		var match = binding.match(this.get('_regex'));
		if (match) {
      var cssProp = match[3];
      var emberProp = match[2] || Ember.String.camelize(cssProp);
      var unit = match[5];
      var type = StyleObserver;
      var properties = {
				target: this,
				property: emberProp,
				cssName: cssProp,
				unit: unit
			};
      if (match[6]) {
      	type = YesNoStyleObserver;
        properties.yesNo = {
        	yes: match[7],
        	no: match[8]
        };
      }
      return type.create(properties);
    }
	}

});
