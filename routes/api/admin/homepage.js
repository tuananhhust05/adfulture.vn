const express = require('express');
const router = express.Router();
const formData = require('express-form-data');
const {
    CreateHomePageElement,
    GetListProduct,
    EditProduct,
    CreateProduct,
    DeleteProduct,
    EditHomePageElement,
    DeleteHomePageElement,
    TakeDataChart
} = require('../../../controllers/admin/homepage');
router.post('/CreateHomePageElement', formData.parse(), CreateHomePageElement);
router.post('/GetListProduct', formData.parse(), GetListProduct);
router.post('/EditProduct', formData.parse(), EditProduct);
router.post('/CreateProduct', formData.parse(), CreateProduct);
router.post('/DeleteProduct', formData.parse(), DeleteProduct);
router.post('/EditHomePageElement', formData.parse(), EditHomePageElement);
router.post('/DeleteHomePageElement', formData.parse(), DeleteHomePageElement);
router.post('/TakeDataChart', formData.parse(), TakeDataChart);
module.exports = router;