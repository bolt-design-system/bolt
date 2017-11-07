import { Component, define } from 'skatejs';

import styles from '../_button.scss';
import StyledMixin from '../util/styled-mixin.js';
import sizes from '../util/sizes.js';
// import style from '../util/style.js';
import css from '../util/css.js';


export default class BoltButton extends StyledMixin(Component) {
  /**
   * @property {string} is defines the component as bolt-button
   */
  static get is() {
    return 'bolt-button';
  }

  static get styleSheet() {
    return styles;
  }

  static get props() {
    return {
      theme: { attribute: true },
      size: { attribute: true }
    };
  }

  renderCallback() {
    const className = css(
      'c-bolt-button',
      this.theme ? `c-bolt-button--${this.theme}` : '',
      this.size && sizes[this.size] ? `c-bolt-button--${this.size}` : ''
    );

    return (
      <button class={className}>
        <span class="c-bolt-button__item">
          <slot />
        </span>
      </button>
    );
  }
}

define(BoltButton);
