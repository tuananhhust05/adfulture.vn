const mongoose = require("mongoose");
const ProductHomepageSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
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
    collection: 'ProductHomepages',
    versionKey: false,
  },
);

module.exports = mongoose.model('ProductHomepage', ProductHomepageSchema)
