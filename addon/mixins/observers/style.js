import { isHTMLSafe } from '@ember/string';
import EmberObject from '@ember/object';
import Ember from 'ember';

export default EmberObject.extend({
	target: null,
	property: null,
	cssName: null,
	unit: null,
	styleChunk: null,

	init() {
		this._super(...arguments);
		this._startObserving();
		this._setStyle();
	},

	willDestroy() {
		var target = this.get('target');
		if (target)
		{
			target.removeObserver(this.get('property'), this, '_propertyDidChange');
			this.set('target', null);
		}
		this._super(...arguments);
	},

	_startObserving: function() {
		this.get('target').addObserver(this.get('property'), this, '_propertyDidChange');
	},

	_propertyDidChange: function (/*target, property*/) {
		this._setStyle();
	},

	_setStyle: function() {
		var name = this.get('cssName');
		var unit = this.get('unit');
		var value = this._getValue();
		// add units to numeric value
		if (!isNaN(parseFloat(value)) && isFinite(value) && unit) {
			value = value + unit;
		}
		// escape if necessary
		if (isHTMLSafe(value)) {
			value = value.toString();
		}
		else
		{
			value = Ember.Handlebars.Utils.escapeExpression(value);
		}
		// ie9 gets upset if value is 'NaN'
		if (value === 'NaN') {
			value = '';
		}
		// set the property
		this.set('styleChunk', `${name}:${value};`);
		this.get('target')._refreshStyle();
	},

	_getValue: function() {
		var property = this.get('property');
		return this.get('target.'+property);
	}
});
