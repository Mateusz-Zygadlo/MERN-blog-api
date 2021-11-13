const Post = require('../model/post');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs')
dayjs().format();

exports.allPosts = (req, res, next) => {
  Post.find({isPublic: true}).exec((err, result) => {
    if(err){
      return next(err);
    }

    return res.json({
      posts: result
    })
  })
}

exports.allPostsFromAdmin = (req, res, next) => {
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

exports.myPosts = (req, res, next) => {
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

      Post.find({author: result._id}).exec((err, result) => {
        if(err){
          return next(err);
        }

        return res.json({
          posts: result
        })
      })
    })
  })
}

exports.deletePost = [
  async (req, res, next) => {
    const { id } = req.params;

    if(req.body.isPublicTest == ''){
      Post.findOne({_id: id}).exec((err, result) => {
        if(err){
          return next(err);
        }

        Post.updateOne({_id: id}, {isPublic: !result.isPublic}).exec((err, resultTwo) => {
          if(err){
            return next(err);
          }

          return res.json({
            title: 'success',
          })
        })
      })

      return;
    }

    Post.findOneAndRemove({_id: id}).exec((err, result) => {
      if(err){
        return next(err);
      }

      return res.json({
        title: 'success deleted post',
        result,
      });
    })
  }
]

exports.viewPost = [
  (req, res, next) => {
    Post.findOne({_id: req.params.id}).exec((err, result) => {
      if(err){
        return next(err);
      }

      return res.json({
        result,
      })
    })
  }
]