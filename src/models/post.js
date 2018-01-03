'use strict';

const Base = require('./base');

class Post extends Base {
  static get tableName() {
    return 'posts';
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['title', 'content'],

      properties: {
        id: {
          type: 'integer'
        },
        title: {
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

module.exports = Post;
