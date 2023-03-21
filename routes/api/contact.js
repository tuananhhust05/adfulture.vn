const express = require('express');
const router = express.Router();
const formData = require('express-form-data');
const {
    CreateCustomer
} = require('../../controllers/contact.js');
router.post('/createCustomer', formData.parse(), CreateCustomer);

module.exports = router;