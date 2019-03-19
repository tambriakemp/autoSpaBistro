"use strict";
const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const config = require("../config/config");
const router = express.Router();

const createAuthToken = function(user) {
  return jwt.sign({ user }, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: "HS256"
  });
};

const localAuth = passport.authenticate("local", { session: false });
router.use(bodyParser.json());

// The user provides a username and password to login
router.post("/login", localAuth, (req, res) => {
  //go to local strategies in strategies.js
  const user = req.user.serialize();
  const authToken = createAuthToken(req.user.serialize());
  res.json({ authToken, user });
});

const jwtAuth = passport.authenticate("jwt", { session: false });

// The user exchanges a valid JWT for a new one with a later expiration
router.post("/refresh", jwtAuth, (req, res) => {
  const user = request.user;
  const authToken = createAuthToken(req.user);
  res.json({ authToken, user });
});

module.exports = { router };
