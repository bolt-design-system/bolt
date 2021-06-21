module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Nav Indicator',
  type: 'object',
  properties: {
    offset: {
      type: 'integer',
      description:
        'Number of pixels taken up by sticky items at the top of the page.  Used for smooth scroll and gumshoe.',
    },
  },
};
