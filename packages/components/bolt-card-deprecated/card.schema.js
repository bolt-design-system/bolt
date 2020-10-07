module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Card (Deprecated)',
  category: 'components',
  type: 'object',
  format: 'grid',
  properties: {
    tag: {
      type: 'string',
      description: 'Html tag immediately within the `bolt-card` element.',
      enum: ['div', 'article', 'section', 'figure'],
    },
    contentTag: {
      type: 'string',
      description: 'Html tag immediately within the `bolt-card` element.',
      enum: ['div', 'article', 'section', 'figcaption'],
    },
    theme: {
      type: 'string',
      description: 'Bolt theme.',
      enum: ['xlight', 'light', 'dark', 'xdark'],
    },
    url: {
      type: 'string',
      description:
        'Providing a URL will make the entire card link to another resource. This is a future prop and does not do anything right now.',
    },
  },
};
