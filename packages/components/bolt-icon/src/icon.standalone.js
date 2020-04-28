import {
  customElement,
  BoltElement,
  html,
  hasNativeShadowDomSupport,
  unsafeHTML,
  unsafeCSS,
} from '@bolt/element';
import classNames from 'classnames/bind';
import iconStyles from './icon.scss';
let cx = classNames.bind(iconStyles);

// reuses the auto-injected SVG sprite markup to work around situations where we can't externally reference these symbols (ex. in the ShadowDOM)
import BrowserSprite from 'svg-baker-runtime/src/browser-sprite';
import { spacingSizes } from '@bolt/core-v3.x/data';
import schema from '../icon.schema';
const svgIcons = require.context('@bolt/components-icons', true, /\.svg$/);

console.log(svgIcons);

const spriteNodeId = '__SVG_SPRITE_NODE__';
const spriteGlobalVarName = '__SVG_SPRITE__';
const isSpriteExists = !!window[spriteGlobalVarName];

svgIcons.keys().reduce((images, path) => {
  const key = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
  images[key] = svgIcons(path).default;
  return images;
}, {});

@customElement('bolt-icon')
class BoltIcon extends BoltElement {
  static schema = schema;

  static get properties() {
    return {
      ...this.props,
    };
  }

  constructor() {
    super();
    this.svgSymbol = null;

    if (isSpriteExists) {
      this.sprite = window[spriteGlobalVarName];
    } else {
      this.sprite = new BrowserSprite({ attrs: { id: spriteNodeId } });
      window[spriteGlobalVarName] = this.sprite;
    }

    const existing = document.getElementById(spriteNodeId);

    if (existing) {
      this.sprite.attach(existing);
    } else {
      this.sprite.mount(document.body, true);
    }
  }

  static useShadow = false;

  static get styles() {
    return [unsafeCSS(iconStyles)];
  }

  render() {
    const classes = cx('c-bolt-icon', {
      [`c-bolt-icon--${this.size}`]: this.size,
      [`c-bolt-icon--${this.name}`]: this.name,
      ['has-background']:
        this.background !== 'none' &&
        schema.properties.background.enum.includes(this.background),
      [`has-${this.background}-background`]:
        this.background !== 'none' &&
        schema.properties.background.enum.includes(this.background),
      [`c-bolt-icon--${this.color}`]: schema.properties.color.enum.includes(
        this.color,
      ),
    });

    const iconClasses = cx('c-bolt-icon__icon', {
      [`c-bolt-icon__icon--${this.size}`]:
        spacingSizes[this.size] && spacingSizes[this.size] !== '',
    });

    const backgroundClasses = cx('c-bolt-icon__background-shape', {
      [`c-bolt-icon__background-shape--${this.background}`]: schema.properties.background.enum.includes(
        this.background,
      ),
    });

    const inShadowDom =
      hasNativeShadowDomSupport && this.getRootNode() instanceof ShadowRoot;

    const shouldRenderFallbackMarkup =
      (inShadowDom || window.self !== window.top) && this?.sprite?.node;

    if (
      shouldRenderFallbackMarkup &&
      this.name &&
      this.sprite?.node?.querySelector(`#${this.name}`)
    ) {
      this.svgSymbol = this.sprite?.node?.querySelector(
        `#${this.name}`,
      )?.outerHTML;
    }

    return html`
      <!-- Auto-inject the SVG <symbol> when rendering inside of an iframe OR in a parent element that has a Shadow DOM -->
      ${shouldRenderFallbackMarkup && this.svgSymbol
        ? html`
            <style>
              ${unsafeCSS(iconStyles)}
            </style>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              style="position: absolute; width: 0; height: 0"
            >
              ${unsafeHTML(this.svgSymbol)}
            </svg>
          `
        : ''}
      <span class="${classes}">
        <svg class="${iconClasses}">
          <use href="${`#${this.name}`}" />
        </svg>
        ${this.background && this.background !== 'none'
          ? html`
              <span class="${backgroundClasses}"></span>
            `
          : ''}
      </span>
    `;
  }
}

export { BoltIcon };
