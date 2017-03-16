var express = require('express');
var router = express.Router();
const Project = require('./project.model');
const mongoose = require('mongoose');
const upload = require('../../configs/multer');

/* GET project listing. */
router.get('/', (req, res, next) => {
  Project.find({})
  .exec((err, Projects) => {
    if(err) { return res.send(err); }
    return res.json(Projects);
  });
});

router.get('/by-creator/:id', (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }
  Project.find({_creator : req.params.id}, (err, Projects) => {
    if(err) { return res.send(err); }
    return res.json(Projects);
  });
});

router.get('/search/:term', (req, res, next) => {
  if((req.params.term)==='') {
    return res.status(400).json({ message: 'No search term' });
  }
  Project.find({ "name": { "$regex": req.params.term, "$options": "i" } }, (err, Projects) => {
    if(err) { return res.send(err); }
    return res.json(Projects);
  });
});

router.get('/four-latest', (req, res, next) => {
  Project.find({})
  .sort({'updated_at': -1})
  .limit(8)
  .exec((err, Projects) => {
    if(err) { return res.send(err); }
    return res.json(Projects);
  });
});


/* CREATE a new Project. */
router.post('/', upload.single('file'), (req, res) => {
  const project = new Project({
    _creator: req.body.creatorID,
    name: req.body.name,
    description: req.body.description,
    image: req.file.path || '',
    completed: req.body.completed || false,
    location: req.body.location,
  });
  project.save((err, project) => {
    if (err) { return res.send(err); }
    return res.json(project);
  });
});

/* GET a single Project. */
router.get('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }
  Project.findById(req.params.id)
  .populate('_creator')
  .exec((err, Projects) => {
      if (err) {
        return res.send(err);
      }
      return res.json(Projects);
    });
});

/* EDIT a Project. */
router.put('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }

  Project.findByIdAndUpdate(req.params.id, { $set : req.body }, (err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      message: 'Project updated successfully'
    });
  });
});

/* DELETE a Project. */
router.delete('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }

  Project.remove({ _id: req.params.id }, (err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      message: 'Project has been removed!'
    });
  });
});



module.exports = router;
