const Post = require('../model/post');

exports.allPosts = (req, res, next) => {
  Post.find().exec((err, result) => {
    if(err){
      return next(err);
    }

    res.json({
      posts: result
    })
  })
}