const Comment = require('../model/comment');
const jwt = require('jsonwebtoken');

exports.allComments = (req, res, next) => {
  const { id } = req.params;
  
  Comment.find({post: id}).exec((err, result) => {
    if(err){
      return next(err);
    }

    res.json({
      comments: result
    })
  })
}

exports.addComment = [
  (req, res, next) => {
    const cookie = req.cookies['JWT-REFRESH-TOKEN'];

    if(!cookie){
      return res.json({
        err: 'not found user'
      })
    }

    jwt.verify(cookie, process.env.REFRESH_TOKEN_KEY, (err, user) => {
      if(err){
        return res.status(403).json({
          title: 'Invalid refresh token',
        })
      }
      
      const comment = new Comment({
        description: req.body.commentContent,
        authorEmail: user.email,
        post: req.body.id
      }).save((err) => {
        if(err){
          return next(err);
        }

        return res.json({
          title: 'success'
        })
      })
  
    })
  }
]