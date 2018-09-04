import { define } from '@bolt/core/utils';
import { withLitHtml } from '@bolt/core/renderers/renderer-lit-html';

@define
export class ReplaceWithChildren extends withLitHtml() {
  static is = 'replace-with-children';

  connectedCallback() {
    this.replaceElementWithChildren();
  }

  replaceElementWithChildren() {
    const parentElement = this.parentElement;

    if (!parentElement) {
      Error(
        'The <replace-with-children> element needs a parent element to append to!',
      );
    }

    // Originally was this.replaceWith(...this.childNodes) but IE11 doesn't like that
    while (this.firstChild) {
      parentElement.appendChild(this.firstChild);
    }
    if (parentElement) {
      parentElement.removeChild(this);
    }
  }
}
