'use strict';

import path from 'path';
import waterlineModels from 'waterline-models';
import memoryAdapter from 'sails-memory';

waterlineModels.init({
  dir: path.resolve(__dirname, '..', 'models'),
  adapters: {
    memory: memoryAdapter
  },
  connections: {
    default: {
      adapter: 'memory'
    }
  }
});

waterlineModels()
  .then(({pet, person}) => {
    return person
      .create({
        firstName: 'Emily',
        lastName: 'Elizabeth',
        gender: 'F'
      })
      .then(({id: owner}) => {
        return pet.create({
          type: 'dog',
          name: 'Clifford',
          owner
        });
      });
  });
