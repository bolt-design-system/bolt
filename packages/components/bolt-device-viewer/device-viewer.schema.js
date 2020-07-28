module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Device Viewer',
  type: 'object',
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
    magnify: {
      description: 'Add the magnifier effect.',
      default: false,
      type: 'boolean',
    },
    image: {
      type: 'object',
      properties: {
        src: {
          type: 'string',
          description: 'Source url for the image.',
        },
      },
    },
  },
};
