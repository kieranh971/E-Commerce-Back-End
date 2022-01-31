const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try{
    const categoriesDB = await Category.findAll({
      include: [{model: Product}],  // be sure to include its associated Products
    });
    res.status(200).json(categoriesDB);
  } catch(err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try{
    const categoriesDB = await Category.findbyPk(req.params.id, {
      include: [{model: Product}],  // be sure to include its associated Products
    });
    if (!categoriesDB) {
      res.status(404).json({message: "No category with this id"});
      return;
    }
    res.status(200).json(categoriesDB);
  } catch(err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const categoriesDB = await Category.create(req.body);
    res.status(200).json(categoriesDB);
  } catch(err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const categoriesDB = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoriesDB) {
      res.status(404).json({message: "No category with this id"});
      return;
    }
    res.status(200).json(categoriesDB);
  } catch(err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const categoriesDB = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoriesDB) {
      res.status(404).json({message: "No category with this id"});
      return;
    }
    res.status(200).json(categoriesDB);
  } catch(err) {
    res.status(400).json(err);
  }
});

module.exports = router;
