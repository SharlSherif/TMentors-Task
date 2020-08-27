const Category = require("../models/Category.model");

class CategoryController {
  static async getData(req, res) {
    try {
      let categories = await Category.find();
      res.status(201).send(categories);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  }

  // ? returns the category id if no error occured
  static async findOrCreate(categoryName) {
    // first search if this category already exists
    let CategoryExist = await Category.findOne({ name: categoryName });
    // not found
    if (CategoryExist == null) {
      console.log("category is not found");
      console.log("creating category");

      let createCategoryResponse = await Category.create({
        name: categoryName,
      });

      if (!!createCategoryResponse) {
        return createCategoryResponse;
      } else {
        throw Error(
          "Could not create a new category " + createCategoryResponse
        );
      }
    } else {
      return CategoryExist;
    }
  }
}

module.exports = CategoryController;
