module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Stack',
  type: 'object',
  properties: {
    attributes: {
      title: 'Attributes (Twig-only)',
      type: 'object',
      description:
        'A Drupal attributes object. Used to apply with extra HTML attributes to the outer &lt;bolt-stack&gt; tag.',
    },
    spacing: {
      type: 'string',
      description: 'Control the spacing in between items.',
      default: 'medium',
      enum: ['xlarge', 'large', 'medium', 'small', 'xsmall', 'none'],
    },
    content: {
      type: ['string', 'array', 'object'],
      description: 'Content of the stack.',
    },
    no_shadow: {
      title: 'Disable Shadow DOM (Twig-only)',
      description:
        'Manually disables the component from rendering to the Shadow DOM in a Twig template. Useful for testing cross browser functionality / rendering behavior. By default this is handled globally based on browser support.',
      hidden: true,
      type: 'boolean',
    },
    'no-shadow': {
      title: 'Disable Shadow DOM (Web Component-only)',
      description:
        'Manually disables the web component from rendering to the Shadow DOM. Useful for testing cross browser functionality / rendering behavior. By default this is handled globally based on browser support.',
      hidden: true,
      type: 'boolean',
    },
  },
};
