import { html, render } from 'lit-html';

import {
  withComponent,
  shadow,
  props,
  hasNativeShadowDomSupport,
  findParentTag,
} from '../utils';
import { BoltBase } from './bolt-base';

export { html, render } from 'lit-html';
export { unsafeHTML } from 'lit-html/lib/unsafe-html';

export function withLitHtml(Base = HTMLElement) {
  return class extends withComponent(BoltBase(Base)) {
    static props = {
      onClick: props.string,
      onClickTarget: props.string,
    };

    constructor(...args) {
      super(...args);
    }

    renderStyles(styles) {
      if (styles) {
        return html`<style>${styles}</style>`;
      }
    }

    slot(name) {
      if (typeof this.slots[name] === 'undefined') {
        this.slots[name] = [];
      }

      if (this.useShadow && hasNativeShadowDomSupport) {
        if (name === 'default') {
          return html`<slot />`;
        } else {
          return html`<slot name="${name}" />`;
        }
      } else {
        if (name === 'default') {
          return html`${this.slots.default}`;
        } else if (this.slots[name] && this.slots[name] !== []) {
          return html`${this.slots[name]}`;
        } else {
          return ''; // No slots assigned so don't return any markup.
          console.log(`The ${name} slot doesn't appear to exist...`);
        }
      }
    }

    renderer(root, call) {
      render(call(), root);
    }
  };
}
