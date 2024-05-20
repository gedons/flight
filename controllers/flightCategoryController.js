// backend/controllers/flightCategoryController.js
const FlightCategory = require('../models/FlightCategory');

const getCategories = async (req, res) => {
  try {
    const categories = await FlightCategory.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories' });
  }
};

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const categoryExists = await FlightCategory.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ message: 'Category already exists' });
    }
    const category = new FlightCategory({ name });
    const createdCategory = await category.save();
    res.status(201).json(createdCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error adding category' });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await FlightCategory.findById(req.params.id);
    if (category) {
      category.name = req.body.name || category.name;
      const updatedCategory = await category.save();
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating category' });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await FlightCategory.findById(req.params.id);
    if (category) {
      await category.remove();
      res.json({ message: 'Category removed' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category' });
  }
};

module.exports = { getCategories, addCategory, updateCategory, deleteCategory };
