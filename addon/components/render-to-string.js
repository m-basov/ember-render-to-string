import Component from '@ember/component';
import layout from 'ember-render-to-string/templates/components/render-to-string';
import { get, computed } from '@ember/object';
import { assert } from '@ember/debug';
import { getOwner } from '@ember/application';

export default Component.extend({
  tagName: '',
  layout,

  /**
   * Type of result to return:
   * – 'html' – node.innerHTML
   * – 'text' – node.innerText
   * – 'dom' – node
   *
   * @default 'html'
   * @type {String}
   * @public
   */
  content: 'html',

  /**
   * Tag name for HTML node. Accept any valid for document.createElement() method tag.
   * Usefull only with `content='dom'`
   *
   * @default 'div'
   * @type {String}
   * @public
   */
  destElTag: 'div',

  /**
   * Action to call after yielded template has been rendered. Hook accepts one
   * argument which content depends on `content` property.
   *
   * @default NoOp
   * @public
   */
  afterRender() {},

  // Fastboot service
  fastboot: computed({
    get() {
      let owner = getOwner(this);
      return owner.lookup('service:fastboot');
    }
  }),

  isNotFastboot: computed({
    get() {
      let fastboot = get(this, 'fastboot');
      return !(fastboot && get(fastboot, 'isFastBoot'));
    }
  }),

  // Create element based on `destElTag`
  destEl: computed('destElTag', {
    get() {
      let tag = get(this, 'destElTag');
      return document.createElement(tag);
    }
  }),

  didRender() {
    this._super(...arguments);

    // Trigger afterRender hook only in non-fastboot mode.
    // Because we cannot create destEl in fastboot.
    if (get(this, 'isNotFastboot')){
      this._extractHTML();
    }
  },

  /**
   * Validate passed action and call it with content
   *
   * @private
   */
  _extractHTML() {
    let afterRender = get(this, 'afterRender');
    assert(
      `afterRender must be a function. You provided: ${typeof afterRender}`,
      typeof afterRender === 'function'
    );
    afterRender(this._getContent());
  },

  /**
   * Get content from `destEl` based on `content` property.
   *
   * @return {String|HTMLNode}
   * @private
   */
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
