# Ember-cli-csp-style

This addon makes CSP-safe styling of your Ember component really easy.

[![Build Status](https://travis-ci.org/BryanCrotaz/ember-cli-csp-style.svg?branch=master)](https://travis-ci.org/BryanCrotaz/ember-cli-csp-style)

## Installation

* `npm install --save ember-cli-csp-style`

## Usage

In your component, supply an array of strings called `styleBindings`.

    // app/components/my-component

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

## Binding format

> Format borrowed from `with-style-mixin`

### Simple binding

`styleBindings: ['color']` binds the css value `color` to the `color` property on your component
`styleBindings: ['foreground:color']` binds the css value `color` to the `foreground` property on your component

### Binding with units
Only works with numeric values

`styleBindings: ['width[px]']` binds the css value `width` to the `width` property on your component, adding `'px'` on the end if the value is numeric

`styleBindings: ['width[%]']` binds the css value `width` to the `width` property on your component, adding `'%'` on the end if the value is numeric

`styleBindings: ['internalWidth:width[%]']` binds the css value `width` to the `internalWidth` property on your component, adding `'%'` on the end if the value is numeric

### Escaping

If the bound value is a string, it will be escaped for safety. If your property returns a `SafeString` then it will not be escaped.

### Switch values

`styleBindings: ['show:display?block:none']` binds to the `show` property. If it returns a truthy value, the style is set to `display:block`, otherwise it's set to `display:none`.


## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## Authors

- [Bryan Crotaz](https://twitter.com/bryancrotaz)

## Legal

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
