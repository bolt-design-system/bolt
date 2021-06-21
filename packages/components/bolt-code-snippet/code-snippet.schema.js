module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Code Snippet',
  description: 'Monospace Font Styles for Code Text',
  type: 'object',
  properties: {
    display: {
      type: 'string',
      title: 'Display',
      description: 'Defines if the code text is inline or block.',
      default: 'block',
      enum: ['block', 'inline'],
    },
    lang: {
      type: 'string',
      title: 'Language',
      description: 'Language of the code text.',
      default: 'html',
      enum: ['css', 'html', 'js', 'scss', 'twig'],
    },
    syntax: {
      type: 'string',
      title: 'Syntax Highlighting',
      description:
        'Toggle between a light and dark syntax highlighting, or turn it off. Separate from Bolt theming.',
      default: 'light',
      enum: ['light', 'dark', 'none'],
    },
  },
};
