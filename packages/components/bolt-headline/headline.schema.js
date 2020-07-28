module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Headline',
  type: 'object',
  required: ['text'],
  properties: {
    text: {
      type: ['string', 'object', 'array'],
      description: 'Renderable text content of the headline.',
    },
    tag: {
      type: 'string',
      description: 'Html tag.',
      default: 'p',
      enum: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'cite', 'div'],
    },
    align: {
      description: 'Text alignment.',
      type: 'string',
      enum: ['left', 'center', 'right'],
    },
    weight: {
      type: 'string',
      description: 'Font weights.',
      default: 'regular',
      enum: ['light', 'bold', 'regular', 'semibold'],
    },
    style: {
      type: 'string',
      description: 'Font styles.',
      default: 'normal',
      enum: ['normal', 'italic'],
    },
    size: {
      type: 'string',
      description: 'Font size.',
      default: 'medium',
      enum: [
        'xxsmall',
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
        'xxlarge',
        'xxxlarge',
      ],
    },
    autoshrink: {
      type: 'boolean',
      description:
        'Automatically shrink the font size used in the `xxxlarge` headline size when 60 or more characters are used.',
      default: true,
    },
    transform: {
      type: 'string',
      description: 'Text transformation.',
      enum: ['uppercase', 'lowercase', 'capitalize'],
    },
    url: {
      type: 'string',
      description: 'If provided, turns headline into a link to given url.',
    },
    icon: {
      description:
        "Bolt icon. Accepts either 1) an icon name as a string 2) an icon object as expected by `@bolt-components-icon` or 3) the string 'none' to explicitly remove default icons",
      anyOf: [
        {
          type: 'object',
          ref: '@bolt-components-icon/icon.schema.json',
        },
        {
          type: 'string',
          enum: ['none'],
        },
        {
          type: 'string',
          ref: '@bolt-components-icon/icon.schema.json#/properties/name',
        },
      ],
    },
    quoted: {
      type: 'boolean',
      description: 'Adds quoted styling to text.',
    },
    numberText: {
      description:
        'Text that displays in a small circle to the left of the main Headline text. Providing content will trigger the bullet to appear.',
      type: ['string', 'number'],
    },
    numberColor: {
      description:
        'The optional background color of the Headline bullet. Uses inherited theme colors if unspecified.',
      type: 'string',
      enum: ['teal', 'indigo', 'orange', 'purple'],
    },
  },
};
