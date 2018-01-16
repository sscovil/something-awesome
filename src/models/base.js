'use strict';

const Knex = require('knex');
const { knexSnakeCaseMappers, Model } = require('objection');
const uuid = require('uuid');

const knex = Knex({
  client: 'pg',
  connection: {
    database : 'blog'
  },

  // Merge `postProcessResponse` and `wrapIdentifier` mappers.
  ...knexSnakeCaseMappers()
});

Model.knex(knex);

class Base extends Model {
  /**
   * Called before a model is inserted into the database.
   *
   * You can return a promise from this function if you need to do asynchronous stuff. You can also throw an exception
   * to abort the insert and reject the query. This can be useful if you need to do insert specific validation.
   *
   * @param {object} queryContext - Context object of the insert query. http://vincit.github.io/objection.js/#context
   */
  $beforeInsert() {
    // Strip values for immutable properties.
    const immutableProperties = this.constructor.immutableProperties;
    if (Array.isArray(immutableProperties)) {
      immutableProperties.forEach((key) => {
        delete this[key];
      });
    }

    // Auto-generate UUID if applicable.
    const uuidColumn = this.constructor.uuidColumn;
    if (uuidColumn && this.hasProperty(uuidColumn)) {
      this[uuidColumn] = uuid.v4();
    }

    // Set createdAt timestamp if applicable.
    if (this.hasProperty('createdAt')) {
      this.createdAt = new Date().toISOString();
    }
  }

  /**
   * Called before a model is updated.
   *
   * You can return a promise from this function if you need to do asynchronous stuff. You can also throw an exception
   * to abort the update and reject the query. This can be useful if you need to do update specific validation.
   *
   * This method is also called before a model is patched. Therefore all the model’s properties may not exist. You can
   * check if the update operation is a patch by checking the opt.patch boolean.
   *
   * The opt.old object contains the old values while this contains the updated values. The old values are never
   * fetched from the database implicitly. For non-instance queries the opt.old object is undefined.
   *
   * @param {ModelOptions} opt - Update options.
   * @param {object} queryContext - Context object of the update query. http://vincit.github.io/objection.js/#context
   */
  $beforeUpdate(opt) {
    // Strip values for immutable properties.
    const immutableProperties = this.constructor.immutableProperties;
    if (Array.isArray(immutableProperties)) {
      immutableProperties.forEach((key) => {
        delete this[key];
      });
    }

    // Set updatedAt timestamp if applicable.
    if (this.hasProperty('updatedAt')) {
      this.updatedAt = new Date().toISOString();
    }
  }

  /**
   * Check if model jsonSchema contains a given property.
   *
   * @param {string} property - Name of property to check for.
   * @return {boolean}
   */
  hasProperty(property) {
    const properties = this.constructor.jsonSchema && this.constructor.jsonSchema.properties;

    if (!properties) {
      return false;
    }

    return properties.hasOwnProperty(property);
  }

  /**
   * Default sort order used by getPaginated method.
   *
   * @return {string}
   */
  static get defaultOrder() {
    return 'ASC';
  }

  /**
   * Default sort property used by getPaginated method.
   *
   * @return {string}
   */
  static get defaultOrderBy() {
    return this.idColumn;
  }

  /**
   * Default page size used by getPaginated method.
   *
   * @return {number}
   */
  static get defaultPageSize() {
    return 100;
  }

  /**
   * Model properties that should be excluded from inserts and updates.
   *
   * These properties are deleted from the model $beforeInsert and $beforeUpdate. If the model has a createdAt
   * property, it will be set $beforeInsert. If the model has an updatedAt property, it will be set $beforeUpdate.
   *
   * @return {string[]}
   */
  static get immutableProperties() {
    return [
      this.idColumn,
      'createdAt',
      'updatedAt'
    ];
  }

  /**
   * Default page size used by getPaginated method.
   *
   * @return {number}
   */
  static get maxPageSize() {
    return 500;
  }

  /**
   * Create a new record.
   *
   * @param {object} attrs - Model properties based on this.jsonSchema.
   * @return {Promise<T>}
   */
  static create(attrs) {
    return this.createQuery(attrs)
      .execute();
  }

  /**
   * Generate SQL query to create a new record.
   *
   * @param {object} attrs - Model properties based on this.jsonSchema.
   * @return {QueryBuilder} - Objection.js QueryBuilder object. http://vincit.github.io/objection.js/#querybuilder
   */
  static createQuery(attrs) {
    return this.query()
      .insert(attrs)
      .returning('*');
  }

  /**
   * Delete a record by ID.
   *
   * @param {*} id - ID of the record to delete based on this.idColumn.
   * @return {Promise<T>}
   */
  static delete(id) {
    return this.deleteQuery(id)
      .throwIfNotFound()
      .execute();
  }

  /**
   * Generate SQL query to delete a record by ID.
   *
   * @param {*} id - ID of the record to delete based on this.idColumn.
   * @return {QueryBuilder} - Objection.js QueryBuilder object. http://vincit.github.io/objection.js/#querybuilder
   */
  static deleteQuery(id) {
    return this
      .query()
      .delete()
      .first()
      .where(this.idColumn, id)
      .returning('*');
  }

  /**
   * Fetch a record by ID.
   *
   * @param {*} id - ID of the record to fetch based on this.idColumn.
   * @return {Promise<T>}
   */
  static getById(id) {
    return this.getByIdQuery(id)
      .throwIfNotFound()
      .execute();
  }

  /**
   * Generate SQL query to fetch a record by ID.
   *
   * @param {*} id - ID of the record to fetch based on this.idColumn.
   * @return {QueryBuilder} - Objection.js QueryBuilder object. http://vincit.github.io/objection.js/#querybuilder
   */
  static getByIdQuery(id) {
    return this.query()
      .findOne('id', id);
  }

  /**
   * Fetch a paginated set of records.
   *
   * @param {object} opts - Order and pagination options.
   * @return {Promise<T[]>}
   */
  static getPaginated(opts = {}) {
    return this.getPaginatedQuery(opts)
      .execute();
  }

  /**
   * Generate SQL query to fetch a paginated set of records.
   *
   * @param {object} opts - Order and pagination options.
   * @return {QueryBuilder} - Objection.js QueryBuilder object. http://vincit.github.io/objection.js/#querybuilder
   */
  static getPaginatedQuery(opts = {}) {
    const { order, orderBy, page, pageSize } = Object.assign({
      order: this.defaultOrder,
      orderBy: this.defaultOrderBy,
      page: 0,
      pageSize: this.defaultPageSize
    }, opts);

    return this.query()
      .page(page, Math.min(pageSize, this.maxPageSize))
      .orderBy(orderBy, order);
  }

  /**
   * Update a record by ID.
   *
   * @param {*} id - ID of the record to update based on this.idColumn.
   * @param {object} attrs - Model properties based on this.jsonSchema.
   * @return {Promise<T>}
   */
  static patch(id, attrs) {
    return this.patchQuery(id, attrs)
      .throwIfNotFound()
      .execute();
  }

  /**
   * Generate SQL query to update a record by ID.
   *
   * @param {*} id - ID of the record to update based on this.idColumn.
   * @param {object} attrs - Model properties based on this.jsonSchema.
   * @return {QueryBuilder} - Objection.js QueryBuilder object. http://vincit.github.io/objection.js/#querybuilder
   */
  static patchQuery(id, attrs) {
    return this.query()
      .patch(attrs)
      .first()
      .where(this.idColumn, id)
      .returning('*');
  }
}

module.exports = Base;
