const mongoose = require('mongoose');

const RatingsSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    ratingTitle: {
      type: String,
      require: true,
    },
    ratingBody: {
      type: String,
      require: true,
    },
    stars: {
      type: Number,
      require: true,
    },
    id: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ratings', RatingsSchema);
