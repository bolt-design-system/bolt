module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Bolt Background',
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
      }
    ]
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
      enum: ['xsmall', 'small', 'medium']
    },
    valign: {
      type: 'string',
      description: 'Vertical alignment of the content inside each action block.',
      default: 'start',
      enum: ['start', 'center', 'end']
    },
    borderless: {
      type: 'boolean',
      description: 'Removes the border in between each action block.',
      default: false,
      enum: [true, false]
    },
    opacity: {
      type: 'string',
      description: 'Overlay opacity',
      default: 'medium',
      enum: ['light', 'medium', 'heavy', 'full'],
    },
    overlay: {
      type: 'string',
      description: 'Should an overlay be used for this background.',
      default: 'enabled',
      enum: ['enabled', 'disabled'],
    },
    shapeGroup: {
      type: 'string',
      description: 'Add a Bolt Background Shapes group.',
      default: 'none',
      enum: ['A', 'B', 'none'],
    },
    shapeAlignment: {
      type: 'string',
      description: 'Alignment of shape group.',
      default: 'right',
      enum: ['left', 'right'],
    },
    fill: {
      type: 'string',
      description: 'Type of fill to use for the overlay.',
      default: 'color',
      enum: ['color', 'gradient', 'linear-gradient', 'radial-gradient'],
    },
    fillColor: {
      type: 'string',
      description: 'Color of the fill to use in the overlay.',
      default: 'default',
      enum: ['indigo', 'pink', 'default', 'black'],
    },
    focalPoint: {
      type: 'object',
      description: 'Where the opacity background should originate.',
      properties: {
        horizontal: {
          type: 'string',
          description: "Currently only reverses gradient on 'left'.",
          enum: ['center', 'left', 'right'],
        },
        vertical: {
          type: 'string',
          description:
            "Currently doesn't use this value. Intended future application.",
          enum: ['center', 'top', 'bottom'],
        },
      },
    },
    contentItems: {
      type: 'array',
      description:
        'An array of objects to place in the background. Works with Image and Shape components. Video option is deprecated.',
      items: {
        type: 'object',
        properties: {
          text: {
            type: 'string'
          },
          url: {
            type: 'string'
          },
          icon: {
            type: 'object',
            properties: {
              name:{
                type: 'string'
              },
              size:{
                type: 'string'
              },
              background:{
                type: 'string'
              }
            }
          }
        }
      },
    },
    maxItemsPerRow: {
      title: 'DEPRECATED',
      description: 'Use max_items_per_row prop instead.'
    },
    align: {
      title: 'DEPRECATED',
      description: 'Use valign prop instead.'
    },
    border: {
      title: 'DEPRECATED',
      description: 'Use borderless prop instead.'
    }
  },
};
