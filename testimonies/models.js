'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const TestimonySchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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
  let user;
  // We serialize the user if it's populated to avoid returning any sensitive information, like the password hash.
  if (typeof this.user.serialize === 'function') {
      user = this.user.serialize();
  } else {
      user = this.user;
  }
  return {
    id: this._id,
    user: user, //comes back as an object
    userTestimony: this.userTestimony,
    userDisplayName: this.userDisplayName
  };
};


const Testimony = mongoose.model('Testimony', TestimonySchema);

module.exports = {Testimony};
