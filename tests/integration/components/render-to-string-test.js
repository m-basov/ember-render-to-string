import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | render-to-string', function(hooks) {
  setupRenderingTest(hooks);

  test('it do not render anything to DOM', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#render-to-string afterRender=(action (mut flush))}}
        <h2>This should not appear inside of Ember rendered DOM.</h2>
      {{/render-to-string}}
    `);
    assert.equal(this.element.innerHTML.trim(), '<!---->');
  });

  test('it should return HTML string by default', async function(assert) {
    assert.expect(1);

    this.set('afterRender', (html) => {
      assert.equal(html.trim(), '<h2>Can you see me?</h2>');
    });

    await render(hbs`
      {{#render-to-string afterRender=(action afterRender)}}
        <h2>Can you see me?</h2>
      {{/render-to-string}}
    `);
  });

  test('it should return text string if specified', async function(assert) {
    assert.expect(1);

    this.set('afterRender', (html) => {
      assert.equal(html.trim(), 'Can you see me?');
    });

    await render(hbs`
      {{#render-to-string
        content="text"
        afterRender=(action afterRender)}}
        <h2>Can you see me?</h2>
      {{/render-to-string}}
    `);
  });

  test('it should return DOM element if specified', async function(assert) {
    assert.expect(1);

    this.set('afterRender', (html) => {
      assert.equal(html.getElementsByTagName('h2')[0].innerText, 'Can you see me?');
    });

    await render(hbs`
      {{#render-to-string
        content="dom"
        afterRender=(action afterRender)}}
        <h2>Can you see me?</h2>
      {{/render-to-string}}
    `);
  });

  test('it should allow to override destElTag', async function(assert) {
    assert.expect(1);

    this.set('afterRender', (html) => {
      assert.equal(html.tagName, 'BUTTON');
    });

    await render(hbs`
      {{#render-to-string
        content="dom"
        destElTag="button"
        afterRender=(action afterRender)}}
        <h2>I should be inside of button!</h2>
      {{/render-to-string}}
    `);
  });

  test('it should call action on each content change', async function(assert) {
    assert.expect(2);

    this.set('text', 'Can you see me?');
    this.set('afterRender', (html) => {
      let text = this.get('text');
      assert.equal(html.trim(), `<h2>${text}</h2>`);
    });

    await render(hbs`
      {{#render-to-string afterRender=(action afterRender)}}
        <h2>{{text}}</h2>
      {{/render-to-string}}
    `);

    this.set('text', 'Yes, I can!');
  });
});
