const User = require('../model/user');
const bcrypt = require('bcrypt');

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
    const hashedPassword = await bcrypt.hash(req.body.passwordOne, 10);

    User.find({email: req.body.email}).exec((err, result) => {
      if(err){
        return next(err);
      }
      if(result){
        return res.json({
          title: 'User with this email already exists'
        })
      }else{
        if(req.body.passwordOne != req.body.passwordTwo){
          return res.json({
            title: 'Incorrect passwords'
          })
        }else{
          const user = new User({
            email: req.body.email,
            password: hashedPassword,
            author: req.body.author,
            user: true,
            isAdmin: false,
          }).save((err) => {
            if(err){
              return next(err);
            }

            return res.json({
              title: 'Created new account'
            })
          })
        }
      }
    })
  }
]