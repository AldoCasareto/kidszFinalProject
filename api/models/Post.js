const mongoose = require('mongoose');
const Ratings = require('./Ratings')
const Schema = mongoose.Schema;
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    description: {
      type: String,
      require: true,
    },
    photo: {
      type: String,
      require: false,
    },
    username: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    bio: {
      type: String,
      require: true,
    },
    duration: {
      type: Number,
      require: true,
    },
    age: {
      type: Number,
      require: true,
    },
    days: {
      type: Number,
      require: true,
    },
    selectedDate: {
      type: Date,
      require: true,
    },
    categories: {
      type: Array,
      require: true,
    },
    ratings: {
      type: Schema.Types.ObjectId,
      ref: 'Ratings',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
