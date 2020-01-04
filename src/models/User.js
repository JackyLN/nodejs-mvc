var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    min: [18, 'Too young'],
    max: [70, 'Too old'],
    required: [true, 'We need age to verify']
  },
  created: {
    type: Date,
    default: Date.now()
  },
  updated: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('User', UserSchema);