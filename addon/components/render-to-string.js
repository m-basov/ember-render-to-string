import Component from '@ember/component';
import layout from 'ember-render-to-string/templates/components/render-to-string';
import { get, computed } from '@ember/object';
import { assert } from '@ember/debug';

export default Component.extend({
  tagName: '',
  layout,

  content: 'html',
  destElTag: 'div',

  afterRender() {},

  destEl: computed('destElTag', {
    get() {
      let tag = get(this, 'destElTag');
      return document.createElement(tag);
    }
  }),

  didRender() {
    this._super(...arguments);
    this._extractHTML();
  },

  _extractHTML() {
    let afterRender = get(this, 'afterRender');
    assert(
      `afterRender must be a function. You provided: ${typeof afterRender}`,
      typeof afterRender === 'function'
    );
    afterRender(this._getContent());
  },

  _getContent() {
    let destEl = get(this, 'destEl');
    let content = get(this, 'content');

    switch (content) {
      case 'dom':
        return destEl;
      case 'text':
        return destEl.innerText;
      default:
        return destEl.innerHTML;
    }
  }
});
