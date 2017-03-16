const express          = require("express");
const mongoose         = require('mongoose');

const authController   = express.Router();
const passport         = require("passport");
const bcrypt           = require("bcrypt");
const bcryptSalt       = 10;

const User             = require('../user/user.model');

const upload = require('../../configs/multer');

//SIGNUP
authController.post("/signup", upload.single('file'), (req, res, next) => {
  var {username, email, password, role} = req.body;
  var pic = req.file.path;
  console.log('all data', username, password, email, role, pic);
  if (!username || !password || !email || !role || !pic) {
    console.log('Entered 400!!!');
    res.status(400).json({ message: "Please provide all data for user creation" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: "The username already exists" });
      return;
    }

    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    var newUser = new User({
      username,
      email,
      role,
      pic,
      password: hashPass
    });

    console.log('new user pic is' + newUser.pic);
    newUser.save((err) => {
      if (err) {
        res.status(400).json({ message: "Something went wrong" });
      } else {
        req.login(newUser, function(err) {
          if (err) {
            return res.status(500).json({
              message: 'something went wrong :('
            });
          }
          res.status(200).json(req.user);
        });
      }
    });
  });
});

//LOGIN
authController.post("/login", function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }

    if (!user) { return res.status(401).json(info); }

    req.login(user, function(err) {
      if (err) {
        return res.status(500).json({
          message: 'something went wrong :('
        });
      }
      res.status(200).json(req.user);
    });
  })(req, res, next);
});

//LOGOUT
authController.post("/logout", function(req, res) {
  req.logout();
  res.status(200).json({ message: 'Logged out' });
});

//TO CHECK IF USER IS LOGGED IN
authController.get("/loggedin", function(req, res) {
  if(req.isAuthenticated()) {
    return res.status(200).json(req.user);
  }

  return res.status(403).json({ message: 'Unauthorized' });
});

//PRIVATE MESSAGE
authController.get("/private", (req, res) => {
  console.log(req.sessionID);
  if(req.isAuthenticated() && req.user.role==='Collaborator') {
    return res.json({ message: 'This is a private message' });
  }
  return res.status(403).json({ message: 'Unauthorized' });
});

module.exports = authController;
