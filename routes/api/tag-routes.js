const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Find all tags, including associated products
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      attributes: ['id', 'tag_name'],
      include: [{ 
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }],
    });
    if (!tags) {
      res.status(404).json({ message: 'No tags found!' });
      return;
    }
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Find one specific tag according to 'id' provided, including associated products
router.get('/:id', async (req, res) => {
  try {
    const oneTag = await Tag.findByPk(req.params.id, {
      include: [{ 
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }],
    });
    if (!oneTag) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(oneTag);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Create a new tag
router.post('/', async (req, res) => {
  try {
  const tagCreate = await Tag.create({
      tag_name: req.body.tag_name,
    })
    res.status(200).json(tagCreate);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Update a tag's name by its 'id' value
router.put('/:id', async (req, res) => {
  try {
    const updateTag = await Tag.update({
			tag_name: req.body.tag_name,
		}, 
    {
      where: { 
        id: req.params.id 
      }, 
    })
    if (!updateTag) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Tag updated!' });
  } catch (err) {
    res.status(500).json(err);
  }
});
// Delete a tag by its 'id' value
router.delete('/:id', async (req, res) => {
  try {
    const deleteTag = await Tag.destroy(
      { 
        where: { id: req.params.id } 
      });
    if (!deleteTag) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Tag deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
