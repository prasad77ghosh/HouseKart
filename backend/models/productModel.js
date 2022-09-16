const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter the name of the product"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter the description of the product"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter the price of the product"],
    maxLength: [8, "Price can not exceed 8 characters"],
  },
  rating: {
    type: Number,
    default: 0,
  },

  images: [
    {
      public_id: {
        type: String,
        required: true,
      },

      url: {
        type: String,
        required: true,
      },
    },
  ],

  category: {
    type: String,
    required: [true, "Please Enter the category of the product"],
  },

  Stock: {
    type: Number,
    required: [true, "Please Enter the product's stock"],
    default: 1,
  },

  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
