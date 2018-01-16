'use strict';

const _ = require('lodash');
const { posts } = require('../services');

exports.getPost = async function(req, res) {
  const postId = Number(req.params.postId);

  try {
    const post = await posts.getById(postId);

    return res.render('post', {
      header: {
        title: post.title
      },
      post: post
    });
  } catch(err) {
    return res.sendStatus(404);
  }
};

exports.index = async function(req, res) {
  const opts = _.pick(req.params, ['order', 'orderBy', 'page', 'pageSize']);
  const fetched = await posts.getPaginated(opts);

  return res.render('index', {
    posts: fetched.results,
    postCount: fetched.total
  });
};
