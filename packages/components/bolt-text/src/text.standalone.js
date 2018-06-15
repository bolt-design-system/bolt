import {
  define,
  props,
  withComponent,
  css,
  hasNativeShadowDomSupport,
  BoltComponent,
} from '@bolt/core';

import styles from './text.scss';
import schema from '../text.schema.yml';

@define
class BoltText extends BoltComponent() {
  static is = 'bolt-text';

  static props = {
    tag: props.string,
    url: props.string,
    weight: props.string,
    fontStyle: props.string,
    fontSize: props.string,
    display: props.string,
    align: props.string,
    transform: props.string,
    letterSpacing: props.string,
    lineHeight: props.string,
    quoted: props.boolean,
    util: props.string,
    vspacing: props.string,
    opacity: props.number,
    headline: props.boolean,
    subheadline: props.boolean,
    eyebrow: props.boolean,
    fontFamily: props.string,

     /**
     * @todo: remove icon props below once the icon and text components are split apart
     */
    // icon: props.string,
    // iconName: props.string,
    // iconBackground: props.string,
    // iconSize: props.string,
    // iconColor: props.string,
    // iconValign: props.string,
    // iconAlign: props.string,
  };

  constructor(self) {
    self = super(self);
    this.useShadow = hasNativeShadowDomSupport;
    return self;
  }

  allowedValues(schemaData, propVal) {
    return (schemaData.enum.indexOf(propVal) > -1) ? propVal : (typeof schemaData.default !== 'undefined' ? schemaData.default : false);
  }

  subComponentValues(propVal, defaultVal) {
    return propVal ? propVal : defaultVal;
  }

  render({ props, state }) {

    let weight = this.allowedValues(schema.properties.weight, this.props.weight);
    let style = this.allowedValues(schema.properties.style, this.props.fontStyle);
    let fontSize = this.allowedValues(schema.properties.fontSize, this.props.fontSize);
    let display = this.allowedValues(schema.properties.display, this.props.display);
    let align = this.allowedValues(schema.properties.align, this.props.align);
    let transform = this.allowedValues(schema.properties.transform, this.props.transform);
    let letterSpacing = this.allowedValues(schema.properties.letterSpacing, this.props.letterSpacing);
    let lineHeight = this.allowedValues(schema.properties.lineHeight, this.props.lineHeight);
    let quoted = !!this.props.quoted;
    let util = this.props.util ? this.props.util : false;
    let opacity = this.allowedValues(schema.properties.opacity, this.props.opacity);
    let fontFamily = this.allowedValues(schema.properties.fontFamily, this.props.fontFamily);
    let url = this.props.url ? this.props.url : false;

    // Icon vars

    /**
     * @todo: remove icon logic below once text component is decoupled from the icon component
     */
    // let icon = this.props.icon ? this.props.icon : 'undefined';
    // let iconName = this.allowedValues(schema.properties.iconName, this.props.iconName);
    // let iconValign = this.allowedValues(schema.properties.iconValign, this.props.iconValign);
    // let iconAlign = this.allowedValues(schema.properties.iconAlign, this.props.iconAlign);
    // let iconBackground = this.allowedValues(schema.properties.iconBackground, this.props.iconBackground);
    // let iconSize = this.allowedValues(schema.properties.iconSize, this.props.iconSize);
    // let iconColor = this.allowedValues(schema.properties.iconColor, this.props.iconColor);

    // The text item
    let textItem = this.hyper.wire(this) `${this.slot('default')}`;

    // Build the icon
    /**
     * @todo: remove icon logic below once text component is decoupled from the icon component
     */
    // if ( url && (this.props.headline || this.props.subheadline || this.props.eyebrow) ) {
    //   // Headline, Subheadline, and Eyebrow always have chevron-right with url (if icon not false)
    //   if (icon !== 'false') {
    //     textItem = this.hyper.wire(this) `
    //     ${textItem} <bolt-icon name="chevron-right"></bolt-icon>
    //   `;
    //   }
    // } else if (iconName && iconAlign) {
    //   let theIcon = document.createElement('bolt-icon');
    //   theIcon.setAttribute('name', iconName);

    //   // Background
    //   if (iconBackground) {
    //     theIcon.setAttribute('background', iconBackground);
    //   }
    //   // Size
    //   if (iconSize) {
    //     theIcon.setAttribute('size', iconSize);
    //   }
    //   // Size
    //   if (iconColor) {
    //     theIcon.setAttribute('color', iconColor);
    //   }
    //   // Alignment
    //   if (iconAlign === 'right' || iconAlign === 'right-hang') {
    //     textItem = this.hyper.wire(this) `${textItem} ${theIcon}`;
    //   } else {
    //     textItem = this.hyper.wire(this) `${theIcon} ${textItem}`;
    //   }
    // }

    let longTitle = false; // Right now we are only checking this for headline (below)

    // Headline defaults
    if (this.props.headline) {
      fontSize = this.subComponentValues(this.props.fontSize, 'xlarge');
      weight = this.subComponentValues(this.props.weight, 'bold');
      letterSpacing = this.subComponentValues(this.props.letterSpacing, 'narrow');
      fontFamily = this.subComponentValues(this.props.fontFamily, 'headline');

      // @todo: remove below once icon + text component decoupled
      // if (icon !== 'undefined' && icon !== 'false') {
      //   iconName = true;
      // }
      if (this.innerHTML.length >= 60 && fontSize === 'xxxlarge') { // Is there a better way to get inner dynamic length?
        longTitle = true;
      }
    }

    // Subheadline defaults
    if (this.props.subheadline) {
      fontSize = this.subComponentValues(this.props.fontSize, 'large');
      fontFamily = this.subComponentValues(this.props.fontFamily, 'headline');

      // @todo: remove below once icon + text component decoupled
      // if (icon !== 'undefined' && icon !== 'false') {
      //   iconName = true;
      // }
    }

    // Eyebrow defaults
    if (this.props.eyebrow) {
      fontSize = this.subComponentValues(this.props.fontSize, 'xsmall');
      transform = this.subComponentValues(this.props.transform, 'uppercase');
      opacity = this.subComponentValues(this.props.opacity, 80);
      fontFamily = this.subComponentValues(this.props.fontFamily, 'headline');

      // @todo: remove below once icon + text component decoupled
      // if (icon !== 'undefined' && icon !== 'false') {
      //   iconName = true;
      // }
    }

    // Important classes
    const classes = css(
      // iconName ? 'has-icon' : '', // @todo: remove when decoupled from icon component
      url ? 'has-url' : '',
      longTitle ? 'long-title' : '',
      'c-bolt-text-v2',
      `c-bolt-text-v2--${fontFamily}`,
      `c-bolt-text-v2--theme-${fontFamily}-text-color`,
      `c-bolt-text-v2--weight-${weight}`,
      `c-bolt-text-v2--style-${style}`,
      `c-bolt-text-v2--font-${fontSize}`,
      `c-bolt-text-v2--display-${display}`,
      letterSpacing ? `c-bolt-text-v2--letter-spacing-${letterSpacing}` : '',
      align ? `c-bolt-text-v2--align-${align}` : '',
      transform ? `c-bolt-text-v2--transform-${transform}` : '',
      lineHeight ? `c-bolt-text-v2--line-height-${lineHeight}` : '',
      quoted ? 'c-bolt-text-v2--quoted' : '',
      opacity ? `c-bolt-text-v2--opacity-${opacity}` : '',

      // @todo: remove once decoupled from icon component
      // iconValign ? `c-bolt-text-v2--vertical-align-${iconValign}` : '',
      // iconAlign ? `c-bolt-text-v2--icon-align-${iconAlign}` : '',
    );

    // Adds out utilities to the outer parent <bolt-text />
    if (util && util.indexOf(',') > -1) {
      const utilClasses = [];
      util.split(',').forEach(function(item){
        utilClasses.push('u-bolt-'+item.trim());
      });
      this.setAttribute('class', utilClasses.join(' '));
    } else if (util && util.length > 0) {
      this.setAttribute('class', 'u-bolt-'+util.trim());
    }

    if (url) {
      textItem = this.hyper.wire(this) `
        <a href="${url}">${textItem}</a>
      `;
    }

    const tag = this.allowedValues(schema.properties.tag, this.props.tag);

    if (tag === 'p') {
      textItem = this.hyper.wire(this) `
        <p class=${classes}>${textItem}</p>
      `;
    } else if (tag === 'h1') {
      textItem = this.hyper.wire(this) `
        <h1 class=${classes}>${textItem}</h1>
      `;
    } else if (tag === 'h2') {
      textItem = this.hyper.wire(this) `
        <h2 class=${classes}>${textItem}</h2>
      `;
    } else if (tag === 'h3') {
      textItem = this.hyper.wire(this) `
        <h3 class=${classes}>${textItem}</h3>
      `;
    } else if (tag === 'h4') {
      textItem = this.hyper.wire(this) `
        <h4 class=${classes}>${textItem}</h4>
      `;
    } else if (tag === 'h5') {
      textItem = this.hyper.wire(this) `
        <h5 class=${classes}>${textItem}</h5>
      `;
    } else if (tag === 'h6') {
      textItem = this.hyper.wire(this) `
        <h6 class=${classes}>${textItem}</h6>
      `;
    } else if (tag === 'span') {
      textItem = this.hyper.wire(this) `
        <span class=${classes}>${textItem}</span>
      `;
    } else if (tag === 'cite') {
      textItem = this.hyper.wire(this) `
        <cite class=${classes}>${textItem}</cite>
      `;
    } else if (tag === 'div') {
      textItem = this.hyper.wire(this) `
        <div class=${classes}>${textItem}</div>
      `;
    }

    return this.html`
      ${ this.addStyles([styles]) }
      ${textItem}
    `;
  }
}
