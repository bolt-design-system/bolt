import { convertInitialTags, customElement, html } from '@bolt/element';
import { props } from '@bolt/core-v3.x/utils';
import { render } from '@bolt/core-v3.x/renderers/renderer-lit-html';
import { BoltAction } from '@bolt/core-v3.x/elements/bolt-action';
import classNames from 'classnames/bind';
import styles from './chip.scss';
import schema from '../chip.schema';

let cx = classNames.bind(styles);

@customElement('bolt-chip')
@convertInitialTags('a', 'span') // The first matching tag will have its attributes converted to component props
class BoltChip extends BoltAction {
  static props = {
    ...BoltAction.props, // Provides: disabled, onClick, onClickTarget, target, url
    size: props.string,
    iconOnly: props.boolean,
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  constructor(self) {
    self = super(self);
    self.schema = this.getModifiedSchema(schema, ['text']); // remove `text` prop from schema, Twig only
    self.delegateFocus = true;
    return self;
  }

  render() {
    // 1. Remove line breaks before and after lit-html template tags, causes unwanted space inside and around inline chips
    // 2. Zero Width No-break Space (&#xfeff;) is needed to make the last word always stick with the icon, so the icon will never become an orphan.

    // Validate the original prop data passed along -- returns back the validated data w/ added default values
    const { url, target, size, iconOnly } = this.validateProps(this.props);

    const classes = cx('c-bolt-chip', {
      [`c-bolt-chip--link`]: url,
      [`c-bolt-chip--size-${size}`]: size,
      [`c-bolt-chip--icon-only`]: iconOnly,
    });

    // Decide on if the rendered tag should be a <span> or <a> tag, based on if a URL exists
    const hasUrl = url && url.length > 0;

    // Assign default target attribute value if one isn't specified
    const anchorTarget = target && hasUrl ? target : '_self';

    // The chipElement to render, based on the initial HTML passed alone.
    let renderedChip;

    // 1. Remove line breaks before and after lit-html template tags, causes unwanted space inside and around inline links
    // 2. Zero Width No-break Space (&#xfeff;) is needed to make the last word always stick with the icon, so the icon will never become an orphan.
    // prettier-ignore
    const innerSlots = html`${
      'before' in this.slots
        ? html`<span class="${cx(`c-bolt-chip__icon`)}">&#xfeff;${this.slot('before')}</span>`
        : html`<slot name="before" />`}${
      'default' in this.slots
        ? html`<span class="${cx(`c-bolt-chip__text`)}">${this.slot('default')}</span>`
        : html`<slot />`}${
      'after' in this.slots
        ? html`<span class="${cx(`c-bolt-chip__icon`)}">&#xfeff;${this.slot('after')}</span>`
        : html`<slot name="after" />`}`;

    if (this.rootElement) {
      renderedChip = this.rootElement.firstChild.cloneNode(true);
      if (renderedChip.getAttribute('href') === null && hasUrl) {
        renderedChip.setAttribute('href', this.props.url);
      }
      renderedChip.className += ' ' + classes;
      render(innerSlots, renderedChip);
    } else if (hasUrl) {
      // [1]
      // prettier-ignore
      renderedChip = html`<a href="${this.props.url}" class="${classes}" target="${anchorTarget}"
          >${innerSlots}</a
        >`;
    } else {
      // [1]
      // prettier-ignore
      renderedChip = html`<span class="${classes}"
          >${innerSlots}</span
        >`;
    }

    // [1]
    // prettier-ignore
    return html`${this.addStyles([styles])}${renderedChip}`;
  }
}

export { BoltChip };
