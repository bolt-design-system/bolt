const accordionItem = require('./accordion-item.schema');

module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Accordion',
  type: 'object',
  properties: {
    items: {
      type: 'array',
      description:
        'All of the items in the accordion. Each item should contain a header and a content.',
      items: accordionItem,
    },
    single: {
      type: 'boolean',
      description: 'Allow only one section to open at a time.',
      default: false,
      enum: [true, false],
    },
    no_separator: {
      type: 'boolean',
      title: 'no_separator (twig) / no-separator (web component)',
      description: 'Hides the separator in between items.',
      default: false,
      enum: [true, false],
    },
    box_shadow: {
      type: 'boolean',
      title: 'box_shadow (twig) / box-shadow (web component)',
      description: 'Creates a box shadow around the accordion.',
      default: false,
      enum: [true, false],
    },
    spacing: {
      $ref: '#/definitions/spacing',
      type: 'string',
      description: 'Controls the inset spacing of each item.',
      default: 'medium',
    },
    icon_valign: {
      type: 'string',
      title: 'icon_valign (twig) / icon-valign (web component)',
      description:
        'Vertically align the accordion trigger content and trigger icon.',
      default: 'center',
      enum: ['top', 'center'],
    },
  },
  definitions: {
    spacing: {
      enum: ['none', 'xsmall', 'small', 'medium', 'large'],
    },
  },
};
