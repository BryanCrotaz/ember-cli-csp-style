# Ember-cli-csp-style

It is very important when creating a component as an addon to make sure that you do **not** require [CSP](https://en.wikipedia.org/wiki/Content_Security_Policy) to include `unsafe-inline`. If you do then the entire app that your component is used within will have no protection against style injection attacks.

This addon makes CSP-safe styling of your Ember component really easy.

[![Build Status](https://travis-ci.org/BryanCrotaz/ember-cli-csp-style.svg?branch=master)](https://travis-ci.org/BryanCrotaz/ember-cli-csp-style)

## Installation

* `npm install --save ember-cli-csp-style`

## Usage

In your component, supply an array of strings called `styleBindings`.

```
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
```

## Binding format

> Format borrowed from `with-style-mixin`

### Simple binding

`styleBindings: ['color']` binds the inline style value `color` to the `color` property on your component
`styleBindings: ['foreground:color']` binds the inline style value `color` to the `foreground` property on your component

### Binding with units
Only works with numeric values

`styleBindings: ['width[px]']` binds the inline style value `width` to the `width` property on your component, adding `'px'` on the end if the value is numeric

`styleBindings: ['width[%]']` binds the inline style value `width` to the `width` property on your component, adding `'%'` on the end if the value is numeric

`styleBindings: ['internalWidth:width[%]']` binds the inline style value `width` to the `internalWidth` property on your component, adding `'%'` on the end if the value is numeric

### Escaping

If the bound value is a string, it will be escaped for safety. If your property returns a `SafeString` then it will not be escaped.

### Switch values

`styleBindings: ['show:display?block:none']` binds to the `show` property. If it returns a truthy value, the style is set to `display:block`, otherwise it's set to `display:none`.

## Advanced

You can provide the `styleBindings` array as a `computed` property to change which styles are bound at run time.

If a bound property returns `null` then the style will be removed from the HTML.

## Binding style directly

If you bind directly to style:

```
styleBindings: ['style', 'width', 'display'],
style: Ember.computed('myData', function() {...}) 
'''
this will only output your calculated `style` and will ignore all other bindings (in this case `width` and `height`).


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
