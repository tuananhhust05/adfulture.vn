const express = require('express');
const router = express.Router();
const formData = require('express-form-data');
const {
    GetListCustomer,
    ReadRequestCustomer,
    CountUnreaderRequest
} = require('../../../controllers/admin/contact');
router.post('/GetListCustomer', formData.parse(), GetListCustomer);
router.post('/ReadRequestCustomer', formData.parse(), ReadRequestCustomer);
router.post('/CountUnreaderRequest', formData.parse(), CountUnreaderRequest);
module.exports = router;