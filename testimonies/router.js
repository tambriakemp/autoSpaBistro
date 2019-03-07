'use strict';

const express = require('express');
const { Testimony } = require('./models');
const passport = require('passport');
const router = express.Router();
const jwtAuth = passport.authenticate('jwt', { session: false });


// GET ALL TESTIMONIES ========================================
router.get('/', (req, res) => {
  console.log('testimony get');
  Testimony.find()
    .then(docs => res.json(docs))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' })
    });
});

// GET USER TESTIMONY =========================================
router.get('/:id', jwtAuth, (req, res) => {
  console.log('testimony for one user');

  Testimony.find({ user: req.user.id })
    .populate('user')
    .then(testimonies => {
      return res.json(
        testimonies.map(Testimony => Testimony.serialize())
      );
    })
    .catch(error => {
      return res.json(error);
    });
});

// POST TESTIMONY =============================================
router.post("/", jwtAuth, (req, res) => {
  console.log('testimony post', req.user);

  let testimony = Testimony();

  testimony.user = req.user.id,
    testimony.userTestimony = req.body.userTestimony,
    testimony.userDisplayName = req.body.userDisplayName

  testimony.save((err) => {
    if (err) {
      console.log('error', req.body);
      res.send({ err: err });
    } else {
      console.log(testimony);
      return res.status(201).json(testimony.serialize());
    }
  });
});

// UPDATE TESTIMONY ===========================================
router.put('/:id', jwtAuth, (req, res) => {

  const testimonyUpdate = {
    userTestimony: req.body.userTestimony,
    userDisplayName: req.body.userDisplayName
  };

  Testimony.findByIdAndUpdate(req.params.id, testimonyUpdate)
    .then(() => {
      return res.end();
    })
    .catch(error => {
      return res.json(error);
    });
});

// DELETE TESTIMONY =========================================
router.delete('/:id', jwtAuth, (req, res) => {
  Testimony.findByIdAndDelete(req.params.id)
    .then(() => {
      return res.end();
    })
    .catch(error => {
      return res.json(error);
    });
});


module.exports = { router };
