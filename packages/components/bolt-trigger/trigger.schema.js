module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Bolt Trigger',
  description:
    'Triggers add button or link behavior to any content without the default button or link styles.',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    content: {
      type: ['string', 'array', 'object'],
      description: 'Main content of the trigger (Twig only).',
    },
    url: {
      type: 'string',
      description:
        'Contains a URL that the link points to. This may also be passed as part of `attributes`.',
    },
    target: {
      type: 'string',
      description:
        'Specifies where to display the linked URL. This may also be passed as part of `attributes`.',
    },
    type: {
      description: 'Determines the button tag type for semantic buttons',
      type: 'string',
      default: 'button',
      enum: ['button', 'submit', 'reset'],
    },
    cursor: {
      description: 'Type of cursor shown on hover.',
      type: 'string',
      default: 'pointer',
      enum: ['auto', 'pointer', 'zoom-in', 'zoom-out'],
    },
    on_click: {
      type: 'string',
      description: 'The name of a method on the `on_click_target`.',
    },
    on_click_target: {
      type: 'string',
      description:
        '`className` (e.g. "js-click-me") used in `querySelector` to reference a web component on the page. `onClick`, the `on_click` method name will be called on this element.',
    },
    display: {
      type: 'string',
      description: 'Set the display property',
      default: 'inline',
      enum: ['inline', 'block'],
    },
    no_outline: {
      type: 'boolean',
      description: 'Turn off the default outline on focus',
      default: false,
    },
    disabled: {
      type: 'boolean',
      description:
        'Make trigger unusable and un-clickable. Only applies to `button`.',
      default: false,
    },
  },
};
