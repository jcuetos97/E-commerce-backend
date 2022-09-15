const router = require('express').Router();
const { RESERVED } = require('mysql2/lib/constants/client');
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// Get all products, including associated tag and category
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll ({
      attributes: ['id', 'product_name', 'price', 'stock'],
      include:[
      { 
      model: Category, 
      attributes: ['category_name']
      },
      {
      model:Tag, 
      attributes: ['tag_name']
      }
    ]
    });
    if(!products) {
      res.status(404).json({ message: 'Products not found!' });
      return;
    }
    res.status(200).json(products)
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get one product, including associated tag and category
router.get('/:id', async (req, res) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id, {
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      include: [
        {
          model: Category,
          attributes: ['id', 'category_name']
        },
        {
          model: Tag, 
          attributes:['id', 'tag_name']
        }
      ]
    }) 
    if (!singleProduct) {
      res.status(404).json({message: 'Product not foundwith this id!'});
    }
    res.status(200).json(singleProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new product
router.post('/', (req, res) => {
  Product.create ({
  product_name: req.body.product_name,
  price: req.body.price,
  stock: req.body.stock,
  category_id: req.body.category_id,
  tagIds: req.body.tagIds
  })
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Update product
router.put('/:id', (req, res) => {
  // Update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // Find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // Get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // Create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // Figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // Run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => { 
      res.status(400).json(err);
    });
});
// Delete one product by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleteProduct = await Category.destroy(
      { 
        where: { id: req.params.id } 
      });
    if (!deleteProduct) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Product deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
