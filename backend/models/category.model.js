const mongoose = require("mongoose");

const Category = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Category", Category);