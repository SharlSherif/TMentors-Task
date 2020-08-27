const { Router } = require('express');
const Category = require('../controllers/category.controller');
const router = Router();

router.get('/', Category.getData);

module.exports = router;
