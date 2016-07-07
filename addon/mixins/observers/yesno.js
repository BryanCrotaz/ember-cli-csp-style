import StyleObserver from './style';

export default StyleObserver.extend({
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

