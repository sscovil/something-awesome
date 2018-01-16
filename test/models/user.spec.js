'use strict';

require('dotenv').config();

const { assert, expect } = require('chai');
const { NotFoundError, ValidationError } = require('objection');
const User = require('../../src/models/user');
const Promise = require('bluebird');
const random = require('lodash/random');
const sortBy = require('lodash/sortBy');
const uuid = require('uuid');

describe('User model', function(){
  it('can be used to add a record to the users table', async function() {
    const attrs = {
      key: uuid.v4(),
      secret: uuid.v4(),
      email: uuid.v4()
    }
    const user= await User.create(attrs);
    expect(user.key).to.equal(attrs.key);
  })

})
