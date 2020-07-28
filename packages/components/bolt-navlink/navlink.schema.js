module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Navlink',
  description: 'Navlinks are stylized links used within the Navbar',
  type: 'object',
  required: ['text'],
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    active: {
      type: 'boolean',
      description: 'Automatically mark a Navlink as active',
      default: false,
    },
    text: {
      type: ['string', 'object', 'array'],
      description: 'Renderable text content for the link.',
    },
    url: {
      type: 'string',
      description:
        'A url to link to.  This may also be passed as part of `attributes`',
    },
    icon: {
      type: 'object',
      description:
        "Icon data as expected by the icon component.  Accepts an additional 'position' parameter that determines placement within the Navlink.",
      ref: 'icon',
      properties: {
        position: {
          type: 'string',
          default: 'after',
          enum: ['before', 'after'],
        },
      },
    },
  },
};
