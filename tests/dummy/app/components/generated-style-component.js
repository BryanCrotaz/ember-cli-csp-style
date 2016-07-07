import Ember from 'ember';
import CspStyleMixin from 'ember-cli-csp-style/mixins/csp-style';

export default Ember.Component.extend(CspStyleMixin, {

	classNames: ['component'],
	styleBindings: ['style1:style'],

	isBig: true,
	
	click: function() {
		if (this.get('isBig'))
		{
			this.set('isBig', false);
			this.set('style1', 'color: red;');
		}
		else
		{
			this.set('isBig', true);
			this.set('style1', 'color: blue;');
		}
	}
});