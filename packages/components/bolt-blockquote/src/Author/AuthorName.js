import { html } from '@bolt/core/renderers/renderer-lit-html';
import classNames from 'classnames/bind';
import styles from '../blockquote.scss';
import textStyles from '@bolt/components-text/index.scss';

let cx = classNames.bind([styles, textStyles]);

export const AuthorName = elem => {
  const { props, slots } = elem;

  const textClasses = cx(
    'c-bolt-text-v2',
    'c-bolt-text-v2--block',
    'c-bolt-text-v2--body',
    'c-bolt-text-v2--font-size-xsmall',
    'c-bolt-text-v2--font-weight-bold',
    'c-bolt-text-v2--font-style-regular',
    'c-bolt-text-v2--color-theme-headline',
    'c-bolt-text-v2--letter-spacing-regular',
    'c-bolt-text-v2--align-inherit',
    'c-bolt-text-v2--text-transform-regular',
    'c-bolt-text-v2--line-height-regular',
    'c-bolt-text-v2--opacity-100',
  );

  if (slots['author-name'] || props.authorName) {
    return html`
      <cite class="${textClasses}">
        ${elem.slots['author-name']
          ? elem.slot('author-name')
          : props.authorName}
      </cite>
    `;
  }
};
