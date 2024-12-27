var GoogleStrategy = require('passport-google-oauth20').Strategy;
const {userModel} = require("../models/user_model")
const passport = require('passport')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://grocery-dwjr.onrender.com/auth/google/callback"
  },
 async function(accessToken, refreshToken, profile, cb) {
 try {
 let user = await userModel.findOne({email:profile.emails[0].value});

 if(!user){
  user = new userModel({
    name:profile.displayName,
    email:profile.emails[0].value,
  })
  await user.save();
 } 
 cb(null, user)
 } catch (error) {
  cb(error,false)
 }
  }
));


passport.serializeUser(function (user,cb) {
return cb(null, user._id)
})
 
//yeahi id daeta hae user ki during add to cart functionality
passport.deserializeUser(async function(id,cb){
let user = await userModel.findOne({_id:id});
cb(null,user)
});

module.exports = passport;
