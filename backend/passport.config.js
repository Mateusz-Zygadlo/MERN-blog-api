const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./model/user');

const initializePassport = (passport) => {
  const authenticationUser = async (email, password, done) => {
    const user = User.findOne({email: email});
    console.log(user);
    
    if(user == null){
      return done(null, false, {err: 'User not found'})
    }
    try{
      if(await bcrypt.compare(password, user.passport)){
        return done(null, user)
      }else{
        return done(null, false, {err: 'password incorrect'})
      }
    }catch(err){
      return done(err)
    }
  }

  passport.use(new LocalStrategy({usernameField: 'email'}, authenticationUser));

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}

module.exports = initializePassport;