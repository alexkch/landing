const mongoose = require('mongoose');

const webhookSchema = new mongoose.Schema({
  subscriptionId: { type: String, required: true, trim: true },
  resourceId: { type: String, required: true, trim: true },
  expiry: {
    type: Number,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  }
});
webhookSchema.index({ subscriptionId: 1, resourceId: 1 }, { unique: true });

module.exports = mongoose.model('Webhook', webhookSchema);
