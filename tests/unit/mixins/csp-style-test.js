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
  let done = assert.async();

  this.render(hbs`{{no-style-component}}`);
  
  var element = this.$('.component');
  assert.ok(element.length > 0);
  requestAnimationFrame(() => {
    assert.equal(getStyle(element), "");
    done();
  });
});

test('renders with string style', function(assert) {
  let done = assert.async();

  this.render(hbs`{{string-style-component}}`);
  
  var element = this.$('.component');
  requestAnimationFrame(() => {
    assert.ok(element.length > 0);
    assert.equal(getStyle(element), 'color:red;');
    done();
  });
});

test('updates style after property change', function(assert) {
  let done = assert.async();

  this.render(hbs`{{string-style-component}}`);
  
  var element = this.$('.component');
  assert.ok(element.length > 0);
  requestAnimationFrame(() => {
    assert.equal(getStyle(element), 'color:red;');
    element.click();

    requestAnimationFrame(() => {
      assert.equal(getStyle(element), 'color:blue;');
      done();
    });
  });
});

test('style with units', function(assert) {
  let done = assert.async();

  this.render(hbs`{{pixels-style-component}}`);
  
  var element = this.$('.component');
  assert.ok(element.length > 0);
  requestAnimationFrame(() => {
    assert.equal(getStyle(element), 'width:100px;');

    element.click();
    requestAnimationFrame(() => {
      assert.equal(getStyle(element), 'width:200px;');
      done();
    });
  });
});

test('style with yes no', function(assert) {
  let done = assert.async();
  
  this.render(hbs`{{yesno-style-component}}`);
  
  var element = this.$('.component');
  assert.ok(element.length > 0);
  requestAnimationFrame(() => {
    assert.equal(getStyle(element), 'width:200px;');

    element.click();
    requestAnimationFrame(() => {
      assert.equal(getStyle(element), 'width:100px;');
      done();
    });
  });
});

test('updates style after styleBindings change', function(assert) {
  let done = assert.async();
  
  this.render(hbs`{{stylebindings-change-component}}`);
  
  var element = this.$('.component');
  assert.ok(element.length > 0);
  requestAnimationFrame(() => {
    assert.equal(getStyle(element), 'color:red;');

    element.click();
    requestAnimationFrame(() => {
      assert.equal(getStyle(element), 'min-width:100px;');
      done();
    });
  });
});

