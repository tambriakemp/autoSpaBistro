'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const TestimonySchema = mongoose.Schema({
  userTestimony: {
    type: String,
    required: true,
  },
  userDisplayName: {
    type: String,
    required: true
  }
});

TestimonySchema.methods.serialize = function() {
  return {
    userTestimony: this.userTestimony,
    userDisplayName: this.userDisplayName
  };
};


const Testimony = mongoose.model('Testimony', TestimonySchema);

module.exports = {Testimony};
