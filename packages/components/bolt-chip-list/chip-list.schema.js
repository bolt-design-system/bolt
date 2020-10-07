module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Chip List',
  type: 'object',
  require: ['contentItems'],
  properties: {
    items: {
      type: 'array',
      description: 'An array of Chips.',
      items: {
        type: 'object',
        ref: 'chip',
      },
    },
    size: {
      type: 'string',
      description:
        "Sets the size used for all of the chips (if size isn't specified on the individual chip)",
      enum: ['xsmall', 'small', 'medium'],
    },
    truncate: {
      type: 'number',
      description:
        'Sets the max number of chips to show before truncating, 0 or greater',
    },
    collapsible: {
      type: 'boolean',
      description:
        'Allows users to collapse items after expanding by clicking a close button.',
      default: false,
    },
    id: {
      type: 'string',
      description:
        'Unique ID for Chip List, randomly generated if not provided (required for no-JS functionality).',
    },
    expanded: {
      type: 'boolean',
      description: 'Shows truncated items.',
      default: false,
      hidden: true,
    },
    contentItems: {
      type: 'array',
      title: 'DEPRECATED',
      description:
        'Deprecated (will be removed in Bolt v3.0) - use the <code>items</code> prop instead.',
      items: {
        type: 'object',
        description: 'Chip.',
        ref: 'chip',
      },
    },
  },
};
