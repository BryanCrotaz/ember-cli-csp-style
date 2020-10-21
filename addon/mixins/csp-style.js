import { camelize } from '@ember/string';
import { get, observer, set } from '@ember/object';
import Mixin from '@ember/object/mixin';
import StyleObserver from './observers/style';
import YesNoStyleObserver from './observers/yesno';

export default Mixin.create({
	
	concatenatedProperties: ['styleBindings'],

	_styleObservers: null,

	_calculatedStyle: null,

	_regex: /^(([^\?:]+):)?([a-z0-9_\.-]+)(\[([a-z%]+)\])?(\?([a-z0-9_\.\-]*):([a-z0-9_\.\-]*))?$/i,

	didInsertElement() {
		this._super(...arguments);
		this._refreshBindings();
	},

	willDestroyElement() {
		var observers = get(this, '_styleObservers') || {};
		// remove all bindings
		for(var property in observers) {
			if (observers.hasOwnProperty(property)) {
				observers[property].destroy();
				delete observers[property];
			}
		}
		this._super(...arguments);
	},

	styleBindingsChanged: observer('styleBindings', function() {
		this._refreshBindings();
	}),

	_writeStyle: observer('_calculatedStyle', function() {
		let elements = this.$();
		if (elements && elements.length > 0)
		{
      let calculatedStyle = this._calculatedStyle;
			try
			{
				requestAnimationFrame(() => elements[0].style = calculatedStyle);
			}
			catch(err)
			{
				elements.attr('style', calculatedStyle);
			}
		}
	}),

	_refreshStyle() {
		var style = "";
		var observers = get(this, '_styleObservers');
		for (var key in observers)
		{
			if (key === "style" || key.indexOf(":style?") > -1 || (key.indexOf(":style") > -1 && key.indexOf(":style") === key.length-6)) {
				style = get(observers[key], 'styleChunk');
				// trim off prefix and suffix
				style = style.substring(6, style.length-1);
				break;
			}
			else
			{
				style += get(observers[key], 'styleChunk');
			}
		}
		set(this, '_calculatedStyle', style);
	},

	_refreshBindings: function() {

		var styleBindings = this.get('styleBindings') || [];

		var observers = this.get('_styleObservers') || {};
		var foundBindings = {};

		// iterate the style bindings
		for (var i=0; i< styleBindings.length; i++) {
			var binding = styleBindings[i];

			// add the observer if it's not there already
			if (!observers[binding])
			{
				observers[binding] = this._createObserver(binding);
			}
			foundBindings[binding] = true;
		}

		// look for removed bindings
		for(var property in observers) {
			if (observers.hasOwnProperty(property)) {
				if (!foundBindings[property])
				{
					observers[property].destroy();
					delete observers[property];
				}
			}
		}

		this.set('_styleObservers', observers);
		this._refreshStyle();
	},

	_createObserver: function(binding) {
		var match = binding.match(this.get('_regex'));
		if (match) {
			var cssProp = match[3];
			var emberProp = match[2] || camelize(cssProp);
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
