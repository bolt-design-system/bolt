module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'List',
  description: 'Minimal list component for laying out a group of items.',
  type: 'object',
  // required: ['items'],
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    items: {
      type: 'array',
      description:
        'Generates an array of items, each can contain renderable content (i.e. a string, render array, or included pattern).',
    },
    tag: {
      type: 'string',
      description: 'Apply the semantic tag for the list.',
      default: 'ul',
      enum: ['ul', 'ol', 'div', 'span'],
    },
    display: {
      type: 'string',
      description:
        'Display either an inline list of items or a block (stacked) list of items. Responsive options are also available for transforming from block to inline at specific breakpoints.',
      default: 'block',
      enum: [
        'block',
        'flex',
        'inline',
        'inline@xxsmall',
        'inline@xsmall',
        'inline@small',
        'inline@medium',
      ],
    },
    spacing: {
      type: 'string',
      description: 'Control the spacing in between items.',
      default: 'xsmall',
      enum: ['none', 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'],
    },
    separator: {
      type: 'string',
      description: 'Display a separator in between items.',
      default: 'none',
      enum: ['none', 'solid', 'dashed'],
    },
    inset: {
      type: 'boolean',
      description: 'Turn spacing to the inside of each item.',
      default: false,
      enum: [true, false],
    },
    align: {
      type: 'string',
      description: 'Control the horizontal alignment of items.',
      default: 'start',
      enum: ['start', 'center', 'end', 'justify'],
    },
    valign: {
      type: 'string',
      description: 'Control the vertical alignment of items.',
      default: 'center',
      enum: ['start', 'center', 'end'],
    },
    nowrap: {
      type: 'boolean',
      description:
        'Prevent inline/flex list items from wrapping to a second line.',
      default: false,
      enum: [true, false],
    },
  },
};
