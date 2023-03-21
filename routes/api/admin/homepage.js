const express = require('express');
const router = express.Router();
const formData = require('express-form-data');
const {
    CreateHomePageElement,
    GetListProduct
} = require('../../../controllers/admin/homepage');
router.post('/CreateHomePageElement', formData.parse(), CreateHomePageElement);
router.post('/GetListProduct', formData.parse(), GetListProduct);
module.exports = router;