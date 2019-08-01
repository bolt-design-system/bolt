import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html } from '@bolt/core';
import classNames from 'classnames/bind';
import styles from './character.scss';

let cx = classNames.bind(styles);

@define
class BoltCharacter extends withLitHtml() {
  static is = 'bolt-character';

  static props = {
    noShadow: {
      ...props.boolean,
      ...{ default: false },
    },
    characterUrl: {
      ...props.string,
      ...{
        default:
          'https://github.com/basaltinc/temp-pega-dummy-assets/raw/master/customer-happy.png',
      },
    },
    size: {
      ...props.string,
      ...{
        default: 'small',
      },
    },
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    return self;
  }

  render() {
    const { characterUrl, size } = this.validateProps(this.props);
    const classes = cx('c-bolt-character', `c-bolt-character--${size}`);

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}" is="shadow-root">
        <span class="c-bolt-character__slot--top">
          ${this.slot('top')}
        </span>
        <span class="c-bolt-character__slot--left">
          ${this.slot('left')}
        </span>
        <span class="c-bolt-character__slot--bottom">
          ${this.slot('bottom')}
        </span>
        <span class="c-bolt-character__slot--right">
          ${this.slot('right')}
        </span>
        <img
          class="c-bolt-character__main-image"
          src="${characterUrl}"
          alt="Character Image"
        />
      </div>
    `;
  }
}

export { BoltCharacter };
