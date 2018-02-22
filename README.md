ember-render-to-string
==============================================================================

[![Greenkeeper badge](https://badges.greenkeeper.io/kolybasov/ember-render-to-string.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/kolybasov/ember-render-to-string.svg?branch=master)](https://travis-ci.org/kolybasov/ember-render-to-string)
[![Ember Observer Score](https://emberobserver.com/badges/ember-render-to-string.svg)](https://emberobserver.com/addons/ember-render-to-string)

A component to render any Ember template to string. Works with Ember 2.10+(Glimmer 2) and FastBoot!

Motivation
------------------------------------------------------------------------------

There is a need sometimes to render Ember Template to string without poluting
the rest of the page with unwanted content. It is especially useful for
making wrappers for third-party libraries where you can pass innerHTML of element.
For example [ember-medium-editor](https://github.com/kolybasov/ember-medium-editor)
uses it to pass innerHTML for buttons.

Implementation is borrowed from awesome [ember-composability-tools](https://github.com/miguelcobain/ember-composability-tools#3-render-blocks-as-dom-but-not-to-the-document) but
`ember-wormhole` addon was replaced by native `in-element` helper which still
private API but there is [RFC](https://github.com/emberjs/rfcs/pull/287) to
promote it to public.

Installation
------------------------------------------------------------------------------

* With ember: `ember install ember-render-to-string` 
* With yarn: `yarn add --dev ember-render-to-string` 
* With npm: `npm install --save-dev ember-render-to-string`

Usage
------------------------------------------------------------------------------

```javascript
import Component from '@ember/component';

export default Component.extend({
  items: ['Ember', 'Vue', 'React'],

  actions: {
    returnInnerHTML(html) {
      console.log(html); // '<h2>Can you see me?</h2>'
    },

    returnJustText(text) {
      console.log(text); // 'Can you see me?'
    },

    returnDOMNode(node) {
      console.log(node.tagName); // 'DIV'
    },

    returnCustomDOMNode(node) {
      console.log(node.tagName); // 'BUTTON'
    },

    anyEmberHelper(html) {
      console.log(html); // '<ul><li>Ember</li><li>Vue</li><li>React</li></ul>'
    }
  }
});
```

```handlebars
{{#render-to-string afterRender=(action "returnInnerHTML")}}
  <h2>Can you see me?</h2>
{{/render-to-string}}

{{#render-to-string 
  content="text"
  afterRender=(action "returnJustText")}}
  <h2>Can you see me?</h2>
{{/render-to-string}}

{{#render-to-string
  content="dom"
  afterRender=(action "returnDOMNode")}}
  <h2>Can you see me?</h2>
{{/render-to-string}}

{{#render-to-string
  content="dom"
  destElTag="button"
  afterRender=(action "returnCustomDOMNode")}}
  <h2>Can you see me?</h2>
{{/render-to-string}}

{{#render-to-string afterRender=(action "anyEmberHelper")}}
  <ul>
    {{#each items as |lib|}}
      <li>{{lib}}</li>
    {{/each}}
  </ul>
{{/render-to-string}}
```

Options
------------------------------------------------------------------------------

* [content](./addon/components/render-to-string.js#L21)
* [destElTag](./addon/components/render-to-string.js#L31)
* [afterRender](./addon/components/render-to-string.js#L40)

Contributing
------------------------------------------------------------------------------

### Installation

* `git clone git@github.com:kolybasov/ember-render-to-string.git`
* `cd ember-render-to-string`
* `yarn install`

### Linting

* `yarn lint:js`
* `yarn lint:js --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `yarn test` – Runs `ember try:each` to test your addon against multiple Ember versions

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
