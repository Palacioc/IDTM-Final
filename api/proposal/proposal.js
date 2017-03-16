var express = require('express');
var router = express.Router();
const Proposal = require('./proposal.model');
const mongoose = require('mongoose');

/* GET proposal listing. */
router.get('/', (req, res, next) => {
  Proposal.find({})
  .exec((err, Proposal) => {
    if(err) { return res.send(err); }
    return res.json(Proposal);
  });
});

/* GET proposal listing by needID. */
router.get('/by-need/:id', (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }
  Proposal.find({_need : req.params.id})
  .populate('_need')
  .populate('_contributor')
  .exec((err, Proposals) => {
    if(err) { return res.send(err); }
    return res.json(Proposals);
  });
});

router.get('/by-creator/:id', (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }
  Proposal.find({_contributor : req.params.id})
  .populate('_need')
  .exec((err, Proposals) => {
    if(err) { return res.send(err); }
    return res.json(Proposals);
  });
});


/* CREATE a new Proposal. */
router.post('/', (req, res) => {
  const proposal = new Proposal({
    _need: req.body.needID,
    _contributor: req.body.contributorID,
    coverage: req.body.coverage || 'Blue',
    comment: req.body.comment || 'I am happy to help to this cause!',
    cost: req.body.cost || 0,
    accountNo: req.body.accountNo || 0,
  });

  proposal.save((err) => {
    if (err) { return res.send(err); }
    return res.json({ message: 'New proposal created correctly!' });
  });
});

/* GET a single Proposal. */
router.get('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }
  Proposal.findById(req.params.id)
  .populate('_need')
  .populate('_contributor')
  .exec((err, Proposals) => {
      if (err) {
        return res.send(err);
      }
      return res.json(Proposals);
    });
});

/* EDIT a Proposal. */
router.put('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }

  Proposal.findByIdAndUpdate(req.params.id, { $set : req.body }, (err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      message: 'Proposal updated successfully'
    });
  });
});

/* DELETE a Proposal. */
router.delete('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }

  Proposal.remove({ _id: req.params.id }, (err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      message: 'Proposal has been removed!'
    });
  });
});


module.exports = router;
