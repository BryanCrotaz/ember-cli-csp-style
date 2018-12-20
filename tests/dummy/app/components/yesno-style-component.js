import Component from '@ember/component';
import CspStyleMixin from 'ember-cli-csp-style/mixins/csp-style';

export default Component.extend(CspStyleMixin, {

	classNames: ['component'],
	styleBindings: ['isBig:width[px]?200:100'],

	isBig: true,
	
	click: function() {
		this.set('isBig', false);
	}
});