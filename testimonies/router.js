'use strict';

const express = require('express');
const {Testimony} = require('./models'); 
const { jwtAuth } = require('../auth');

const router = express.Router();

// const jwtAuth = passport.authenticate('jwt', { session: false });

// router.get('/api/protected', jwtAuth, (req, res) => {
//   return res.json({
//     data: 'rosebud' //extract username 
//   });
// });

// GET ==============================================
router.get('/', (req, res) => {
    console.log('testimony get');
    Testimony.find()
      .then(docs => res.json(docs))
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' })
      });
  });

  // POST ============================================
  router.post("/", (req, res) => {
    console.log('testimony post');
    let testimony = new Testimony();
    testimony.userTestimony   = req.body.userTestimony,
    testimony.userDisplayName    = req.body.userDisplayName
  
  
    testimony.save((err) => {
      if (err) {
        res.redirect('/error');
      } else {
        console.log(testimony);
        res.redirect('/dashboard.html');
      }
    });
  });

// PUT ============================================
// router.put ("/:id", jwtAuth, (req, res) => {

// })

// DELETE =========================================


module.exports = {router};
