import Ember from 'ember';

import CspStyleMixin from 'ember-cli-csp-style/mixins/csp-style';

export default Ember.Component.extend(CspStyleMixin, {

	classNames: ['component'],
	styleBindings: ['color'],

	color: 'red',
	minWidth: 100,
	
	click: function() {
		this.set('styleBindings', ['min-width[px]']);
	}
});