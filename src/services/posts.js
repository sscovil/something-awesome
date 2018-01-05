'use strict';

const { Post } = require('../models');

exports.getById = function(id) {
  return Post.getById(Number(id));
};

exports.getPaginated = function(opts = {}) {
  return Post.getPaginated(opts);
};
