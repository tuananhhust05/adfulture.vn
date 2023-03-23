const express = require('express');
const router = express.Router();
const formData = require('express-form-data');
const {
    editPrice, getPrice
} = require('../../../controllers/admin/price');
router.post('/editPrice', formData.parse(), editPrice);
router.get('/getPrice', formData.parse(), getPrice);
module.exports = router;