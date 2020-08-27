const mongoose = require("mongoose");

const Brand = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Brand", Brand);