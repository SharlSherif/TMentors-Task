const { Router } = require('express');
const Product = require('../controllers/product.controller');
const router = Router();

router.post(
    '/',
    Product.create
);

router.get('/', Product.getData);

module.exports = router;
