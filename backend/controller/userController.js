require('dotenv').config();

const User = require('../model/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.allUsers = (req, res, next) => {
  User.find().exec((err, result) => {
    if(err){
      return next(err);
    }

    res.json({
      users: result
    })
  })
}

exports.newUser = [
  async (req, res, next) => {
    const {email, password, authorPermissions} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    User.find({email: email}).exec((err, result) => {
      if(err){
        return next(err);
      }
      if(result.length){
        User.find().exec((err, result) => {
          if(err){
            return next(err);
          }

          return res.json({
            err: 'Account for this email has already been created',
          })
        })
      }else{
        const user = new User({
          email,
          password: hashedPassword,
          author: authorPermissions,
          user: true,
          isAdmin: false,
        }).save((err) => {
          if(err){
            return next(err);
          }
        })

        return res.json({
          title: 'success created account',
        })
      }
    })
  }
]

exports.loginUser = [
  async (req, res, next) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});

    if(!email){
      return res.json({
        title: 'error',
        err: 'User not found',
      })
    }
    try{
      if(await bcrypt.compare(password, user.password)){
        const userObj = {
          _id: user.id,
          email: user.email,
          password: user.password,
          author: user.author,
          user: user.user,
          isAdmin: user.isAdmin,
        }
        const accessToken = jwt.sign(userObj, process.env.SECRET_KEY);

        return res
          .status(202)
          .cookie('JWT-TOKEN', accessToken, {
            sameSite: 'strict', 
            path: '/', 
            expires: new Date(new Date().getTime() + 30 * 1000),
            secure: true,
          })
          .json({
            title: 'success',
          })
      }else{
        return res.json({
          title: 'error',
          err: 'Password is incorrect',
        })
      }
    }catch(err){
      return res.json({
        error: 'error'
      })
    }
  }
]

exports.logoutUser = (req, res, next) => {
  return res
    .status(200)
    .clearCookie('JWT-TOKEN', {
      path: '/'
    })
    .clearCookie('JWT-REFRESH-TOKEN', {
      path: '/',
    })
    .json({
      title: 'success logout'
    })
}

exports.homePage = (req, res, next) => {
  let cookie = req.cookies['JWT-REFRESH-TOKEN'];

  if(!req.cookies['JWT-REFRESH-TOKEN'] && !req.cookies['JWT-TOKEN']){
    return res.json({
      error: 'Not created token'
    })
  }

  if(!cookie){
    jwt.verify(req.cookies['JWT-TOKEN'], process.env.SECRET_KEY, (err, user) => {
      if(err){
        return res.status(403).json({
          title: 'Invalid refresh token',
        })
      }
      const userObj = {
        _id: user.id,
        email: user.email,
        password: user.password,
        author: user.author,
        user: user.user,
        isAdmin: user.isAdmin,
      }

      const refreshToken = jwt.sign(userObj, process.env.REFRESH_TOKEN_KEY);
  
      return res
        .cookie('JWT-REFRESH-TOKEN', refreshToken, {
          sameSite: 'strict', 
          path: '/', 
          expires: new Date(new Date().getTime() + 1000000 * 1000),
          secure: true,
        })
        .json({
          user
        })
      })
  }else{
    jwt.verify(cookie, process.env.REFRESH_TOKEN_KEY, (err, user) => {
      if(err){
        return res.status(403).json({
          title: 'Invalid refresh token',
        })
      }
  
      return res.json({
        user
      })
    })
  }
}