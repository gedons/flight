// backend/routes/flightCategoryRoutes.js
const express = require('express');
const { getCategories, addCategory, updateCategory, deleteCategory } = require('../controllers/flightCategoryController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

router.route('/')
  .get(protect, admin, getCategories)
  .post(protect, admin, addCategory);

router.route('/:id')
  .put(protect, admin, updateCategory)
  .delete(protect, admin, deleteCategory);

module.exports = router;
