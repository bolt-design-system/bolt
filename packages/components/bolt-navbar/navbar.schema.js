module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Navbar',
  type: 'object',
  properties: {
    theme: {
      type: 'string',
      description:
        "Color theme. Can be set to 'none' for a transparent background.",
      default: 'dark',
      enum: ['xlight', 'light', 'dark', 'xdark', 'none'],
    },
    title: {
      type: 'object',
      description:
        'Navbar title. Icon is optional. Tag can be set to h1 to h6 depending on the page.',
      properties: {
        tag: {
          type: 'string',
          default: 'h2',
          enum: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        },
        text: {
          type: 'string',
        },
        icon: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Name of the (optional) icon to be used.',
            },
          },
        },
      },
    },
    center: {
      type: 'boolean',
      description:
        'Determines if you want the Navbar content to be center aligned or not',
      enum: [true, false],
    },
    width: {
      type: 'string',
      description:
        "Adjusts the Navbar's overall maximum width behavior -- either filling up the entire browser's total screen width (full) or just the component's parent container width (auto).",
      default: 'full',
      enum: ['full', 'auto'],
    },
    links: {
      type: 'array',
      description: '(Inherited from nav-priority) Array of links',
      items: {
        type: 'object',
        properties: {
          text: {
            type: 'string',
          },
          url: {
            type: 'string',
          },
        },
      },
    },
    moreText: {
      type: 'string',
      description:
        '(Inherited from nav-priority) Button text that displays when the Priority+ Nav Dropdown is displayed.',
      default: 'More',
    },
    offset: {
      type: 'integer',
      description:
        '(Inherited from nav-indicator) Number of pixels taken up by sticky items at the top of the page.  Used for smooth scroll and gumshoe.',
    },
  },
};
