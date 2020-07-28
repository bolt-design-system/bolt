import { html, customElement } from '@bolt/element';
import { props, mapWithDepth } from '@bolt/core-v3.x/utils';
import classNames from 'classnames/bind';
import { withLitHtml } from '@bolt/core-v3.x/renderers/renderer-lit-html';
import styles from './ol.scss';

let cx = classNames.bind(styles);

// list-specific helper function to set nested children's `level` prop automatically
function addNestedLevelProps(childNode, level) {
  let currentLevel = level;

  if (childNode.tagName) {
    childNode.level = currentLevel;
  }

  return currentLevel;
}

@customElement('bolt-ol')
class BoltOrderedList extends withLitHtml {
  static props = {
    level: {
      ...props.number,
      ...{ default: 0 },
    },
  };

  render() {
    let level = this.level;
    let nested = false;

    if (this.parentNode.tagName) {
      if (
        this.parentNode.tagName === 'BOLT-LI' &&
        this.parentNode.parentNode.tagName === 'BOLT-OL'
      ) {
        level = this.parentNode.level - 1;
      } else {
        level = this.parentNode.level;
      }

      if (this.parentNode.tagName === 'BOLT-LI') {
        nested = true;
      }
    }

    const classes = cx('c-bolt-ol', {
      [`c-bolt-ol--nested`]: nested,
    });

    this.slots.default.map(mapWithDepth(level, addNestedLevelProps));

    if (this.slots.default) {
      const updatedDefaultSlot = this.slots.default.filter(
        item => item.tagName,
      );
      const updatedSlotsLength = updatedDefaultSlot.length;
      const lastSlotItem = updatedDefaultSlot[updatedSlotsLength - 1];

      if (updatedSlotsLength > 0 && !lastSlotItem.attributes.last) {
        lastSlotItem.setAttribute('last', '');
      }
    }

    return html`
      ${this.addStyles([styles])}
      <div class="${classes}" role="list">
        ${this.slot('default')}
      </div>
    `;
  }
}

export { BoltOrderedList };
