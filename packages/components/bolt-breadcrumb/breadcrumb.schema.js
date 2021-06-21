module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Breadcrumb',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    contentItems: {
      type: 'array',
      description: 'Breadcrumb pieces.',
      items: {
        type: ['string', 'object', 'array'],
        description:
          'Renderable content (i.e. a string, render array, or included pattern) for a single breadcrumb',
      },
    },
  },
};
