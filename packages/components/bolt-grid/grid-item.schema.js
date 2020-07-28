module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Bolt Grid Item',
  description:
    'THIS WILL BE DEPRECATED. MUST REMOVE A REFERENCE OF THIS IN THE BAND SCHEMA (which would be fixed with the band refactor work).',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    align: {
      type: 'string',
      description: 'Horizontal alignment of the grid item itself',
      default: 'start',
      enum: ['start', 'center', 'end'],
    },
    valign: {
      type: 'string',
      description: 'Vertical alignment of the grid item itself',
      default: 'start',
      enum: ['start', 'center', 'end'],
    },
    column_start: {
      type: 'string',
      description:
        'The general column the grid item should start on. For example, a <bolt-grid-item> with the attributes `columns="3" start-column="2"` would start on the 2nd column and extend for 3 columns so it would span the 2nd, 3rd and 4th column.',
    },
    column_end: {
      type: 'string',
      description:
        'The general column the grid item should stop on. For example, a <bolt-grid-item> with the attributes `start-column="2" end-column="3"` would start on the 2nd column and extend until the 3rd column.',
    },
    column_span: {
      type: 'string',
      description:
        'The number of columns the <bolt-grid-item> should span across',
    },
    row_start: {
      type: 'string',
      description: 'Specifies a grid item’s start position within the grid row',
      default: 'auto',
    },
    row_end: {
      type: 'string',
      description:
        'Specifies a grid item’s ending position within the grid row',
      default: 'auto',
    },
    row_span: {
      type: 'string',
      description:
        'Specifies the number of rows a <bolt-grid-item> should span across',
      default: 'auto',
    },
  },
};
