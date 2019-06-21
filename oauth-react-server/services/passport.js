
/* VARIABLES */
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

/* LOAD MODELS */
const user = mongoose.model('users');

/* SERIALIZE COOKIE */
passport.serializeUser((user, done) => {
  done(null, user.id);
});

/* DESERIALIZE COOKIE */
passport.deserializeUser((id, done) => {
  user.findById(id)
    .then(user => {
      done(null, user);
    });
});

/* OAUTH */
passport.use(new googleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    let userFound = await user.findOne({ googleID:profile.id });
    if (userFound) {
      return done(null, userFound);
    };
    let user = await new user({ googleID:profile.id }).save();
    done(null, user);
}));

/* ROUTES */
module.exports = app =>{
  app.get('/auth/google/callback', passport.authenticate('google'))
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
