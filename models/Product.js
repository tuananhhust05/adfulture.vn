const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    typeAdd: {
      type: String,
      default: ""
    },
    img: {
      type: [String],
      default: [],
    },
    title: {
      type: String,
      default: ""
    },
    site: {
      type: String,
      default: ""
    },
  },
  {
    collection: 'Products',
    versionKey: false,
  },
);

module.exports = mongoose.model('Product', ProductSchema)
