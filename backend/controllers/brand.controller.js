const Brand = require("../models/brand.model");

class BrandController {
  static async getData(req, res) {
    try {
      let allBrands = await Brand.find()
      res.status(201).send(allBrands);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  }

  // ? returns the Brand id if no error occured
  static async findOrCreate(brandName) {
    // first search if this Brand already exists
    let BrandExist = await Brand.findOne({ name: brandName });
    // not found
    if (BrandExist == null) {
      console.log("Brand is not found");
      console.log("creating Brand");

      let createBrandResponse = await Brand.create({
        name: brandName,
      });

      if (!!createBrandResponse) {
        return createBrandResponse;
      } else {
        throw Error(
          "Could not create a new Brand " + createBrandResponse
        );
      }
    } else {
      return BrandExist;
    }
  }
}

module.exports = BrandController;
