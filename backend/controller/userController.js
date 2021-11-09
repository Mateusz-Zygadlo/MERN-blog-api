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
    console.log(req, res);

    return res.json({
      title: 'work',
    })
  }
]