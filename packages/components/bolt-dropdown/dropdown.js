import {
  define,
  props,
  css,
  hasNativeShadowDomSupport,
  BoltComponent,
} from '@bolt/core';

import Handorgel from 'handorgel';

import styles from './dropdown.scss';
import heightUtils from '@bolt/global/styles/07-utilities/_utilities-height.scss';


@define
export class BoltDropdown extends BoltComponent() {
  static is = 'bolt-dropdown';


  static props = {
    autoOpen: props.boolean,
    collapse: props.boolean,
    children: props.any,
    center: props.boolean,
    toggleText: props.string,
    primaryUuid: props.string,
    secondaryUuid: props.string,
    title: props.string,
  }

  constructor() {
    super();
    this.useShadow = hasNativeShadowDomSupport;

    this.state = {
      open: this.props.autoOpen ? this.props.autoOpen : false,
      collapse: this.props.collapse ? this.props.collapse : false,
    };

    this.uuid = "12345";
  }

  connecting() {
    const contentInner = this.querySelector('.c-bolt-dropdown__content-inner');
    const originalDropdown = this.querySelector('.c-bolt-dropdown');
    const originalInput = this.querySelector('.c-bolt-dropdown__state');

    if (contentInner && originalDropdown) {
      if (originalInput) {
        originalInput.parentNode.removeChild(originalInput);
      }

      originalDropdown.replaceWith(...contentInner.childNodes);
    }


    const elem = this;

    window.addEventListener('resize', function () {
      elem.autoHeight();
    });

    this.addEventListener('activateLink', this.close);
  }

  autoHeight() {
    if (this.contentElem) {
      if (this.props.collapse && window.matchMedia("(min-width: 600px)").matches) {
        this.contentElem.classList.add('u-bolt-height-auto');
      } else if (this.props.collapse) {
        this.contentElem.classList.remove('u-bolt-height-auto');
      }
    }
  }

  close() {
    const elem = this;
    setTimeout(function () {
      elem.dropdown.folds[0].close();
    }, 300);
  }

  get open() {
    return this.state.open;
    // this.dropdown.folds[0].close();
  }

  // Sets the `active` state for the current custom element
  set open(value) {
    /* Properties can be set to all kinds of string values. This
     * makes sure it’s converted to a proper boolean value using
     * JavaScript’s truthiness & falsiness principles.
     */

    if (value && value === true) {
      this.state.open = true;
      this.setAttribute('open', 'open');
    } else {
      this.removeAttribute('open');
    }
  }


  dropdownHeader() {
    const dropdownHeaderClasses = css(
      'c-bolt-dropdown__header',
      this.props.center ? 'c-bolt-dropdown__header--center' : '',
    );

    const dropdownTitle = this.slots.title ? this.slot('title') : ( this.props.title ? this.props.title : '');

    return this.hyper.wire(this.props) `
      <h3 class="${dropdownHeaderClasses}">
        <button class="c-bolt-dropdown__header-button">
          ${ dropdownTitle }

          <span class="c-bolt-dropdown__header-icons">
            <div class="c-bolt-dropdown__header-icons-inner">
              <span class="c-bolt-dropdown__header-icon c-bolt-dropdown__header-icon--open">
                <bolt-icon name="chevron-down"></bolt-icon>
              </span>

              <span class="c-bolt-dropdown__header-icon c-bolt-dropdown__header-icon--close">
                <bolt-icon name="chevron-up"></bolt-icon>
              </span>
            </div>
          </span>
        </button>
      </h3>`;
  }

  template() {
    const classes = css(
      'c-bolt-dropdown',
      this.props.collapse ? 'c-bolt-dropdown--collapse@small' : '',
    );

    const dropdownChildren = this.slots.default ? this.slot('default') : (this.props.children ? this.props.children : '');

    return this.hyper.wire(this.props) `
      <div class="${classes}" id="${this.uuid}">
        ${this.dropdownHeader()}

        <div class="c-bolt-dropdown__content">
          <div class="c-bolt-dropdown__content-inner">
            ${dropdownChildren}
          </div>
        </div>
      </div>
    `;
  }

  render() {
    this.dropdownTemplate = document.createDocumentFragment();
    this.dropdownTemplate.appendChild(this.template());

    this.contentElem = this.dropdownTemplate.querySelector('.c-bolt-dropdown__content');

    this.autoHeight();

    this.dropdown = new Handorgel(this.dropdownTemplate.querySelector('.c-bolt-dropdown'), {
      // whether multiple folds can be opened at once
      multiSelectable: true,
      // whether the folds are collapsible
      collapsible: true,

      // whether ARIA attributes are enabled
      ariaEnabled: true,
      // whether W3C keyboard shortcuts are enabled
      keyboardInteraction: true,
      // whether to loop header focus (sets focus back to first/last header when end/start reached)
      carouselFocus: true,

      // attribute for the header or content to open folds at initialization
      initialOpenAttribute: 'data-open',
      // whether to use transition at initial open
      initialOpenTransition: true,
      // delay used to show initial transition
      initialOpenTransitionDelay: 200,

      // header/content class if fold is open
      headerOpenClass: 'c-bolt-dropdown__header--open',
      contentOpenClass: 'c-bolt-dropdown__content--open',

      // header/content class if fold has been opened (transition finished)
      headerOpenedClass: 'c-bolt-dropdown__header--opened',
      contentOpenedClass: 'c-bolt-dropdown__content--opened',

      // header/content class if fold has been focused
      headerFocusClass: 'c-bolt-dropdown__header--focus',
      contentFocusClass: 'c-bolt-dropdown__content--focus',

      // header/content class if fold is disabled
      headerDisabledClass: 'c-bolt-dropdown__header--disabled',
      contentDisabledClass: 'c-bolt-dropdown__content--disabled',

      // header/content class if no transition should be active (applied on resize)
      headerNoTransitionClass: 'c-bolt-dropdown__header--notransition',
      contentNoTransitionClass: 'c-bolt-dropdown__content--notransition',
    });

    return this.html`
      ${ this.addStyles([styles, heightUtils]) }
      ${ this.dropdownTemplate }
    `;
  }
}
