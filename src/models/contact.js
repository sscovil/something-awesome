'use strict';

const Base = require('./base');

class Contact extends Base {
  static get tableName() {
    return 'contacts';
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['name', 'email', 'subject', 'message'],

      properties: {
        id: {
          type: 'integer'
        },
        name: {
          type: 'string'
        },
        email: {
          type: 'string'
        },
        subject: {
          type: 'string'
        },
        message: {
          type: 'string'
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

module.exports = Contact;
