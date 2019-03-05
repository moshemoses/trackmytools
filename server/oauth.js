const router = require("express").Router();
const passport = require("passport");
const { User } = require("./db");
//const secrets = require("../secrets");

let secrets = {
  clientID: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET
};

module.exports = router;

// Google authentication and login (GET /auth/google)
router.get("/", passport.authenticate("google", { scope: "email" }));

// handles the callback after Google has authenticated the user (GET /auth/google/callback)
router.get(
  "/callback",
  passport.authenticate("google", {
    successRedirect: "/home", // or wherever
    failureRedirect: "/" // or wherever
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: secrets.clientID,
      clientSecret: secrets.clientSecret,
      callbackURL: "/auth/google/callback"
    },
    // Google will send back the token and profile
    (token, refreshToken, profile, done) => {
      // the callback will pass back user profile information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.
      /*
    --- fill this part in ---
        */
      const info = {
        email: profile.emails[0].value,
        imageUrl: profile.photos ? profile.photos[0].value : undefined
      };

      User.findOrCreate({
        where: { googleId: profile.id },
        defaults: info
      })
        .spread(user => {
          done(null, user);
        })
        .catch(done);
    }
  )
);
