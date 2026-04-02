const router = require('express').Router();
const { models: { Visitor } } = require('../../db');

// Sync the visitors table on first use
Visitor.sync({ alter: true });

// POST /api/visitors — save an email
router.post('/', async (req, res, next) => {
  try {
    const { email } = req.body;
    const visitor = await Visitor.create({ email });
    res.json(visitor);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
