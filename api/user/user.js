var express = require('express');
var router = express.Router();
const User = require('./user.model');
const mongoose = require('mongoose');

/* GET users listing. */
router.get('/', (req, res, next) => {
  User.find({})
  .exec((err, Users) => {
    if(err) { return res.send(err); }
    return res.json(Users);
  });
});

/* CREATE a new User. */
router.post('/', (req, res) => {
  const user = new User({
  	username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role || 'Collaborator',
    pic: req.body.pic || ''
  });

  user.save((err) => {
    if (err) { return res.send(err); }
    return res.json({ message: 'New user created correctly!' });
  });
});

/* GET a single User. */
router.get('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }
  User.findById(req.params.id, (err, Users) => {
      if (err) {
        return res.send(err);
      }
      return res.json(Users);
    });
});

/* EDIT a User. */
router.put('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }

  User.findByIdAndUpdate(req.params.id, { $set : req.body }, (err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      message: 'User updated successfully'
    });
  });
});

/* DELETE a User. */
router.delete('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }

  User.remove({ _id: req.params.id }, (err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      message: 'User has been removed!'
    });
  });
});

module.exports = router;
