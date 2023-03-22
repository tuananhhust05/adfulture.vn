const express = require('express');
const router = express.Router();
const formData = require('express-form-data');
const {
    CreateHomePageElement,
    GetListProduct,
    EditProduct
} = require('../../../controllers/admin/homepage');
router.post('/CreateHomePageElement', formData.parse(), CreateHomePageElement);
router.post('/GetListProduct', formData.parse(), GetListProduct);
router.post('/EditProduct', formData.parse(), EditProduct);
module.exports = router;