'use strict';

const Base = require('./base');

class Page extends Base {
  static get tableName() {
    return 'pages';
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['title', 'path', 'linkText', 'content'],

      properties: {
        id: {
          type: 'integer'
        },
        title: {
          type: 'string'
        },
        path: {
          type: 'string'
        },
        linkText: {
          type: 'string'
        },
        content: {
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

module.exports = Page;
