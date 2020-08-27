const Product = require("../models/product.model");
const Category = require("../models/Category.model");

const CategoryController = require("./category.controller");
const BrandController = require("./brand.controller");
const Brand = require("../models/brand.model");

class ProductController {
  static async getData(req, res) {
    try {
      let products = await Product.find().populate(["category", "brand"]);
      let categories = await Category.find();
      let brands = await Brand.find();
      res.status(201).send({ products, categories, brands });
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  }

  //   static async Search(req, res) {}

  static async create(req, res) {
    const { name, image, price, brand, category } = req.body;
    const CategoryObject = await CategoryController.findOrCreate(category);
    const BrandObject = await BrandController.findOrCreate(brand);

    try {
      let productObject = await Product.create({
        name,
        image,
        price,
        brand: BrandObject._id,
        category: CategoryObject._id,
      });
      res.status(201).send(productObject);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  }
}

module.exports = ProductController;
