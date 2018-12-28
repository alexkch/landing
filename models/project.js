const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  collected_on: { type: Date, default: Date.now },
  created_on: { type: Date },
  updated_on: { type: Date }
});

module.exports = mongoose.model('Project', projectSchema);
