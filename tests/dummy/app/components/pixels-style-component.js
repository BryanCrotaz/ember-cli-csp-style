import Ember from 'ember';
import CspStyleMixin from 'ember-cli-csp-style/mixins/csp-style';

export default Ember.Component.extend(CspStyleMixin, {

	classNames: ['component'],
	styleBindings: ['width[px]'],

	width: 100,
	
	click: function() {
		this.set('width', 200);
	}
});