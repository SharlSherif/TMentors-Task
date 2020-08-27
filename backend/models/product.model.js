const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.Types.ObjectId;

const product = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  brand: {
    type: ObjectID,
    ref: "Brand",
    required: true,
  },
  // one to many relation with the Category schema
  category: {
    type: ObjectID,
    ref: "Category",
    required: true,
  },
  createdAt: {
    type: Date,
  },
});

module.exports = mongoose.model("product", product);
