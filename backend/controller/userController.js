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