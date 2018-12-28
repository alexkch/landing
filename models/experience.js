const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: Number,
    required: true
  },
  description: [
    {
      type: String
    }
  ],
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  collected_on: { type: Date, default: Date.now },
  created_on: { type: Date },
  updated_on: { type: Date }
});

module.exports = mongoose.model('Experience', experienceSchema);
