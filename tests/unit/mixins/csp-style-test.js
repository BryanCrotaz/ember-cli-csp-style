import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { render } from '@ember/test-helpers';

module('Integration | Mixin | csp-style', function(hooks) {
  setupRenderingTest(hooks);

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

  test('renders with no styles', async function(assert) {
    let done = assert.async();

    await render(hbs`{{no-style-component}}`);
    
    var element = this.$('.component');
    assert.ok(element.length > 0);
    requestAnimationFrame(() => {
      assert.equal(getStyle(element), "");
      done();
    });
  });

  test('renders with string style', async function(assert) {
    let done = assert.async();

    await render(hbs`{{string-style-component}}`);
    
    var element = this.$('.component');
    requestAnimationFrame(() => {
      assert.ok(element.length > 0);
      assert.equal(getStyle(element), 'color:red;');
      done();
    });
  });

  test('updates style after property change', async function(assert) {
    let done = assert.async();

    await render(hbs`{{string-style-component}}`);
    
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

  test('style with units', async function(assert) {
    let done = assert.async();

    await render(hbs`{{pixels-style-component}}`);
    
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

  test('style with yes no', async function(assert) {
    let done = assert.async();
    
    await render(hbs`{{yesno-style-component}}`);
    
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

  test('updates style after styleBindings change', async function(assert) {
    let done = assert.async();
    
    await render(hbs`{{stylebindings-change-component}}`);
    
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
});

