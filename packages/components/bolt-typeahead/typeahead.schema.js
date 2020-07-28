module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Bolt Typeahead',
  description: 'Typeahead + autocomplete.',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    max_results: {
      type: 'number',
      description: 'The maximum number of typeahead results to display',
      default: 10,
    },
    items: {
      type: 'array',
      description:
        "An array of objects that's used to populate the suggestion list that appears below the input as the users type. This array of objects can be asynchronously fetched and should contain a `label`, `url`, and optionally `description`.",
    },
    clear_input_text: {
      type: 'string',
      description:
        "Screenreader-specific text for the clear search button, intended to provide a longer, more descriptive explanation of the clear button's behavior.",
      default: 'Clear search results',
    },
    submit_button_text: {
      type: 'string',
      description:
        "Screenreader-specific text for the submit button, intended to provide a longer, more descriptive explanation of the submit button's behavior.",
      default: 'Submit search query',
    },
    input_label: {
      type: 'string',
      description:
        'Screenreader-specific label text associated with the search input.',
    },
    input_placeholder: {
      type: 'string',
      description:
        'The placeholder text to display inside the Typeahead search input.',
      default: 'Enter your search query',
    },
    input_value: {
      type: 'string',
      description: 'Initial value to pre-populate the input field',
    },
    input_name: {
      type: 'string',
      description:
        "Input element's name attribute used when pre-rendering the component",
    },
    no_highlight: {
      type: 'boolean',
      description:
        'Disable text highlighting in matching search results (highlighting is enabled by default)',
      default: false,
    },
  },
};
