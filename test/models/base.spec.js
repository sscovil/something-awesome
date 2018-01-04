'use strict';

require('dotenv').config();

const { assert, expect } = require('chai');
const { NotFoundError, ValidationError } = require('objection');
const Base = require('../../src/models/base');
const Promise = require('bluebird');
const random = require('lodash/random');
const sortBy = require('lodash/sortBy');
const uuid = require('uuid');

describe('Base model', function() {
  /**
   * Test model that extends Base model.
   */
  class Person extends Base {
    static get tableName() {
      return 'test_person';
    }

    static get jsonSchema () {
      return {
        type: 'object',
        required: ['firstName', 'lastName'],

        properties: {
          id: {
            type: 'integer'
          },
          uuid: {
            type: 'string'
          },
          firstName: {
            type: 'string',
            minLength: 1,
            maxLength: 36
          },
          lastName: {
            type: 'string',
            minLength: 1,
            maxLength: 36
          },
          age: {
            type: 'number'
          },
          address: {
            type: 'object',
            properties: {
              street: {
                type: 'string'
              },
              city:  {
                type: 'string'
              },
              postalCode:  {
                type: 'string'
              }
            }
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

  /**
   * Create test_person table before first test runs.
   */
  before(function() {
    return Base.knex().schema.createTableIfNotExists(Person.tableName, (table) => {
      table.increments('id').primary();
      table.string('uuid');
      table.string('first_name');
      table.string('last_name');
      table.integer('age');
      table.jsonb('address');
      table.timestamps(true, false);
    });
  });

  /**
   * Drop test_person table after last test runs.
   */
  after(function() {
    return Base.knex().schema.dropTableIfExists(Person.tableName);
  });

  /**
   * Delete all test_person table rows after each test.
   */
  afterEach(function() {
    return Person.query().delete().execute();
  });

  /**
   * $beforeInsert (override)
   */
  describe('$beforeInsert', function() {
    it('should auto-generate UUID if class has uuidColumn value', async function() {
      class PersonWithUUID extends Person {
        static get uuidColumn() {
          return 'uuid';
        }
      }

      const attrs = {
        firstName: uuid.v4(),
        lastName: uuid.v4(),
        age: random(1, 99),
        address: {
          street: '123 Main Street',
          city: 'Springfield',
          postalCode: '12345-6789'
        }
      };

      const person = await PersonWithUUID.create(attrs);
      expect(person.uuid).to.be.a('string').lengthOf(36);
    });

    it('should not auto-generate UUID if class does not have uuidColumn value', async function() {
      const attrs = {
        firstName: uuid.v4(),
        lastName: uuid.v4(),
        age: random(1, 99),
        address: {
          street: '123 Main Street',
          city: 'Springfield',
          postalCode: '12345-6789'
        }
      };

      const person = await Person.create(attrs);
      expect(person.uuid).to.equal(null);
    });

    it('should ignore id value in insert query attributes', async function() {
      const attrs = {
        id: 99999999,
        firstName: uuid.v4(),
        lastName: uuid.v4(),
        age: random(1, 99),
        address: {
          street: '123 Main Street',
          city: 'Springfield',
          postalCode: '12345-6789'
        }
      };

      const person = await Person.query().insert(attrs).returning('*').execute();
      expect(person.id).to.be.a('number');
      expect(person.id).to.not.equal(attrs.id);
    });

    it('should ignore createdAt value in insert query attributes', async function() {
      const createdAt = new Date(Date.now() - 1000);
      const attrs = {
        id: 99999999,
        firstName: uuid.v4(),
        lastName: uuid.v4(),
        age: random(1, 99),
        address: {
          street: '123 Main Street',
          city: 'Springfield',
          postalCode: '12345-6789'
        },
        createdAt: createdAt.toISOString()
      };

      const person = await Person.query().insert(attrs).returning('*').execute();
      expect(person.createdAt).to.be.above(createdAt);
    });

    it('should ignore updatedAt value in insert query attributes', async function() {
      const updatedAt = new Date(Date.now() - 1);
      const attrs = {
        id: 99999999,
        firstName: uuid.v4(),
        lastName: uuid.v4(),
        age: random(1, 99),
        address: {
          street: '123 Main Street',
          city: 'Springfield',
          postalCode: '12345-6789'
        },
        updatedAt: updatedAt.toISOString()
      };

      const person = await Person.query().insert(attrs).returning('*').execute();
      expect(person.updatedAt).to.equal(null);
    });
  });

  /**
   * $beforeUpdate (override)
   */
  describe('$beforeUpdate', function() {
    let person;

    /**
     * Create record to update before each test runs.
     */
    beforeEach(async function() {
      const attrs = {
        firstName: uuid.v4(),
        lastName: uuid.v4(),
        age: random(1, 99),
        address: {
          street: '123 Main Street',
          city: 'Springfield',
          postalCode: '12345-6789'
        }
      };

      person = await Person.query().insert(attrs).returning('*').execute();
    });

    context('using update query', function() {
      it('should ignore id value in update query attributes', async function() {
        const attrs = {
          id: 99999999,
          firstName: 'changed',
          lastName: 'changed',
          age: person.age + 1,
          address: {
            street: 'changed',
            city: 'changed',
            postalCode: 'changed'
          }
        };

        const updated = await person.$query().update(attrs).returning('*').execute();
        expect(updated.id).to.equal(person.id);
        expect(updated.id).to.not.equal(attrs.id);
      });

      it('should ignore createdAt value in update query attributes', async function() {
        const createdAt = new Date();
        const attrs = {
          firstName: 'changed',
          lastName: 'changed',
          age: person.age + 1,
          address: {
            street: 'changed',
            city: 'changed',
            postalCode: 'changed'
          },
          createdAt: createdAt.toISOString()
        };

        const updated = await person.$query().update(attrs).returning('*').execute();
        expect(updated.createdAt).to.eql(person.createdAt);
        expect(updated.createdAt).to.be.below(createdAt);
      });

      it('should ignore updatedAt value in update query attributes', async function() {
        const updatedAt = new Date(Date.now() - 1);
        const attrs = {
          firstName: 'changed',
          lastName: 'changed',
          age: person.age + 1,
          address: {
            street: 'changed',
            city: 'changed',
            postalCode: 'changed'
          },
          updatedAt: updatedAt.toISOString()
        };

        const updated = await person.$query().update(attrs).returning('*').execute();
        expect(updated.updatedAt).to.not.equal(null);
        expect(updated.updatedAt).to.be.above(updatedAt);
      });
    });

    context('using patch query', function() {
      it('should ignore id value in update query attributes', async function() {
        const attrs = {
          id: 99999999,
          firstName: 'changed'
        };

        const updated = await person.$query().patch(attrs).returning('*').execute();
        expect(updated.id).to.equal(person.id);
        expect(updated.id).to.not.equal(attrs.id);
      });

      it('should ignore createdAt value in update query attributes', async function() {
        const createdAt = new Date();
        const attrs = {
          firstName: 'changed',
          createdAt: createdAt.toISOString()
        };

        const updated = await person.$query().patch(attrs).returning('*').execute();
        expect(updated.createdAt).to.eql(person.createdAt);
        expect(updated.createdAt).to.be.below(createdAt);
      });

      it('should ignore updatedAt value in update query attributes', async function() {
        const updatedAt = new Date(Date.now() - 1);
        const attrs = {
          firstName: 'changed',
          updatedAt: updatedAt.toISOString()
        };

        const updated = await person.$query().patch(attrs).returning('*').execute();
        expect(updated.updatedAt).to.not.equal(null);
        expect(updated.updatedAt).to.be.above(updatedAt);
      });
    });
  });

  /**
   * $validate (override)
   */
  describe('$validate', function() {
    it('should reject with ValidationError if a required attribute is missing', async function() {
      const attrs = {
        lastName: uuid.v4(),
        age: random(1, 99),
        address: {
          street: '123 Main Street',
          city: 'Springfield',
          postalCode: '12345-6789'
        }
      };

      const person = Person.fromJson(attrs, { skipValidation: true });
      const $validate = () => person.$validate();

      expect($validate).to.throw(ValidationError).satisfy((err) => {
        return err.data &&
          err.data.firstName &&
          Array.isArray(err.data.firstName) &&
          err.data.firstName.length === 1 &&
          err.data.firstName[0].keyword === 'required';
      });
    });

    it('should reject with ValidationError if attribute with minLength is too short', async function() {
      const attrs = {
        firstName: '',
        lastName: uuid.v4(),
        age: random(1, 99),
        address: {
          street: '123 Main Street',
          city: 'Springfield',
          postalCode: '12345-6789'
        }
      };

      const person = Person.fromJson(attrs, { skipValidation: true });
      const $validate = () => person.$validate();

      expect($validate).to.throw(ValidationError).satisfy((err) => {
        return err.data &&
          err.data.firstName &&
          Array.isArray(err.data.firstName) &&
          err.data.firstName.length === 1 &&
          err.data.firstName[0].keyword === 'minLength';
      });
    });

    it('should reject with ValidationError if attribute with maxLength is too long', async function() {
      const attrs = {
        firstName: `too-long-${uuid.v4()}`,
        lastName: uuid.v4(),
        age: random(1, 99),
        address: {
          street: '123 Main Street',
          city: 'Springfield',
          postalCode: '12345-6789'
        }
      };

      const person = Person.fromJson(attrs, { skipValidation: true });
      const $validate = () => person.$validate();

      expect($validate).to.throw(ValidationError).satisfy((err) => {
        return err.data &&
          err.data.firstName &&
          Array.isArray(err.data.firstName) &&
          err.data.firstName.length === 1 &&
          err.data.firstName[0].keyword === 'maxLength';
      });
    });

    it('should reject with ValidationError if attribute type is incorrect', async function() {
      const attrs = {
        firstName: uuid.v4(),
        lastName: uuid.v4(),
        age: 'should be a number',
        address: {
          street: '123 Main Street',
          city: 'Springfield',
          postalCode: '12345-6789'
        }
      };

      const person = Person.fromJson(attrs, { skipValidation: true });
      const $validate = () => person.$validate();

      expect($validate).to.throw(ValidationError).satisfy((err) => {
        return err.data &&
          err.data.age &&
          Array.isArray(err.data.age) &&
          err.data.age.length === 1 &&
          err.data.age[0].keyword === 'type';
      });
    });
  });

  /**
   * create
   */
  describe('create', function() {
    it('should create a new record and resolve with model', async function() {
      const attrs = {
        firstName: uuid.v4(),
        lastName: uuid.v4(),
        age: random(1, 99),
        address: {
          street: '123 Main Street',
          city: 'Springfield',
          postalCode: '12345-6789'
        }
      };

      const person = await Person.create(attrs);
      expect(person).to.be.instanceof(Person);
      expect(person.toJSON()).to.deep.include(attrs);
    });
  });

  /**
   * delete
   */
  describe('.delete', function() {
    let person;

    /**
     * Create record to delete before each test runs.
     */
    beforeEach(async function() {
      const attrs = {
        firstName: uuid.v4(),
        lastName: uuid.v4(),
        age: random(1, 99),
        address: {
          street: '123 Main Street',
          city: 'Springfield',
          postalCode: '12345-6789'
        }
      };

      person = await Person.create(attrs);
    });

    it('should delete a record and resolve with model', async function() {
      const deleted = await Person.delete(person.id);

      expect(deleted).to.be.instanceof(Person);
      expect(deleted.toJSON()).to.deep.equal(person.toJSON());
    });

    it('should reject with NotFoundError if record does not exist', async function() {
      try {
        await Person.delete(0);
        assert.fail();
      } catch(err) {
        expect(err).to.be.instanceof(NotFoundError);
      }
    });
  });

  /**
   * getById
   */
  describe('.getById', function() {
    let person;

    /**
     * Create record to fetch before each test runs.
     */
    beforeEach(async function() {
      const attrs = {
        firstName: uuid.v4(),
        lastName: uuid.v4(),
        age: random(1, 99),
        address: {
          street: '123 Main Street',
          city: 'Springfield',
          postalCode: '12345-6789'
        }
      };

      person = await Person.create(attrs);
    });

    it('should fetch a record and resolve with model', async function() {
      const fetched = await Person.getById(person.id);

      expect(fetched).to.be.instanceof(Person);
      expect(fetched.toJSON()).to.deep.equal(person.toJSON());
    });

    it('should reject with NotFoundError if record does not exist', async function() {
      try {
        await Person.getById(0);
        assert.fail();
      } catch(err) {
        expect(err).to.be.instanceof(NotFoundError);
      }
    });
  });

  /**
   * getPaginated
   */
  describe('.getPaginated', function() {
    context('where no records exist', function() {
      it('should return an object with an empty results array', async function() {
        const fetched = await Person.getPaginated();

        expect(fetched).to.be.an('object');
        expect(fetched.results).to.be.an('array').lengthOf(0);
        expect(fetched.total).to.equal(0);
      });
    });

    context('where multiple records exist', function() {
      let people;

      /**
       * Create record to update before each test runs.
       */
      beforeEach(async function() {
        const attrs = [];

        for (let i = 0; i < 3; i++) {
          attrs.push({
            firstName: uuid.v4(),
            lastName: uuid.v4(),
            age: random(1, 99)
          });
        }

        people = await Promise.map(attrs, (_attrs) => Person.create(_attrs));
      });

      it('should return an object with a results array containing all models', async function() {
        const fetched = await Person.getPaginated();

        expect(fetched).to.be.an('object');
        expect(fetched.results).to.be.an('array').lengthOf(people.length);
        expect(fetched.total).to.equal(people.length);

        fetched.results.forEach((person) => {
          expect(person).to.be.instanceof(Person);
        });
      });

      it('should order results by id (ascending) by default', async function() {
        const sorted = sortBy(people, 'id');
        const fetched = await Person.getPaginated();

        fetched.results.forEach((person, index) => {
          expect(person.id).to.equal(sorted[index].id);
        });
      });

      it('should order results based on options when set', async function() {
        const sorted = sortBy(people, 'firstName').reverse();
        const fetched = await Person.getPaginated({ orderBy: 'firstName', order: 'DESC' });

        fetched.results.forEach((person, index) => {
          expect(person.id).to.equal(sorted[index].id);
        });
      });

      it('should return paginated results based on options when set', async function() {
        const sorted = sortBy(people, 'id');
        const fetched = await Person.getPaginated({ page: 2, pageSize: 1 });

        expect(fetched.results).to.be.an('array').lengthOf(1);
        expect(fetched.results[0].id).to.equal(sorted[2].id);
        expect(fetched.total).to.equal(3);
      });
    });
  });

  /**
   * patch
   */
  describe('.patch', function() {
    let person;

    /**
     * Create record to update before each test runs.
     */
    beforeEach(async function() {
      const attrs = {
        firstName: uuid.v4(),
        lastName: uuid.v4(),
        age: random(1, 99),
        address: {
          street: '123 Main Street',
          city: 'Springfield',
          postalCode: '12345-6789'
        }
      };

      person = await Person.create(attrs);
    });

    it('should patch a record and resolve with model', async function() {
      const attrs = {
        firstName: 'changed'
      };
      const updated = await Person.patch(person.id, attrs);
      const expected = Object.assign(person.toJSON(), attrs, { updatedAt: updated.updatedAt });

      expect(updated).to.be.instanceof(Person);
      expect(updated.toJSON()).to.deep.equal(expected);
    });

    it('should reject with NotFoundError if record does not exist', async function() {
      const attrs = {
        firstName: 'changed'
      };

      try {
        await Person.patch(0, attrs);
        assert.fail();
      } catch(err) {
        expect(err).to.be.instanceof(NotFoundError);
      }
    });
  });
});
