const express = require('express');
const router = express.Router();
const { getMe, updateDetails } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.get('/profile', protect, getMe);
router.put('/profile', protect, updateDetails);

module.exports = router;
