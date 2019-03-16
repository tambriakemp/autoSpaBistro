"use strict";

const express = require("express");
const { Testimony } = require("./models");
const passport = require("passport");
const router = express.Router();
const jwtAuth = passport.authenticate("jwt", { session: false });

// GET ALL TESTIMONIES ========================================
router.get("/", (req, res) => {
  Testimony.find()
    .then(docs => res.json(docs))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// GET SINGLE TESTIMONY =========================================
router.get("/:id", jwtAuth, (req, res) => {
  Testimony.find({ user: req.user.id })
    .populate("user")
    .then(testimonies => {
      return res.json(testimonies.map(Testimony => Testimony.serialize()));
    })
    .catch(error => {
      return res.status(500).json(error);
    });
});

// GET SPECIFIC USER TESTIMONIES =========================================

router.get("/user", jwtAuth, (req, res) => {
  Testimony.find({ user: req.user.id })
    .populate("user")
    .then(testimonies => {
      return res.json(testimonies.map(testimony => testimony.serialize()));
    })
    .catch(error => {
      return res.status(500).json(error);
    });
});

// POST TESTIMONY =============================================
router.post("/", jwtAuth, (req, res) => {
  let testimony = Testimony();
  (testimony.user = req.user.id),
    (testimony.userTestimony = req.body.userTestimony),
    (testimony.userDisplayName = req.body.userDisplayName);

  testimony.save(err => {
    if (err) {
      res.send({ err: err });
    } else {
      return res.status(201).json(testimony.serialize());
    }
  });
});

// UPDATE TESTIMONY ===========================================
router.put("/:id", jwtAuth, (req, res) => {
  const testimonyUpdate = {
    userTestimony: req.body.userTestimony,
    userDisplayName: req.body.userDisplayName
  };
  Testimony.findByIdAndUpdate(req.params.id, testimonyUpdate)
    .then(() => {
      return res.status(200).json({ msg: "success" });
    })
    .catch(error => {
      return res.status(500).json(error);
    });
});

// DELETE TESTIMONY =========================================
router.delete("/:id", jwtAuth, (req, res) => {
  Testimony.findByIdAndDelete(req.params.id)
    .then(() => {
      return res.status(200).json({ msg: "success" });
    })
    .catch(error => {
      return res.status(500).json(error);
    });
});

module.exports = { router };
