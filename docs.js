'use strict';

module.exports = {
  swagger: '2.0',
  info: {
    title: 'Rest Playground',
    description: 'A test api to play around with the ideas of RESTful APIs',
    version: '1.0.0'
  },
  produces: ['application/json'],
  paths: {
    '/people': {
      get: {
        summary: 'Read all people',
        tags: ['People'],
        description: 'Gets a list of all of the people',
        parameters: [
          {
            name: 'include',
            in: 'query',
            description: 'Whether or not to include sub documents',
            type: 'string',
            enum: ['pets']
          }
        ],
        responses: {
          200: {
            description: 'Returns an array of people',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/PersonWithPets'
              }
            }
          }
        }
      },
      post: {
        summary: 'Create a person',
        tags: ['People'],
        description: 'Create a new person',
        parameters: [
          {
            name: 'person',
            in: 'body',
            description: 'The person to add to the database',
            required: true,
            schema: {
              $ref: '#/definitions/Person'
            }
          }
        ],
        responses: {
          201: {
            description: 'Returns the newly created person',
            schema: {
              $ref: '#/definitions/PersonRead'
            }
          }
        }
      }
    },
    '/people/{id}': {
      get: {
        summary: 'Read a person',
        tags: ['People'],
        description: 'Gets a single person\'s information',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The person\'s id',
            type: 'integer',
            required: true
          },
          {
            name: 'include',
            in: 'query',
            description: 'Whether or not to include sub documents',
            type: 'string',
            enum: ['pets']
          }
        ],
        responses: {
          200: {
            description: 'Returns the person with the given id',
            schema: {
              $ref: '#/definitions/PersonWithPets'
            }
          }
        }
      },
      put: {
        summary: 'Update a person',
        tags: ['People'],
        description: 'Updates a single person\'s information',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The person\'s id',
            type: 'integer',
            required: true
          },
          {
            name: 'person',
            in: 'body',
            description: 'The person to add to the database',
            required: true,
            schema: {
              $ref: '#/definitions/Person'
            }
          }
        ],
        responses: {
          200: {
            description: 'Returns the updated person',
            schema: {
              $ref: '#/definitions/PersonRead'
            }
          }
        }
      },
      delete: {
        summary: 'Delete a person',
        tags: ['People'],
        description: 'Deletes a single person\'s information',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The person\'s id',
            type: 'integer',
            required: true
          }
        ],
        responses: {
          204: {
            description: 'Successfully deleted the person'
          }
        }
      }
    },

    '/pets': {
      get: {
        summary: 'Real all pets',
        tags: ['Pets'],
        description: 'Gets a list of all pets',
        parameters: [
          {
            name: 'include',
            in: 'query',
            description: 'Whether or not to include sub documents',
            type: 'string',
            enum: ['owner']
          }
        ],
        responses: {
          200: {
            description: 'Returns an array of pets',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/PetRead'
              }
            }
          }
        }
      },
      post: {
        summary: 'Create a pet',
        tags: ['Pets'],
        description: 'Create a new pet',
        parameters: [
          {
            name: 'pet',
            in: 'body',
            description: 'The pet to add to the database',
            required: true,
            schema: {
              $ref: '#/definitions/Pet'
            }
          }
        ],
        responses: {
          201: {
            description: 'Returns the newly created pet',
            schema: {
              $ref: '#/definitions/PetRead'
            }
          }
        }
      }
    },
    '/pets/{id}': {
      get: {
        summary: 'Read a pet',
        tags: ['Pets'],
        description: 'Gets a single pet\'s information',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The pet\'s id',
            type: 'integer',
            required: true
          },
          {
            name: 'include',
            in: 'query',
            description: 'Whether or not to include sub documents',
            type: 'string',
            enum: ['owner']
          }
        ],
        responses: {
          200: {
            description: 'Returns the pet with the given id',
            schema: {
              $ref: '#/definitions/PetWithOwner'
            }
          }
        }
      },
      put: {
        summary: 'Update a pet',
        tags: ['Pets'],
        description: 'Updates a single pet\'s information',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The pet\'s id',
            type: 'integer',
            required: true
          },
          {
            name: 'pet',
            in: 'body',
            description: 'The pet to add to the database',
            required: true,
            schema: {
              $ref: '#/definitions/Pet'
            }
          }
        ],
        responses: {
          200: {
            description: 'Returns the updated pet',
            schema: {
              $ref: '#/definitions/PetRead'
            }
          }
        }
      },
      delete: {
        summary: 'Delete a pet',
        tags: ['Pets'],
        description: 'Deletes a single pet\'s information',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The pet\'s id',
            type: 'integer',
            required: true
          }
        ],
        responses: {
          204: {
            description: 'Successfully deleted the pet'
          }
        }
      }
    },

    '/people/{id}/pets': {
      get: {
        summary: 'Read a person\'s pets',
        tags: ['People', 'Pets'],
        description: 'Gets a list of all pets that belong to a person',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The pets\' owner',
            type: 'integer',
            required: true
          }
        ],
        responses: {
          200: {
            description: 'Returns an array of pets',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/PetRead'
              }
            }
          }
        }
      },
      post: {
        summary: 'Create a pet',
        tags: ['People', 'Pets'],
        description: 'Create a new pet associated with an owner',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The pets\' owner',
            type: 'integer',
            required: true
          },
          {
            name: 'pet',
            in: 'body',
            description: 'The pet to add to the database',
            required: true,
            schema: {
              $ref: '#/definitions/Pet'
            }
          }
        ],
        responses: {
          201: {
            description: 'Returns the newly created pet',
            schema: {
              $ref: '#/definitions/PetRead'
            }
          }
        }
      }
    }
  },
  definitions: {
    Person: {
      type: 'object',
      required: [
        'firstName',
        'lastName'
      ],
      properties: {
        firstName: {
          type: 'string'
        },
        lastName: {
          type: 'string'
        },
        gender: {
          type: 'string',
          enum: ['M', 'F']
        }
      }
    },
    PersonRead: {
      allOf: [
        {$ref: '#/definitions/Person'},
        {$ref: '#/definitions/Dates'}
      ]
    },
    PersonWithPets: {
      allOf: [
        {$ref: '#/definitions/PersonRead'},
        {
          properties: {
            pets: {
              type: 'array',
              items: {
                $ref: '#/definitions/Pet'
              }
            }
          }
        }
      ]
    },
    Dates: {
      properties: {
        createdAt: {
          type: 'date',
          format: 'date-time'
        },
        updatedAt: {
          type: 'date'
        }
      }
    },
    Pet: {
      type: 'object',
      required: [
        'name',
        'type'
      ],
      properties: {
        name: {
          type: 'string'
        },
        type: {
          type: 'string',
          enum: ['dog', 'cat', 'fish', 'bird']
        }
      }
    },
    PetRead: {
      allOf: [
        {$ref: '#/definitions/Pet'},
        {$ref: '#/definitions/Dates'},
        {
          properties: {
            owner: {
              type: 'number',
            }
          }
        }
      ]
    },
    PetWithOwner: {
      allOf: [
        {$ref: '#/definitions/PetRead'},
        {
          properties: {
            owner: {
              $ref: '#/definitions/PersonRead'
            }
          }
        }
      ]
    }
  }
};
