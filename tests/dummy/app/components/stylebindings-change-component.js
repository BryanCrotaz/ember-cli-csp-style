import Component from '@ember/component';

import CspStyleMixin from 'ember-cli-csp-style/mixins/csp-style';

export default Component.extend(CspStyleMixin, {

	classNames: ['component'],
	styleBindings: ['color'],

	color: 'red',
	minWidth: 100,
	
	click: function() {
		this.set('styleBindings', ['min-width[px]']);
	}
});