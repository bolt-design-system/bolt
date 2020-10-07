module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Button Group',
  type: 'object',
  properties: {
    tag: {
      type: 'string',
      description: 'Html tag to wrap the button group.',
      enum: ['ul', 'ol'],
    },
    buttons: {
      type: 'array',
      description: 'An array of buttons.',
      items: {
        type: ['string', 'object', 'array'],
        description:
          'A single bolt button, which should be passed as renderable content (i.e. a string, render array, or included pattern).  Passing anything besides a bolt button is not supported.',
      },
    },
    contentItems: {
      type: 'array',
      title: 'Content items.',
      description: 'An array of bolt objects.',
      items: {
        type: 'object',
        description: 'Bolt component information.',
      },
    },
    content: {
      type: 'string',
      description: 'A string of content to place in the button group.',
    },
  },
};
