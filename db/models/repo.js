const mongoose = require('mongoose');

const repoSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
    trim: true
  },
  experience: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  level: {
    type: String
  },
  collected_on: { type: Date, default: Date.now },
  created_on: { type: Date },
  updated_on: { type: Date }
});

module.exports = mongoose.model('Repo', repoSchema);
