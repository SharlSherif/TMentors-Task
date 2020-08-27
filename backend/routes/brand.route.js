const { Router } = require('express');
const Brand = require('../controllers/brand.controller');
const router = Router();

router.get('/', Brand.getData);

module.exports = router;
