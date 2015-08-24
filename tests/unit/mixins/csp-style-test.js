import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('csp-style', 'Integration | Mixin | csp-style', {
  integration: true,
});

test('renders with no styles', function(assert) {
  this.render(hbs`{{no-style-component}}`);
  
  var element = this.$('.component');
  assert.ok(element.length > 0);
  assert.equal(element[0].attributes.style, null);
});

test('renders with string style', function(assert) {
  this.render(hbs`{{string-style-component}}`);
  
  var element = this.$('.component');
  assert.ok(element.length > 0);
  assert.equal(element[0].attributes.style.value.trim(), 'color: red;');
});

test('updates style after property change', function(assert) {
  this.render(hbs`{{string-style-component}}`);
  
  var element = this.$('.component');
  assert.ok(element.length > 0);
  assert.equal(element[0].attributes.style.value.trim(), 'color: red;');

  element.click();
  assert.equal(element[0].attributes.style.value.trim(), 'color: blue;');
});

test('style with units', function(assert) {
  this.render(hbs`{{pixels-style-component}}`);
  
  var element = this.$('.component');
  assert.ok(element.length > 0);
  assert.equal(element[0].attributes.style.value.trim(), 'width: 100px;');

  element.click();
  assert.equal(element[0].attributes.style.value.trim(), 'width: 200px;');
});

test('updates style after styleBindings change', function(assert) {
  this.render(hbs`{{stylebindings-change-component}}`);
  
  var element = this.$('.component');
  assert.ok(element.length > 0);
  assert.equal(element[0].attributes.style.value.trim(), 'color: red;');

  element.click();
  assert.equal(element[0].attributes.style.value.trim(), 'min-width: 100px;');
});
