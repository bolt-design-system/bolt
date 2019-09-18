import { props, define, hasNativeShadowDomSupport } from '@bolt/core/utils';
import { withLitHtml, html, convertSchemaToProps } from '@bolt/core';
import classNames from 'classnames/bind';
import debounce from 'lodash.debounce';
import styles from './interactive-pathways.scss';
import pathwaysLogo from './images/interactive-pathways-logo.png';
import schema from './interactive-pathways.schema';

let cx = classNames.bind(styles);

@define
class BoltInteractivePathways extends withLitHtml() {
  static is = 'bolt-interactive-pathways';

  static props = {
    noShadow: {
      ...props.boolean,
      ...{ default: false },
    },
    ...convertSchemaToProps(schema),
  };

  // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
  // @ts-ignore
  constructor(self) {
    self = super(self);
    self.useShadow = hasNativeShadowDomSupport;
    // self.schema = schema;
    self.activePathwayIndex = -1;
    self.pathways = [];
    self._isVisible = false;

    this.checkChildrenAndRender = debounce(done => {
      this.pathways = this.getPathways();
      this.triggerUpdate();
      // using callback since debounced promises require a different library that's not already in Bolt
      if (done) setTimeout(done, 0);
    }, 150);

    self.addEventListener(
      'bolt-interactive-pathway:connected',
      this.handlePathwayConnect,
    );
    self.addEventListener(
      'bolt-interactive-pathway:disconnected',
      this.handlePathwayDisconnect,
    );
    self.addEventListener('bolt-interactive-pathway:title-updated', () => {
      this.checkChildrenAndRender();
    });

    return self;
  }

  connectedCallback() {
    super.connectedCallback();

    this.style.opacity = 1;
  }

  /**
   * @param {Event} event
   */
  handlePathwayConnect(event) {
    this.checkChildrenAndRender(() => {
      if (this.activePathwayIndex === -1) {
        this.showPathway(0);
      }
    });
  }

  /**
   * @param {Event} event
   */
  handlePathwayDisconnect(event) {
    this.checkChildrenAndRender();
  }

  /**
   * Gets all the HTML bolt-interactive-pathway's on the page
   * @returns {BoltInteractivePathway[]}
   */
  getPathways = () => {
    return Array.prototype.slice.call(
      this.querySelectorAll('bolt-interactive-pathway'),
    );
  };

  showPathway(index) {
    if (this.activePathwayIndex !== -1) {
      const currentPathway = this.pathways[this.activePathwayIndex];
      if (!currentPathway) {
        console.error('no current pathway found');
        return;
      }
      currentPathway.setActive(false);
    }
    const newPathway = this.pathways[index];
    newPathway.setActive(true);
    this.activePathwayIndex = index;
    this.triggerUpdate();
  }

  render() {
    const { customImageSrc = pathwaysLogo, imageAlt } = this.validateProps(
      this.props,
    );
    const classes = cx('c-bolt-interactive-pathways');

    const titles = this.pathways.map((pathway, i) => pathway.getTitle());

    const menuItems = titles.map((title, i) => {
      const isActiveItem = i === this.activePathwayIndex;
      const menuItemTextColor = isActiveItem
        ? 'color: #0074B3; --bolt-theme-text: #0074B3;'
        : 'color: rgb(0, 0, 0); --bolt-theme-text: rgb(0, 0, 0);';

      return html`
        <bolt-text
          class="c-bolt-interactive-pathways__menu-item${isActiveItem
            ? ' c-bolt-interactive-pathways__menu-item--active'
            : ''}"
          font-weight="semi-bold"
          @click=${() => this.showPathway(i)}
          style=${menuItemTextColor}
        >
          ${isActiveItem
            ? html`
                <bolt-icon size="medium" name="check"></bolt-icon>
              `
            : ''}
          ${title}
        </bolt-text>
      `;
    });

    const menu = html`
      <bolt-micro-journeys-dropdown
        center
        title="${titles[this.activePathwayIndex]}"
      >
        <div class="c-bolt-interactive-pathways__menu-container">
          ${menuItems}
        </div>
      </bolt-micro-journeys-dropdown>
    `;

    const singleTitle = html`
      <bolt-text
        class="c-bolt-interactive-pathways__single-title"
        subheadline
        font-size="xxlarge"
      >
        ${this.pathways.length > 0 ? this.pathways[0].getTitle() : ''}
      </bolt-text>
    `;

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}">
        <div class="c-bolt-interactive-pathways__header">
          <bolt-image
            no-lazy
            sizes="auto"
            src="${customImageSrc}"
            alt="${imageAlt}"
          ></bolt-image>
          <div class="c-bolt-interactive-pathways__nav">
            <div class="c-bolt-interactive-pathways__nav--inner">
              <span class="c-bolt-interactive-pathways__nav-text"
                >${this.slot('interactive-pathways-lead-text')}</span
              >
              ${this.pathways.length > 1 ? menu : singleTitle}
            </div>
          </div>
        </div>

        ${this.slot('default')}
      </div>
    `;
  }
}

export { BoltInteractivePathways };
