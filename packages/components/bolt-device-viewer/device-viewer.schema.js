module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Device Viewer',
  type: 'object',
  not: {
    anyOf: [
      {
        required: ['image'],
      },
      {
        required: ['magnify'],
      },
    ],
  },
  properties: {
    deviceName: {
      description: 'Name of the device.',
      type: 'string',
      enum: ['ipad', 'iphone8', 'macbook'],
    },
    color: {
      description: 'Device color.',
      type: 'string',
      enum: ['black', 'silver', 'gold'],
    },
    orientation: {
      description: 'Device orientation.',
      type: 'string',
      enum: ['portrait', 'landscape'],
    },
    content: {
      type: 'any',
      description:
        'Renderable content (i.e. a string, render array, or included pattern) to display within the device.  Usually represents an image or video.',
    },
    image: {
      title: 'DEPRECATED',
      description: 'Pass a rendered image as `content` instead.',
    },
    magnify: {
      title: 'DEPRECATED',
      description:
        'This feature is no longer supported.  The recommended UI replacement is to pass an image that is a modal trigger instead.',
    },
  },
};
