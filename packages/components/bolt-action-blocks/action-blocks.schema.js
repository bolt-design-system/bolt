module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Action blocks',
  type: 'object',
  not: {
    anyOf: [
      {
        required: ['maxItemsPerRow'],
      },
      {
        required: ['align'],
      },
      {
        required: ['border'],
      },
    ],
  },
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    spacing: {
      type: 'string',
      description: 'Spacing surrounding each action block.',
      default: 'medium',
      enum: ['xsmall', 'small', 'medium'],
    },
    max_items_per_row: {
      type: 'number',
      description:
        'The max amount of items (action blocks) to be displayed in one row.',
      default: 6,
      enum: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    valign: {
      type: 'string',
      description:
        'Vertical alignment of the content inside each action block.',
      default: 'start',
      enum: ['start', 'center', 'end'],
    },
    borderless: {
      type: 'boolean',
      description: 'Removes the border in between each action block.',
      default: false,
      enum: [true, false],
    },
    contentItems: {
      type: 'array',
      description: 'Content items to populate the action blocks.',
      items: {
        type: 'object',
        properties: {
          text: {
            type: 'string',
          },
          url: {
            type: 'string',
          },
          icon: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              size: {
                type: 'string',
              },
              background: {
                type: 'string',
              },
            },
          },
        },
      },
    },
    maxItemsPerRow: {
      title: 'DEPRECATED',
      description: 'Use max_items_per_row prop instead.',
    },
    align: {
      title: 'DEPRECATED',
      description: 'Use valign prop instead.',
    },
    border: {
      title: 'DEPRECATED',
      description: 'Use borderless prop instead.',
    },
  },
};
