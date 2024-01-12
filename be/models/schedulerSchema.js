const mongoose = require('mongoose');

const emailScheduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  subject: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    required: true,
  },
  repeat: {
    type: Number,
    default: 1,
  },
  time: {
    type: String,
    // You might want to use a more appropriate type, depending on your needs
    required: true,
  },
});

const EmailSchedule = mongoose.model('EmailSchedule', emailScheduleSchema);

module.exports = EmailSchedule;
