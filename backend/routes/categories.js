const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.route('/').get(getCategories).post(protect, authorize('admin'), upload.single('image'), createCategory);
router.route('/:slug').get(getCategory);
router.route('/:id').put(protect, authorize('admin'), upload.single('image'), updateCategory).delete(protect, authorize('admin'), deleteCategory);

module.exports = router;
