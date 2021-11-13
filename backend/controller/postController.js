const Post = require('../model/post');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs')
dayjs().format();

exports.allPosts = (req, res, next) => {
  Post.find().exec((err, result) => {
    if(err){
      return next(err);
    }

    return res.json({
      posts: result
    })
  })
}

exports.latestPosts = (req, res, next) => {
  Post.find({isPublic: true}).sort({_id: -1}).limit(6).exec((err, result) => {
    if(err){
      return next(err);
    }

    return res.json({
      posts: result
    })
  })
}

exports.newPost = [
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
      User.findOne({email: user.email}).exec((err, result) => {
        if(err){
          return next(err);
        }
        const formattedDate = dayjs(new Date()).format('YYYY-MM-DD');

        const post = new Post({
          title: req.body.title,
          description: req.body.description,
          postAbbreviation: req.body.postAbbreviation,
          date: formattedDate,
          isPublic: req.body.isPublic || false,
          author: result._id,
          authorEmail: result.email,
          comments: [],
        }).save((err) => {
          if(err){
            return next(err);
          }

          return res.json({
            title: 'success',
          })
        })
      })
    })
  }
]