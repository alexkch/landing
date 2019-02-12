const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['school', 'cert', 'course'],
    required: true
  },
  school: {
    type: String,
    trim: true
  },
  cert_name: {
    type: String,
    trim: true
  },
  major: {
    type: String,
    trim: true
  },
  education_duration: {
    type: Number
  },
  description: { type: String, trim: true },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  pass_date: {
    type: Date,
    required: true
  },
  collected_on: { type: Date, default: Date.now },
  created_on: { type: Date },
  updated_on: { type: Date }
});

module.exports = mongoose.model('Education', educationSchema);
