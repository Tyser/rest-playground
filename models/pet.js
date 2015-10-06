'use strict';

export default {
  identity: 'pet',
  connection: 'default',
  migrate: 'safe',
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    type: {
      type: 'string',
      enum: ['dog', 'cat', 'fish', 'bird'],
      required: true
    },
    owner: {
      model: 'person'
    }
  }
};
