module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Bolt Background',
  description:
    'A content container that delivers important messages to the user.',
  type: 'object',
  required: ['content'],
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
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
      },
      vertical: {
        type: 'string',
        description:
          "Currently doesn't use this value. Intended future application.",
        enum: ['center', 'top', 'bottom'],
      },
    },
    contentItems: {
      type: 'array',
      description:
        'An array of objects to place in the background.Works with Image and Shape components.Video option is deprecated.',
      items: {
        type: 'any',
      },
    },
  },
};
