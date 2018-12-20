import Component from '@ember/component';

import CspStyleMixin from 'ember-cli-csp-style/mixins/csp-style';

export default Component.extend(CspStyleMixin, {

	classNames: ['component'],
	styleBindings: ['color'],

	color: 'red',
	
	click: function() {
		this.set('color', 'blue');
	}
});