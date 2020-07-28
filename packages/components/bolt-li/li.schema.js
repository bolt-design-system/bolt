module.exports = {
  title: 'List Item',
  type: 'object',
  require: ['items'],
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    item: {
      type: ['string', 'object', 'array'],
      description:
        'Renderable content (i.e. a string, render array, or included pattern) for a single list item.',
    },
  },
};
