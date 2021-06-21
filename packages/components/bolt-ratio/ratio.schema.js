module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Bolt Ratio',
  description:
    "A small helper-component that display's nested content / other components at a specific aspect ratio.",
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      title: 'Attributes (Twig-only)',
      description:
        'A Drupal attributes object. Used to apply with extra HTML attributes to the outer &lt;bolt-ratio&gt; tag.',
    },
    children: {
      type: ['string', 'object', 'array'],
      title: 'Children (Twig-only)',
      description:
        'Nested content to nest inside the &lt;bolt-ratio&gt; component when used in a Twig template.',
    },
    ratio: {
      title: 'Ratio (Twig & Web Component)',
      description:
        'Set the aspect ratio for the ratio object via slash-separated width and height values, e.g. 4/3, 16/9, 1/1, etc.',
      type: 'string',
    },
    aspectRatioWidth: {
      title: 'Deprecated',
      description:
        "Twig-specific prop for setting the width portion of the component's aspect ratio. Will be removed in Bolt v3.0. Use the simpler ratio prop instead.",
      type: 'number',
    },
    'aspect-ratio-width': {
      title: 'Deprecated',
      description:
        "Web component-specific prop for setting the width portion of the bolt-ratio web component's aspect ratio. Will be removed in Bolt v3.0. Use the simpler ratio prop instead.",
      type: 'number',
    },
    aspectRatioHeight: {
      title: 'Deprecated',
      description:
        "Twig-specific prop for setting the height portion of the component's aspect ratio. Will be removed in Bolt v3.0. Use the simpler ratio prop instead.",
      type: 'number',
    },
    'aspect-ratio-height': {
      title: 'Deprecated',
      description:
        "Web component-specific prop for setting the height portion of the bolt-ratio web component's aspect ratio. Will be removed in Bolt v3.0. Use the simpler ratio prop instead.",
      type: 'number',
    },
    no_css_vars: {
      title: 'Disable CSS Custom Prop Rendering (Twig-only)',
      description:
        'Manually disables CSS Variable-based rendering for &lt;bolt-ratio&gt; in Twig templates. Useful for testing cross browser functionality. By default this is automatically enabled / disabled based on browser support for CSS Vars.',
      type: 'boolean',
      hidden: true,
    },
    'no-css-vars': {
      title: 'No CSS Vars (Web Component-only)',
      description:
        'Manually disables CSS Variable-based rendering on the &lt;bolt-ratio&gt; custom element. Useful for testing cross browser functionality. By default this is automatically enabled / disabled based on browser support for CSS Vars.',
      type: 'boolean',
      hidden: true,
    },
    no_shadow: {
      title: 'Disable Shadow DOM (Twig-only)',
      description:
        'Manually disables the component from rendering to the Shadow DOM in a Twig template. Useful for testing cross browser functionality / rendering behavior. By default this is enabled / disabled based on browser support.',
      hidden: true,
      type: 'boolean',
    },
    'no-shadow': {
      title: 'Disable Shadow DOM (Web Component-only)',
      description:
        'Manually disables the web component from rendering to the Shadow DOM. Useful for testing cross browser functionality / rendering behavior. By default this is enabled / disabled based on browser support.',
      hidden: true,
      type: 'boolean',
    },
  },
  examples: [
    {
      children: 'Example #: 4x1',
      ratio: '4/1',
      attributes: {
        class: [
          't-bolt-xdark',
          'u-bolt-margin-bottom-large',
          'u-bolt-margin-right-large@small',
          'u-bolt-padding',
          'u-bolt-width-1/1',
          'u-bolt-width-1/4@small',
          'u-bolt-inline-block',
        ],
      },
    },
    {
      children: 'Example #: 16x9',
      ratio: '16/9',
      attributes: {
        class: [
          't-bolt-light',
          'u-bolt-margin-right-large@small',
          'u-bolt-padding',
          'u-bolt-width-1/1',
          'u-bolt-width-1/4@small',
          'u-bolt-inline-block',
        ],
      },
    },
    {
      children: 'Example #: Legacy Ratio Props',
      aspectRatioHeight: '1',
      aspectRatioWidth: '2',
      attributes: {
        class: [
          't-bolt-dark',
          'u-bolt-margin-right-large@small',
          'u-bolt-margin-bottom-large',
          'u-bolt-padding',
          'u-bolt-width-1/1',
          'u-bolt-width-1/4@small',
          'u-bolt-inline-block',
        ],
      },
    },
  ],
};
