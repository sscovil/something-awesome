'use strict';

const { pages } = require('../services');

exports.getPage = async function(req, res, next) {
  const pageId = req.params.pageId;

  try {
    const page = await pages.getById(pageId);

    return res.render('page', {
      header: {
        title: page.title
      },
      page: page
    });
  } catch(err) {
    return next();
  }
};
