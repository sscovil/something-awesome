'use strict';

const Base = require('./base');

class User extends Base {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['key', 'secret', 'email'],

      properties: {
        id: {
          type: 'integer'
        },
        key: {
          type: 'string'
        },
        secret: {
          type: 'string'
        },
        email: {
          type: 'string'
        },
        isEmailVerified: {
          type: 'boolean'
        },
        createdAt: {
          format: 'date-time'
        },
        updatedAt: {
          format: 'date-time'
        }
      }
    };
  }
}

module.exports = User;
