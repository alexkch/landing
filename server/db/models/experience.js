const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: [
    {
      type: String
    }
  ],
  duration: {
    type: String,
    trim: true
  },
  reference: {
    type: String,
    trim: true
  },
  collected_on: { type: Date, default: Date.now },
  created_on: { type: Date },
  updated_on: { type: Date }
});

module.exports = mongoose.model('Experience', experienceSchema);
