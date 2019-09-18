import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html, convertSchemaToProps } from '@bolt/core';
import classNames from 'classnames/bind';
import styles from './status-dialogue-bar.scss';
import schema from './status-dialogue-bar.schema';

let cx = classNames.bind(styles);

@define
class BoltStatusDialogueBar extends withLitHtml() {
  static is = 'bolt-status-dialogue-bar';

  static props = {
    noShadow: {
      ...props.boolean,
      ...{ default: false },
    },
    ...convertSchemaToProps(schema),
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    return self;
  }

  render() {
    const {
      iconName,
      isAlertMessage,
      dialogueArrowDirection,
    } = this.validateProps(this.props);
    const classes = cx('c-bolt-status-dialogue-bar', {
      [`c-bolt-status-dialogue-bar--alert`]: isAlertMessage,
      [`c-bolt-status-dialogue-bar--include-${dialogueArrowDirection}-arrow`]: !!(
        dialogueArrowDirection && dialogueArrowDirection !== 'none'
      ),
    });

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}">
        ${iconName
          ? html`
              <bolt-icon
                size="medium"
                name="${iconName}"
                class="c-bolt-status-dialogue-bar__icon"
              />
            `
          : ''}
        <span class="c-bolt-status-dialogue-bar__slot--text">
          ${this.slot('text')}
        </span>
      </div>
    `;
  }
}

export { BoltStatusDialogueBar };
