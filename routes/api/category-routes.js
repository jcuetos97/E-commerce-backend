const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Find all categories, includes associated products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ['id', 'category_name'],
      include: [{ 
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }],
    });
    if (!categories) {
      res.status(404).json({ message: 'No categories found! with this id!' });
      return;
    }
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Find one specific category according to 'id' provided, includes associated products
router.get('/:id', async (req, res) => {
  try {
    const oneCategory = await Category.findByPk(req.params.id, {
      include: [{ 
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }],
    });
    if (!oneCategory) {
      res.status(404).json({ message: 'No category found!' });
      return;
    }
    res.status(200).json(oneCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Create a new category
router.post('/', (req, res) => {
  try {
    Category.create({
      category_name: req.params.category_name,
    })
  } catch (err) {
    res.status(500).json(err);
  }
});
// Update a category by its 'id' value
router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(req.body, {
      where: { 
        id: req.params.id 
      }, 
    })
    if (!updateCategory) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});
  
// Delete a category by its 'id' value
router.delete('/:id', async (req, res) => {
  try {
    const deleteCategory = await Category.destroy(
      { 
        where: { 
          id: req.params.id 
        } 
      });
    if (!deleteCategory) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
