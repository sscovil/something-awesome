'use strict';

exports.setDefault = function(req, res, next) {
  Object.assign(res.locals, {
    currentPath: req.originalUrl,
    footer: {
      year: new Date().getFullYear()
    },
    header: {
      title: 'Something Awesome'
    },
    meta: {
      title: 'My Blog',
      description: 'A blog about something awesome!'
    },
    pages: []
  });

  next();
};
