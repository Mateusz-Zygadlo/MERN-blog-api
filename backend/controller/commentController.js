const Comment = require('../model/comment');

exports.allComments = (req, res, next) => {
  Comment.find().exec((err, result) => {
    if(err){
      return next(err);
    }

    res.json({
      comments: result
    })
  })
}