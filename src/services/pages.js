'use strict';

const { Page } = require('../models');

exports.getById = function(id) {
  return Page.getById(id);
};
