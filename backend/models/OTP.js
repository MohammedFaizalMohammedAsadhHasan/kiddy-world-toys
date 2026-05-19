const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['registration', 'password_reset', 'email_verification'],
    default: 'registration',
  },
  expiresAt: {
    type: Date,
    default: Date.now,
    expires: 300, // 5 minutes
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('OTP', otpSchema);
