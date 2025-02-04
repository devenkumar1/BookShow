import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import user from './models/user.model.js'; // Adjust the path if necessary
import dotenv from 'dotenv';

dotenv.config();

// Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:4000/auth/google/callback', // Update for production
}, async (token, tokenSecret, profile, done) => {
  try {
    let existingUser = await user.findOne({ googleId: profile.id });

    if (!existingUser) {
      const newUser = new user({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
      });
      await newUser.save();
      return done(null, newUser);
    }

    return done(null, existingUser);
  } catch (error) {
    done(error);
  }
}));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:4000/auth/github/callback', // Update for production
}, async (token, tokenSecret, profile, done) => {
  try {
    let existingUser = await user.findOne({ githubId: profile.id });

    if (!existingUser) {
      const newUser = new user({
        githubId: profile.id,
        username: profile.username,
        name: profile.displayName,
        email: profile.emails[0].value,
      });
      await newUser.save();
      return done(null, newUser);
    }

    return done(null, existingUser);
  } catch (error) {
    done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const userData = await user.findById(id);
  done(null, userData);
});

export default passport;
