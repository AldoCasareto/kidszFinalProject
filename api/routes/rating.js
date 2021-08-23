const router = require('express').Router();
const Ratings = require('../models/Ratings');

router.post('/', async (req, res) => {
  const newRating = new Ratings(req.body);
  try {
    const savedReview = await newRating.save();
    res.status(200).json(savedReview);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const ratings = await Ratings.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
