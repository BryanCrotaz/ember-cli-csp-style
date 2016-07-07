import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('csp-style', 'Integration | Mixin | csp-style', {
  integration: true,
});

var getStyle = function(element) {
	var style = element[0].attributes.style;
	if (!style) {
		return "";
	}
  let result = style.value;
  if ((result !== undefined) && result.trim)
  {
    result = result.trim().replace(': ', ':');
  } 
	return result;
};

test('renders with no styles', function(assert) {
  this.render(hbs`{{no-style-component}}`);
  
  var element = this.$('.component');
  assert.ok(element.length > 0);
  assert.equal(getStyle(element), "");
});

test('renders with string style', function(assert) {
  this.render(hbs`{{string-style-component}}`);
  
  var element = this.$('.component');
  assert.ok(element.length > 0);
  assert.equal(getStyle(element), 'color:red;');
});

test('updates style after property change', function(assert) {
  this.render(hbs`{{string-style-component}}`);
  
  var element = this.$('.component');
  assert.ok(element.length > 0);
  assert.equal(getStyle(element), 'color:red;');

  element.click();
  assert.equal(getStyle(element), 'color:blue;');
});

test('style with units', function(assert) {
  this.render(hbs`{{pixels-style-component}}`);
  
  var element = this.$('.component');
  assert.ok(element.length > 0);
  assert.equal(getStyle(element), 'width:100px;');

  element.click();
  assert.equal(getStyle(element), 'width:200px;');
});

test('style with yes no', function(assert) {
  this.render(hbs`{{yesno-style-component}}`);
  
  var element = this.$('.component');
  assert.ok(element.length > 0);
  assert.equal(getStyle(element), 'width:200px;');

  element.click();
  assert.equal(getStyle(element), 'width:100px;');
});

test('updates style after styleBindings change', function(assert) {
  this.render(hbs`{{stylebindings-change-component}}`);
  
  var element = this.$('.component');
  assert.ok(element.length > 0);
  assert.equal(getStyle(element), 'color:red;');

  element.click();
  assert.equal(getStyle(element), 'min-width:100px;');
});

